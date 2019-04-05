<template>
  <div>
    <Card class="ms-depth-16">
      <h2>{{$t('message.project')}}</h2>
      <Tag color="success" v-if="item.status===1">{{$t('message.working')}}</Tag>
      <Tag color="error" v-if="item.status===0">{{$t('message.done')}}</Tag>
      <Tag color="warning" v-if="item.status===3">{{$t('message.pause')}}</Tag>
      <div class="flex-panel">
        <ui-textbox floating-label :label="$t('message.name')" v-model="item.name" disabled>
          <i slot="icon" class="ms-Icon ms-Icon--ExternalTFVC" aria-hidden="true"></i>
        </ui-textbox>
        <ui-textbox
          floating-label
          :label="$t('message.description')"
          v-model="item.description"
          disabled
        >
          <i slot="icon" class="ms-Icon ms-Icon--Storyboard" aria-hidden="true"></i>
        </ui-textbox>
      </div>
    </Card>
    <h2>参加项目的项目组</h2>
    <Card class="ms-depth-16" v-if="$store.state.isListMode">
      <ou-list style="text-align:left;">
        <ou-list-item
          v-for="(item,index) in groups"
          :key="index"
          isSelectable
          :primaryText="item.groupName"
          :tertiaryText="item.description"
        >
          <ou-list-actions>
            <ou-list-action-item icon="View" @click="groupClicked(item.groupId)"></ou-list-action-item>
          </ou-list-actions>
        </ou-list-item>
      </ou-list>
    </Card>
    <Page
      size="small"
      v-if="groups.totalPage>1"
      :total="groups.totalCount"
      :page-size="search.pageRow"
      show-elevator
      @on-change="onPageChange"
    />
    <h2>项目预约的设备</h2>
    <div>
      <Card class="ms-depth-16" v-if="$store.state.isListMode">
        <ou-list style="text-align:left;">
          <ou-list-item
            v-for="(item,index) in info.list"
            :key="index"
            isSelectable
            :primaryText="item.device+' '+item.deviceName"
          >
            <ou-list-actions>
              <span>
                <Tag :color="statusc(item)">{{status(item)}}</Tag>
              </span>
              <ou-list-action-item icon="View" @click="deviceClicked(item.device)"></ou-list-action-item>
            </ou-list-actions>
          </ou-list-item>
        </ou-list>
      </Card>
      <Page
        size="small"
        v-if="info.totalPage>1"
        :total="info.totalCount"
        :page-size="searchDevice.pageRow"
        show-elevator
        @on-change="onPageChangeDevice"
      />
    </div>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
import router from "@/router";
export default {
  data() {
    return {
      search: { id: this.$route.params.id, pageRow: 1 },
      searchDevice: { project: this.$route.params.id, pageRow: 10 },
      item: {},
      info: {},
      groups: {},
      userInfo: {},
      projectInfo: {},
      s: {},
      p: {},
      iswaitting: false
    };
  },
  methods: {
    status(item) {
      if (new Date(item.beginTime) < new Date()) {
        if (new Date(item.endTime) > new Date()) {
          return "进行中";
        } else {
          return "已结束";
        }
      }
      return "即将开始";
    },
    statusc(item) {
      if (new Date(item.beginTime) < new Date()) {
        if (new Date(item.endTime) > new Date()) {
          return "success";
        } else {
          return "error";
        }
      }
      return "warning";
    },
    getInfo() {
      tools.easyfetch(tools.Api.ListProject, this.search).then(res => {
        this.item = res.data.info.list[0];
      });
    },
    getGroup() {
      tools.easyfetch(tools.Api.ListProjectGroup, this.search).then(res => {
        this.groups = res.data.info.list;
      });
    },
    groupClicked(id) {
      router.push("../group/" + id);
    },
    getDeviceInfo() {
      tools
        .easyfetch(tools.Api.ListBook, this.searchDevice)
        .then(res => {
          this.info = res.data.info;
        })
        .catch();
    },
    onPageChange(page) {
      this.search.pageNum = page;
      this.getInfo();
    },
    onPageChangeDevice(page) {
      this.searchDevice.pageNum = page;
      this.getDeviceInfo();
    },
    deviceClicked(id) {
      router.push("../device/" + id);
    }
  },
  mounted() {
    this.getInfo();
    this.getGroup();
    this.getDeviceInfo();
  }
};
</script>

