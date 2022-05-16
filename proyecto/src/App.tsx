import React from "react";
import "./App.css";
import { SignIn } from "./components/SignIn";
import { Menu } from "./components/menu";
import { Route, Router, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { Styles } from "./types/types";
import Songs from "./components/Songs";
import { Album } from "./components/Album";
import { Singer } from "./components/Singer";
import { SignUp } from "./components/SingUp";
import { AdminAlbum } from "./components/admin/AdminAlbum";
import { AdminSinger } from "./components/admin/AdminSinger";
import AdminSongs from "./components/admin/AdminSongs";
import Home from "./components/Home";

const App = () => {
  const styles: Styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: "40px",
      overflow: "hidden",
    },
  };
  return (
    <>
      <Box sx={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/album" element={<Album />} />
          <Route path="/singer" element={<Singer />} />
          <Route path="/adduser" element={<SignUp />} />
          <Route path="/admin/albums" element={<AdminAlbum />} />
          <Route path="/admin/songs" element={<AdminSongs />} />
          <Route path="/admin/singers" element={<AdminSinger />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
