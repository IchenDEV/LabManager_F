<template>
  <div>
    <h1>{{$t('message.appointment')}}</h1>
    <div class="flex-panel">
      <Card   >
        <div>
          <h2>{{$t('message.device')}} {{item.id}}</h2>
          <p>{{$t('message.name')}} {{item.name}}</p>
          <p>{{$t('message.No')}} {{item.No}}</p>
          <p>{{$t('message.band')}} {{item.bands}}</p>
          <p>{{$t('message.description')}} {{item.description}}</p>
          <p>{{$t('message.model')}} {{item.model}}</p>
          <p>{{$t('message.lab')}} {{item.locationName}}</p>
          <p>{{item.locationDescription}}</p>
          <p>{{$t('message.address')}} {{item.locationAddress}}</p>
          <p>{{$t('message.useRate')}} {{useRate}} %</p>
        </div>
        <h3>{{$t('message.scheduledTime')}}</h3>
        <Timeline>
          <TimelineItem v-for="(item,index) in bookInfo.list" :key="index">
            <p>
            <a @click="openModel(item.applicant,item.applicantNickname)">
              <Tooltip
                :content="stringCat(item.applicantNickname,item.projectName,item.updateTime) "
              >{{item.beginTime}} ~ {{item.endTime}}</Tooltip>
            </a>
            </p>
          </TimelineItem>
        </Timeline>
      </Card>
      <Card   >
        <div>
          <h2>{{$t('message.appointment')}}</h2>
          <project-selector
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
            :loading="iswaitting"
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
import tools from "@/util/tools.js";
import projectSelector from "@/components/project/projectSelector";
import msgSender from "@/components/msg/msgSender";
export default {
  props: { device: String },
  components: { projectSelector, msgSender },
  data() {
    return {
      search: { device: this.device, pageRow: 10, offSet: 0 },
      search2: { id: this.device, pageRow: 1, offSet: 0 },
      bookInfo: {},
      item: {},
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
      quickid: 0,
      quickname: null,
      iswaitting: false,
      p: null
    };
  },
  computed: {
    useRate() {
      /* eslint-disable */
      var dt = new Date(this.item.createTime)      
      return  Number((this.bookInfo.totalBookedTime/((this.now.getTime()-dt.getTime())/1000) )* 100).toFixed(2)
    },
    now(){
      return new Date
    },
    canOrder() {
      if (
        this.p != null &&
        this.beginTime != null &&
        this.endDate != null &&
        this.endDate != null &&
        this.endTime != null && this.item.requireReputation<=this.$store.state.currentUser.reputation
      ) {
        if (Date(this.beginDate) <= Date(this.endDate)) {
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
      this.$store.state.modal=false
      this.$refs["sendMsg"].close();
    },
    openModel(a, b) {
      this.quickid = a;
      this.quickname = b;
      this.$store.state.modal=true
      this.$refs["sendMsg"].open();
    },
    getDeviceBookInfo() {
      tools.easyfetch(tools.Api.ListBook,this.search)
        .then(res => {
          this.bookInfo = res.data.info;
        })
    },
    getDeviceInfo() {
      tools.easyfetch(tools.Api.ListDevice,this.search2)
      .then(res => {
          this.item = res.data.info.list[0];
          if(this.item.requireReputation>this.$store.state.currentUser.reputation){
            this.$Notice.warning({
              title: this.$t('message.requireReputationD')
            });
        }
        })
    },
    bookClick() {
      this.iswaitting=true
      this.con.project = this.p.projectId;
      this.con.beginTime = tools.timeBuilder(this.beginDate, this.beginTime);
      this.con.endTime = tools.timeBuilder(this.endDate, this.endTime);
      tools.easyfetch(tools.Api.AddBook,this.con)
        .then(()=>{ this.iswaitting=false})
    },
    stringCat(a, b, c) {
      return a + " " + b + " " + c;
    },
    modalClose(){
      this.$store.state.modal=false
    }
  },
  mounted() {
    this.getDeviceBookInfo();
    this.getDeviceInfo();
  }
};
</script>
