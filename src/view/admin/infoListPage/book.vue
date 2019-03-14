<template>
  <div>
    <div class="flex-panel">
      <book-list/>
    </div>
  </div>
</template>
<script>
import bookList from "@/components/book/bookList";
export default {
  components: { bookList }
};
</script>
