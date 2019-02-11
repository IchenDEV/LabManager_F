<template>
  <div>
    <div class="flex-panel">
    <ui-textbox icon='person' floating-label label='设备名称' v-model='search.name'></ui-textbox>
    <ui-textbox icon='person' floating-label label='设备编号' v-model='search.No'></ui-textbox>
    <ui-textbox icon='person' floating-label label='设备型号' v-model='search.model'></ui-textbox>
    <ui-textbox icon='person' floating-label label='设备品牌' v-model='search.bands'></ui-textbox>
    <ui-select
      has-search
      label='实验室'
      placeholder='All'
      type='image'
      :options='labInfo.list'
      :keys='{ label: "name", value: "id" }'
      v-model='search.lab'
    ></ui-select>
    </div>
     <ui-button color='primary' icon='search' @click='searchClicked'>查询</ui-button>
    <div class="flex-panel">
      <Card v-for='(item,index) in info.list' :key='index'>
        <div>
          <h2>设备 {{item.id}}</h2>
          <p>名称 {{item.name}}</p>
          <p>编号 {{item.No}}</p>
          <p>品牌 {{item.band}}</p>
          <p>描述 {{item.description}}</p>
          <p>型号 {{item.model}}</p>
          <p>位置 {{item.locationName}}</p>
          <p>{{item.locationDescription}}</p>
          <p>地址 {{item.locationAddress}}</p>
          <ui-button color='primary' icon='book' @click='bookClicked(item.id)'>预订</ui-button>
        </div>
      </Card>
      <Card v-if="info.totalCount===0">
        <div>
         没有找到相关设备
        </div>
      </Card>
    </div>
     <Page v-if="info.totalPage>1" :total="info.totalCount" :page-size="search.pageRow" show-elevator @on-change="onPageChange"/>
  </div>
</template>
<script>
import router from '@/router'
import VueNotifications from 'vue-notifications'
import fetch from '@/util/fetch.js'
export default {
  data () {
    return {
      labInfo: { list: [] },
      info: {},
      search: {
        model: '',
        band: '',
        name: '',
        No: '',
        lab: -1,
        pageRow: 10,
        pageNum: 1
      }
    }
  },
  methods: {
    bookClicked (i) {
      router.push('/device/' + i)
    },
    getDeviceInfo () {
      for (var key in this.search) {
        if (this.search[key] === null || this.search[key] === '') {
          delete this.search[key]
        }
      }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/device/list',
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.info = res.data.info
        })
        .catch()
    },
    getLabInfo () {
      let conp = { pageRow: 100, offSet: 0 }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/lab/list',
        data: JSON.stringify(conp)
      })
        .then(res => {
          this.labInfo = res.data.info
          var temp = { name: 'All', id: -1 }
          this.labInfo.list.splice(0, 0, temp)
        })
        .catch()
    },
    searchClicked () {
      if (this.search.lab.id < 0) {
        delete this.search.location
      } else {
        this.search.location = this.search.lab.id
      }
      this.getDeviceInfo()
    },
    onPageChange (page) {
      this.search.pageNum = page
      this.getDeviceInfo()
    }
  },
  mounted () {
    if (this.$store.state.hasSingin === true) {
      this.getDeviceInfo()
      this.getLabInfo()
    }
  },
  notifications: {
    showSuccessMsg: {
      type: VueNotifications.types.success,
      title: 'Hello ',
      message: '登录成功'
    },
    showWarnMsg: {
      type: VueNotifications.types.warn,
      title: '登录失败',
      message: '可能你输入了不正确的密码或者用户名'
    },
    showErrorMsg: {
      type: VueNotifications.types.error,
      title: 'Wow-wow',
      message: 'Thats the error'
    }
  }
}
</script>
<style>
.flex-panel {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.flex-panel > div {
  padding: 10px;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 300px; /* 让过渡表现良好。（从/到'width:auto'的过渡
                      至少在 Gecko 和 Webkit 上是有 bug 的。
                      更多信息参见 http://bugzil.la/731886 ） */

  -webkit-transition: width 0.7s ease-out;
  transition: width 0.7s ease-out;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  margin-top: 0.5rem
}

.user-itme {
  padding: 10px;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  min-width: 120px;
  max-width: 350px;
  width: 250px; /* 让过渡表现良好。（从/到'width:auto'的过渡
                      至少在 Gecko 和 Webkit 上是有 bug 的。
                      更多信息参见 http://bugzil.la/731886 ） */

  -webkit-transition: width 0.7s ease-out;
  transition: width 0.7s ease-out;
}
</style>
