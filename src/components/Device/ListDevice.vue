<template>
  <div>
    <h2>{{$t('message.device')}} {{$t('message.list')}}</h2>
    <div class="flex-panel">
    <ui-textbox icon='person' floating-label :label="$t('message.name')" v-model='search.name'></ui-textbox>
    <ui-textbox icon='person' floating-label :label="$t('message.No')" v-model='search.No'></ui-textbox>
    <ui-textbox icon='person' floating-label :label="$t('message.model')" v-model='search.model'></ui-textbox>
    <ui-textbox icon='person' floating-label :label="$t('message.band')" v-model='search.bands'></ui-textbox>
    <ui-select
      has-search
      :label="$t('message.lab')"
      placeholder='All'
      type='image'
      :options='labInfo.list'
      :keys='{ label: "name", value: "id" }'
      v-model='search.device'
    ></ui-select>
    </div>
    <ui-button color='primary' icon='search' @click='searchClicked'>{{$t('message.search')}}</ui-button>
    <div class="flex-panel">
      <Card v-for='(item,index) in info.list' :key='index' >
        <div>
          <span>
          <h2>{{$t('message.device')}} {{item.id}}</h2>
          <Tag color="success" v-if="item.status===1">{{$t('message.normal')}}</Tag>
          <Tag color="error"   v-if="item.status===4">{{$t('message.error')}}</Tag>
          <Tag color="error"   v-if="item.status===0">{{$t('message.scrap')}}</Tag>
          <Tag color="warning"   v-if="item.status===3">{{$t('message.pause')}}</Tag>
          </span>
          <p>{{$t('message.name')}} {{item.name}}</p>
          <p>{{$t('message.No')}} {{item.No}}</p>
          <p>{{$t('message.band')}} {{item.band}}</p>
          <p>{{$t('message.description')}} {{item.description}}</p>
          <p>{{$t('message.model')}} {{item.model}}</p>
          <p>{{$t('message.lab')}} {{item.locationName}}</p>
          <p>{{item.locationDescription}}</p>
          <p>{{$t('message.address')}} {{item.locationAddress}}</p>
          <ui-button v-if="!admin&&item.status===1" color='primary' icon='book' @click='bookClicked(item.id)'>{{$t('message.appointment')}}</ui-button>
          <ui-button v-if="admin" color='primary' icon='delete' @click='bookClicked(item.id)'>{{$t('message.modify')}}</ui-button>
          <ui-button v-if="admin" color='primary' icon='delete' @click='delClicked(item.id,index)'>{{$t('message.delete')}}</ui-button>
        </div>
      </Card>
      <Card v-if="info.totalCount===0">
        <div>
         {{$t('message.findless')}}{{$t('message.device')}}
        </div>
      </Card>
    </div>
     <Page size="small" v-if="info.totalPage>1" :total="info.totalCount" :page-size="search.pageRow" show-elevator @on-change="onPageChange"/>
  </div>
</template>
<script>
import router from '@/router'
import VueNotifications from 'vue-notifications'
import fetch from '@/util/fetch.js'
export default {
  props: { admin: { default: false } },
  data () {
    return {
      labInfo: { list: [] },
      info: {},
      search: {
        model: '',
        band: '',
        name: '',
        No: '',
        device: -1,
        pageRow: 10,
        pageNum: 1
      }
    }
  },
  methods: {
    bookClicked (i) {
      router.push('device/' + i)
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
      if (this.search.device.id < 0) {
        delete this.search.location
      } else {
        this.search.location = this.search.device.id
      }
      this.getDeviceInfo()
    },
    onPageChange (page) {
      this.search.pageNum = page
      this.getDeviceInfo()
    },
    delClicked (id,index) {
      let da = {id: id}
      this.info.list.splice(index, 1)
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/device/deleteDevice',
        data: JSON.stringify(da)
      })
        .then()
        .catch()
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
.list-item {
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
