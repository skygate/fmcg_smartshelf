import camelcaseKeys from "camelcase-keys";

const baseUrl = "http://localhost:5000";

export const getStatus = (picture, timestamp) => {
  const body = new FormData();
  body.append("file", picture);
  body.append("timestamp", timestamp);
  return post("/run", {
    body,
  });
};

export const getHistory = (startDate) => get("/history", { startDate });

export const getHistoryByBoxId = (boxId) => get(`/history/${boxId}`);

function get(endpoint, queryParams = {}, options = {}) {
  return fetch(formatUrl(endpoint, queryParams), {
    ...options,
    method: "GET",
  }).then(transformResponse);
}

function post(endpoint, options) {
  return fetch(formatUrl(endpoint), { ...options, method: "POST" }).then(
    transformResponse
  );
}

function formatUrl(endpoint, queryParams = {}) {
  return `${baseUrl}${endpoint}?${Object.keys(queryParams)
    .map((key) => `${key}=${queryParams[key]}`)
    .join("&")}`;
}

function transformResponse(res) {
  return res.json().then((jsObject) => camelcaseKeys(jsObject, { deep: true }));
}
