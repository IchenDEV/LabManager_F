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
      counts:''
    };
  },
  methods: {
    getInfo() {
      fetch({
        method: "Post",
        url: this.$store.state.host + "/analyse/count",
        data: JSON.stringify('{}')
      })
        .then(res => {
           this.$store.commit("onDataReached", res.data,this);
           this.counts=res.data.info
        })
        .catch();
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>