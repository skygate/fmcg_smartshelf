import camelcaseKeys from "camelcase-keys";

const url = "http://localhost:5000";

export const getStatus = (picture) =>
  fetch(`${url}/run`, {
    method: "POST",
    body: picture,
  })
    .then((res) => res.json())
    .then((res) => camelcaseKeys(res, { deep: true }));

export const getPictureWithDamage = (filename) =>
  fetch(`${url}/get_detections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filename),
  }).then((res) => res.blob());
