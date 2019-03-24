<template>
  <div>
    <Card class="ms-depth-16">
      <h1>{{ $t('message.log') }}</h1>
      <ou-table :data="logs.list" type="fixed">
        <ou-table-column prop="user">{{ $t('message.operator') }}</ou-table-column>
        <ou-table-column prop="operation">{{ $t('message.operation') }}</ou-table-column>
        <ou-table-column prop="targer">{{ $t('message.targer') }}</ou-table-column>
        <ou-table-column prop="createTime">{{ $t('message.time') }}</ou-table-column>
      </ou-table>
      <Page
        v-if="logs.totalPage>1"
        size="small"
        :total="totalPage"
        :page-size="conp.pageRow"
        show-elevator
        @on-change="onPageChange"
      />
    </Card>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
export default {
  data() {
    return {
      logs: {},
      totalPage: 0,
      conp: { pageRow: 25, pageNum: 0 }
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      tools.easyfetch(tools.Api.ListLog, this.conp).then(res => {
        this.logs = res.data.info;
        this.totalPage = res.data.info.totalCount;
      });
    },
    onPageChange(page) {
      this.conp.pageNum = page;
      this.getInfo();
    }
  }
};
</script>
