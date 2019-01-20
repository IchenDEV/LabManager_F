<template>
    <div class="navbar">

        <p>{msg}<p>
    </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  props: ['mag']
}
</script>

<style>

</style>
