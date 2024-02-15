import { useEffect } from 'react';
import Container from './container';

// import './styles/deteksi.css';
function Deteksi() {
  useEffect(() => {
    // const script = document.createElement('script');

    // script.src = 'https://cdn.roboflow.com/0.2.26/roboflow.js';
    // script.async = true;

    // document.body.appendChild(script);

    // return () => {
    //   document.body.removeChild(script);
    // };

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
          resolve();
        });
    });

    Promise.all([startVideoStreamPromise, loadModelPromise]).then(
      removeClass()
    );

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

    // window.resize(function () {
    //   resizeCanvas();
    // });

    // if (window) {
    //   window.addEventListener('resize', resizeCanvas());
    // }

    const resizeCanvas = function () {
      //  $('canvas').remove();
      document.getElementById('canvas').remove();
      //  canvas = $('<canvas/>');
      canvas = document.createElement('canvas');

      ctx = canvas[0].getContext('2d');

      var dimensions = videoDimensions(video);

      console.log(
        video.videoWidth,
        video.videoHeight,
        video.offsetWidth,
        video.offsetHeight,
        dimensions
      );

      canvas[0].width = video.videoWidth;
      canvas[0].height = video.videoHeight;

      canvas.css({
        width: dimensions.width,
        height: dimensions.height,
        // left: ($(window).width() - dimensions.width) / 2,
        // top: ($(window).height() - dimensions.height) / 2,
        left: window.innerWidth - dimensions.width / 2,
        top: window.innerHeight - dimensions.height / 2,
      });

      //   $('body').append(canvas);
      document.body.appendChild(canvas);
    };

    const renderPredictions = function (predictions) {
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
            // $('#fps').text(Math.round(fps));
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

  function removeClass() {
    var loading = document.querySelector('.loading');
    loading.classList.remove('loading');
    resizeCanvas();
    detectFrame();
  }

  function resizeCanvas() {}
  function detectFrame() {}

  return (
    <>
      <div className="min-h-screen">
        <Container className="flex flex-wrap ">
          <div className="flex flex-col mx-auto text-center justify-center">
            <div>
              <h2 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
                Deteksi Biji Kopi
              </h2>
            </div>
            <div className="deteksi">
              <div className="loading">
                <video id="video" autoplay muted playsinline></video>
                <div id="fps"></div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Deteksi;
