<template>
  <div>
    <book-device :device="$route.params.id"></book-device>
  </div>
</template>
<script>
import bookDevice from "@/components/Device/BookDevice";
export default {
  components: { bookDevice }
};
</script>
