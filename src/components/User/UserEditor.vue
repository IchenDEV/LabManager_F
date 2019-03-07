<template>
  <div>
    <Card>
      <h2>{{$t('message.modify')}} {{$t('message.user')}}</h2>
      <div class="flex-panel">
        <ui-textbox icon="person" floating-label :label="$t('message.Uname')" v-model="item.nickname"></ui-textbox>
        <ui-textbox icon="phone" floating-label :label="$t('message.phone')" v-model="item.phone"></ui-textbox>
        <ui-textbox icon="phone" floating-label :label="$t('message.address')" v-model="item.address"></ui-textbox>
        <ui-textbox icon="phone" floating-label :label="$t('message.reputation')" v-model="item.reputation"></ui-textbox>
        <ui-select icon="person" floating-label :label="$t('message.sex')" :options="sexString" v-model="sex"></ui-select>
        <ui-select icon="person" floating-label :label="$t('message.role')" :options="roleString" v-model="role"></ui-select>
        <ui-textbox
          icon="mail"
          :invalid="ismail === false"
          floating-label
          :label="$t('message.email')"
          v-model="item.email"
          :error="$t('message.wrongEmail')"
        ></ui-textbox>
      </div>
      <ui-button color="primary" icon="update" @click="updatePassword" :loading="iswaitting">{{$t('message.modify')}} {{$t('message.password')}}</ui-button>
      <ui-button v-if="item.roleId===1" color="primary" icon="update" @click="updateSuperPassword" :loading="iswaitting">{{$t('message.modify')}} {{$t('message.superPassword')}}</ui-button>
      <ui-button color="primary" icon="update" @click="inputSuper" :loading="iswaitting">{{$t('message.update')}}</ui-button>
    </Card>
    <ui-modal ref="SuperPasswordmModal" :title="$t('message.inputCurrentSuperPassword')">
      <ui-textbox
        icon="phone"
        floating-label
        :label="$t('message.superPassword')"
        type="password"
        v-model="item.adminSuperPassword"
      ></ui-textbox>
      <ui-button color="primary" icon="update" @click="updateClick" :loading="iswaitting">{{$t('message.update')}}</ui-button>
    </ui-modal>
    <ui-modal ref="PasswordmModal" :title="$t('message.inputNewPassword')">
      <ui-textbox icon="lock" floating-label :label="$t('message.password')" type="password" v-model="item.password"></ui-textbox>
    <ui-button color="primary" icon="update" @click="doneClick" :loading="iswaitting">{{$t('message.done')}}</ui-button>
    </ui-modal>
    <ui-modal ref="PasswordmModal2" :title="$t('message.inputNewSuperPassword')">
      <ui-textbox
        icon="lock"
        floating-label
        :label="$t('message.password')"
        type="password"
        v-model="item.superPassword"
      ></ui-textbox>
      <ui-button color="primary" icon="update" @click="doneClick" :loading="iswaitting">{{$t('message.done')}}</ui-button>
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
  methods: {
    getUserInfo() {
      for (var key in this.search) {
        if (this.search[key] === null || this.search[key] === "") {
          delete this.search[key];
        }
      }
      tools.easyfetch(tools.Api.ListUser,this.search)
        .then(res => {
          this.item = res.data.info.list[0];
          this.sex = this.sexString[this.item.sex];
          this.role = this.roleString[this.item.roleId - 1];
          this.$store.commit("onDataReached", res.data,this); 
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
      for (var key in this.item) {
        if (this.item[key] === null || this.item[key] === "") {
          delete this.item[key];
        }
      }
      tools.easyfetch(tools.Api.UpdateUser,this.item)
      .then((res)=>{this.iswaitting = false;this.getUserInfo();this.$refs["SuperPasswordmModal"].close();this.$store.commit("onDataReached",res.data); })
      .catch()
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>
