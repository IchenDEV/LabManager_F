<template>
  <div>
    <Card class="ms-depth-16 max-w">
      <ou-command-bar>
        <template slot="main">
          <ou-search-box type="commandBar" placeholder="Search" v-model="search.name"/>
          <ou-command-button icon="Add" @click="multilineDialogVisible=true">新建</ou-command-button>
          <ou-command-button icon="filter" @click="fDialogVisible=true">筛选</ou-command-button>
          <ou-command-button icon="Search" @click="searchClicked">开始搜索</ou-command-button>
        </template>
        <template slot="side">
          <ou-command-button icon="CircleRing" type="noLabel"></ou-command-button>
        </template>
      </ou-command-bar>
    </Card>
    <ou-dialog
      type="multiline"
      :title="$t('message.create') +$t('message.device')"
      v-model="multilineDialogVisible"
    >
      <add-device @added="refresh"/>
    </ou-dialog>
    <ou-dialog
      type="multiline"
      :title="$t('message.device')+$t('message.list')"
      v-model="fDialogVisible"
    >
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
    </ou-dialog>
    <device-box ref="deviceList" admin="true"/>
  </div>
</template>
<script>
import AddDevice from "@/components/device/AddDevice";
import deviceBox from "@/components/device/deviceList";
import tools from "@/util/tools.js";
export default {
  components: { AddDevice, deviceBox },
  data() {
    return {
      multilineDialogVisible: false,
      fDialogVisible: false,
      labInfo: { list: [] },
      search: {
        model: "",
        band: "",
        name: "",
        No: "",
        requireReputation: "",
        device: -1,
        pageRow: 10,
        pageNum: 1
      }
    };
  },
  methods: {
    refresh() {
      this.multilineDialogVisible = false;
      this.$refs.deviceList.getInfo();
    },
    getLabInfo() {
      let conp = { pageRow: 100, offSet: 0 };
      tools
        .easyfetch(tools.Api.ListLab, conp)
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
      this.$refs.deviceList.search = this.search;
      this.$refs.deviceList.getInfo();
    }
  },
  mounted() {
    this.getLabInfo();
  }
};
</script>
