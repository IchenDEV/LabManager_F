<template>
<div>
  <Card :class="{'modelCard':$store.state.modal}"  >
  <h2>{{$t('message.lab')}} {{$t('message.list')}}</h2>
  <div class="flex-panel">
    <!--将名称的图标进行修改为info_outline-->
      <ui-textbox icon="info_outline" floating-label :label="$t('message.name')" v-model="search.name"></ui-textbox>
      <ui-textbox icon="code" floating-label label="id" v-model="search.id"></ui-textbox>
      <ui-textbox icon="not_listed_location" floating-label :label="$t('message.location')" v-model="search.location"></ui-textbox>
    </div>
    <ui-button color="primary" icon="search" @click="searchClicked">{{$t('message.search')}}</ui-button>
  </Card>
  <div class="flex-panel">
    <Card :class="{'modelCard':$store.state.modal}"   v-for="(item,index) in labs.list" :key="index">
      <p slot="title">{{item.name}}</p>
      <p>id: {{item.id}}</p>
      <p>{{$t('message.location')}} {{item.location}}</p>
      <p>{{$t('message.description')}} {{item.description}}</p>
      <p>{{$t('message.createTime')}} {{item.createTime}}</p>
      <span>
      <ui-button color="primary" icon="delete" @click="moClicked(item.id)" :loading="iswaitting">{{$t('message.modify')}}</ui-button>
      <ui-button color="primary" icon="delete" @click="delClicked(item.id,index)" :loading="iswaitting">{{$t('message.delete')}}</ui-button>
      </span>
    </Card>
    <Card :class="{'modelCard':$store.state.modal}"   v-if="labs.totalCount===0">
        <div>
         {{$t('message.findless')}}{{$t('message.lab')}}
        </div>
      </Card>
  </div>
  <Page size="small" v-if="labs.totalPage>1" :total="labs.totalPage" :page-size="search.pageRow" show-elevator @on-change="onPageChange"/>
</div>
</template>
<script>
import router from '@/router'
import tools from '@/util/tools.js'
export default {
  data () {
    return {
      labs: {},
      search: { pageRow: 10 },
      iswaitting: false
    }
  },
  methods: {
    getInfo () {
      tools.easyfetch(tools.Api.ListLab,this.search)
      .then(res => {
          this.labs = res.data.info
        })
    },
    onPageChange (page) {
      this.search.pageNum = page
      this.getInfo()
    },
    delClicked (id,index) {
      this.labs.list.splice(index, 1)
      let da = {id: id}
      tools.easyfetch(tools.Api.DelLab,da)
        .then()
        .catch()
    },
    searchClicked() {
      this.getInfo();
    },
    moClicked (id){
      router.push("lab/"+id.toString())
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>
