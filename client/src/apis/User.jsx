import axios from "../../axios";

export const Subcribe = (email, city) => {
  return axios({
    url: "/user/subscribe",
    method: "POST",
    data: {
      email: email,
      city: city,
    },
  });
};

export const UnSubcribe = (email) => {
  return axios({
    url: "/user/unsubscribe",
    method: "POST",
    data: {
      email: email,
    },
  });
};
