<template>
  <div>
    <Badge :count="msgs.unread"></Badge>
    <ou-toggle
      type="textLeft"
      v-model="showHasRead"
      on-label="On"
      off-label="Off"
      description="仅显示未读消息"
    />
    <ou-list>
      <ou-list-item
        v-for="(item,index) in msgs.list"
        :key="index"
        :is-unseen="item.hasRead==0"
        isSelectable
        :primaryText="item.msg"
        :tertiaryText="item.authorNickName"
        :metaText="item.createTime"
      >
        <ou-list-actions>
          <ou-list-action-item icon="Reply" @click="replyClicked(item)"></ou-list-action-item>
          <ou-list-action-item icon="Read" @click="msgcli(item.id,index)"></ou-list-action-item>
          <ou-list-action-item icon="Delete" @click="delClicked(item.id,index)"></ou-list-action-item>
        </ou-list-actions>
      </ou-list-item>
    </ou-list>
    <Page
      style="margin-bottom:50px;"
      size="small"
      v-if="msgs.totalPage>1"
      :total="totalPage"
      :page-size="conp.pageRow"
      show-elevator
      @on-change="onPageChange"
    />
    <ui-fab icon="refresh" class="fab" tooltip-position="right" @click="getInfo"></ui-fab>
    <ui-modal ref="msgmodal" :title="selectMsg.authorNickName">{{selectMsg.msg}}</ui-modal>
    <ui-modal ref="sendMsg" :title="$t('message.sendMsg')">
      <msg-sender :quickid="quickid" :quickname="quickname"/>
    </ui-modal>
  </div>
</template>
<script>
import msgSender from "@/components/msg/msgSender";
import tools from "@/util/tools.js";
export default {
  components: { msgSender },
  data() {
    return {
      msgs: {},
      selectMsg: {},
      totalPage: 0,
      conp: {
        pageRow: 10,
        pageNum: 0,
        receiver: this.$store.state.currentUser.id
      },
      quickid: 0,
      quickname: " ",
      showHasRead: false
    };
  },
  methods: {
    getInfo() {
      if (this.showHasRead == true) {
        this.conp.hasRead = 0;
      } else {
        this.conp.hasRead = "";
      }
      this.conp.receiver = this.$store.state.currentUser.id;
      tools.easyfetch(tools.Api.ListMsg, this.conp).then(res => {
        this.msgs = res.data.info;
        this.totalPage = res.data.info.totalCount;
      });
    },
    readMsg(id) {
      let cp = { id: id };
      tools.easyfetch(tools.Api.ReadMsg, cp).then(() => {
        this.getInfo();
      });
    },
    onPageChange(page) {
      this.conp.pageNum = page;
      this.getInfo();
    },
    msgcli(id, index) {
      this.$store.state.modal = true;
      if (this.msgs.list[index].hasRead == false) {
        this.msgs.list[index].hasRead = true;
        this.msgs.unread--;
        this.readMsg(id);
      }
      this.selectMsg = this.msgs.list[index];
      this.$refs["msgmodal"].open();
    },
    replyClicked(item) {
      this.quickid = item.author;
      this.quickname = item.authorNickName;
      this.$refs["sendMsg"].open();
    },
    delClicked(id, index) {
      this.msgs.list.splice(index, 1);
      let da = { id: id };
      tools
        .easyfetch(tools.Api.DelMsg, da)
        .then(() => {
          this.getInfo();
        })
        .catch();
    }
  },
  mounted() {
    if (this.$store.state.hasSingin === true) {
      this.getInfo();
    }
  },
  watch: {
    showHasRead() {
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
  min-height: 3rem;
}
.fab {
  position: absolute;
  right: 10px;
  bottom: 0px;
}
</style>
