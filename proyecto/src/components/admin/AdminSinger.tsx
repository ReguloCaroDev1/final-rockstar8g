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
import { AdminMenu } from "./menu";
import { addSingerAdmin } from "../../service/singer";

export const AdminSinger = () => {
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
  const [imagen, setImagen] = useState<any>(null);
  const inputFiles = useRef<HTMLInputElement>(null);
  const loadFile = (file: File) =>
    new Promise<string>((res) => {
      const fr = new FileReader();
      fr.readAsBinaryString(file);

      fr.onload = (event) => {
        if (event.target) {
          res(btoa(event.target.result as string));
        }
      };
    });

  const appendFiles = async () => {
    if (!inputFiles.current || !inputFiles.current.files) return;
    const file = inputFiles.current.files.item(
      inputFiles.current.files.length - 1
    );
    if (file) {
      const imageData = await loadFile(file);
      try {
        setImagen(imageData);
        console.log(imageData);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //event.preventDefault();
    const data = new FormData(event.currentTarget);
    addSingerAdmin({
      name: data.get("name"),
      stageName: data.get("stageName"),
      last_name: data.get("last_name"),
      nationality: data.get("nationality"),
      image: imagen,
    });
  };
  const eliminarSinger = async (id: any) => {
    setSinger(singer.slice(id, id + 1));
    fetch(`http://3.218.67.164:9009/musicplayer/singer/${id}/`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => console.log("Si", json))
      .catch((err) => console.log("Si"));
  };
  return (
    <>
      <AdminMenu />
      <div className="division">
        <div>
          <h2>Artistas</h2>
        </div>
        <div className="final">
          <button onClick={handleOpen} className="anadir">
            Anadir
          </button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={style}>
          <Typography variant="h4" component="div">
            Ingresa los datos para un nuevo cantante
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="Last name"
            name="last_name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="stageName"
            label="stageName"
            id="stageName"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="nationality"
            label="Nationality"
            id="nationality"
          />

          <input
            multiple
            ref={inputFiles}
            onChange={appendFiles}
            id="file-input"
            type="file"
            name="upload-files"
            accept=".jpg,.jpeg,.png,.webp"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar datos
          </Button>
        </Box>
      </Modal>

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
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => eliminarSinger(resp.id)}
                >
                  X
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
