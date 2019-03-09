<template>
  <div>
    <Card :bordered="false">
      <h2>{{ $t('message.modify') }} {{ $t('message.book') }}</h2>
      <div class="flex-panel">
        <ui-textbox
          v-model="item.device"
          icon="person"
          floating-label
          :label="$t('message.device')"
        />
        <ui-textbox
          v-model="item.project"
          icon="lock"
          floating-label
          :label="$t('message.project')"
        />
        <ui-button
          color="primary"
          icon="update"
          :loading="iswaitting"
          @click="updateClick"
        >
          {{ $t('message.update') }}
        </ui-button>
      </div>
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
      iswaitting: false
    };
  },
  mounted() {

  },
  methods: {
    updateClick() {
      this.iswaitting = true;
      this.item.location = this.lab.id;
      tools.easyfetch(tools.Api.UpdateBook,this.item)
      .then(() => {
          this.iswaitting = false;
        })
    },
    getBookInfo() {
      tools.easyfetch(tools.Api.ListDevice,this.search)
      .then(res => {
          this.item = res.data.info.list[0];
        })
    },
  }
};
</script>