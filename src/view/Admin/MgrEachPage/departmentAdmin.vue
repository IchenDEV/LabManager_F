<template>
  <div>
    <Card :bordered="false">
      <h2>{{ $t('message.modify') }} {{ $t('message.department') }}</h2>
      <div class="flex-panel">
        <ui-textbox
          v-model="item.name"
          icon="phone"
          floating-label
          :label="$t('message.name')"
        />
        <ui-textbox
          v-model="item.description"
          icon="phone"
          floating-label
          :label="$t('message.description')"
        />
      </div>
      <ui-button
        color="primary"
        icon="update"
        :loading="iswaitting"
        @click="updateClick"
      >
        {{ $t('message.update') }}
      </ui-button>
    </Card>
    <div class="flex-panel">
      <Card :bordered="false">
        <div>
          <h2>{{ $t('message.add') }} {{ $t('message.user') }}</h2>
          <user-selector
            v-model="s"
            :label="$t('message.user')"
          />
          <ui-button
            color="primary"
            icon="add"
            :loading="iswaitting"
            @click="addUserClick"
          >
            添�
          </ui-button>
        </div>
      </Card>
      <Card
        v-for="(item,index) in userInfo.list"
        :key="index"
        :bordered="false"
      >
        <div>
          <h2>{{ $t('message.user') }} {{ item.user }}</h2>
          <p>{{ $t('message.Uname') }} {{ item.nickname }}</p>
          <ui-button
            color="primary"
            icon="delete"
            :loading="iswaitting"
            @click="deleteUserClick(item.id)"
          >
            {{ $t('message.delete') }}
          </ui-button>
        </div>
      </Card>
    </div>
    <Page
      v-if="userInfo.totalPage>1"
      size="small"
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
  mounted() {
    this.getDepartmentInfo();
  },
  methods: {
    getDepartmentInfo() {
      tools.easyfetch(tools.Api.ListDepartment, this.search).then(res => {
        this.item = res.data.info.list[0];
      });
      this.getDepartmentUserInfo();
    },
    getDepartmentUserInfo() {
      tools.easyfetch(tools.Api.ListDepartmentUser, this.search2).then(res => {
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
      tools.easyfetch(tools.Api.AddDepartmentUser, con).then(() => {
        this.iswaitting = false;
        this.getDepartmentInfo;
      });
    },
    deleteUserClick(id) {
      this.iswaitting = true;
      let con = { id: id };
      tools.easyfetch(tools.Api.DelDepartmentUser, con).then(() => {
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
      tools.easyfetch(tools.Api.UpdateDepartment, this.item).then(() => {
        this.iswaitting = false;
        this.getDepartmentInfo;
      });
    }
  }
};
</script>
