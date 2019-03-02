<template>
<div>
  <div class="flex-panel warp">
    <Card  v-if="$store.state.isSuperAdmin" class="card">
      <add-user @added='rel'/>
    </Card>
   <list-user></list-user>
  </div>
</div>
</template>
<script>
import AddUser from '@/components/User/AddUser'
import ListUser from '@/components/User/ListUser'
export default {
  components: { AddUser, ListUser },
  inject:  ['reloadAdmin'],
  methods:{
    rel (){
      this.reloadAdmin
    }
  }
}
</script>
