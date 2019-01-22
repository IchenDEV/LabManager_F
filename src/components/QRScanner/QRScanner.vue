<template>
  <div>
    <div id="result" v-show="showRes"></div>
    <video id="v" autoplay></video>
    <canvas id="qr-canvas" width="600" height="600" style="display:none;"></canvas>
  </div>
</template>
<script>
/* eslint-disable */
var gCtx = null;
var gCanvas = null;
var c = 0;
var stype = 0;
var gUM = false;
var webkit = false;
var moz = false;
var v = null;
var that=null;
function initCanvas(w, h) {
  gCanvas = document.getElementById("qr-canvas");
  gCanvas.style.width = w + "px";
  gCanvas.style.height = h + "px";
  gCanvas.width = w;
  gCanvas.height = h;
  gCtx = gCanvas.getContext("2d");
  gCtx.clearRect(0, 0, w, h);
}

function captureToCanvas() {
  if (stype != 1) return;
  if (gUM) {
    try {
      gCtx.drawImage(v, 0, 0);
      try {
        qrcode.decode();
      } catch (e) {
        console.log(e);
        setTimeout(captureToCanvas, 500);
      }
    } catch (e) {
      console.log(e);
      setTimeout(captureToCanvas, 500);
    }
  }
}

function htmlEntities(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function read(a) {
  var html = "";
  if (a.indexOf("http://") === 0 || a.indexOf("https://") === 0)
    html += "<a target='_blank' href='" + a + "'>" + a + "</a><br>";
  html = htmlEntities(a);
  that.onrecived(html);
  document.getElementById("result").innerHTML = html;
}

function isCanvasSupported() {
  var elem = document.createElement("canvas");
  return !!(elem.getContext && elem.getContext("2d"));
}
function success(stream) {
  v.srcObject = stream;
  v.play();
  gUM = true;
  setTimeout(captureToCanvas, 500);
}

function error(error) {
  gUM = false;
  return;
}

function setwebcam() {
  var options = true;
  if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    try {
      navigator.mediaDevices.enumerateDevices().then(function(devices) {
        devices.forEach(function(device) {
          if (device.kind === "videoinput") {
            if (device.label.toLowerCase().search("back") > -1)
              options = {
                deviceId: { exact: device.deviceId },
                facingMode: "environment"
              };
          }
          console.log(
            device.kind + ": " + device.label + " id = " + device.deviceId
          );
        });
        setwebcam2(options);
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("no navigator.mediaDevices.enumerateDevices");
    setwebcam2(options);
  }
}

function setwebcam2(options) {
  console.log(options);
  document.getElementById("result").innerHTML = "- scanning -";
  if (stype === 1) {
    setTimeout(captureToCanvas, 500);
    return;
  }
  var n = navigator;

  v = document.getElementById("v");

  if (n.mediaDevices.getUserMedia) {
    n.mediaDevices
      .getUserMedia({ video: options, audio: false })
      .then(function(stream) {
        success(stream);
      })
      .catch(function(error) {
        error(error);
      });
  } else if (n.getUserMedia) {
    webkit = true;
    n.getUserMedia({ video: options, audio: false }, success, error);
  } else if (n.webkitGetUserMedia) {
    webkit = true;
    n.webkitGetUserMedia({ video: options, audio: false }, success, error);
  }
  stype = 1;
  setTimeout(captureToCanvas, 500);
}
export default {
  name: "QRScanner",
  props: { showRes: { default: false } },
  methods: {
    load() {
      if (isCanvasSupported() && window.File && window.FileReader) {
        initCanvas(800, 600);
        qrcode.callback = read;
        setwebcam();
      }
    },
    onrecived(info){
      //alert(a)
      this.$emit('recived',info)
    }
  },
  mounted() {
    that=this
    this.load()
  }
};
</script>

