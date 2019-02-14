<template>
<div class="flex-panel">
  <Card>
<h1>登录</h1>
<Login></Login>
  </Card>
  <Card>
<h1>或 注册</h1>
<sing-up></sing-up>
  </Card>
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
