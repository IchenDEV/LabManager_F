<template>
  <div>
    <h2>{{$t('message.user')}} {{$t('message.list')}}</h2>
    <div class="flex-panel">
      <Card class="ms-depth-16" v-if="$store.state.isListMode">
        <ou-spinner v-if="users.list==null||users.list==''" label="Loading..." type="large"/>
        <ou-list style="text-align:left;">
          <ou-list-item
            v-for="(item,index) in users.list"
            :key="index"
            isSelectable
            :primaryText="item.id+' '+item.username+' '+item.nickname"
            :secondaryText="item.roleName"
            :tertiaryText="$t('message.sex')+':'+sexString[item.sex]"
            :metaText="item.createTime"
          >
            <ou-list-actions>
              <ou-list-action-item
                v-if="item.id!==10003&&$store.state.isSuperAdmin"
                icon="Delete"
                @click="delClicked(item.id,index)"
              ></ou-list-action-item>
              <ou-list-action-item
                v-if="item.id!==10003&&$store.state.isSuperAdmin"
                icon="Edit"
                @click="moClicked(item.id)"
              ></ou-list-action-item>
            </ou-list-actions>
          </ou-list-item>
        </ou-list>
      </Card>
      <Card v-else class="ms-depth-16" v-for="(item,index) in users.list" :key="index">
        <p slot="title">{{$t('message.username')}} {{item.username}}</p>
        <p>{{$t('message.user')}} id {{item.id}}</p>
        <p>{{$t('message.Uname')}} {{item.nickname}}</p>
        <p>{{$t('message.role')}} {{item.roleName}}</p>
        <p>{{$t('message.sex')}} {{sexString[item.sex]}}</p>
        <span>
          <ui-button
            v-if="item.id!==10003&&$store.state.isSuperAdmin"
            color="primary"
            icon="adjust"
            @click="moClicked(item.id)"
            :loading="iswaitting"
          >{{$t('message.modify')}}</ui-button>
          <ui-button
            v-if="item.id!==10003&&$store.state.isSuperAdmin"
            color="primary"
            icon="delete"
            @click="delClicked(item.id,index)"
            :loading="iswaitting"
          >{{$t('message.delete')}}</ui-button>
        </span>
      </Card>
    </div>
    <Page
      size="small"
      v-if="users.totalPage>1"
      :total="users.totalPage"
      :page-size="users.pageRow"
      show-elevator
      @on-change="onPageChange"
    />
  </div>
</template>
<script>
import tools from "@/util/tools.js";
import router from "@/router";
export default {
  data() {
    return {
      users: {},
      conp: { pageRow: 10 },
      iswaitting: false,
      sexString: [
        this.$t("message.unknow"),
        this.$t("message.male"),
        this.$t("message.female"),
        this.$t("message.other")
      ]
    };
  },
  methods: {
    getInfo() {
      this.iswaitting = true;
      tools
        .easyfetch(tools.Api.ListUser, this.conp)
        .then(res => {
          this.users = res.data.info;
          this.iswaitting = false;
        })
        .catch();
    },
    onPageChange(page) {
      this.conp.pageNum = page;
      this.getInfo();
    },
    delClicked(id, index) {
      this.users.list.splice(index, 1);
      let da = { id: id };
      tools
        .easyfetch(tools.Api.DelUser, da)
        .then()
        .catch();
    },
    moClicked(id) {
      router.push("user/" + id.toString());
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>
