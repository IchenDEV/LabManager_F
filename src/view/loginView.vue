<template>
  <div class="flex-panel">
    <Card :class="{'modelCard':$store.state.modal}" :bordered="false">
      <h1>{{ $t('message.login') }}</h1>
      <login />
    </Card>
    <Card :class="{'modelCard':$store.state.modal}" :bordered="false">
      <h1>{{ $t('message.or') }} {{ $t('message.singup') }}</h1>
      <sing-up />
    </Card>
  </div>
</template>
<script>
import login from '@/components/login/login'
import singUp from '@/components/singUp/singUp'
export default {
  name: 'LoginView',
  components: {login, singUp}
}
</script>
