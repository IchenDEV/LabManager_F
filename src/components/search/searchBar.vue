<template>
  <section class="htmleaf-container">
    <div class="search-wrapper" :class="{'active':isActive}">
      <div class="input-holder">
        <input
          type="text"
          class="search-input"
          :placeholder="placeholder"
          v-model="content"
          @keyup.enter="searchToggle"
        >
        <button class="search-icon" @click="searchToggle">
          <span></span>
        </button>
      </div>
    </div>
    <ou-spinner v-if="isWaitting" label="Loading..." type="large"/>
  </section>
</template>
<script>
import tools from "@/util/tools.js";
export default {
  props: {
    placeholder: { default: "Type to search" },
    selected: { default: null }
  },
  model: {
    prop: "selected",
    event: "change"
  },
  data() {
    return {
      isActive: false,
      content: "",
      isWaitting: false
    };
  },
  methods: {
    searchToggle() {
      if (this.isActive && this.content != "") {
        this.isWaitting = true;
        let data = { search: this.content };
        tools.easyfetch(tools.Api.HyperSearch, data).then(res => {
          this.isWaitting = false;
          this.$Loading.finish();
          this.$emit("change", res.data);
        });
      }
      this.isActive = !this.isActive;
    }
  }
};
</script>
<style>
.htmleaf-container {
  margin-bottom: 60px;
}
.input-holder {
  margin-left: auto;
  margin-right: auto;
}
.search-wrapper {
  position: relative;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  top: 50px;
  left: 50%;
  margin-bottom: 50px;
}
.search-wrapper .input-holder {
  overflow: hidden;
  height: 70px;
  background: rgba(255, 255, 255, 0);
  border-radius: 6px;
  position: relative;
  width: 70px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.search-wrapper.active .input-holder {
  border-radius: 50px;
  width: 450px;
  background: rgba(0, 0, 0, 0.5);
  -webkit-transition: all 0.5s cubic-bezier(0, 0.105, 0.035, 1.57);
  -moz-transition: all 0.5s cubic-bezier(0, 0.105, 0.035, 1.57);
  transition: all 0.5s cubic-bezier(0, 0.105, 0.035, 1.57);
}

.search-wrapper .input-holder .search-input {
  width: 100%;
  height: 50px;
  padding: 0px 70px 0 20px;
  opacity: 0;
  position: relative;
  top: 0px;
  left: 0px;
  background: transparent;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: none;
  outline: none;
  font-family: "Open Sans", Arial, Verdana;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: #fff;
  -webkit-transform: translate(0, 60px);
  -moz-transform: translate(0, 60px);
  transform: translate(0, 60px);
  -webkit-transition: all 0.3s cubic-bezier(0, 0.105, 0.035, 1.57);
  -moz-transition: all 0.3s cubic-bezier(0, 0.105, 0.035, 1.57);
  transition: all 0.3s cubic-bezier(0, 0.105, 0.035, 1.57);

  -webkit-transition-delay: 0.3s;
  -moz-transition-delay: 0.3s;
  transition-delay: 0.3s;
}
.search-wrapper.active .input-holder .search-input {
  opacity: 1;
  -webkit-transform: translate(0, 10px);
  -moz-transform: translate(0, 10px);
  transform: translate(0, 10px);
}

.search-wrapper .input-holder .search-icon {
  top: -50px;
  width: 70px;
  height: 70px;
  border: none;
  border-radius: 6px;
  background: #fff;
  padding: 0px;
  outline: none;
  position: relative;
  z-index: 2;
  float: right;
  cursor: pointer;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.search-wrapper.active .input-holder .search-icon {
  width: 50px;
  height: 50px;
  margin: 10px;
  border-radius: 30px;
}
.search-wrapper .input-holder .search-icon span {
  width: 22px;
  height: 22px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transition: all 0.4s cubic-bezier(0.65, -0.6, 0.24, 1.65);
  -moz-transition: all 0.4s cubic-bezier(0.65, -0.6, 0.24, 1.65);
  transition: all 0.4s cubic-bezier(0.65, -0.6, 0.24, 1.65);
}
.search-wrapper.active .input-holder .search-icon span {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.search-wrapper .input-holder .search-icon span::before,
.search-wrapper .input-holder .search-icon span::after {
  position: absolute;
  content: "";
}
.search-wrapper .input-holder .search-icon span::before {
  width: 4px;
  height: 11px;
  left: 8px;
  top: 18px;
  border-radius: 2px;
  background: #974be0;
}
.search-wrapper .input-holder .search-icon span::after {
  width: 18px;
  height: 18px;
  left: 0px;
  top: 0px;
  border-radius: 16px;
  border: 4px solid #974be0;
}

@media screen and (max-width: 560px) {
  .search-wrapper.active .input-holder {
    width: 200px;
  }
}
</style>


