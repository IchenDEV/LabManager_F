<template>
  <div>
    <Card :bordered="false" >
    <h1>{{$t('message.device')}} {{$t('message.list')}}</h1> 
    <div class="flex-panel">
      <ui-textbox icon="person" floating-label :label="$t('message.name')" v-model="search.name"></ui-textbox>
      <ui-textbox icon="person" floating-label :label="$t('message.No')" v-model="search.No"></ui-textbox>
      <ui-textbox icon="person" floating-label :label="$t('message.model')" v-model="search.model"></ui-textbox>
      <ui-textbox icon="person" floating-label :label="$t('message.band')" v-model="search.bands"></ui-textbox>
      <ui-textbox icon="person" floating-label :label="$t('message.requireReputation')" v-model="search.requireReputation"></ui-textbox>
      <ui-textbox icon="person" floating-label :label="$t('message.func')" v-model="search.func"></ui-textbox>
      <ui-select
        has-search
        :label="$t('message.lab')"
        placeholder="All"
        type="image"
        :options="labInfo.list"
        :keys="{ label: 'name', value: 'id' }"
        v-model="search.device"
      ></ui-select>
    </div>
    <ui-button color="primary" icon="search" @click="searchClicked">{{$t('message.search')}}</ui-button>
    </Card>
    <div class="flex-panel">
      <Card :bordered="false"  v-for="(item,index) in info.list" :key="index">
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
          <p>{{$t('message.No')}} {{item.No}}</p>
          <p>{{$t('message.band')}} {{item.bands}}</p>
          <p>{{$t('message.description')}} {{item.description}}</p>
          <p>{{$t('message.model')}} {{item.model}}</p>
          <p>{{$t('message.lab')}} {{item.locationName}}</p>
         
          <p>{{item.locationDescription}}</p>
          <p>{{$t('message.address')}} {{item.locationAddress}}</p>
          <ui-button
            v-if="!admin&&item.status===1"
            color="primary"
            icon="book"
            @click="bookClicked(item.id)"
          >{{$t('message.appointment')}}</ui-button>
          <ui-button
            v-if="admin"
            color="primary"
            icon="delete"
            @click="modifyClicked(item.id)"
          >{{$t('message.modify')}}</ui-button>
          <ui-button
            v-if="admin"
            color="primary"
            icon="delete"
            @click="delClicked(item.id,index)"
          >{{$t('message.delete')}}</ui-button>
        </div>
      </Card>
      <Card :bordered="false"  v-if="info.totalCount===0">
        <div>{{$t('message.findless')}}{{$t('message.device')}}</div>
      </Card>
    </div>
    <Page
      size="small"
      v-if="info.totalPage>1"
      :total="info.totalCount"
      :page-size="search.pageRow"
      show-elevator
      @on-change="onPageChange"
    />
  </div>
</template>
<script>
import router from "@/router";
import tools from "@/util/tools.js";
export default {
  props: { admin: { default: false } },
  data() {
    return {
      labInfo: { list: [] },
      info: {},
      search: {
        model: "",
        band: "",
        name: "",
        No: "",
        requireReputation:"",
        device: -1,
        pageRow: 10,
        pageNum: 1
      }
    };
  },
  methods: {
    bookClicked(i) {
      router.push("device/" + i);
    },
    getInfo() {
      tools.easyfetch(tools.Api.ListDevice,this.search)
        .then(res => {
          this.info = res.data.info;
        })
        .catch();
    },
    getLabInfo() {
      let conp = { pageRow: 100, offSet: 0 }
      tools.easyfetch(tools.Api.ListLab,conp)
        .then(res => {
          this.labInfo = res.data.info;
          var temp = { name: "All", id: -1 };
          this.labInfo.list.splice(0, 0, temp);
        })
        .catch();
    },
    searchClicked() {
      if (this.search.device.id < 0) {
        delete this.search.location;
      } else {
        this.search.location = this.search.device.id;
      }
      this.getDeviceInfo();
    },
    onPageChange(page) {
      this.search.pageNum = page;
      this.getDeviceInfo();
    },
    delClicked(id, index) {
      let da = { id: id };
      this.info.list.splice(index, 1);
      tools.easyfetch(tools.Api.DelDevice,da).then()
    }
  },
  mounted() {
    if (this.$store.state.hasSingin === true) {
      this.getInfo();
      this.getLabInfo();
    }
  }
};
</script>
