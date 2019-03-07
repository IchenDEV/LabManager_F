<template>
  <div>
    <h1>{{$t('message.statistics')}}</h1>
    <Card>
      <rate></rate>
    </Card>
    <Card style="margin-top:20px;">
      <counts></counts>
    </Card>
  </div>
</template>
<script>
import rate from "@/components/Statistics/rate";
import counts from "@/components/Statistics/counts";
export default {
  components: { rate, counts }
};
</script>
<style>
.gauge {
  min-width: 400px;
  min-height: 400px;
}
</style>
