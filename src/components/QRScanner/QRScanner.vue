<template>
  <div>
    <video
      id="v"
      :class="{blur:isBlur}"
      autoplay
    />
    <canvas
      id="qr-canvas"
      width="600"
      height="600"
      style="display:none;"
    />
    <div
      v-show="showRes"
      id="result"
    />
  </div>
</template>
<script>
/* eslint-disable */
var that=null
export default {
  props: { showRes: { default: false } },
  data () {
    return {
      gCtx: null,
      gCanvas: null,
      c: 0,
      stype: 0,
      gUM: false,
      webkit: false,
      v: null,
      isBlur:false
    };
  },
  methods: {
    load () {
      if (this.isCanvasSupported() && window.File && window.FileReader) {
        this.initCanvas(800, 600)
        qrcode.callback = this.read
        this.setwebcam()
      }
    },
     setwebcam2 (options) {
      console.log(options)
      document.getElementById("result").innerHTML = "- scanning -"
      if (this.stype === 1) {
        setTimeout(this.captureToCanvas, 500)
        return
      }
      var n = navigator
      this.v = document.getElementById("v")
      if (n.mediaDevices.getUserMedia) {
        n.mediaDevices
          .getUserMedia({ video: options, audio: false })
          .then(function(stream) {
            that.v.srcObject = stream
            that.v.play()
            that.gUM = true
            setTimeout(that.captureToCanvas, 500)
          })
          .catch(function(error) {
            that.gUM = false
          })
      } else if (n.getUserMedia) {
        this.webkit = true
        n.getUserMedia({ video: options, audio: false }, success, error)
      } else if (n.webkitGetUserMedia) {
        this.webkit = true
        n.webkitGetUserMedia({ video: options, audio: false }, success, error)
      }
      this.stype = 1
      setTimeout(this.captureToCanvas, 500)
    },
    setwebcam () {
      var options = true
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        try {
          navigator.mediaDevices.enumerateDevices().then(function(devices) {
            devices.forEach(function(device) {
              if (device.kind === "videoinput") {
                if (device.label.toLowerCase().search("back") > -1)
                  options = {
                    deviceId: { exact: device.deviceId },
                    facingMode: "environment"
                  }
              }
              console.log(
                device.kind + ": " + device.label + " id = " + device.deviceId
              )
            })
            that.setwebcam2(options)
          });
        } catch (e) {
          console.log(e)
        }
      } else {
        console.log("no navigator.mediaDevices.enumerateDevices")
        that.setwebcam2(options)
      }
    },
    read (a) {
      var html = ""
      if (a.indexOf("http://") === 0 || a.indexOf("https://") === 0)
        html += "<a target='_blank' href='" + a + "'>" + a + "</a><br>";
      html = this.htmlEntities(a)
      this.onrecived(html)
      document.getElementById("result").innerHTML = html
    },
    isCanvasSupported () {
      var elem = document.createElement("canvas")
      return !!(elem.getContext && elem.getContext("2d"))
    },
    initCanvas(w, h) {
      this.gCanvas = document.getElementById("qr-canvas")
      this.gCanvas.style.width = w + "px"
      this.gCanvas.style.height = h + "px"
      this.gCanvas.width = w
      this.gCanvas.height = h
      this.gCtx = this.gCanvas.getContext("2d")
      this.gCtx.clearRect(0, 0, w, h)
    },
    htmlEntities (str) {
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
    },
    captureToCanvas () {
      if (this.stype != 1) return
      if (this.gUM) {
        try {
          this.gCtx.drawImage(v, 0, 0)
          try {
            qrcode.decode()
          } catch (e) {
            console.log(e)
            setTimeout(this.captureToCanvas, 500)
          }
        } catch (e) {
          console.log(e)
          setTimeout(this.captureToCanvas, 500)
        }
      }
    },
    onrecived (info) {
      this.isBlur=true
      this.v.pause()
      this.$emit("recived", info)
    }
  },
  mounted() {
    that=this
    this.load()
  }
}
</script>
<style>
.blur {	
    -webkit-filter: blur(10px); /* Chrome, Opera */
       -moz-filter: blur(10px);
        -ms-filter: blur(10px);    
            filter: blur(10px);
    
    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); /* IE6~IE9 */
}
</style>

