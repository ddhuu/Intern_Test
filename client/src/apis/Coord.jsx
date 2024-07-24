import axios from "../../axios";

export const apiGetCoord = (cityName) =>
  axios({ url: `/coordinates/${cityName}`, method: "get" });
