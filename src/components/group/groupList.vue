<template>
<div>
  <Card   >
  <h2>{{$t('message.group')}} {{$t('message.list')}}</h2>
  <div class="flex-panel">
      <ui-textbox icon="group" floating-label :label="$t('message.name')" v-model="search.name"></ui-textbox>
      <ui-textbox icon="code" floating-label label="id" v-model="search.id"></ui-textbox>
    </div>
    <ui-button color="primary" icon="search" @click="searchClicked">{{$t('message.search')}}</ui-button>
  </Card>
  <div class="flex-panel">
    <Card    v-for="(item,index) in groups.list" :key="index">
      <p slot="title">{{item.name}}</p>
      <p>{{item.id}}</p>
      <p>{{item.description}}</p>
      <p>{{item.createTime}}</p>
      <span>
      <ui-button color="primary" icon="delete" @click="moClicked(item.id)" :loading="iswaitting">{{$t('message.modify')}}</ui-button>
      <ui-button color="primary" icon="delete" @click="delClicked(item.id,index)" :loading="iswaitting">{{$t('message.delete')}}</ui-button>
      </span>
    </Card>
    <Card    v-if="groups.totalCount===0">
        <div>
         {{$t('message.findless')}}{{$t('message.group')}}
        </div>
      </Card>
  </div>
  <Page size="small" v-if="groups.totalPage>1" :total="groups.totalPage" :page-size="search.pageRow" show-elevator @on-change="onPageChange"/>
</div>
</template>
<script>
import tools from '@/util/tools.js'
import router from '@/router'
export default {
  data () {
    return {
      groups: {},
      search: { pageRow: 10 ,pageNum: 1},
      iswaitting: false
    }
  },
  methods: {
    getInfo () {
      tools.easyfetch(tools.Api.ListGroup,this.search)
      .then(res => {
          this.groups = res.data.info
        })
    },
    onPageChange (page) {
      this.search.pageNum = page
      this.getInfo()
    },
    delClicked (id,index) {
      let da = {id: id}
      this.groups.list.splice(index, 1)
      tools.easyfetch(tools.Api.DeleteGroup,da).then()
    },
    searchClicked() {
      this.getInfo();
    },
    moClicked (id){
      router.push("group/"+id.toString())
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>
