<template>
  <div style="padding-bottom: 50px;">
    <div class="flex-panel">
      <Card v-if="device!=0" class="ms-depth-16" style="text-align: center">
        <div>
          <h2>{{$t('message.device')}} {{item.id}}</h2>
          <p>{{$t('message.name')}} {{item.name}}</p>
          <p>{{$t('message.No')}} {{item.No}}</p>
          <p>{{$t('message.band')}} {{item.bands}}</p>
          <p>{{$t('message.description')}} {{item.description}}</p>
          <p>{{$t('message.model')}} {{item.model}}</p>
          <p>
            {{$t('message.lab')}}
            <router-link :to=" '../../lab/'+item.location">{{item.locationName}}</router-link>
          </p>
          <p>{{item.locationDescription}}</p>
          <p>{{$t('message.address')}} {{item.locationAddress}}</p>
          <p>{{$t('message.useRate')}} {{useRate}} %</p>
        </div>
        <h3>{{$t('message.scheduledTime')}}</h3>
        <Timeline>
          <TimelineItem v-for="(item,index) in bookInfo.list" :key="index">
            <p>
              <ou-callout type="OOBE" title="预约信息">
                <div slot="content" class="flex-panel">
                  <span>
                    <ou-button @click="openModel(item.applicant,item.applicantNickname)">
                      <i class="ms-Icon ms-Icon--AccountManagement" aria-hidden="true"></i>
                      {{item.applicantNickname}}
                    </ou-button>
                  </span>
                  <span>
                    <ou-button @click="projectClicked(item.project)">
                      <i class="ms-Icon ms-Icon--EMI" aria-hidden="true"></i>
                      {{item.projectName}}
                    </ou-button>
                  </span>
                  <span>
                    <ou-button>
                      <i class="ms-Icon ms-Icon--DateTime" aria-hidden="true"></i>
                      {{item.updateTime}}
                    </ou-button>
                  </span>
                </div>
                <a>
                  <Tooltip
                    :content="stringCat(item.applicantNickname,item.projectName,item.updateTime) "
                  >{{item.beginTime}} ~ {{item.endTime}}</Tooltip>
                </a>
              </ou-callout>
            </p>
          </TimelineItem>
        </Timeline>
      </Card>
      <Card class="ms-depth-16">
        <full-calendar
          defaultView="month"
          :events="fcEvents"
          @view-render="changeMonth"
          @event-selected="eventSelected"
          @event-drop="eventDrop"
          locale="zh"
          :config="config"
          @day-click="clickDay"
        ></full-calendar>
      </Card>
      <Card class="ms-depth-16">
        <monthly-rate v-if="device!='0'" :device="device"/>
      </Card>
      <Card class="ms-depth-16" style="text-align: center;">
        <div>
          <h2>{{$t('message.appointment')}}</h2>
          <project-selector
            v-if="$store.state.currentUser.id"
            isWorking="true"
            v-model="p"
            :label="$t('message.project')"
            :user="$store.state.currentUser.id"
          ></project-selector>
          <span>
            <ui-datepicker
              icon="events"
              floating-label
              v-model="beginDate"
            >{{$t('message.beginDate')}}</ui-datepicker>
            <TimePicker
              class="timepick"
              style="display:block"
              type="time"
              placeholder="Select time"
              v-model="beginTime"
            ></TimePicker>
          </span>
          <span style="margin-buttom:20px;">
            <ui-datepicker icon="events" floating-label v-model="endDate">{{$t('message.endDate')}}</ui-datepicker>
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
            :disabled="!canOrder"
          >{{$t('message.appointment')}}</ui-button>
        </div>
      </Card>
    </div>
    <ui-modal ref="sendMsg" :title="$t('message.sendMsg')" @close="modalClose">
      <msg-sender @send="closeModel" :quickid="quickid" :quickname="quickname"/>
    </ui-modal>
  </div>
