<template>
  <div class="flex-panel">
    <Card>
      <div>
        <h2>设备 {{item.id}}</h2>
        <p>名称 {{item.name}}</p>
        <p>编号 {{item.No}}</p>
        <p>品牌 {{item.band}}</p>
        <p>描述 {{item.description}}</p>
        <p>型号 {{item.model}}</p>
        <p>位置 {{item.locationName}}</p>
        <p>{{item.locationDescription}}</p>
        <p>地址 {{item.locationAddress}}</p>
      </div>
      <h3>已预定的时间</h3>
      <ul>
        <li v-for="(item,index) in bookInfo.list" :key="index">
          {{item.beginTime}} ~ {{item.endTime}}
        </li>
      </ul>
    </Card>
    <Card>
      <div>
        <h2>预约</h2>
        <project-selector v-model="p" label="项目"></project-selector>
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
        <ui-button color="primary" icon="adjust" @click="bookClick" :loading="iswaitting">预定</ui-button>
      </div>
    </Card>
  </div>
</template>
<script>
import fetch from "@/util/fetch.js";
import projectSelector from '@/components/Project/ProjectSelector'
export default {
  components: {projectSelector},
  data() {
    return {
      search: { device: this.$route.params.id, pageRow: 10, offSet: 0 },
      search2: { id: this.$route.params.id, pageRow: 1, offSet: 0 },
      bookInfo:{},
      item: {},
      beginDate:null,
      endDate:null,
      beginTime:null,
      endTime:null,
      con: {
        project: 3,
        applicant: this.$store.state.currentUser.id,
        device:this.$route.params.id,
        beginTime: null,
        endTime: null,
        status: 1
      },
      iswaitting: false,
      p: {}
    };
  },
  methods: {
    getDeviceBookInfo() {
      for (var key in this.search) {
        if (this.search[key] === null || this.search[key] === "") {
          delete this.search[key];
        }
      }
      fetch({
        method: "Post",
        url: this.$store.state.host + "/book/list",
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.bookInfo = res.data.info
          })
        .catch();
    },
    getDeviceInfo() {
      for (var key in this.search2) {
        if (this.search2[key] === null || this.search2[key] === "") {
          delete this.search2[key];
        }
      }
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
    bookClick(){
      this.con.project=this.p.id
      this.con.beginTime=this.beginDate.getFullYear()+'-'+(new Number(this.beginDate.getMonth())+1)+ '-'+this.beginDate.getDate()+' '+this.beginTime
      this.con.endTime=this.endDate.getFullYear()+'-'+(new Number(this.endDate.getMonth())+1)+ '-'+this.endDate.getDate()+' '+this.endTime
      fetch({
        method: "Post",
        url: this.$store.state.host + "/book/addBook",
        data: JSON.stringify(this.con)
      })
        .then()
        .catch();
    }
  },
  mounted() {
    this.getDeviceBookInfo();
    this.getDeviceInfo();
  }
};
</script>
