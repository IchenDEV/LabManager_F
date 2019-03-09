<template>
  <div>
    <h1>{{ $t('message.statistics') }}</h1>
    <div class="flex-panel">
      <Card :bordered="false">
        <rate />
      </Card>
      <Card :bordered="false">
        <counts />
      </Card>
    </div>
  </div>
</template>
<script>
import rate from "@/components/Statistics/totalUseRate";
import counts from "@/components/Statistics/counts";
export default {
  components: { rate, counts }
};
</script>
