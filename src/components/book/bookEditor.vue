<template>
  <div>
    <Card class="ms-depth-16"   >
      <h2>{{$t('message.modify')}} {{$t('message.book')}}</h2>
      <div class="flex-panel">
        <ui-textbox icon="person" floating-label :label="$t('message.device')" v-model="item.device"></ui-textbox>
        <ui-textbox icon="lock" floating-label   :label="$t('message.project')" v-model="item.project"></ui-textbox>
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
      iswaitting: false
    };
  },
  methods: {
    updateClick() {
      this.$Loading.start();
      this.item.location = this.lab.id;
      tools.easyfetch(tools.Api.UpdateBook,this.item)
      .then(() => {
          this.$Loading.finish();
          this.$Notice.success({
            title: "Success"
          });
        })
    },
    getBookInfo() {
      tools.easyfetch(tools.Api.ListDevice,this.search)
      .then(res => {
          this.item = res.data.info.list[0];
        })
    },
  },
  mounted() {

  }
};
</script>