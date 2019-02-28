<template>
  <div>
    <ui-button color="primary" has-dropdown ref="dropdownButton">
      <ui-menu
        contain-focus
        has-icons
        has-secondary-text
        slot="dropdown"
        :options="langOptions"
        :keys="{ label: 'friendlyName', value: 'id' }"
        @close="$refs.dropdownButton.closeDropdown()"
        @select="langChange"
      ></ui-menu>
      {{$t("message.currentLanguage")}}
    </ui-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      langOptions: [
        { friendlyName: "简体中文", id: "zh-cn" },
        { friendlyName: "English", id: "en" }
      ]
    };
  },
  methods: {
    langChange(e) {
      this.$i18n.locale = e.id;
      document.title=this.$t('message.productName')
    }
  }
};
</script>


