import api from "./api";

export const reverseGeocode = (lat, lng) =>
  api.get(`/geo/reverse?lat=${lat}&lng=${lng}`);
