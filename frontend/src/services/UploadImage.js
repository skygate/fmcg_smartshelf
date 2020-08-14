import camelcaseKeys from "camelcase-keys";

const url = "http://localhost:5000";

export const getStatus = (picture, boxes) => {
  const body = new FormData();
  body.append("file", picture);
  body.append("boxes", JSON.stringify(boxes));
  return fetch(`${url}/run`, {
    method: "POST",
    body,
  })
    .then((res) => res.json())
    .then((res) => camelcaseKeys(res, { deep: true }));
};

// export const getPictureWithDamage = (filename) =>
//   fetch(`${url}/get_detections`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(filename),
//   }).then((res) => res.blob());
