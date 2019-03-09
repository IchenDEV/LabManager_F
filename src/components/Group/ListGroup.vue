<template>
  <div>
    <Card :bordered="false">
      <h2>{{ $t('message.group') }} {{ $t('message.list') }}</h2>
      <div class="flex-panel">
        <ui-textbox
          v-model="search.name"
          icon="group"
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
        v-for="(item,index) in groups.list"
        :key="index"
        :bordered="false"
      >
        <p slot="title">
          {{ item.name }}
        </p>
        <p>{{ item.id }}</p>
        <p>{{ item.description }}</p>
        <p>{{ item.createTime }}</p>
        <span>
          <ui-button
            color="primary"
            icon="delete"
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
        v-if="groups.totalCount===0"
        :bordered="false"
      >
        <div>
          {{ $t('message.findless') }}{{ $t('message.group') }}
        </div>
      </Card>
    </div>
    <Page
      v-if="groups.totalPage>1"
      size="small"
      :total="groups.totalPage"
      :page-size="search.pageRow"
      show-elevator
      @on-change="onPageChange"
    />
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
  mounted () {
    this.getInfo()
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
  }
}
</script>
