<template>
  <div>
    <Card class="ms-depth-16">
      <h2>{{$t('message.lab')}}{{item.id}}</h2>
      <div class="flex-panel">
        <ui-textbox disabled floating-label :label="$t('message.name')" v-model="item.name">
          <i class="ms-Icon ms-Icon--TestBeaker" aria-hidden="true"></i>
        </ui-textbox>
        <ui-textbox
          disabled
          floating-label
          :label="$t('message.description')"
          v-model="item.description"
        >
          <i slot="icon" class="ms-Icon ms-Icon--Storyboard" aria-hidden="true"></i>
        </ui-textbox>
        <ui-textbox disabled floating-label :label="$t('message.location')" v-model="item.location">
          <i slot="icon" class="ms-Icon ms-Icon--MapPin" aria-hidden="true"></i>
        </ui-textbox>
      </div>
    </Card>
    <h3>{{$t("message.device")}}</h3>
    <p>共{{info.totalCount}}台</p>
    <div>
      <Card class="ms-depth-16" v-if="$store.state.isListMode">
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
              <ou-list-action-item icon="View" @click="viewClicked(item.id)"></ou-list-action-item>
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
              v-if="item.status===1"
              color="primary"
              icon="book"
              @click="bookClicked(item.id)"
            >{{$t('message.appointment')}}</ui-button>
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
  </div>
</template>
<script>
import router from "@/router";
import tools from "@/util/tools.js";
import bookTheDevice from "@/components/device/bookTheDevice";
export default {
  components: { bookTheDevice },
  data() {
    return {
      showPanel: false,
      search: {
        id: this.$route.params.id,
        pageRow: 1
      },
      item: {},
      info: {},
      iswaitting: false,
      panelDeviceId: ""
    };
  },
  methods: {
    viewClicked(id) {
      router.push("../device/" + id);
    },
    bookClicked(i) {
      this.panelDeviceId = i.toString();
      this.showPanel = true;
      //router.push("device/" + i);
    },
    getLabInfo() {
      tools
        .easyfetch(tools.Api.ListLab, this.search)
        .then(res => {
          this.item = res.data.info.list[0];
        })
        .catch();
    },
    getDeviceInfo() {
      let sx = { lab: this.$route.params.id };
      tools
        .easyfetch(tools.Api.ListDevice, sx)
        .then(res => {
          this.info = res.data.info;
        })
        .catch();
    },
    onPageChange(page) {
      this.search.pageNum = page;
      this.getInfo();
    }
  },
  mounted() {
    this.getDeviceInfo();
    this.getLabInfo();
  }
};
</script>