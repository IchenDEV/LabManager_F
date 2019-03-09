<template>
  <div>
    <Card :bordered="false">
      <h2>{{ $t('message.modify') }} {{ $t('message.project') }}</h2>
      <Tag
        v-if="item.status===1"
        color="success"
      >
        {{ $t('message.working') }}
      </Tag>
      <Tag
        v-if="item.status===0"
        color="error"
      >
        {{ $t('message.done') }}
      </Tag>
      <Tag
        v-if="item.status===3"
        color="warning"
      >
        {{ $t('message.pause') }}
      </Tag>
      <div class="flex-panel">
        <ui-textbox
          v-model="item.name"
          icon="phone"
          floating-label
          :label="$t('message.name')"
        />
        <ui-textbox
          v-model="item.description"
          icon="phone"
          floating-label
          :label="$t('message.description')"
        />
      </div>
      <ui-button
        v-if="item.status===1"
        color="primary"
        icon="update"
        :loading="iswaitting"
        @click="setStatusClick(0)"
      >
        {{ $t('message.done') }}
      </ui-button>
      <ui-button
        v-if="item.status===3"
        color="primary"
        icon="update"
        :loading="iswaitting"
        @click="setStatusClick(1)"
      >
        {{ $t('message.restart') }}
      </ui-button>
      <ui-button
        v-if="item.status===1"
        color="primary"
        icon="update"
        :loading="iswaitting"
        @click="setStatusClick(3)"
      >
        {{ $t('message.pause') }}
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
      userInfo: {},
      projectInfo: {},
      s: {},
      p: {},
      iswaitting: false
    };
  },
  mounted() {
    this.getInfo();
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
  }
};
</script>
