import axios from "../../axios";

export const apiGetCityName = (lat, lon) =>
  axios({ url: `/cityname/${lat}/${lon}`, method: "get" });
