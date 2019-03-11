<template>
  <div>
    <h2>{{$t('message.UseRate')}}</h2>
    <ve-bar :data="barData" :settings="barSettings"></ve-bar>
    <ui-button color="primary" icon="cloud_download" @click="exportExcel">{{$t('message.export')}}</ui-button>
    <Page
      size="small"
      v-if="info.totalPage>1"
      :total="info.totalPage"
      :page-size="search.pageRow"
      show-elevator
      @on-change="onPageChange"
    />
  </div>
</template>
<script>
import tools from "@/util/tools.js";
import VeBar from "v-charts/lib/bar.common";
export default {
  components: { VeBar },
  data() {
    this.barSettings = {
      dimension: ["name"],
      metrics: ["value"]
    };
    return {
      barData: {
        columns: ["name", "value"],
        rows: []
      },
      search: { pageRow: 10 },
      iswaitting: false,
      info: ""
    };
  },
  methods: {
    getInfo() {
      tools.easyfetch(tools.Api.ListDeviceUseRate, this.search).then(res => {
        this.info = res.data.info;
        for (let item of res.data.info.list) {
          this.barData.rows.push({ name: item.name, value: item.rate });
        }
      });
    },
    onPageChange(page) {
      this.search.pageNum = page;
      this.getInfo();
    },
     exportExcel(){
      tools.fetchFile(tools.Api.ExportDevice,null)
        .then(res => {
          this.download(res.data)
        })
        .catch();
    },
     download (data) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'export.xlsx')
        document.body.appendChild(link)
        link.click()
    },
  },
  mounted() {
    this.getInfo();
  }
};
</script>