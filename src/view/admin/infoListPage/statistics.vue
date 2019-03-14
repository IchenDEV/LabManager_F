<template>
  <div>
    <h1>{{ $t('message.statistics') }}</h1>
    <div class="flex-panel">
      <Card :class="{'modelCard':$store.state.modal}" :bordered="false" style="min-inline-size:350px;">
        <total-use-rate />
      </Card>
      <Card :class="{'modelCard':$store.state.modal}" :bordered="false">
        <counts />
      </Card>
      <Card :class="{'modelCard':$store.state.modal}" :bordered="false">
        <rate />
      </Card>
    </div>
  </div>
</template>
<script>
import totalUseRate from "@/components/statistics/totalUseRate";
import counts from "@/components/statistics/counts";
import rate from "@/components/statistics/rate";
export default {
  components: { rate, counts,totalUseRate }
};
</script>
