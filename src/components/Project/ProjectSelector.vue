<template>
  <ui-select
    v-model="select"
    has-search
    :label="label"
    :options="projectInfo.list"
    :keys="keys"
    @select="vs"
  />
</template>
<script>
import tools from "@/util/tools.js";
export default {
  model: {
    prop: "selected",
    event: "change"
  },
  props: {
    label: { default: "" },
    selected: { default: null },
    isWorking: { default: false },
    user: { default: null }
  },
  data() {
    return {
      search: {},
      projectInfo: { list: [] },
      iswaitting: false,
      select: "",
      keys: { label: "name", value: "id" }
    };
  },
  mounted() {
    if (this.$store.state.hasSingin === true) {
      this.getProjectInfo();
    }
  },
  methods: {
    getProjectInfo() {
      if (this.isWorking) {
        this.search.status = 1;
      }
      if (this.user != null) {
        this.search.id = this.user;
        this.keys.label="projectName";
        tools.easyfetch(tools.Api.ListUserProject, this.search).then(res => {
        this.projectInfo = res.data.info;
        });
      } else {
        tools.easyfetch(tools.Api.ListProject, this.search).then(res => {
          this.projectInfo = res.data.info;
        });
      }
    },
    vs() {
      this.$emit("change", this.select);
    }
  }
};
</script>