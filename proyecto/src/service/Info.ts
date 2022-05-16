import React from "react";

export const Info = () => {
  fetch("http://3.218.67.164:9009/musicplayer/singer/", {
    method: "GET",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => console.log("DataSinger", json))
    .catch((err) => console.log("ERROR1", err));
};
