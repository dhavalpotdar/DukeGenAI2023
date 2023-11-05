import { Container, Button, Grid, Typography } from "@mui/material";
import "./App.css";
import Webcam from "react-webcam";
import { useEffect, useRef } from "react";

function App() {
  const webCamRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (webCamRef.current && videoRef.current) {
        const video = videoRef.current;
        const currentTime = video.currentTime;
        console.log(currentTime);
        
        // Send the currentTime to the Python backend
        sendTimestampToBackend(currentTime);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const sendTimestampToBackend = async (timestamp) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/update_timestamp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timestamp }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.error('Failed to send timestamp to the backend');
      }
    } catch (error) {
      console.error('Error sending timestamp:', error);
    }
  };

  return (
    <Container
      style={{
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flex: 1,
      }}
    >
      <Grid container spacing={5} style={{ marginTop: 32 }}>
        <Grid
          item
          xs={5}
          md={5}
          lg={5}
          style={{ marginRight: window.innerWidth / 10 }}
        >
          <video
            ref={videoRef} // Add a ref to the video element
            controls
            autoPlay
            loop
            muted
            src={require("./2-Minute Neuroscience_ Autism.mp4")} // You need to use require to specify the video source correctly
            style={{
              width: window.innerWidth / 2.5,
              height: window.innerHeight / 2.5,
            }}
          />
        </Grid>

        <Grid item xs={5} md={5} lg={5}>
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
