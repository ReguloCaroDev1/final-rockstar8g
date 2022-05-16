import { LogIn } from "./types";
let logout_json = {
  refresh: "",
  access: "",
};
export const loginUser = async (dataLogin: LogIn) => {
  let response = await fetch("http://3.218.67.164:9009/users/login/", {
    method: "POST",
    body: JSON.stringify(dataLogin),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => console.log("Login", json))
    .catch((err) => console.log("ERROR1", err));

  fetch("http://3.218.67.164:9009/api/token/", {
    method: "POST",
    body: JSON.stringify(dataLogin),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
      logout_json["refresh"] = json["refresh"];
      logout_json["access"] = json["access"];
      localStorage.setItem("refreshToken", json["refresh"]);
      localStorage.setItem("accessToken", json["access"]);
      console.log("TOKEN", json);
    })
    .catch((err) => console.log("ERROR2", err));
};
export const logout = () => {
  console.log("REQ:", logout_json["refresh"]);
  let bearer = "Bearer " + logout_json["access"];
  console.log("bearer ", bearer);

  fetch("http://3.218.67.164:9009/users/logout/", {
    method: "POST",
    body: JSON.stringify(logout_json),
    headers: {
      Authorization: bearer,
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => console.log(response))
    .catch((err) => console.log("ERROR3", err));
  localStorage.setItem("refreshToken", "undefined");
  localStorage.setItem("accessToken", "undefined");
};
/* const refresh_token = () => {
  console.log("REQ:", logout_json["refresh"]);
  let bearer = "Bearer " + logout_json["access"];
  console.log("bearer ", bearer);

  fetch("http://3.218.67.164:9009/api/token/refresh/", {
    method: "POST",
    body: JSON.stringify(logout_json),
    headers: {
      Authorization: bearer,
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => console.log(response))
    .catch((err) => console.log("ERROR4", err));
}; */

export const adduser = async (dataLogin: LogIn) => {
  let response = await fetch("http://3.218.67.164:9009/users/", {
    method: "POST",
    body: JSON.stringify(dataLogin),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => console.log("Login", json))
    .catch((err) => console.log("ERROR1", err));
};
