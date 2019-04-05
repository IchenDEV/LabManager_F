<template>
  <div>
    <table class="table">
      <ou-spinner v-if="books.list==null||books.list==''" label="Loading..." type="large"/>
      <tr v-for="(item,index) in books.list" :key="index">
        <th>
          <router-link :to=" '../../device/'+item.device">{{item.deviceName}}</router-link>
        </th>
        <th>
          <router-link :to=" '../../project/'+item.project">{{item.projectName}}</router-link>
        </th>
        <th>
          <Badge v-if="item.status==1" status="warning"/>
        </th>
        <th>
          <ou-button type="primary" v-if="item.status==0" @click="use(item.id)">USE</ou-button>
          <ou-button type="primary" v-if="item.status==1" @click="done(item.id)">Done</ou-button>
        </th>
        <th>
          <Tag :color="statusc(item)">{{status(item)}}</Tag>
        </th>
        <th>
          <Time :time="item.beginTime" :interval="1"/>
        </th>
        <th>
          <Time :time="item.endTime" :interval="1"/>
        </th>
      </tr>
    </table>
    <Page
      size="small"
      v-if="books.totalPage>1"
      :total="totalPage"
      :page-size="conp.pageRow"
      show-elevator
      @on-change="onPageChange"
    />
    <ui-fab icon="refresh" class="fab" tooltip-position="right" @click="getInfo"></ui-fab>
    <ui-modal ref="QRAmodal" title="扫一扫">
      <QRScanner v-if="QRA" @recived="QrRecivedUse"/>
    </ui-modal>
    <ui-modal ref="QRBmodal" title="扫一扫">
      <QRScanner v-if="QRB" @recived="QrRecivedDone"/>
    </ui-modal>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
import QRScanner from "@/components/QRScanner/QRScanner";
export default {
  components: { QRScanner },
  data() {
    return {
      books: {},
      QRA: false,
      QRB: false,
      selectBook: {},
      totalPage: 0,
      conp: {
        pageRow: 10,
        pageNum: 0,
        applicant: this.$store.state.currentUser.id
      }
    };
  },
  /* eslint-disable */

  methods: {
    status(item) {
      if (new Date(item.beginTime) < new Date()) {
        if (new Date(item.endTime) > new Date()) {
          return "进行中";
        } else {
          return "已结束";
        }
      }
      return "即将开始";
    },
    statusc(item) {
      if (new Date(item.beginTime) < new Date()) {
        if (new Date(item.endTime) > new Date()) {
          return "success";
        } else {
          return "error";
        }
      }
      return "warning";
    },
    QrRecivedUse(data) {
      this.QRA = false;
      if (this.selectBook.id == data) {
        let s1 = { id: data };
        tools.easyfetch(tools.Api.UseBook, s1).then(() => {
          this.$refs["QRAmodal"].close();
          this.getInfo();
        });
      }
    },
    QrRecivedDone(data) {
      this.QRB = false;
      if (this.selectBook.id == data) {
        let s1 = { id: data };
        tools.easyfetch(tools.Api.FinishBook, s1).then(() => {
          this.$refs["QRBmodal"].close();
          this.getInfo();
        });
      }
    },
    getInfo() {
      tools.easyfetch(tools.Api.ListBook, this.conp).then(res => {
        this.books = res.data.info;
        this.totalPage = res.data.info.totalCount;
      });
    },
    onPageChange(page) {
      this.conp.pageNum = page;
      this.getInfo();
    },
    use(id) {
      this.selectBook.id = id;
      this.QRA = true;
      this.$refs["QRAmodal"].open();
    },
    done(id) {
      this.QRB = true;
      this.selectBook.id = id;
      this.$refs["QRBmodal"].open();
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
