<template>
  <div>
    <ui-button
      ref="dropdownButton"
      icon="g_translate"
      color="primary"
      has-dropdown
    >
      <ui-menu
        slot="dropdown"
        contain-focus
        has-icons
        has-secondary-text
        :options="langOptions"
        :keys="{ label: 'friendlyName', value: 'id' }"
        @close="$refs.dropdownButton.closeDropdown()"
        @select="langChange"
      />
      {{ $t("message.currentLanguage") }}
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


