<template>
  <div>
    <h1>
      <ui-icon class="center" slot="icon" icon="whatshot"></ui-icon>
      {{$t('message.hot')}} {{$t('message.device')}} {{$t('message.list')}}
    </h1>
    <Card class="ms-depth-16" v-if="$store.state.isListMode">
      <ou-list style="text-align:left;">
        <ou-list-item
          v-for="(item,index) in info.list"
          :key="index"
          isSelectable
          :primaryText="item.id+' '+item.name+' '+item.NO"
          :secondaryText="item.model"
          :tertiaryText="item.description"
          :metaText="item.locationName"
        >
          <ou-list-actions>
            <span>
              <Tag color="success" v-if="item.status===1">{{$t('message.normal')}}</Tag>
              <Tag color="error" v-if="item.status===4">{{$t('message.error')}}</Tag>
              <Tag color="error" v-if="item.status===0">{{$t('message.scrap')}}</Tag>
              <Tag color="warning" v-if="item.status===3">{{$t('message.pause')}}</Tag>
              <Tag color="success">{{item.func}}</Tag>
            </span>
            <ou-list-action-item icon="Add" @click="bookClicked(item.id)"></ou-list-action-item>
          </ou-list-actions>
        </ou-list-item>
      </ou-list>
    </Card>
    <div v-else class="flex-panel">
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
    </div>
    <Card class="ms-depth-16" v-if="info.totalCount===0">
      <div>{{$t('message.findless')}}{{$t('message.device')}}</div>
    </Card>
    <ou-panel title="预约" size="xl" v-model="showPanel">
      <span class="ms-font-m">
        <book-the-device :device="panelDeviceId"/>
      </span>
    </ou-panel>
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

