<template>
<div>
      <table class="table">
        <tr v-for="(item,index) in msgs.list" :key="index">
          <th>{{item.authorNickName}}</th>
          <a @click="msgcli(item.id,index)">{{item.title}}</a>
          <th >{{item.summary}}</th>
          <th>{{item.createTime}}</th>
          <a v-if="$store.state.isAdmin" @click="del(item.id)">X</a>
        </tr>
      </table>
    <Page
      size="small"
      v-if="msgs.totalPage>1"
      :total="totalPage"
      :page-size="conp.pageRow"
      show-elevator
      @on-change="onPageChange"
    />
    <ui-modal  ref="msgmodal" :title="selectMsg.title">
      <div id="modelAN">
      </div>
      </ui-modal>
</div>
</template>
<script>
import fetch from "@/util/fetch.js";
export default {
  data() {
    return {
      msgs: {},
      selectMsg: {},
      totalPage: 0,
      conp: {
        pageRow: 10,
        pageNum: 0
      }
    };
  },
  methods: {
    getInfo() {
      fetch({
        method: "Post",
        url: this.$store.state.host + "/announcement/list",
        data: JSON.stringify(this.conp)
      })
        .then(res => {
          this.msgs = res.data.info;
          this.totalPage = res.data.info.totalCount;
          this.$store.commit("onDataReached", res.data,this); 
        })
        .catch();
    },
    getAnnouncement(id) {
      let da = { id: id ,pageRow: 10,pageNum: 0};
      fetch({
        method: "Post",
        url: this.$store.state.host + "/announcement/get",
        data: JSON.stringify(da)
      })
        .then(res => {
          //this.selectMsg = res.data.info;
          document.getElementById("modelAN").innerHTML= res.data.info.msg;
          this.$store.commit("onDataReached", res.data,this); 
        })
        .catch();
    },
    onPageChange(page) {
      this.conp.pageNum = page;
      this.getInfo();
    },
    msgcli(id, index) {
      this.selectMsg = this.msgs.list[index];
      this.getAnnouncement(id)
      this.$refs["msgmodal"].open();  
    },
    del(id){
      let da = { id: id };
      fetch({
        method: "Post",
        url: this.$store.state.host + "/announcement/deleteAnnouncement",
        data: JSON.stringify(da)
      })
        .then(res => {
          this.getInfo();
          this.$store.commit("onDataReached", res.data,this); 
        })
        .catch();
    }
  },
  mounted() {
    if (this.$store.state.hasSingin === true) {
      this.getInfo();
    }
  }
};
</script>
<style>
.table {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.fab {
  position: absolute;
  right: 10px;
  bottom: 0px;
}
</style>