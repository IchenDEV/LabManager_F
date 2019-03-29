<template>
  <div>
    <table class="table">
      <tr v-for="(item,index) in msgs.list" :key="index">
        <th><a @click="msgcli(item.id,index)">{{item.title}}</a></th>
        <th>{{item.summary}}</th>
        <th>{{item.authorNickName}}</th>
        <th>{{item.createTime}}</th>
        <th><a v-if="$store.state.isAdmin" @click="del(item.id)"> X</a></th>
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
    <ui-modal ref="msgmodal" :title="selectMsg.title" @close="modalClose">
      <div id="model"/>
    </ui-modal>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
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
      tools.easyfetch(tools.Api.ListAnnouncement, this.conp).then(res => {
        this.msgs = res.data.info;
        this.totalPage = res.data.info.totalCount;
      });
    },
    getAnnouncement(id) {
      let da = { id: id, pageRow: 10, pageNum: 0 };
      tools.easyfetch(tools.Api.GetAnnouncement, da).then(res => {
        document.getElementById("model").innerHTML = res.data.info.msg;
      });
    },
    onPageChange(page) {
      this.conp.pageNum = page;
      this.getInfo();
    },
    msgcli(id, index) {
      this.$store.state.modal = true;
      this.selectMsg = this.msgs.list[index];
      this.getAnnouncement(id);
      this.$refs["msgmodal"].open();
    },
    del(id) {
      let da = { id: id };
      tools.easyfetch(tools.Api.DelAnnouncement, da).then(() => {
        this.getInfo();
      });
    },
    modalClose() {
      this.$store.state.modal = false;
    }
  },
  mounted() {
      this.getInfo();
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