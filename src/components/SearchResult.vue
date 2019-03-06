<template>
  <div>
    <div class="flex-panel">
      <Card v-for="(item,index) in data.info.list" :key="index">
        <div>
          <Tag>{{item.type}}</Tag>
          <p>{{$t('message.name')}} {{item.name}}</p>
          <p>{{$t('message.description')}} {{item.description}}</p>
        </div>
      </Card>
      <Card v-if="data.info.totalCount===0">
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
export default {
  props: { data: { default:{}} }
  }
</script>
