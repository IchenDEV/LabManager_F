<template>
  <div>
  </div>
</template>
<script>
import fetch from "@/util/fetch.js";
export default {
  data() {
    return {
      iswaitting: false,
      rate:''
    };
  },
  methods: {
    getInfo() {
      fetch({
        method: "Post",
        url: this.$store.state.host + "/analyse/totalUseRate",
        data: JSON.stringify('{}')
      })
        .then(res => {
           this.$store.commit("onDataReached", res.data,this);
           this.rate=res.data.info.totalUseRate
        })
        .catch();
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>