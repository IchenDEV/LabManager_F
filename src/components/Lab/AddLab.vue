<template>
  <div>
    <h2>{{ $t('message.create') }} {{ $t('message.lab') }}</h2>
    <ui-textbox
      v-model="con.name"
      icon="person"
      floating-label
      :label="$t('message.name')"
    />
    <ui-textbox
      v-model="con.description"
      icon="lock"
      floating-label
      :label="$t('message.description')"
    />
    <ui-textbox
      v-model="con.location"
      icon="not_listed_location"
      floating-label
      :label="$t('message.location')"
    />
    <ui-button
      color="primary"
      icon="check"
      :loading="iswaitting"
      :disabled="disable"
      @click="addClicked"
    >
      {{ $t('message.create') }}
    </ui-button>
  </div>
</template>
<script>
import tools from '@/util/tools.js'
export default {
  data () {
    return {
      con: {
        name: '',
        description: '',
        location: '',
        status: 1
      },
      iswaitting: false
    }
  },
  computed :{
    disable (){
      return this.con.name==''||this.con.description==''||this.con.location==''
    }
  },
  methods: {
    addClicked () {
      this.iswaitting = true
      tools.easyfetch(tools.Api.AddLab,this.con)
      this.iswaitting = false
      this.$emit('added')
    }
  }
}
</script>
