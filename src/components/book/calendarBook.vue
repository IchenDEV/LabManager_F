<template>
  <div>
    <div class="flex-panel">
      <div style="width:50%">
        <Card>
            <ui-textbox
              icon="info_outline"
              floating-label
              :label="$t('message.name')"
              v-model="search.name"
            ></ui-textbox>
            <ui-textbox
              icon="info_outline"
              floating-label
              :label="$t('message.func')"
              v-model="search.func"
            ></ui-textbox>
             <ui-button color="primary" icon="search" @click="searchClicked">{{$t('message.search')}}</ui-button>
          </Card>
         
       <Card :class="{'modelCard':$store.state.modal}" v-if="info.list!=null">
        <table style="text-align:left;">
          <tr v-for="(item,index) in info.list" :key="index">
            <th>
              <h2>{{item.id}} {{item.name}}</h2>
              <ui-tooltip position="bottom">{{ item.No }}</ui-tooltip>
            </th>
            <th>
              <Tag color="success" v-if="item.status===1">{{$t('message.normal')}}</Tag>
              <Tag color="error" v-if="item.status===4">{{$t('message.error')}}</Tag>
              <Tag color="error" v-if="item.status===0">{{$t('message.scrap')}}</Tag>
              <Tag color="warning" v-if="item.status===3">{{$t('message.pause')}}</Tag>
            </th>
            <th>
              <Tag color="success">{{item.func}}</Tag>
            </th>
            <th>
              <ui-button
                v-if="item.status===1"
                color="primary"
                icon="book"
                @click="bookClicked(item)"
              >{{$t('message.appointment')}}</ui-button>
            </th>
          </tr>
        </table>
        <Page
          size="small"
          v-if="info.totalPage>1"
          :total="info.totalPage"
          :page-size="search.pageRow"
          show-elevator
          @on-change="onPageChange"
        />
      </Card>
      </div>
      <Card :class="{'modelCard':$store.state.modal}" style="width:40%">
        <full-calendar
          :events="fcEvents"
          @view-render="changeMonth"
          locale="zh"
          :config="config"
          @day-click="clickDay"
        ></full-calendar>
      </Card>
    </div>
    <ui-modal ref="bookitmodal" :title="selectBook.name">
      <p>{{selectBook.name}}</p>
      <p>{{selectBook.No}}</p>
      <p>{{selectBook.model}}</p>
      <p>{{selectBook.bands}}</p>
      <p>{{selectBook.description}}</p>
      <p>{{beginDate}}</p>
      <project-selector
        isWorking="true"
        v-model="p"
        :label="$t('message.project')"
        :user="$store.state.currentUser.id"
      ></project-selector>
      <TimePicker
        class="timepick"
        style="display:block"
        type="time"
        placeholder="Select time"
        v-model="beginTime"
      ></TimePicker>
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
      <ui-button @click="bookitClicked" color="primary" icon="book">{{$t('message.appointment')}}</ui-button>
    </ui-modal>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
import { FullCalendar } from "vue-full-calendar";
import "fullcalendar/dist/fullcalendar.css";
import projectSelector from "@/components/project/projectSelector";
import "fullcalendar/dist/locale/zh-cn";
export default {
  components: { FullCalendar, projectSelector },
  data() {
    return {
      books: {},
      config: {
        locale: "zh-cn",
        height: "auto",
        editable: false
      },
      beginDate: new Date(),
      endDate: new Date(),
      beginTime: new Date(),
      endTime: new Date(),
      search: {
        pageRow: 10,
        beginTime: new Date(new Date().setDate(-8)),
        endTime: new Date(new Date().setDate(38))
      },
      p: "",
      iswaitting: false,
      selectBook: {},
      project: null,
      fcEvents: [],
      info: {},
      day: 0,
      con: {
        project: 3,
        applicant: this.$store.state.currentUser.id,
        beginTime: null,
        endTime: null,
        status: 1
      }
    };
  },
  methods: {
    onPageChange(page) {
      this.search.pageNum = page;
      this.getInfo();
    },
    bookitClicked() {
      this.iswaitting = true;
      this.con.project = this.p.projectId;
      this.con.beginTime = tools.timeBuilder(this.beginDate, this.beginTime);
      this.con.endTime = tools.timeBuilder(this.endDate, this.endTime);
      this.con.device = this.selectBook.id;
      tools.easyfetch(tools.Api.AddBook, this.con).then(() => {
        this.iswaitting = false;
        this.$refs["bookitmodal"].close();
      });
    },
    bookClicked(item) {
      this.selectBook = item;
      this.$refs["bookitmodal"].open();
    },
    changeMonth(a, b, month) {
      this.search.beginTime = new Date(new Date(month).setDate(-7));
      this.search.endTime = new Date(new Date(month).setDate(38));
      this.getInfo();
    },
    getInfo() {
      /* eslint-disable */
      tools.easyfetch(tools.Api.ListBook, this.search).then(res => {
        this.books = res.data.info;
        this.fcEvents.splice(0, this.fcEvents.length);
        for (let item of this.books.list) {
          let begin = new Date(item.beginTime);
          let end = new Date(item.endTime);
          let obj = {
            end: end,
            start: begin,
            title: item.device + "*" + item.deviceName
          };
          this.fcEvents.push(obj);
        }
      });
    },
    getDeviceInfo() {
      tools.easyfetch(tools.Api.ListRecommendDevice, this.search).then(res => {
        this.info = res.data.info;
      });
    },
    searchClicked() {
      this.getInfo();
    },
    clickDay(dax) {
      console.log(dax);
      var day = new Date(dax._d);
      day.setDate(day.getDate());
      this.search.beginTime = day;
      day.setMinutes(day.getMinutes());
      this.search.endTime = day;
      this.beginDate = day;
      this.getDeviceInfo();
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>
<style>
.free {
  background-color: green;
  border-radius: 10px;
}
.busy {
  background-color: yellow;
  border-radius: 10px;
}
.superBusy {
  background-color: red;
  border-radius: 10px;
}
</style>

