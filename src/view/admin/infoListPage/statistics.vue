<template>
  <div>
    <h1>{{ $t('message.statistics') }}</h1>
    <div class="flex-panel">
      <Card :class="{'modelCard':$store.state.modal}"  style="min-inline-size:350px;">
        <total-use-rate />
      </Card>
      <Card :class="{'modelCard':$store.state.modal}" >
        <counts />
      </Card>
      <Card :class="{'modelCard':$store.state.modal}" >
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
