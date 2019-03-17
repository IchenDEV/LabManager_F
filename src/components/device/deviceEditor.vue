<template>
  <div>
    <Card :class="{'modelCard':$store.state.modal}"  >
      <h2>{{$t('message.modify')}} {{$t('message.device')}}</h2>
      <div class="flex-panel">
        <ui-textbox icon="person" floating-label :label="$t('message.No')" v-model="item.No"></ui-textbox>
        <ui-textbox icon="person" floating-label :label="$t('message.name')" v-model="item.name"></ui-textbox>
        <ui-textbox icon="lock" floating-label :label="$t('message.description')" v-model="item.description"></ui-textbox>
        <ui-textbox icon="person" floating-label :label="$t('message.model')" v-model="item.model"></ui-textbox>
        <ui-textbox icon="person" floating-label :label="$t('message.band')" v-model="item.bands"></ui-textbox>
        <ui-textbox icon="person" floating-label :label="$t('message.func')" v-model="item.func"></ui-textbox>
        <ui-textbox icon="person" floating-label :label="$t('message.requireReputation')" v-model="item.requireReputation"></ui-textbox>
        <ui-select
          has-search
          :label="$t('message.lab')"
          type="image"
          :options="labInfo.list"
          :keys="{ label: 'name', value: 'id' }"
          v-model="lab"
        ></ui-select>
      </div>
      <ui-button
        v-if="this.item.status !== 3"
        color="primary"
        icon="pause"
        @click="pauseClick"
        :loading="iswaitting"
      >{{$t('message.pause')}}</ui-button>
      <ui-button
        v-if="this.item.status !== 4"
        color="primary"
        icon="warning"
        @click="brokenClick"
        :loading="iswaitting"
      >{{$t('message.error')}}</ui-button>
      <ui-button
        v-if="this.item.status !== 1"
        color="primary"
        icon="update"
        @click="restartClick"
        :loading="iswaitting"
      >{{$t('message.restart')}}</ui-button>
      <ui-button color="primary" icon="update" @click="updateClick" :loading="iswaitting">{{$t('message.update')}}</ui-button>
    </Card>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
export default {
  data() {
    return {
      search: { id: this.$route.params.id, pageRow: 1 },
      item: {},
      iswaitting: false,
      labInfo: {},
      lab: ""
    };
  },
  methods: {
    getLabInfo() {
      let conp = { pageRow: 1000, offSet: 0 };
      tools.easyfetch(tools.Api.ListLab,conp)
      .then(res => {
          this.labInfo = res.data.info;
        })
    },
    getDeviceInfo() {
      tools.easyfetch(tools.Api.ListDevice,this.search)
      .then(res => {
          this.item = res.data.info.list[0];
        })
    },
    updateClick() {
      this.iswaitting = true;
      this.item.location = this.lab.id;
      tools.easyfetch(tools.Api.UpdateDevice,this.item)
        .then(() => {
          this.iswaitting = false;
          this.getDeviceInfo();
        })
    },
    pauseClick() {
      this.item.status = 3;
      this.updateClick()
    },
    restartClick() {
      this.item.status = 1;
      this.updateClick()
    },
    brokenClick() {
      this.item.status = 4;
      this.updateClick()
    }
  },
  mounted() {
    this.getLabInfo();
    this.getDeviceInfo();
  }
};
</script>