</template>
<script>
import router from "@/router";
import tools from "@/util/tools.js";
import projectSelector from "@/components/project/projectSelector";
import monthlyRate from "@/components/statistics/monthlyRate";
import { FullCalendar } from "vue-full-calendar";
import "fullcalendar/dist/fullcalendar.css";
import msgSender from "@/components/msg/msgSender";
export default {
  props: { device: { default: "0" } },
  components: { projectSelector, msgSender, monthlyRate, FullCalendar },
  data() {
    return {
      search: { device: this.device },
      search2: { id: this.device, pageRow: 1, offSet: 0 },
      bookInfo: {},
      item: { id: "2" },
      beginDate: null,
      endDate: null,
      beginTime: null,
      endTime: null,
      con: {
        project: 3,
        applicant: this.$store.state.currentUser.id,
        device: this.device,
        beginTime: null,
        endTime: null,
        status: 1
      },
      books: {},
      config: {
        locale: "zh-cn",
        height: "auto",
        editable: false
      },
      selectBook: {},
      project: null,
      fcEvents: [],
      quickid: 0,
      quickname: null,
      p: null
    };
  },
  computed: {
    mybook() {
      if (
        this.beginTime != null &&
        this.endDate != null &&
        this.endDate != null &&
        this.endTime != null
      ) {
        let begin = new Date(this.beginDate);
        let end = new Date(this.endDate);
        let obj = {
          end: end,
          start: begin,
          title: "(预览)" + this.item.id + "*" + this.item.name,
          classNames: ["free"],
          backgroundColor: tools.getRandomColor(),
          borderColor: "transparent",
          editable: true
        };
        return obj;
      }
      return null;
    },
    useRate() {
      if (this.item != null) {
        /* eslint-disable */
        var dt = new Date(this.item.createTime);
        return Number(
          (this.bookInfo.totalBookedTime /
            ((this.now.getTime() - dt.getTime()) / 1000)) *
            100
        ).toFixed(2);
      }
      return 0;
    },
    now() {
      return new Date();
    },
    canOrder() {
      if (this.item != null) {
        if (
          this.p != null &&
          this.beginTime != null &&
          this.endDate != null &&
          this.endDate != null &&
          this.endTime != null &&
          this.item.requireReputation <=
            this.$store.state.currentUser.reputation
        ) {
          if (Date(this.beginDate) <= Date(this.endDate)) {
            if (this.beginTime < this.endTime) {
              return true;
            }
          }
        }
      }
      return false;
    }
  },
  methods: {
    eventDrop(event) {
      console.log(event);
      this.beginDate = new Date(event.start);
      this.endDate = new Date(event.end);
    },
    eventSelected(event, jsEvent, view) {
      this.quickid = event.applicant;
      this.$store.state.modal = true;
      this.$refs["sendMsg"].open();
    },
    closeModel() {
      this.$store.state.modal = false;
      this.$refs["sendMsg"].close();
    },
    openModel(a, b) {
      this.quickid = a;
      this.quickname = b;
      this.$store.state.modal = true;
      this.$refs["sendMsg"].open();
    },
    getDeviceInfo() {
      tools.easyfetch(tools.Api.ListDevice, this.search2).then(res => {
        this.item = res.data.info.list[0];
        if (
          this.item.requireReputation > this.$store.state.currentUser.reputation
        ) {
          this.$Notice.warning({
            title: this.$t("message.requireReputationD")
          });
        }
      });
    },

    projectClicked(id) {
      router.push("../../project/" + id);
    },
    clickDay(dax) {
      var day = new Date(dax._d);
      day.setDate(day.getDate());
      this.search.beginTime = day;
      day.setMinutes(day.getMinutes());
      this.search.endTime = day;
      this.beginDate = day;
    },
    bookClick() {
      this.iswaitting = true;
      this.con.device = this.device;
      this.con.project = this.p.projectId;
      this.con.beginTime = tools.timeBuilder(this.beginDate, this.beginTime);
      this.con.endTime = tools.timeBuilder(this.endDate, this.endTime);
      tools.easyfetch(tools.Api.AddBook, this.con).then(() => {
        this.getBookInfo();
      });
    },
    stringCat(a, b, c) {
      return a + " " + b + " " + c;
    },
    modalClose() {
      this.$store.state.modal = false;
    },
    changeMonth(month) {
      this.search.beginTime = new Date(new Date(month.start).setDate(-64));
      this.search.endTime = new Date(new Date(month.start).setDate(64));
      this.getBookInfo();
    },
    getBookInfo() {
      this.fcEvents.splice(0, this.fcEvents.length - 1);
      tools.easyfetch(tools.Api.ListBook, this.search).then(res => {
        this.bookInfo = res.data.info;
        this.fcEvents.splice(0, this.fcEvents.length - 1);
        this.books = res.data.info;
        for (let item of this.books.list) {
          let begin = new Date(item.beginTime);
          let end = new Date(item.endTime);
          let obj = {
            applicant: item.applicant,
            applicantNickname: item.applicantNickname,
            end: end,
            start: begin,
            title: item.device + "*" + item.deviceName,
            classNames: ["free"],
            backgroundColor: tools.getRandomColor(),
            borderColor: "transparent"
          };
          this.fcEvents.push(obj);
        }
      });
    }
  },
  mounted() {
    this.getBookInfo();
    this.getDeviceInfo();
  },
  watch: {
    device() {
      this.search.device = this.device;
      this.search2.id = this.device;
      this.getBookInfo();
      this.getDeviceInfo();
    },
    canOrder() {
      if (this.mybook != null) {
        this.fcEvents.push(this.mybook);
      }
    }
  }
};
</script>
