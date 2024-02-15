import { useEffect } from 'react';
import Container from './container';
import './styles/deteksi.css';

function Deteksi() {
  useEffect(() => {
    mulaideteksi();
  }, []);

  function mulaideteksi() {
    const video = document.getElementById('video');

    var model;
    var cameraMode = 'environment'; // or "user"

    const startVideoStreamPromise = navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: cameraMode,
        },
      })
      .then(function (stream) {
        return new Promise(function (resolve) {
          video.srcObject = stream;
          video.onloadeddata = function () {
            video.play();
            resolve();
          };
        });
      });

    var publishable_key = 'rf_xoEHzd9Rtgcu3YHFTWXE4NiBwXE3';
    var toLoad = {
      model: 'coffee-quality-detection-x4zl2',
      version: 1,
    };

    const loadModelPromise = new Promise(function (resolve, reject) {
      window.roboflow
        .auth({
          publishable_key: publishable_key,
        })
        .load(toLoad)
        .then(function (m) {
          model = m;

          console.log('model loaded');
          resolve();
        });
    });

    Promise.all([startVideoStreamPromise, loadModelPromise]).then(function () {
      console.log('Promise.all');
      //    $('body').removeClass('loading');
      var element = document.getElementById('deteksi');
      element.classList.remove('loading');
      resizeCanvas();
      detectFrame();
    });

    var canvas, ctx;
    const font = '16px sans-serif';

    function videoDimensions(video) {
      // Ratio of the video's intrisic dimensions
      var videoRatio = video.videoWidth / video.videoHeight;

      // The width and height of the video element
      var width = video.offsetWidth,
        height = video.offsetHeight;

      // The ratio of the element's width to its height
      var elementRatio = width / height;

      // If the video element is short and wide
      if (elementRatio > videoRatio) {
        width = height * videoRatio;
      } else {
        // It must be tall and thin, or exactly equal to the original ratio
        height = width / videoRatio;
      }

      return {
        width: width,
        height: height,
      };
    }

    window.addEventListener('resize', function () {
      console.log('resize');
      resizeCanvas();
    });

    const resizeCanvas = function () {
      //  $('canvas').remove();
      if (canvas) {
        canvas.remove();
      }

      //  canvas = $('<canvas/>');
      canvas = document.createElement('canvas');

      console.log('resizeCanvas', canvas);

      //   ctx = canvas.getContext('2d');
      ctx = canvas.getContext('2d');

      var dimensions = videoDimensions(video);

      console.log(
        video.videoWidth,
        video.videoHeight,
        video.offsetWidth,
        video.offsetHeight,
        dimensions
      );

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      canvas.style.width = dimensions.width + 'px';
      canvas.style.height = dimensions.height + 'px';
      canvas.style.left = window.innerWidth / 2 - dimensions.width / 2 + 'px';
      canvas.style.top = window.innerHeight / 2 - dimensions.height / 2 + 'px';

      //   document.body.appendChild(canvas);
      document.getElementById('deteksi').appendChild(canvas);
      console.log('styled canvas', canvas);
    };

    const renderPredictions = function (predictions) {
      //   console.log('renderPredictions', predictions);

      var dimensions = videoDimensions(video);

      var scale = 1;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      predictions.forEach(function (prediction) {
        const x = prediction.bbox.x;
        const y = prediction.bbox.y;

        const width = prediction.bbox.width;
        const height = prediction.bbox.height;

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

      predictions.forEach(function (prediction) {
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

    var prevTime;
    var pastFrameTimes = [];
    const detectFrame = function () {
      //   console.log('detectFrame', model, video);

      if (!model) return requestAnimationFrame(detectFrame);

      model
        .detect(video)
        .then(function (predictions) {
          requestAnimationFrame(detectFrame);
          renderPredictions(predictions);

          if (prevTime) {
            pastFrameTimes.push(Date.now() - prevTime);
            if (pastFrameTimes.length > 30) pastFrameTimes.shift();

            var total = 0;
            // _.each(pastFrameTimes, function (t) {
            //   total += t / 1000;
            // });
            pastFrameTimes.forEach((t) => {
              total += t / 1000;
            });

            var fps = pastFrameTimes.length / total;

            document.getElementById('fps').innerText = Math.round(fps);
          }
          prevTime = Date.now();
        })
        .catch(function (e) {
          console.log('CAUGHT', e);
          requestAnimationFrame(detectFrame);
        });
    };
  }

  return (
    <>
      {/* <div className="min-h-screen"> */}
      {/* <Container className="flex flex-wrap "> */}
      {/* <div className="flex flex-col mx-auto text-center justify-center"> */}
      {/* <div>
              <h2 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
                Deteksi Biji Kopi
              </h2>
            </div> */}
      <div id="deteksi" className="deteksi bg-black">
        <div className="loading">
          <video id="video" autoPlay muted playsInline></video>
          <div id="fps"></div>
        </div>
      </div>
      {/* </div> */}
      {/* </Container> */}
      {/* </div> */}
    </>
  );
}

export default Deteksi;
