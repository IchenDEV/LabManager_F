<template>
  <div>
    <Card class="ms-depth-16">
      <h2>{{$t('message.department')}} {{item.name}}</h2>
      <p>{{item.description}}</p>
    </Card>
    <h3>部门成员</h3>
    <p>共{{userInfo.totalCount}}人</p>
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
            <ou-list-action-item icon="View" @click="viewClicked(item.user)"></ou-list-action-item>
          </ou-list-actions>
        </ou-list-item>
      </ou-list>
    </Card>
    <Card class="ms-depth-16" v-else v-for="(item,index) in userInfo.list" :key="index">
      <div>
        <h2>{{$t('message.user')}} {{item.user}}</h2>
        <p>{{$t('message.Uname')}} {{item.nickname}}</p>
      </div>
    </Card>
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
import router from "@/router";
import tools from "@/util/tools.js";
export default {
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
    onPageChange(page) {
      this.search2.pageNum = page;
      this.getDepartmentUserInfo();
    },
    viewClicked(id) {
      router.push("../user/" + id);
    }
  },
  mounted() {
    this.getDepartmentInfo();
  }
};
</script>
