<template>
  <div>
    <div class="flex-panel">
      <Card :bordered="false"  v-for="(item,index) in data.info.list" :key="index">
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
      <Card :bordered="false"  v-if="data.info.totalCount===0">
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
    }
  }
};
</script>
