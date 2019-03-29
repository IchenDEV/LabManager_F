<template>
  <div>
    <h1>{{ $t('message.statistics') }}</h1>
    <div class="col-panel">
      <Card class="ms-depth-16">
        <total-use-rate />
      </Card>
      <Card class="ms-depth-16"  >
        <counts />
      </Card>
      <Card class="ms-depth-16"  >
        <rate />
      </Card>
      <Card class="ms-depth-16"  >
        <monthly-rate />
      </Card>
    </div>
  </div>
</template>
<script>
import totalUseRate from "@/components/statistics/totalUseRate";
import counts from "@/components/statistics/counts";
import rate from "@/components/statistics/rate";
import monthlyRate from "@/components/statistics/monthlyRate";
export default {
  components: { rate, counts,totalUseRate,monthlyRate }
};
</script>
