<template>
  <div>
    <Card :bordered="false">
      <h2>{{ $t('message.lab') }} {{ $t('message.list') }}</h2>
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
        <ui-textbox
          v-model="search.location"
          icon="not_listed_location"
          floating-label
          :label="$t('message.location')"
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
        v-for="(item,index) in labs.list"
        :key="index"
        :bordered="false"
      >
        <p slot="title">
          {{ item.name }}
        </p>
        <p>id: {{ item.id }}</p>
        <p>{{ $t('message.location') }} {{ item.location }}</p>
        <p>{{ $t('message.description') }} {{ item.description }}</p>
        <p>{{ $t('message.createTime') }} {{ item.createTime }}</p>
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
        v-if="labs.totalCount===0"
        :bordered="false"
      >
        <div>
          {{ $t('message.findless') }}{{ $t('message.lab') }}
        </div>
      </Card>
    </div>
    <Page
      v-if="labs.totalPage>1"
      size="small"
      :total="labs.totalPage"
      :page-size="search.pageRow"
      show-elevator
      @on-change="onPageChange"
    />
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
  mounted () {
    this.getInfo()
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
  }
}
</script>
