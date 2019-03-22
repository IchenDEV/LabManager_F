<template>
  <div>
    <h1>
      <ui-icon class="center" slot="icon" icon="home"></ui-icon>Home
    </h1>
    <div>
      <Divider>快速预约服务</Divider>
      <hot-device-box v-if="$store.state.hasSingin" class="hdb" />
      <Card  v-if="$store.state.hasSingin" >
        <p slot="title">{{ $t('message.myBookInfo') }}</p>
        <current-book-info-box/>
      </Card> 
      <Divider>信息服务</Divider>
      <Card >
        <p slot="title">{{ $t('message.announcement') }}</p>
        <announcement-list/>
      </Card>
      <Card  v-if="$store.state.hasSingin" >
        <p slot="title">{{ $t('message.message') }}</p>
        <current-msg-box/>
      </Card>
      <Card  v-if="$store.state.hasSingin" >
        <p slot="title">{{ $t('message.sendMsg') }}</p>
        <msg-sender :label="$t('message.receiver')"/>
      </Card>  
      <Divider>数据分析服务</Divider>
      <Card  v-if="$store.state.hasSingin&&$store.state.isAdmin" >
        <total-use-rate />
      </Card>
      <Card  v-if="$store.state.hasSingin&&$store.state.isAdmin" >
        <monthly-rate />
      </Card>
    </div>
  </div>
</template>
<script>
import currentMsgBox from "@/components/msg/currentMsgBox";
import currentBookInfoBox from "@/components/book/currentBookInfoBox";
import announcementList from "@/components/announcement/announcementList";
import hotDeviceBox from '@/components/device/hotDeviceList'
import msgSender from "@/components/msg/msgSender";
import totalUseRate from "@/components/statistics/totalUseRate";
import monthlyRate from "@/components/statistics/monthlyRate";
export default {
  components: { currentMsgBox, msgSender,currentBookInfoBox, announcementList,hotDeviceBox,totalUseRate,monthlyRate }
};
</script>
<style>
.hdb{
min-width: 100px;
width: 70%;
margin-left: auto;
margin-right: auto;
}
</style>
