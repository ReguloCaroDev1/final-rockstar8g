import { addSongs } from "./types";

let token = {};
export const addSongsAdmin = (dataLogin: addSongs) => {
  fetch("http://3.218.67.164:9009/musicplayer/songs/", {
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
