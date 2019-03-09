<template>
  <div>
    <div class="flex-panel warp">
      <Card
        :bordered="false"
        class="card max-w"
      >
        <add-lab @added="rel" />
      </Card>
      <list-lab ref="labList" />
    </div>
  </div>
</template>
<script>
import AddLab from "@/components/Lab/AddLab";
import ListLab from "@/components/Lab/ListLab";
export default {
  components: { AddLab, ListLab },
  methods:{
    rel (){
      this.$refs.labList.getInfo()
    }
  }
};
</script>

