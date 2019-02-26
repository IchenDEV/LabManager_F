<template>
  <div>
    <div class="flex-panel">
      <Card>
        <div>
          <h2>{{$t('message.device')}} {{item.id}}</h2>
          <p>{{$t('message.name')}} {{item.name}}</p>
          <p>{{$t('message.No')}} {{item.No}}</p>
          <p>{{$t('message.band')}} {{item.band}}</p>
          <p>{{$t('message.description')}} {{item.description}}</p>
          <p>{{$t('message.model')}} {{item.model}}</p>
          <p>{{$t('message.lab')}} {{item.locationName}}</p>
          <p>{{item.locationDescription}}</p>
          <p>{{$t('message.address')}} {{item.locationAddress}}</p>
        </div>
        <h3>{{$t('message.scheduledTime')}}</h3>
        <ul>
          <a
            v-for="(item,index) in bookInfo.list"
            :key="index"
            @click="openModel(item.applicant,item.applicantNickname)"
          >
            <Tooltip
              :content="stringCat(item.applicantNickname,item.projectName,item.updateTime) "
            >{{item.beginTime}} ~ {{item.endTime}}</Tooltip>
          </a>
        </ul>
      </Card>
      <Card>
        <div>
          <h2>{{$t('message.appointment')}}</h2>
          <project-selector isWorking="true" v-model="p" label="项目"></project-selector>
          <span>
            <ui-datepicker icon="events" floating-label v-model="beginDate">开始日期</ui-datepicker>
            <TimePicker
              class="timepick"
              style="display:block"
              type="time"
              placeholder="Select time"
              v-model="beginTime"
            ></TimePicker>
          </span>
          <span style="margin-buttom:20px;">
            <ui-datepicker icon="events" floating-label v-model="endDate">结束日期</ui-datepicker>
            <TimePicker
              style="display:block"
              class="timepick"
              type="time"
              placeholder="Select time"
              v-model="endTime"
            ></TimePicker>
          </span>
          <ui-button
            color="primary"
            icon="adjust"
            @click="bookClick"
            :loading="iswaitting"
            :disabled="!canOrder"
          >{{$t('message.appointment')}}</ui-button>
        </div>
      </Card>
    </div>
    <ui-modal ref="sendMsg" :title="$t('message.sendMsg')">
      <send-msg @send="closeModel" :quickid="quickid" :quickname="quickname"></send-msg>
    </ui-modal>
  </div>
</template>
<script>
import fetch from "@/util/fetch.js";
import tools from "@/util/tools.js";
import projectSelector from "@/components/Project/ProjectSelector";
import SendMsg from "@/components/Msg/SendMsg";
export default {
  components: { projectSelector, SendMsg },
  data() {
    return {
      search: { device: this.$route.params.id, pageRow: 10, offSet: 0 },
      search2: { id: this.$route.params.id, pageRow: 1, offSet: 0 },
      bookInfo: {},
      item: {},
      beginDate: null,
      endDate: null,
      beginTime: null,
      endTime: null,
      con: {
        project: 3,
        applicant: this.$store.state.currentUser.id,
        device: this.$route.params.id,
        beginTime: null,
        endTime: null,
        status: 1
      },
      quickid: 0,
      quickname: null,
      iswaitting: false,
      p: null
    };
  },
  computed: {
    canOrder() {
      if (
        this.p != null &&
        this.beginTime != null &&
        this.endDate != null &&
        this.endDate != null &&
        this.endTime != null
      ) {
        if (this.beginDate <= this.endDate) {
          if (this.beginTime < this.endTime) {
            return true;
          }
        }
      }
      return false;
    }
  },
  methods: {
    closeModel() {
      this.$refs["sendMsg"].close();
    },
    openModel(a, b) {
      this.quickid = a;
      this.quickname = b;
      this.$refs["sendMsg"].open();
    },

    getDeviceBookInfo() {
      fetch({
        method: "Post",
        url: this.$store.state.host + "/book/list",
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.bookInfo = res.data.info;
        })
        .catch();
    },
    getDeviceInfo() {
      fetch({
        method: "Post",
        url: this.$store.state.host + "/device/list",
        data: JSON.stringify(this.search2)
      })
        .then(res => {
          this.item = res.data.info.list[0];
        })
        .catch();
    },
    bookClick() {
      this.con.project = this.p.id;
      this.con.beginTime = tools.timeBuilder(this.beginDate, this.beginTime);
      this.con.endTime = tools.timeBuilder(this.endDate, this.endTime);
      fetch({
        method: "Post",
        url: this.$store.state.host + "/book/addBook",
        data: JSON.stringify(this.con)
      })
        .then()
        .catch();
    },
    stringCat(a, b, c) {
      return a + " " + b + " " + c;
    }
  },
  mounted() {
    this.getDeviceBookInfo();
    this.getDeviceInfo();
  }
};
</script>
