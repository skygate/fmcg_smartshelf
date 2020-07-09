const url = "https://app-air-motor-poc.hal.skygate.io";

export const getStatus = (picture) =>
  fetch(`${url}/run`, {
    method: "POST",
    body: picture,
  }).then((res) => res.json());

export const getPictureWithDamage = (filename) =>
  fetch(`${url}/get_detections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filename),
  }).then((res) => res.blob());
