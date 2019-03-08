<template>
<div class="flex-panel">
  <Card :bordered="false" >
<h1>{{$t('message.login')}}</h1>
<Login></Login>
  </Card>
  <Card :bordered="false" >
<h1>{{$t('message.or')}} {{$t('message.singup')}}</h1>
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
