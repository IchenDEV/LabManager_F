<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view/>
    <ui-menu id="pop" has-icons has-secondary-text :options="menuOption" raised></ui-menu>
  </div>
</template>
<script>
/* eslint-disable */
document.oncontextmenu = function(ev) {
  var oEvent = ev || event;
  var oDiv = document.getElementById("pop");
  oDiv.style.display = "block";
  oDiv.style.left = oEvent.clientX + "px";
  oDiv.style.top = oEvent.clientY + "px";
  return false;
};
document.onclick = function() {
  var oDiv = document.getElementById("pop");
  oDiv.style.display = "none";
};

import NavBar from './components/NavBar/NavBar'
export default {
  name: "App",
  components:{NavBar},
  data() {
    return {
      menuOption: [
        {
          id: "edit",
          label: "Edit",
          icon: "edit",
          secondaryText: "Ctrl+E"
        },
        {
          id: "duplicate",
          label: "Duplicate",
          icon: "content_copy",
          secondaryText: "Ctrl+D"
        },
        {
          id: "share",
          label: "Share",
          icon: "share",
          secondaryText: "Ctrl+Shift+S",
          disabled: true
        },
        {
          type: "divider"
        },
        {
          id: "delete",
          label: "Delete",
          icon: "delete",
          secondaryText: "Del"
        }
      ]
    };
  },

};

</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  font-size: 100%;
}
body {
  margin: 0;
}
#pop {
  position: absolute;
  display: none;
}
</style>
