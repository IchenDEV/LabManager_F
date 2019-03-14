<template>
  <div>
    <div class="flex-panel warp">
      <Card :class="{'modelCard':$store.state.modal}" :bordered="false" class="max-w" >
        <add-lab @added="refresh" />
      </Card>
      <lab-list ref="labList" />
    </div>
  </div>
</template>
<script>
import AddLab from "@/components/lab/AddLab";
import labList from "@/components/lab/labList";
export default {
  components: { AddLab, labList },
  methods:{
    refresh (){
      this.$refs.labList.getInfo()
    }
  }
};
</script>

