import { Container, Button, Grid, Typography } from "@mui/material";
import "./App.css";
import VideoContent from "./river.mp4";
import Webcam from "react-webcam";
import { useEffect, useRef } from "react";

function App() {
  const webCamRef = useRef(null);
  setInterval(() => {
    if (webCamRef == null || webCamRef.current === null) return;
    const imageSrc = webCamRef.current.getScreenshot();
    console.log(imageSrc);
  }, 1000);

  return (
    <Container
      style={{
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flex: 1,
      }}
    >
      <h1>ADHD 4 lyf</h1>

      <Grid container spacing={5} style={{ marginTop: 32 }}>
        <Grid
          item
          xs={5}
          md={5}
          lg={5}
          style={{ marginRight: window.innerWidth / 10 }}
        >
          <Typography variant="h4">Study Video</Typography>
          <video
            controls
            autoPlay
            loop
            muted
            src={VideoContent}
            style={{
              width: window.innerWidth / 2.5,
              height: window.innerHeight / 2.5,
            }}
          />
        </Grid>

        <Grid item xs={5} md={5} lg={5}>
          <Typography variant="h4">Thou fuck thy</Typography>
          <Webcam
            ref={webCamRef}
            imageSmoothing={true}
            audio={false}
            height={window.innerHeight / 2.5}
            width={window.innerWidth / 2.5}
          />
        </Grid>
      </Grid>

      <Button></Button>
    </Container>
  );
}

export default App;
