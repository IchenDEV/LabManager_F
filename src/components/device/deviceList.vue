<template>
  <div>
    <Card class="ms-depth-16" v-if="$store.state.isListMode">
      <ou-spinner v-if="info.list==null" label="Loading..." type="large"/>
      <ou-list style="text-align:left;">
        <ou-list-item
          v-for="(item,index) in info.list"
          :key="index"
          isSelectable
          :primaryText="item.id+' '+item.name+' '+item.No"
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
            <ou-list-action-item icon="Delete" v-if="admin" @click="delClicked(item.id,index)"></ou-list-action-item>
            <ou-list-action-item icon="Edit" v-if="admin" @click="modifyClicked(item.id)"></ou-list-action-item>
          </ou-list-actions>
        </ou-list-item>
      </ou-list>
    </Card>
    <div v-else class="flex-panel">
      <Card class="ms-depth-16" v-for="(item,index) in info.list" :key="index">
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
            icon="attach_file"
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
      <Card class="ms-depth-16" v-if="info.totalCount===0">
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
    <ou-panel title="预约" size="xl" v-model="showPanel">
      <span class="ms-font-m">
        <book-the-device :device="panelDeviceId"/>
      </span>
    </ou-panel>
  </div>
</template>
<script>
import router from "@/router";
import tools from "@/util/tools.js";
import bookTheDevice from "@/components/device/bookTheDevice";
export default {
  props: { admin: { default: false } },
  components: { bookTheDevice },
  data() {
    return {
      labInfo: { list: [] },
      info: {},
      search: {
        model: "",
        band: "",
        name: "",
        No: "",
        requireReputation: "",
        device: -1,
        pageRow: 10,
        pageNum: 1
      },
      listMode: false,
      showPanel: false,
      panelDeviceId: ""
    };
  },
  methods: {
    bookClicked(i) {
      this.panelDeviceId = i.toString();
      this.showPanel = true;
      //router.push("device/" + i);
    },
    getInfo() {
      tools
        .easyfetch(tools.Api.ListDevice, this.search)
        .then(res => {
          this.info = res.data.info;
        })
        .catch();
    },
    onPageChange(page) {
      this.search.pageNum = page;
      this.getInfo();
    },
    delClicked(id, index) {
      let da = { id: id };
      this.info.list.splice(index, 1);
      tools.easyfetch(tools.Api.DelDevice, da).then();
    },
    modifyClicked(id) {
      router.push("device/" + id.toString());
    }
  },
  mounted() {
    if (this.$store.state.hasSingin === true) {
      this.getInfo();
    }
  }
};
</script>
