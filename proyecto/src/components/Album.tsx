import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "./menu";

export const Album = () => {
  useEffect(() => {
    getData();
  }, []);
  const [album, setAlbum] = useState<any[]>([]);
  const getData = async () => {
    const url = "http://3.218.67.164:9009/musicplayer/album/";
    const resp = await fetch(url);
    const data = await resp.json();
    const dataLog = data.map((resp: any) => {
      return {
        id: resp.id,
        name: resp.name,
        genre: resp.genre,
        singer: resp.singer,
        realeaseDate: resp.realeaseDate,
        price: resp.price,
        stock: resp.stock,
        images: resp.images,
      };
    });
    console.log(dataLog);
    setAlbum(dataLog);
  };
  const [open, setOpen] = useState(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Menu />
      <div className="division">
        <h2>Albums</h2>
      </div>

      <div className="cajas">
        {album.map((resp) => (
          <Card
            sx={{
              width: "30%",
              margin: "1%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            key={resp.id}
          >
            <CardMedia
              component="img"
              height="140"
              //image={resp.image}
              src={`data:image/jpeg;base64,${resp.images}`}
            />
            <CardContent>
              <Typography variant="h4" component="div">
                {resp.name}
              </Typography>
              <div className="dividirBoton">
                <Typography variant="h5" component="div">
                  {resp.realeaseDate}
                </Typography>
                <Typography variant="h5" component="div">
                  Price: ${resp.price}
                </Typography>
                <Typography variant="h5" component="div">
                  Stock: ${resp.stock}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
