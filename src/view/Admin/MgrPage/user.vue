<template>
  <div>
    <div class="flex-panel warp ">
      <Card
        v-if="$store.state.isSuperAdmin"
        :bordered="false"
        class="card max-w"
      >
        <add-user @added="rel" />
      </Card>
      <list-user ref="userList" />
    </div>
  </div>
</template>
<script>
import AddUser from '@/components/User/AddUser'
import ListUser from '@/components/User/ListUser'
export default {
  components: { AddUser, ListUser },
  methods:{
    rel (){
      this.$refs.userList.getInfo()
    }
  }
}
</script>
