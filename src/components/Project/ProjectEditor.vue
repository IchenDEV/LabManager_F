<template>
  <div>
    <Card :class="{'modelCard':$store.state.modal}" :bordered="false" >
      <h2>{{$t('message.modify')}} {{$t('message.project')}}</h2>
      <Tag color="success" v-if="item.status===1">{{$t('message.working')}}</Tag>
      <Tag color="error" v-if="item.status===0">{{$t('message.done')}}</Tag>
      <Tag color="warning" v-if="item.status===3">{{$t('message.pause')}}</Tag>
      <div class="flex-panel">
        <ui-textbox icon="phone" floating-label :label="$t('message.name')" v-model="item.name"></ui-textbox>
        <ui-textbox
          icon="phone"
          floating-label
          :label="$t('message.description')"
          v-model="item.description"
        ></ui-textbox>
      </div>
      <ui-button
        color="primary"
        v-if="item.status===1"
        icon="update"
        @click="setStatusClick(0)"
        :loading="iswaitting"
      >{{$t('message.done')}}</ui-button>
      <ui-button
        color="primary"
        v-if="item.status===3"
        icon="update"
        @click="setStatusClick(1)"
        :loading="iswaitting"
      >{{$t('message.restart')}}</ui-button>
      <ui-button
        color="primary"
        v-if="item.status===1"
        icon="update"
        @click="setStatusClick(3)"
        :loading="iswaitting"
      >{{$t('message.pause')}}</ui-button>
      <ui-button
        color="primary"
        icon="update"
        @click="updateClick"
        :loading="iswaitting"
      >{{$t('message.update')}}</ui-button>
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
      userInfo: {},
      projectInfo: {},
      s: {},
      p: {},
      iswaitting: false
    };
  },
  methods: {
    getInfo() {
      tools.easyfetch(tools.Api.ListProject,this.search)
      .then(res => {
          this.item = res.data.info.list[0];
        })
    },
    updateClick() {
      this.iswaitting = true;
      tools.easyfetch(tools.Api.UpdateProject,this.item)
      .then(() => {
          this.iswaitting = false;
        })
    },
    setStatusClick(st) {
      this.item.status = st;
      this.updateClick();
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>
