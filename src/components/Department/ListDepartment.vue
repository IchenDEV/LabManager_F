<template>
  <div>
    <Card>
    <h2>{{$t('message.department')}} {{$t('message.list')}}</h2>
    <div class="flex-panel">
      <ui-textbox icon="person" floating-label :label="$t('message.name')" v-model="search.name"></ui-textbox>
      <ui-textbox icon="person" floating-label label="id" v-model="search.id"></ui-textbox>
    </div>
    <ui-button color="primary" icon="search" @click="searchClicked">{{$t('message.search')}}</ui-button>
    </Card>
    <div class="flex-panel">
      <Card v-for="(item,index) in departments.list" :key="index">
        <p slot="title">{{item.name}}</p>
        <p>{{item.id}}</p>
        <p>{{item.description}}</p>
        <p>{{item.createTime}}</p>
        <span>
          <ui-button
            color="primary"
            icon="delete"
            @click="moClicked(item.id)"
            :loading="iswaitting"
          >{{$t('message.modify')}}</ui-button>
          <ui-button
            color="primary"
            icon="delete"
            @click="delClicked(item.id,index)"
            :loading="iswaitting"
          >{{$t('message.delete')}}</ui-button>
        </span>
      </Card>
      <Card v-if="departments.totalCount===0">
        <div>
         {{$t('message.findless')}} {{$t('message.department')}}
        </div>
      </Card>
    </div>
    <Page size="small"
      v-if="departments.totalPage>1"
      :total="departments.totalPage"
      :page-size="search.pageRow"
      show-elevator
      @on-change="onPageChange"
    />
  </div>
</template>
<script>
import router from '@/router'
import tools from "@/util/tools.js";
export default {
  data() {
    return {
      departments: {},
      search: { pageRow: 10 },
      iswaitting: false
    };
  },
  methods: {
    getInfo() {
      tools.easyfetch(tools.Api.ListDepartment,this.search)
      .then(res => {
          this.departments = res.data.info;
        })
        .catch();
    },
    onPageChange(page) {
      this.search.pageNum = page;
      this.getInfo();
    },
    delClicked(id,index) {
      let da = { id: id };
      this.departments.list.splice(index, 1)
      tools.easyfetch(tools.Api.DelDepartment,da).then()
    },
    searchClicked() {
      this.search=tools.removeEmptyKey(this.search)
      this.getInfo();
    },
    moClicked (id){
      router.push("department/"+id.toString())
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>
