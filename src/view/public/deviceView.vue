<template>
  <div>
    <book-the-device :device="$route.params.id" />
  </div>
</template>
<script>
import bookTheDevice from "@/components/device/bookTheDevice";
export default {
  components: { bookTheDevice }
};
</script>
