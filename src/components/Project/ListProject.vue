<template>
  <div>
    <Card :bordered="false">
      <h2>{{ $t('message.project') }} {{ $t('message.list') }}</h2>
      <div class="flex-panel">
        <ui-textbox
          v-model="search.name"
          icon="person"
          floating-label
          :label="$t('message.name')"
        />
        <ui-textbox
          v-model="search.id"
          icon="code"
          floating-label
          label="id"
        />
      </div>
      <ui-button
        color="primary"
        icon="search"
        @click="searchClicked"
      >
        {{ $t('message.search') }}
      </ui-button>
    </Card>
    <div class="flex-panel">
      <Card
        v-for="(item,index) in projects.list"
        :key="index"
        :bordered="false"
      >
        <p slot="title">
          {{ item.name }}
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
        </p>
        <p>idï¼š{{ item.id }}</p>
        <p>{{ $t('message.description') }} {{ item.description }}</p>
        <p>{{ $t('message.createTime') }} {{ item.createTime }}</p>
        <p>{{ $t('message.beginTime') }} {{ item.beginTime }}</p>
        <p>{{ $t('message.endTime') }} {{ item.endTime }}</p>
        <span>
          <ui-button
            color="primary"
            icon="adjust"
            :loading="iswaitting"
            @click="moClicked(item.id)"
          >{{ $t('message.modify') }}</ui-button>
          <ui-button
            color="primary"
            icon="delete"
            :loading="iswaitting"
            @click="delClicked(item.id,index)"
          >{{ $t('message.delete') }}</ui-button>
        </span>
      </Card>
      <Card
        v-if="projects.totalCount===0"
        :bordered="false"
      >
        <div>{{ $t('message.findless') }} {{ $t('message.project') }} </div>
      </Card>
    </div>
    <Page
      v-if="projects.totalPage>1"
      size="small"
      :total="projects.totalPage"
      :page-size="search.pageRow"
      show-elevator
      @on-change="onPageChange"
    />
  </div>
</template>
<script>
import tools from "@/util/tools.js"
import router from '@/router'
export default {
  data() {
    return {
      projects: '',
      search: { pageRow: 10 },
      iswaitting: false
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      tools.easyfetch(tools.Api.ListProject,this.search)
        .then(res=>{
          this.projects=res.data.info
          })
    },
    onPageChange(page) {
      this.search.pageNum = page;
      this.getInfo();
    },
    delClicked(id, index) {
      this.projects.list.splice(index, 1);
      let data = { id: id };
      tools.easyfetch(tools.Api.DelProject,data)
    },
    searchClicked() {
      this.getInfo();
    },
    moClicked (id){
      router.push("project/"+id.toString())
    }
  }
};
</script>