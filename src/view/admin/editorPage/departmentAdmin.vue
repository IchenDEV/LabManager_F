<template>
  <div>
    <Card class="ms-depth-16">
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
      <Card class="ms-depth-16">
        <div>
          <h2>{{$t('message.add')}} {{$t('message.user')}}</h2>
          <user-selector v-model="s" :label="$t('message.user')"></user-selector>
          <ui-button
            color="primary"
            icon="add"
            @click="addUserClick"
            :loading="iswaitting"
          >{{$t('message.add')}}</ui-button>
        </div>
      </Card>
      <Card class="ms-depth-16" v-if="$store.state.isListMode">
        <ou-list style="text-align:left;">
          <ou-list-item
            v-for="(item,index) in userInfo.list"
            :key="index"
            isSelectable
            :primaryText="item.nickname"
            :tertiaryText="item.user.toString()"
            :metaText="item.createTime"
          >
            <ou-list-actions>
              <ou-list-action-item icon="Delete" @click="deleteUserClick(item.id)"></ou-list-action-item>
            </ou-list-actions>
          </ou-list-item>
        </ou-list>
      </Card>
      <Card class="ms-depth-16" v-else v-for="(item,index) in userInfo.list" :key="index">
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
import userSelector from "@/components/user/userSelector";
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
      tools.easyfetch(tools.Api.ListDepartment, this.search).then(res => {
        this.item = res.data.info.list[0];
        this.getDepartmentUserInfo();
      });
    },
    getDepartmentUserInfo() {
      tools.easyfetch(tools.Api.ListDepartmentUser, this.search2).then(res => {
        this.userInfo = res.data.info;
      });
    },
    addUserClick() {
      this.$Loading.start();
      let con = {
        user: this.s.id,
        department: this.$route.params.id,
        status: 1
      };
      tools.easyfetch(tools.Api.AddDepartmentUser, con).then(() => {
        this.$Loading.finish();
        this.$Notice.success({
          title: "Success"
        });
        this.getDepartmentInfo();
      });
    },
    deleteUserClick(id) {
      this.$Loading.start();
      let con = { id: id };
      tools.easyfetch(tools.Api.DelDepartmentUser, con).then(() => {
        this.$Loading.finish();
        this.$Notice.success({
          title: "Success"
        });
        this.getDepartmentInfo();
      });
    },
    onPageChange(page) {
      this.search2.pageNum = page;
      this.getDepartmentUserInfo();
    },
    updateClick() {
      this.$Loading.start();
      tools.easyfetch(tools.Api.UpdateDepartment, this.item).then(() => {
        this.$Loading.finish();
        this.$Notice.success({
          title: "Success"
        });
        this.getDepartmentInfo();
      });
    }
  },
  mounted() {
    this.getDepartmentInfo();
  }
};
</script>
