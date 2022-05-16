import { addSinger } from "./types";

let token = {};
export const addSingerAdmin = (dataLogin: addSinger) => {
  fetch("http://3.218.67.164:9009/musicplayer/singer/", {
    method: "POST",
    body: JSON.stringify(dataLogin),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log("Login", json))
    .catch((err) => console.log("ERROR1", err));
};
