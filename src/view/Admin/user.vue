<template>
<div>
  <div class="flex-panel warp">
    <Card class="card">
      <add-user/>
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
}
</script>
<style>
.warp {
  flex-wrap: wrap;
}
@media only screen and (min-width: 1208px) {
  .warp {
    flex-wrap: nowrap;
  }
  .card {
    max-height: 400px;
  }
}
</style>
