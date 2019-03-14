<template>
  <div>
    <h1>{{ $t('message.personalInfo') }}</h1>
    <vue-qr v-if="qrid!=0" :text="qrid" qid="testid" style="border-radius:10px;"/>
    <Card :class="{'modelCard':$store.state.modal}" :bordered="false">
      <current-user-box/>
    </Card>
  </div>
</template>
<script>
import VueQr from "vue-qr";
import currentUserBox from "@/components/currentUserBox/currentUserBox";
export default {
  name: "MyView",
  components: { VueQr, currentUserBox },
  data() {
    return {
      qrid: this.$store.state.currentUser.id.toString()
    };
  }
};
</script>
