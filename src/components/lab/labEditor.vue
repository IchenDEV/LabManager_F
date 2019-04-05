<template>
  <div>
    <Card class="ms-depth-16">
      <h2>{{$t('message.modify')}} {{$t('message.lab')}}</h2>
      <ou-spinner v-if="item==null" label="Loading..." type="large"/>
      <div class="flex-panel">
        <ui-textbox floating-label :label="$t('message.name')" v-model="item.name">
          <i slot="icon" class="ms-Icon ms-Icon--TestBeaker" aria-hidden="true"></i>
        </ui-textbox>
        <ui-textbox floating-label :label="$t('message.description')" v-model="item.description">
          <i slot="icon" class="ms-Icon ms-Icon--Storyboard" aria-hidden="true"></i>
        </ui-textbox>
        <ui-textbox floating-label :label="$t('message.location')" v-model="item.location">
          <i slot="icon" class="ms-Icon ms-Icon--MapPin" aria-hidden="true"></i>
        </ui-textbox>
      </div>
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
      iswaitting: false
    };
  },
  methods: {
    getLabInfo() {
      tools
        .easyfetch(tools.Api.ListLab, this.search)
        .then(res => {
          this.item = res.data.info.list[0];
        })
        .catch();
    },
    updateClick() {
      this.iswaitting = true;
      tools
        .easyfetch(tools.Api.UpdateLab, this.item)
        .then(() => {
          this.$Loading.finish();
          this.$Notice.success({
            title: "Success"
          });
          this.getLabInfo();
        })
        .catch();
    }
  },
  mounted() {
    this.getLabInfo();
  }
};
</script>