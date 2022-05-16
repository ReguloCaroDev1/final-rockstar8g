import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Menu } from "./menu";

const theme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <Menu />
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Celebrando el dia de la cancion contigo.
      </Typography>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          <Card
            sx={{
              width: "80vh",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia component="img" image="src\assets\blog5-1920x1080.jpg" />
          </Card>
        </Grid>
      </Container>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
        >
          <Container maxWidth="sm">
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Relajate y escucha las mejores canciones
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" href="/singer/">
                ARTISTAS
              </Button>
              <Button variant="outlined" href="/album/">
                ALBUMS
              </Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
