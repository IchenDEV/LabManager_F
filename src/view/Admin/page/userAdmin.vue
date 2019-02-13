<template>
  <div>
    <Card>
      <h2>修改用户信息</h2>
        <div class="flex-panel">
          <ui-textbox icon='phone' floating-label label='名称' v-model='item.nickname'></ui-textbox>
          <ui-textbox icon='phone' floating-label label='电话' v-model='item.phone'></ui-textbox>
          <ui-textbox icon='phone' floating-label label='地址' v-model='item.address'></ui-textbox>
          <ui-select
          icon='person'
          floating-label
          label='性别'
          :options='sexString'
          v-model='sex'
        ></ui-select>
        <ui-textbox
          icon='mail'
          :invalid='ismail === false'
          floating-label
          label='邮箱'
          v-model='item.email'
          error='错误的邮箱格式'
        ></ui-textbox>
        </div>
        <ui-button color="primary" icon="update" @click="updateClick" :loading="iswaitting">更新</ui-button>
    </Card>
  </div>
</template>
<script>
import fetch from '@/util/fetch.js'
import stringCK from '@/util/stringCK.js'
export default {
  data () {
    return {
      search: { id: this.$route.params.id, pageRow: 1},
      item: {},
      iswaitting: false,
      sexString: ['未知', '男', '女', '其他'],
      sex: 0
    }
  },
  computed: {
    ismail () {
      return stringCK.isEmail(this.item.email)
    },
    hasSingin () {
      return this.$store.state.hasSingin
    }
  },
  methods: {
    getUserInfo () {
      for (var key in this.search) {
        if (this.search[key] === null || this.search[key] === '') {
          delete this.search[key]
        }
      }
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/user/list',
        data: JSON.stringify(this.search)
      })
        .then(res => {
          this.item = res.data.info.list[0]
          this.sex =this.sexString[this.item.sex]
        })
        .catch()
    },
   updateClick () {
      this.iswaitting = true
      this.item.sex = this.sexString.indexOf(this.sex)
      fetch({
        method: 'Post',
        url: this.$store.state.host + '/user/updateUser',
        data: JSON.stringify(this.item)
      })
      .then(this.iswaitting = false)
      .catch()
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
