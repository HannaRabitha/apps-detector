import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import Container from './container';

const PUBLISHABLE_ROBOFLOW_API_KEY = 'rf_xoEHzd9Rtgcu3YHFTWXE4NiBwXE3';
const PROJECT_URL = 'real-time-classification-jerawat';
const MODEL_VERSION = 1;


const Roboflow = (props) => {
  const [spinner, setSpinner] = useState(true);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  var inferRunning;
  var model;

  const startInfer = () => {
    inferRunning = true;
    window.roboflow
      .auth({
        publishable_key: PUBLISHABLE_ROBOFLOW_API_KEY,
      })
      .load({
        model: PROJECT_URL,
        version: MODEL_VERSION,
        onMetadata: function (m) {
          console.log('model loaded');
        },
      })
      .then((model) => {
        setSpinner(false);
        setInterval(() => {
          if (inferRunning) detect(model);
        }, 3);
      });
  };

  useEffect(startInfer, []);

  // const stopInfer = () => {
  //     inferRunning = false;
  //     if (model) model.teardown();
  // };

  const detect = async (model) => {
    // Check data is available
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      adjustCanvas(videoWidth, videoHeight);

      const detections = await model.detect(webcamRef.current.video);

      const ctx = canvasRef.current.getContext('2d');
      drawBoxes(detections, ctx);
    }
  };

  const adjustCanvas = (w, h) => {
    canvasRef.current.width = w * window.devicePixelRatio;
    canvasRef.current.height = h * window.devicePixelRatio;

    canvasRef.current.style.width = w + 'px';
    canvasRef.current.style.height = h + 'px';

    canvasRef.current
      .getContext('2d')
      .scale(window.devicePixelRatio, window.devicePixelRatio);
  };

  const drawBoxes = (detections, ctx) => {
    const font = '16px sans-serif';
    var scale = 1;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    detections.forEach((prediction) => {
      const x = prediction.bbox.x;
      const y = prediction.bbox.y;

      const width = prediction.bbox.width;
      const height = prediction.bbox.height;

      if (true) {
        //video
        var temp = prediction.bbox;
        temp.class = prediction.class;
        temp.color = prediction.color;
        temp.confidence = prediction.confidence;
        prediction = temp;
      }

      if (prediction.confidence < 0) return;

      // Draw the bounding box.
      ctx.strokeStyle = prediction.color;
      ctx.lineWidth = 4;
      ctx.strokeRect(
        (x - width / 2) / scale,
        (y - height / 2) / scale,
        width / scale,
        height / scale
      );

      // Draw the label background.
      ctx.fillStyle = prediction.color;
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(
        (x - width / 2) / scale,
        (y - height / 2) / scale,
        textWidth + 8,
        textHeight + 4
      );
    });

    detections.forEach((prediction) => {
      const x = prediction.bbox.x;
      const y = prediction.bbox.y;

      const width = prediction.bbox.width;
      const height = prediction.bbox.height;

      // Draw the text last to ensure it's on top.
      ctx.font = font;
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#000000';
      ctx.fillText(
        prediction.class,
        (x - width / 2) / scale + 4,
        (y - height / 2) / scale + 1
      );
    });
  };

  return (
    <>
      <div className="min-h-screen">
        <Container className="flex flex-wrap ">
          {spinner && (
            <>
              <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
              <p>Loading...</p>
            </>
          )}
          <Webcam
            ref={webcamRef}
            muted={true}
            className="absolute mx-auto left-0 right-0 text-center z-10"
          />
          <canvas
            ref={canvasRef}
            className="absolute mx-auto left-0 right-0 text-center z-20"
          />
        </Container>
      </div>
    </>
  );
};

export default Roboflow;
