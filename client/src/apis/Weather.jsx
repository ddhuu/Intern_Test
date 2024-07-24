import axios from "../../axios";

export const apiGetWeather = (lat, lon) =>
  axios({ url: `/weather/${lat}/${lon}`, method: "get" });
