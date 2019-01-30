<template>
<div>
<Login></Login>
<sing-up></sing-up>
</div>
</template>
<script>
import Login from '../components/Login/Login'
import SingUp from '../components/SingUp/SingUp'
export default {
  name: 'loginView',
  components: {Login, SingUp}
}
</script>
