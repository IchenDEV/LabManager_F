<template>
  <div>
    <div class="row-panel">
      <Card :class="{'modelCard':$store.state.modal}" :bordered="false">
         <project-selector
            isWorking="true"
            v-model="p"
            :label="$t('message.project')"
            :user="$store.state.currentUser.id"
          ></project-selector>
        <div class="flex-panel">
          <ui-textbox
            icon="info_outline"
            floating-label
            :label="$t('message.name')"
            v-model="search.name"
          ></ui-textbox>
          <ui-textbox
            icon="info_outline"
            floating-label
            :label="$t('message.No')"
            v-model="search.No"
          ></ui-textbox>
          <ui-textbox
            icon="info_outline"
            floating-label
            :label="$t('message.model')"
            v-model="search.model"
          ></ui-textbox>
          <ui-textbox
            icon="devices"
            floating-label
            :label="$t('message.band')"
            v-model="search.bands"
          ></ui-textbox>
          <ui-textbox
            icon="info_outline"
            floating-label
            :label="$t('message.requireReputation')"
            v-model="search.requireReputation"
          ></ui-textbox>
          <ui-textbox
            icon="info_outline"
            floating-label
            :label="$t('message.func')"
            v-model="search.func"
          ></ui-textbox>
        </div>
        <ui-button color="primary" icon="search" @click="searchClicked">{{$t('message.search')}}</ui-button>
        <ui-button color="primary" icon="delete" @click="listModeClicked">MODE</ui-button>
      </Card>
      <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeMonth" :markDateMore="markDay"></Calendar>
</div>
      <Card  :class="{'modelCard':$store.state.modal}" :bordered="false">
        <table>
          <tr v-for="(item,index) in info.list" :key="index">
            <th>
              <h2>{{item.id}}</h2>
              <Tag color="success" v-if="item.status===1">{{$t('message.normal')}}</Tag>
              <Tag color="error" v-if="item.status===4">{{$t('message.error')}}</Tag>
              <Tag color="error" v-if="item.status===0">{{$t('message.scrap')}}</Tag>
              <Tag color="warning" v-if="item.status===3">{{$t('message.pause')}}</Tag>
              <Tag color="success">{{item.func}}</Tag>
            </th>
            <th>{{item.name}}</th>
            <th>{{item.No}}</th>
            <th>{{item.bands}}</th>
            <th>{{item.description}}</th>
            <th>{{item.model}}</th>
            <th>{{item.locationName}}</th>
            <ui-button
              v-if="!admin&&item.status===1"
              color="primary"
              icon="book"
              @click="bookClicked(item.id)"
            >{{$t('message.appointment')}}</ui-button>
            <!--将修改前面的图标改为attach_file，更精确的有待寻找-->
            <ui-button
              v-if="admin"
              color="primary"
              icon="attach_file"
              @click="modifyClicked(item.id)"
            >{{$t('message.modify')}}</ui-button>
            <ui-button
              v-if="admin"
              color="primary"
              icon="delete"
              @click="delClicked(item.id,index)"
            >{{$t('message.delete')}}</ui-button>
          </tr>
        </table>
      </Card>
    
  </div>
</template>
<script>
import tools from "@/util/tools.js";
import Calendar from "vue-calendar-component";
import projectSelector from "@/components/project/projectSelector";
export default {
  components: { Calendar,projectSelector },
  data() {
    return {
      books: {},
      search: {
        pageRow: 10,
        beginTime: new Date(new Date().setDate(-7)),
        endTime: new Date(new Date().setDate(38))
      },
      iswaitting: false,
      user: null,
      project: null,
      markDay: [
        { date: "2019/4/1", className: "mark1" },
        { date: "2019/4/13", className: "mark2" }
      ],
      labInfo: { list: [] },
      info: {},
      listMode: true
    };
  },
  methods: {
    changeMonth(month) {
      this.search.beginTime = new Date(new Date(month).setDate(-7));
      this.search.endTime = new Date(new Date(month).setDate(38));
      this.getInfo();
    },
    getInfo() {
      /* eslint-disable */
      tools.easyfetch(tools.Api.ListBook, this.search).then(res => {
        this.books = res.data.info;
        this.markDay.splice(0, this.markDay.length);
        for (let item of this.books.list) {
          let begin = new Date(item.beginTime);
          console.log(begin);
          let end = new Date(item.endTime);
          for (let i = begin; i < end; i.setDate(i.getDate() + 1)) {
            let day =
              i.getFullYear() + "/" + (i.getMonth() + 1) + "/" + i.getDate();
            let times = 1;
            if (this.markDay.find(element => element.date == day) != null) {
              times = this.markDay.find(element => element.date == day).times++;
            }
            let obj = {};
            if (times < 5) {
              obj = { date: day, className: "free", times: times };
            } else if (times < 10) {
              obj = { date: day, className: "busy", times: times };
            } else {
              obj = { date: day, className: "superBusy", times: times };
            }

            this.markDay.push(obj);
          }
        }
      });
    },
    getDeviceInfo() {
      tools
        .easyfetch(tools.Api.ListDevice, this.search)
        .then(res => {
          this.info = res.data.info;
        })
        .catch();
    },
    searchClicked() {
      this.getInfo();
    },
    clickDay() {
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

