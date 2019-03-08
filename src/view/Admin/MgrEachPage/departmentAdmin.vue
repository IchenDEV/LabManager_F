<template>
  <div>
    <Card :bordered="false" >
      <h2>{{$t('message.modify')}} {{$t('message.department')}}</h2>
      <div class="flex-panel">
        <ui-textbox icon="phone" floating-label :label="$t('message.name')" v-model="item.name"></ui-textbox>
        <ui-textbox
          icon="phone"
          floating-label
          :label="$t('message.description')"
          v-model="item.description"
        ></ui-textbox>
      </div>
      <ui-button
        color="primary"
        icon="update"
        @click="updateClick"
        :loading="iswaitting"
      >{{$t('message.update')}}</ui-button>
    </Card>
    <div class="flex-panel">
      <Card :bordered="false" >
        <div>
          <h2>{{$t('message.add')}} {{$t('message.user')}}</h2>
          <user-selector v-model="s" :label="$t('message.user')"></user-selector>
          <ui-button color="primary" icon="add" @click="addUserClick" :loading="iswaitting">æ·»åŠ</ui-button>
        </div>
      </Card>
      <Card :bordered="false"  v-for="(item,index) in userInfo.list" :key="index">
        <div>
          <h2>{{$t('message.user')}} {{item.user}}</h2>
          <p>{{$t('message.Uname')}} {{item.nickname}}</p>
          <ui-button
            color="primary"
            icon="delete"
            @click="deleteUserClick(item.id)"
            :loading="iswaitting"
          >{{$t('message.delete')}}</ui-button>
        </div>
      </Card>
    </div>
    <Page
      size="small"
      v-if="userInfo.totalPage>1"
      :total="userInfo.totalPage"
      :page-size="search2.pageRow"
      show-elevator
      @on-change="onPageChange"
    />
  </div>
</template>
<script>
import tools from "@/util/tools.js";
import userSelector from "@/components/User/UserSelector";
export default {
  components: { userSelector },
  data() {
    return {
      search: { id: this.$route.params.id, pageRow: 1 },
      search2: { department: this.$route.params.id, pageRow: 10, pageNum: 1 },
      item: {},
      userInfo: {},
      s: {},
      iswaitting: false
    };
  },
  methods: {
    getDepartmentInfo() {
      tools.esayfetch(tools.Api.ListDepartment, this.search).then(res => {
        this.item = res.data.info.list[0];
      });
      this.getDepartmentUserInfo();
    },
    getDepartmentUserInfo() {
      tools.esayfetch(tools.Api.ListDepartmentUser, this.search2).then(res => {
        this.userInfo = res.data.info;
      });
    },
    addUserClick() {
      this.iswaitting = true;
      let con = {
        user: this.s.id,
        department: this.$route.params.id,
        status: 1
      };
      tools.esayfetch(tools.Api.AddDepartmentUser, con).then(() => {
        this.iswaitting = false;
        this.getDepartmentInfo;
      });
    },
    deleteUserClick(id) {
      this.iswaitting = true;
      let con = { id: id };
      tools.esayfetch(tools.Api.DelDepartmentUser, con).then(() => {
        this.iswaitting = false;
        this.getDepartmentInfo;
      });
    },
    onPageChange(page) {
      this.search2.pageNum = page;
      this.getDepartmentUserInfo();
    },
    updateClick() {
      this.iswaitting = true;
      tools.esayfetch(tools.Api.UpdateDepartment, this.item).then(() => {
        this.iswaitting = false;
        this.getDepartmentInfo;
      });
    }
  },
  mounted() {
    this.getDepartmentInfo();
  }
};
</script>
