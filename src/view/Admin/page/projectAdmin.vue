<template>
  <div>
    <Card>
      <h2>修改项目信息</h2>
      <Tag color="success" v-if="item.status===1">进行中</Tag>
      <Tag color="error" v-if="item.status===0">完成</Tag>
      <Tag color="warning" v-if="item.status===3">暂停</Tag>
      <div class="flex-panel">
        <ui-textbox icon="phone" floating-label label="名称" v-model="item.name"></ui-textbox>
        <ui-textbox icon="phone" floating-label label="描述" v-model="item.description"></ui-textbox>
      </div>
      <ui-button
        color="primary"
        v-if="item.status===1"
        icon="update"
        @click="setStatusClick(0)"
        :loading="iswaitting"
      >完成</ui-button>
      <ui-button
        color="primary"
        v-if="item.status===3"
        icon="update"
        @click="setStatusClick(1)"
        :loading="iswaitting"
      >重启</ui-button>
      <ui-button
        color="primary"
        v-if="item.status===1"
        icon="update"
        @click="setStatusClick(3)"
        :loading="iswaitting"
      >暂停</ui-button>
      <ui-button color="primary" icon="update" @click="updateClick" :loading="iswaitting">更新</ui-button>
    </Card>
  </div>
</template>
<script>
import fetch from "@/util/fetch.js";
export default {
  data() {
    return {
      search: { id: this.$route.params.id, pageRow: 1 },
      item: {},
      userInfo: {},
      projectInfo: {},
      s: {},
      p: {},
      iswaitting: false
    };
  },
  methods: {
    getInfo() {
      for (var key in this.search) {
        if (this.search[key] === null || this.search[key] === "") {
          delete this.search[key];
        }
      }
      fetch({
        method: "Post",
        url: this.$store.state.host + "/project/list",
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.item = res.data.info.list[0];
        })
        .catch();
    },
    updateClick() {
      this.iswaitting = true;
      fetch({
        method: "Post",
        url: this.$store.state.host + "/project/updateProject",
        data: JSON.stringify(this.item)
      })
        .then((this.iswaitting = false))
        .catch();
    },
    setStatusClick(st) {
      this.item.status = st;
      this.updateClick();
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>
