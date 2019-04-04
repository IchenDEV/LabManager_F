<template>
  <div>
    <vue-qr v-if="qrid!=0" :text="qrid" qid="testid" style="border-radius:10px;"/>
    <Card class="ms-depth-16 center">
      <div class="flex-panel fc">
        <span>
          <h3>{{$t("message.Uname")}}</h3>
          <p>{{nickname}}</p>
        </span>
        <span>
          <h3>id</h3>
          <p>{{id}}</p>
        </span>
        <span>
          <h3>{{$t("message.sex")}}</h3>
          <p>{{sex}}</p>
        </span>
        <span>
          <h3>{{$t("message.reputation")}}</h3>
          <p>{{reputation}}</p>
        </span>
        <span>
          <h3>{{$t("message.role")}}</h3>
          <p>{{roleName}}</p>
        </span>
        <span>
          <h3>{{$t("message.phone")}}</h3>
          <p>{{phone}}</p>
        </span>
        <span>
          <h3>{{$t("message.email")}}</h3>
          <span style="word-wrap:break-word;">{{email}}</span>
        </span>
        <span>
          <h3>{{$t("message.address")}}</h3>
          <p>{{address}}</p>
        </span>
        <span>
          <h3>{{$t("message.department")}}</h3>
          <router-link
            v-for="(item,index) in dpinfo.list"
            :key="index"
            :to=" '/department/'+item.departmentId"
          >{{item.departmentName}}</router-link>
        </span>
        <span>
          <h3>{{$t("message.group")}}</h3>
          <router-link
            v-for="(item,index) in gpinfo.list"
            :key="index"
            :to=" '/group/'+item.groupId"
          >{{item.groupName}}</router-link>
        </span>
      </div>
    </Card>
  </div>
</template>
<script>
import tools from "@/util/tools.js";
import VueQr from "vue-qr";
export default {
  components: { VueQr },
  data() {
    return {
      iswaitting: false,
      mo: true,
      username: "",
      nickname: "",
      sex: "",
      address: "",
      phone: "",
      email: "",
      roleName: "",
      reputation: "",
      id: "",
      qrid: this.$route.params.id,
      sexString: [
        this.$t("message.unknow"),
        this.$t("message.male"),
        this.$t("message.female"),
        this.$t("message.other")
      ],
      dpinfo: {},
      gpinfo: {},
      search: { id: this.$route.params.id, pageRow: 1 }
    };
  },
  computed: {
    ismail() {
      return tools.isEmail(this.email);
    },
    hasSingin() {
      return this.$store.state.hasSingin;
    }
  },
  methods: {
    getinfo() {
      if (this.$store.state.hasSingin === true) {
        this.$Loading.start();
        tools
          .easyfetch(tools.Api.ListUser, this.search)
          .then(res => {
            if (res.data.code === "100") {
              this.nickname = res.data.info.list[0].nickname;
              this.phone = res.data.info.list[0].phone;
              this.address = res.data.info.list[0].address;
              this.email = res.data.info.list[0].email;
              this.sex = this.sexString[res.data.info.list[0].sex];
              this.roleName = res.data.info.list[0].roleName;
              this.id = res.data.info.list[0].id;
              this.reputation = res.data.info.list[0].reputation;
            }
            this.getDpinfo();
            this.getGpinfo();
            this.$Loading.finish();
          })
          .catch();
      }
    },
    getDpinfo() {
      this.$Loading.start();
      tools.easyfetch(tools.Api.ListUserDepartment, this.search).then(res => {
        if (res.data.code === "100") {
          this.dpinfo = res.data.info;
        }
        this.$Loading.finish();
      });
    },
    getGpinfo() {
      this.$Loading.start();
      tools.easyfetch(tools.Api.ListUserGroup, this.search).then(res => {
        if (res.data.code === "100") {
          this.gpinfo = res.data.info;
        }
        this.$Loading.finish();
      });
    }
  },
  mounted() {
    this.getinfo();
  }
};
</script>
<style>
.cf > span {
  width: 10rem;
}
</style>

