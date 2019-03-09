<template>
  <div>
    <Card :bordered="false">
      <h1>{{ $t('message.device') }} {{ $t('message.list') }}</h1> 
      <div class="flex-panel">
        <ui-textbox
          v-model="search.name"
          icon="person"
          floating-label
          :label="$t('message.name')"
        />
        <ui-textbox
          v-model="search.No"
          icon="person"
          floating-label
          :label="$t('message.No')"
        />
        <ui-textbox
          v-model="search.model"
          icon="person"
          floating-label
          :label="$t('message.model')"
        />
        <ui-textbox
          v-model="search.bands"
          icon="person"
          floating-label
          :label="$t('message.band')"
        />
        <ui-textbox
          v-model="search.requireReputation"
          icon="person"
          floating-label
          :label="$t('message.requireReputation')"
        />
        <ui-textbox
          v-model="search.func"
          icon="person"
          floating-label
          :label="$t('message.func')"
        />
        <ui-select
          v-model="search.device"
          has-search
          :label="$t('message.lab')"
          placeholder="All"
          type="image"
          :options="labInfo.list"
          :keys="{ label: 'name', value: 'id' }"
        />
      </div>
      <ui-button
        color="primary"
        icon="search"
        @click="searchClicked"
      >
        {{ $t('message.search') }}
      </ui-button>
    </Card>
    <div class="flex-panel">
      <Card
        v-for="(item,index) in info.list"
        :key="index"
        :bordered="false"
      >
        <div>
          <span>
            <h2>{{ $t('message.device') }} {{ item.id }}</h2>
            <Tag
              v-if="item.status===1"
              color="success"
            >{{ $t('message.normal') }}</Tag>
            <Tag
              v-if="item.status===4"
              color="error"
            >{{ $t('message.error') }}</Tag>
            <Tag
              v-if="item.status===0"
              color="error"
            >{{ $t('message.scrap') }}</Tag>
            <Tag
              v-if="item.status===3"
              color="warning"
            >{{ $t('message.pause') }}</Tag>
            <Tag color="success">{{ item.func }}</Tag>
          </span>
          <p>{{ $t('message.name') }} {{ item.name }}</p>
          <p>{{ $t('message.No') }} {{ item.No }}</p>
          <p>{{ $t('message.band') }} {{ item.bands }}</p>
          <p>{{ $t('message.description') }} {{ item.description }}</p>
          <p>{{ $t('message.model') }} {{ item.model }}</p>
          <p>{{ $t('message.lab') }} {{ item.locationName }}</p>
         
          <p>{{ item.locationDescription }}</p>
          <p>{{ $t('message.address') }} {{ item.locationAddress }}</p>
          <ui-button
            v-if="!admin&&item.status===1"
            color="primary"
            icon="book"
            @click="bookClicked(item.id)"
          >
            {{ $t('message.appointment') }}
          </ui-button>
          <ui-button
            v-if="admin"
            color="primary"
            icon="delete"
            @click="modifyClicked(item.id)"
          >
            {{ $t('message.modify') }}
          </ui-button>
          <ui-button
            v-if="admin"
            color="primary"
            icon="delete"
            @click="delClicked(item.id,index)"
          >
            {{ $t('message.delete') }}
          </ui-button>
        </div>
      </Card>
      <Card
        v-if="info.totalCount===0"
        :bordered="false"
      >
        <div>{{ $t('message.findless') }}{{ $t('message.device') }}</div>
      </Card>
    </div>
    <Page
      v-if="info.totalPage>1"
      size="small"
      :total="info.totalCount"
      :page-size="search.pageRow"
      show-elevator
      @on-change="onPageChange"
    />
  </div>
</template>
<script>
import router from "@/router";
import tools from "@/util/tools.js";
export default {
  props: { admin: { default: false } },
  data() {
    return {
      labInfo: { list: [] },
      info: {},
      search: {
        model: "",
        band: "",
        name: "",
        No: "",
        requireReputation:"",
        device: -1,
        pageRow: 10,
        pageNum: 1
      }
    };
  },
  mounted() {
    if (this.$store.state.hasSingin === true) {
      this.getInfo();
      this.getLabInfo();
    }
  },
  methods: {
    bookClicked(i) {
      router.push("device/" + i);
    },
    getInfo() {
      tools.easyfetch(tools.Api.ListDevice,this.search)
        .then(res => {
          this.info = res.data.info;
        })
        .catch();
    },
    getLabInfo() {
      let conp = { pageRow: 100, offSet: 0 }
      tools.easyfetch(tools.Api.ListLab,conp)
        .then(res => {
          this.labInfo = res.data.info;
          var temp = { name: "All", id: -1 };
          this.labInfo.list.splice(0, 0, temp);
        })
        .catch();
    },
    searchClicked() {
      if (this.search.device.id < 0) {
        delete this.search.location;
      } else {
        this.search.location = this.search.device.id;
      }
      this.getInfo();
    },
    onPageChange(page) {
      this.search.pageNum = page;
      this.getInfo();
    },
    delClicked(id, index) {
      let da = { id: id };
      this.info.list.splice(index, 1);
      tools.easyfetch(tools.Api.DelDevice,da).then()
    }
  }
};
</script>
