import camelcaseKeys from "camelcase-keys";

const url = "http://localhost:5000";

export const getStatus = (picture, timestamp) => {
  const body = new FormData();
  body.append("file", picture);
  body.append("timestamp", timestamp)
  return fetch(`${url}/run`, {
    method: "POST",
    body,
  })
    .then(res => res.json())
    .then(res => camelcaseKeys(res, { deep: true }));
};

export const getHistory = () => fetch(`${url}/history`, { method: "GET" }).then(res => res.json())

export const getHistoryByBoxId = boxId => fetch(`${url}/history/${boxId}`, { method: "GET" }).then(res => res.json());

// export const getPictureWithDamage = (filename) =>
//   fetch(`${url}/get_detections`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(filename),
//   }).then((res) => res.blob());
