const axios = require("axios");
const nodemailer = require("nodemailer");
const nodeCron = require("node-cron");
const USER = require("./user.model");

async function fetchCityCoordinates(cityName) {
  const apiKey = process.env.API_KEY;
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
  try {
    const response = await axios.get(geoUrl);
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    } else {
      console.error("No coordinates found for city:", cityName);
      return null;
    }
  } catch (error) {
    console.error("Error fetching city coordinates:", error);
    return null;
  }
}

async function fetchWeatherData(cityName) {
  const coordinates = await fetchCityCoordinates(cityName);
  if (!coordinates) return null;

  const apiKey = process.env.API_KEY;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;
  try {
    const response = await axios.get(weatherUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

async function sendWeatherEmail(email, city, weatherData) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_AUTHOR,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_AUTHOR,
    to: email,
    subject: "Daily Weather Forecast",
    html: createWeatherEmailTemplate(weatherData, city),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Weather forecast email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

function createWeatherEmailTemplate(weatherData, city) {
  const firstDayForecast = weatherData.list[0];
  return `
    <h1> ${city}</h1>
    <img src="http://openweathermap.org/img/w/${
      firstDayForecast.weather[0].icon
    }.png" alt="Weather icon" style="max-width: 100px; margin: 5px 0 -12px 0;">
    <p>Temperature: ${(firstDayForecast.main.temp - 273).toFixed(2)}°C</p>
    <p>Condition: ${firstDayForecast.weather[0].description}</p>
    <p>Humidity: ${firstDayForecast.main.humidity}%</p>
    <p>Wind Speed: ${firstDayForecast.wind.speed} m/s</p>
  `;
}

async function fetchAndSendWeatherToAllUsers() {
  const users = await USER.find({});
  for (const user of users) {
    const weatherData = await fetchWeatherData(user.usr_city);
    if (weatherData) {
      await sendWeatherEmail(user.usr_email, user.usr_city, weatherData);
    } else {
      console.error(`Failed to fetch weather data for ${user.city}`);
    }
  }
}

const Scheduler = () => {
  nodeCron.schedule(
    "29 22 * * *",
    () => {
      console.log("Running a job at 21:45 at Asia/Ho_Chi_Minh timezone");
      fetchAndSendWeatherToAllUsers();
    },
    {
      scheduled: true,
      timezone: "Asia/Ho_Chi_Minh",
    }
  );
};

module.exports = {
  Scheduler,
};
