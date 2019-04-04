<template>
  <div>
    <Card class="ms-depth-16">
      <h2>{{$t('message.project')}}</h2>
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
    </Card>
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
  </div>
</template>
<script>
import tools from "@/util/tools.js";
import router from "@/router";
export default {
  data() {
    return {
      search: { id: this.$route.params.id, pageRow: 1 },
      item: {},
      groups: {},
      userInfo: {},
      projectInfo: {},
      s: {},
      p: {},
      iswaitting: false
    };
  },
  methods: {
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
    }
  },
  mounted() {
    this.getInfo();
    this.getGroup();
  }
};
</script>

