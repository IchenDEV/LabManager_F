<template>
  <div>
    <div class="flex-panel warp ">
      <Card :class="{'modelCard':$store.state.modal}" v-if="$store.state.isSuperAdmin" :bordered="false" class="Card max-w"
      >
        <add-user @added="refresh" />
      </Card>
      <user-list ref="userList" />
    </div>
  </div>
</template>
<script>
import AddUser from '@/components/user/AddUser'
import userList from '@/components/user/userList'
export default {
  components: { AddUser, userList },
  methods:{
    refresh (){
      this.$refs.userList.getInfo()
    }
  }
}
</script>
