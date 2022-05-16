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

import Button from "@mui/material/Button";
import { Menu } from "./menu";

export const Singer = () => {
  useEffect(() => {
    getData();
  }, []);
  const [singer, setSinger] = useState<any[]>([]);
  const getData = async () => {
    const url = "http://3.218.67.164:9009/musicplayer/singer/";
    const resp = await fetch(url);
    const data = await resp.json();
    const dataLog = data.map((resp: any) => {
      return {
        id: resp.id,
        name: resp.name,
        stageName: resp.stageName,
        nationality: resp.nationality,
        image: resp.image,
      };
    });
    console.log(dataLog);
    setSinger(dataLog);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
        <h2>Artistas</h2>
      </div>

      <div className="cajas">
        {singer.map((resp) => (
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
              src={`data:image/jpeg;base64,${resp.image}`}
            />
            <CardContent>
              <Typography variant="h4" component="div">
                {resp.stageName}
              </Typography>
              <div className="dividirBoton">
                <Typography variant="h5" component="div">
                  {resp.nationality}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
