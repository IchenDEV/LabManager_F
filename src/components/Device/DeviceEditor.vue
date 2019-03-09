<template>
  <div>
    <Card :bordered="false">
      <h2>{{ $t('message.modify') }} {{ $t('message.device') }}</h2>
      <div class="flex-panel">
        <ui-textbox
          v-model="item.No"
          icon="person"
          floating-label
          :label="$t('message.No')"
        />
        <ui-textbox
          v-model="item.name"
          icon="person"
          floating-label
          :label="$t('message.name')"
        />
        <ui-textbox
          v-model="item.description"
          icon="lock"
          floating-label
          :label="$t('message.description')"
        />
        <ui-textbox
          v-model="item.model"
          icon="person"
          floating-label
          :label="$t('message.model')"
        />
        <ui-textbox
          v-model="item.bands"
          icon="person"
          floating-label
          :label="$t('message.band')"
        />
        <ui-textbox
          v-model="item.func"
          icon="person"
          floating-label
          :label="$t('message.func')"
        />
        <ui-textbox
          v-model="item.requireReputation"
          icon="person"
          floating-label
          :label="$t('message.requireReputation')"
        />
        <ui-select
          v-model="lab"
          has-search
          :label="$t('message.lab')"
          type="image"
          :options="labInfo.list"
          :keys="{ label: 'name', value: 'id' }"
        />
      </div>
      <ui-button
        v-if="this.item.status !== 3"
        color="primary"
        icon="pause"
        :loading="iswaitting"
        @click="pauseClick"
      >
        {{ $t('message.pause') }}
      </ui-button>
      <ui-button
        v-if="this.item.status !== 4"
        color="primary"
        icon="warning"
        :loading="iswaitting"
        @click="brokenClick"
      >
        {{ $t('message.error') }}
      </ui-button>
      <ui-button
        v-if="this.item.status !== 1"
        color="primary"
        icon="update"
        :loading="iswaitting"
        @click="restartClick"
      >
        {{ $t('message.restart') }}
      </ui-button>
      <ui-button
        color="primary"
        icon="update"
        :loading="iswaitting"
        @click="updateClick"
      >
        {{ $t('message.update') }}
      </ui-button>
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
  mounted() {
    this.getLabInfo();
    this.getDeviceInfo();
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
  }
};
</script>
