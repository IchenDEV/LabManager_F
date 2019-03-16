<template>
  <div>
    <h1><ui-icon class="center" slot="icon" icon="whatshot"></ui-icon>{{$t('message.hot')}} {{$t('message.device')}} {{$t('message.list')}}</h1>
    <div class="flex-panel">
      <Card :class="{'modelCard':$store.state.modal}" :bordered="false"  v-for="(item,index) in info.list" :key="index" class="small-Card">
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
      <Card :class="{'modelCard':$store.state.modal}" :bordered="false"  v-if="info.totalCount===0">
        <div>{{$t('message.findless')}}{{$t('message.device')}}</div>
      </Card>
    </div>
  </div>
</template>
<script>
import router from "@/router";
import tools from "@/util/tools.js";
export default {
  props: { admin: { default: false } },
  data() {
    return {
      info: {}
    };
  },
  methods: {
    bookClicked(i) {
      router.push("device/" + i);
    },
    getDeviceInfo() {
      let da={}
      tools.easyfetch(tools.Api.HotDevice,da)
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
.small-Card{
min-width: 80px !important;
margin-left: 0.2rem !important;
margin-right: 0.2rem !important;
}
</style>

