<template>
  <div class="flex-panel">
    <Card :class="{'modelCard':$store.state.modal}" :bordered="false">
      <h1>{{ $t('message.login') }}</h1>
      <Login />
    </Card>
    <Card :class="{'modelCard':$store.state.modal}" :bordered="false">
      <h1>{{ $t('message.or') }} {{ $t('message.singup') }}</h1>
      <sing-up />
    </Card>
  </div>
</template>
<script>
import Login from '../components/Login/Login'
import SingUp from '../components/SingUp/SingUp'
export default {
  name: 'LoginView',
  components: {Login, SingUp}
}
</script>
