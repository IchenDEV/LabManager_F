<template>
  <div>
    <div class="flex-panel warp ">
      <Card class="ms-depth-16 max-w"  v-if="$store.state.isSuperAdmin">
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
