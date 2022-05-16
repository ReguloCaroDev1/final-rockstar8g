import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./abc.css";
import Button from "@mui/material/Button";
import { AdminMenu } from "./menu";
import { addAlbumAdmin } from "../../service/album";

export const AdminAlbum = () => {
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
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addAlbumAdmin({
      name: data.get("name"),
      price: data.get("price"),
      stock: data.get("stock"),
      realeaseDate: new Date(),
      images: imagen,
    });
  };
  const eliminarAlbum = async (id: any) => {
    setAlbum(album.slice(id, id + 1));
    fetch(`http://3.218.67.164:9009/musicplayer/album/${id}/`, {
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
          <h1>Albums</h1>
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
            Ingresa los datos para un nuevo album
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
            name="price"
            label="Price"
            id="price"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="stock"
            label="Stock"
            id="stock"
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
              src={`data:image/jpeg;base64,${resp.images}`}
            />
            <CardContent>
              <Typography variant="h4" component="div">
                {resp.name}
              </Typography>
              <div className="dividirBoton">
                <Typography variant="h5" component="div">
                  Stock: {resp.stock}
                </Typography>
                <Typography variant="h5" component="div">
                  Price: {resp.price}
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => eliminarAlbum(resp.id)}
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
