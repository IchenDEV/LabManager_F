<template>
  <div>
    <h1>{{ $t('message.statistics') }}</h1>
    <div class="flex-panel">
      <Card   style="min-inline-size:350px;">
        <total-use-rate />
      </Card>
      <Card  >
        <counts />
      </Card>
      <Card  >
        <rate />
      </Card>
      <Card  >
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
