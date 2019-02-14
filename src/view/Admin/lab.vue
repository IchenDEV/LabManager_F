<template>
  <div>
    <div class="flex-panel warp">
      <Card class="card">
        <add-lab/>
      </Card>
      <list-lab></list-lab>
    </div>
  </div>
</template>
<script>
import AddLab from "@/components/Lab/AddLab";
import ListLab from "@/components/Lab/ListLab";
export default {
  components: { AddLab, ListLab }
};
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

