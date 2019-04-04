<template>
  <div>
    <ou-list style="text-align:left;">
      <ou-list-item
        v-for="(item,index) in msgs.list"
        :key="index"
        isSelectable
        :primaryText="item.title"
        :secondaryText="item.authorNickName"
        :tertiaryText="item.summary"
        :metaText="item.createTime"
      >
        <ou-list-actions>
          <ou-list-action-item icon="Read" @click="msgcli(item.id,index)"></ou-list-action-item>
          <ou-list-action-item icon="Delete" v-if="admin" @click="del(item.id)"></ou-list-action-item>
          <ou-list-action-item icon="Edit" v-if="admin" @click="modifyClicked(item.id)"></ou-list-action-item>
        </ou-list-actions>
      </ou-list-item>
    </ou-list>
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
      <ou-spinner v-if="isWaitting" label="Loading..." type="large"/>
    </ui-modal>
    <ou-panel title="修改" size="xl" v-model="showPanel">
      <span class="ms-font-m">
        <announcement-editor ref="aeList"/>
      </span>
    </ou-panel>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
import announcementEditor from "@/components/announcement/announcementEditor";
export default {
  components: { announcementEditor },
  props: { admin: { default: false } },
  data() {
    return {
      msgs: {},
      selectedItem: { id: 0 },
      showPanel: false,
      selectMsg: {},
      totalPage: 0,
      conp: {
        pageRow: 10,
        pageNum: 0
      },
      isWaitting: true
    };
  },
  methods: {
    modifyClicked(item) {
      this.showPanel = true;
      this.$refs.aeList.getAnnouncement(item);
    },
    getInfo() {
      tools.easyfetch(tools.Api.ListAnnouncement, this.conp).then(res => {
        this.msgs = res.data.info;
        this.totalPage = res.data.info.totalCount;
      });
    },
    getAnnouncement(id) {
      let da = { id: id, pageRow: 10, pageNum: 0 };
      this.isWaitting = true;
      tools.easyfetch(tools.Api.GetAnnouncement, da).then(res => {
        document.getElementById("model").innerHTML = res.data.info.msg;
        this.isWaitting = false;
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