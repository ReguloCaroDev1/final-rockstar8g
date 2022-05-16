import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Menu } from "./menu";
import { useEffect, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

export default function Songs() {
  useEffect(() => {
    getData();
  }, []);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [singer, setSinger] = useState<any[]>([]);
  const getData = async () => {
    const url = "http://3.218.67.164:9009/musicplayer/songs/";
    const resp = await fetch(url);
    const data = await resp.json();
    const dataLog = data.map((resp: any) => {
      return {
        id: resp.id,
        name: resp.name,
        duration: resp.duration,
        realeaseDate: resp.realeaseDate,
        price: resp.price,
      };
    });
    console.log(dataLog);
    setSinger(dataLog);
  };

  return (
    <>
      <Menu />

      <div>
        <h2>Artistas</h2>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">duration</TableCell>
              <TableCell align="right">realese date</TableCell>
              <TableCell align="right">price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {singer.map((resp: any) => (
              <TableRow
                key={resp.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {resp.name}
                </TableCell>
                <TableCell align="right">{resp.duration}</TableCell>
                <TableCell align="right">{resp.realeaseDate}</TableCell>
                <TableCell align="right">${resp.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
