<template>
  <div>
    <Card :bordered="false">
      <h2>{{ $t('message.modify') }} {{ $t('message.user') }}</h2>
      <div class="flex-panel">
        <ui-textbox
          v-model="item.nickname"
          icon="person"
          floating-label
          :label="$t('message.Uname')"
        />
        <ui-textbox
          v-model="item.phone"
          icon="phone"
          floating-label
          :label="$t('message.phone')"
        />
        <ui-textbox
          v-model="item.address"
          icon="phone"
          floating-label
          :label="$t('message.address')"
        />
        <ui-textbox
          v-model="item.reputation"
          icon="phone"
          floating-label
          :label="$t('message.reputation')"
        />
        <ui-select
          v-model="sex"
          icon="person"
          floating-label
          :label="$t('message.sex')"
          :options="sexString"
        />
        <ui-select
          v-model="role"
          icon="person"
          floating-label
          :label="$t('message.role')"
          :options="roleString"
        />
        <ui-textbox
          v-model="item.email"
          icon="mail"
          :invalid="ismail === false"
          floating-label
          :label="$t('message.email')"
          :error="$t('message.wrongEmail')"
        />
      </div>
      <ui-button
        color="primary"
        icon="fingerprint"
        :loading="iswaitting"
        @click="updatePassword"
      >
        {{ $t('message.modify') }} {{ $t('message.password') }}
      </ui-button>
      <ui-button
        v-if="item.roleId===1"
        color="primary"
        icon="update"
        :loading="iswaitting"
        @click="updateSuperPassword"
      >
        {{ $t('message.modify') }} {{ $t('message.superPassword') }}
      </ui-button>
      <ui-button
        color="primary"
        icon="fingerprint"
        :loading="iswaitting"
        @click="inputSuper"
      >
        {{ $t('message.update') }}
      </ui-button>
    </Card>
    <ui-modal
      ref="SuperPasswordmModal"
      :title="$t('message.inputCurrentSuperPassword')"
    >
      <ui-textbox
        v-model="item.adminSuperPassword"
        icon="phone"
        floating-label
        :label="$t('message.superPassword')"
        type="password"
      />
      <ui-button
        color="primary"
        icon="update"
        :loading="iswaitting"
        @click="updateClick"
      >
        {{ $t('message.update') }}
      </ui-button>
    </ui-modal>
    <ui-modal
      ref="PasswordmModal"
      :title="$t('message.inputNewPassword')"
    >
      <ui-textbox
        v-model="item.password"
        icon="lock"
        floating-label
        :label="$t('message.password')"
        type="password"
      />
      <ui-button
        color="primary"
        icon="update"
        :loading="iswaitting"
        @click="doneClick"
      >
        {{ $t('message.done') }}
      </ui-button>
    </ui-modal>
    <ui-modal
      ref="PasswordmModal2"
      :title="$t('message.inputNewSuperPassword')"
    >
      <ui-textbox
        v-model="item.superPassword"
        icon="lock"
        floating-label
        :label="$t('message.password')"
        type="password"
      />
      <ui-button
        color="primary"
        icon="update"
        :loading="iswaitting"
        @click="doneClick"
      >
        {{ $t('message.done') }}
      </ui-button>
    </ui-modal>
  </div>
</template>
<script>
import tools from '@/util/tools.js'
import stringCK from "@/util/stringCK.js"
export default {
  data() {
    return {
      search: { id: this.$route.params.id, pageRow: 1 },
      item: {},
      iswaitting: false,
      sexString: [this.$t('message.unknow'),this.$t('message.male'), this.$t('message.female'), this.$t('message.other')],
      sex: 0,
      roleString: [this.$t('message.superAdmin'), this.$t('message.admin'), this.$t('message.user')],
      role: 2
    };
  },
  computed: {
    ismail() {
      return stringCK.isEmail(this.item.email);
    },
    hasSingin() {
      return this.$store.state.hasSingin;
    }
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      tools.easyfetch(tools.Api.ListUser,this.search)
        .then(res => {
          this.item = res.data.info.list[0];
          this.sex = this.sexString[this.item.sex];
          this.role = this.roleString[this.item.roleId - 1];
        })
        .catch();
    },
    inputSuper() {
      this.$refs["SuperPasswordmModal"].open();
    },
    updatePassword() {
      this.$refs["PasswordmModal"].open();
    },
    updateSuperPassword() {
      this.$refs["PasswordmModal2"].open();
    },
    doneClick () {
      this.$refs["PasswordmModal2"].close();
      this.$refs["PasswordmModal"].close();
    },
    updateClick() {
      this.item.adminSuperPassword = tools.sha3(this.item.adminSuperPassword.toString())
      this.iswaitting = true;
      this.item.sex = this.sexString.indexOf(this.sex);
      this.item.roleId = this.roleString.indexOf(this.role)+1;
      this.item.adminId = this.$store.state.currentUser.id;

      if (this.item.password != null && this.item.password !='') {
        this.item.password = tools.sha3(this.item.password);
      }
      if (this.item.superPassword != null && this.item.superPassword != '') {
        this.item.superPassword = tools.sha3(this.item.superPassword);
      }

      delete this.item["permissionList"];
      tools.easyfetch(tools.Api.UpdateUser,this.item)
      .then(()=>{this.iswaitting = false;this.getUserInfo();this.$refs["SuperPasswordmModal"].close();})
      .catch()
    }
  }
};
</script>
