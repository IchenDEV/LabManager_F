<template>
  <div>
    <h1>
      <ui-icon class="center" slot="icon" icon="whatshot"></ui-icon>
      {{$t('message.hot')}} {{$t('message.device')}} {{$t('message.list')}}
    </h1>
    <div class="flex-panel">
      <Card class="ms-depth-16 small-Card" v-for="(item,index) in info.list" :key="index">
        <div>
          <span>
            <h2>{{$t('message.device')}} {{item.id}}</h2>
            <Tag color="success" v-if="item.status===1">{{$t('message.normal')}}</Tag>
            <Tag color="error" v-if="item.status===4">{{$t('message.error')}}</Tag>
            <Tag color="error" v-if="item.status===0">{{$t('message.scrap')}}</Tag>
            <Tag color="warning" v-if="item.status===3">{{$t('message.pause')}}</Tag>
            <Tag color="success">{{item.func}}</Tag>
          </span>
          <p>{{$t('message.name')}} {{item.name}}</p>
          <p>{{$t('message.No')}} {{item.NO}}</p>
          <p>{{$t('message.lab')}} {{item.labName}}</p>
          <ui-button
            v-if="item.status==1"
            color="primary"
            icon="book"
            @click="bookClicked(item.id)"
          >{{$t('message.appointment')}}</ui-button>
        </div>
      </Card>
      <Card class="ms-depth-16" v-if="info.totalCount===0">
        <div>{{$t('message.findless')}}{{$t('message.device')}}</div>
      </Card>
      <ou-panel title="预约" size="lg" v-model="showPanel">
        <span class="ms-font-m">
          <book-the-device :device="panelDeviceId"/>
        </span>
      </ou-panel>
    </div>
  </div>
</template>
<script>
import bookTheDevice from "@/components/device/bookTheDevice";
import tools from "@/util/tools.js";
export default {
  components: { bookTheDevice },
  props: { admin: { default: false } },
  data() {
    return {
      info: {},
      panelDeviceId: "02",
      showPanel: false
    };
  },
  methods: {
    bookClicked(i) {
      this.panelDeviceId = i.toString();
      this.showPanel = true;
    },
    getDeviceInfo() {
      let da = {};
      tools
        .easyfetch(tools.Api.HotDevice, da)
        .then(res => {
          this.info = res.data.info;
        })
        .catch();
    }
  },
  mounted() {
    if (this.$store.state.hasSingin === true) {
      this.getDeviceInfo();
    }
  }
};
</script>
<style>
.small-Card {
  width: 80px !important;
  margin-left: 0.2rem !important;
  margin-right: 0.2rem !important;
}
</style>

