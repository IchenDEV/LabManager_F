<template>
  <div v-if="data.info.totalCount>0">
    <Card class="ms-depth-16" v-if="$store.state.isListMode" >
      <ou-list style="text-align:left;">
        <ou-list-item
          v-for="(item,index) in data.info.list"
          :key="index"
          isSelectable
          :primaryText="item.name"
          :tertiaryText="item.description"
          :metaText="$t('message.'+item.type)"
        >
          <ou-list-actions>
            <ou-list-action-item icon="View" @click="viewClicked(item.id,item.type)"></ou-list-action-item>
          </ou-list-actions>
        </ou-list-item>
      </ou-list>
    </Card>
    <div v-else class="flex-panel">
      <Card class="ms-depth-16" v-for="(item,index) in data.info.list" :key="index">
        <div>
          <Tag>{{$t('message.'+item.type)}}</Tag>
          <p>{{$t('message.name')}} {{item.name}}</p>
          <p>{{$t('message.description')}} {{item.description}}</p>
        </div>
        <ui-button
          v-if="item.type=='device'"
          color="primary"
          icon="book"
          @click="bookClicked(item.id)"
        >{{$t('message.appointment')}}</ui-button>
      </Card>
      <Card class="ms-depth-16" v-if="data.info.totalCount===0">
        <div>{{$t('message.findless')}}{{$t('message.device')}}</div>
      </Card>
    </div>
    <Page
      size="small"
      v-if="data.info.totalPage>1"
      :total="data.info.totalCount"
      page-size="10"
      show-elevator
      @on-change="onPageChange"
    />
  </div>
</template>
<script>
import router from "@/router";
export default {
  props: { data: { default: {} } },
  methods: {
    bookClicked(i) {
      router.push("device/" + i);
    },
    viewClicked(id, type) {
      router.push("../" + type + "/" + id);
    }
  }
};
</script>
