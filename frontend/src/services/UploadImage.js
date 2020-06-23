const url = "http://localhost:5000";

export const getStatus = (picture) =>
  fetch(`${url}/run`, {
    method: "POST",
    body: picture,
  }).then((res) => res.json());

export const getPictureWithDamage = () =>
  fetch(`${url}/get_detections`).then((res) => res.blob());
