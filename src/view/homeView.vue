<template>
<div>
  <Anchor show-ink class="anchor" v-if="$store.state.hasSingin">
        <AnchorLink href="#quick_reserve" title="快速预约" >
            <AnchorLink href="#hot" title="热门" />
            <AnchorLink href="#my_reserve" title="我的预约" />
        </AnchorLink>
        <AnchorLink href="#message" title="信息服务" >
          <AnchorLink href="#announcement" title="公告" />
          <AnchorLink href="#my_message" title="我的信息" />
          <AnchorLink href="#send_message" title="发送信息" />
        </AnchorLink>
        <AnchorLink href="#data" title="数据" v-if="$store.state.hasSingin&&$store.state.isAdmin"/>
    </Anchor>
  <div class="home">
    <div>
      <Divider v-if="$store.state.hasSingin" id="quick_reserve">快速预约服务</Divider>
      <hot-device-box id="hot" v-if="$store.state.hasSingin" class="hdb" />
      <Card id="my_reserve" v-if="$store.state.hasSingin" >
        <p slot="title">{{ $t('message.myBookInfo') }}</p>
        <current-book-info-box/>
      </Card> 
      <Divider id="message">信息服务</Divider>
      <Card id="announcement" >
        <p slot="title">{{ $t('message.announcement') }}</p>
        <announcement-list/>
      </Card>
      <Card id="my_message" v-if="$store.state.hasSingin" >
        <p slot="title">{{ $t('message.message') }}</p>
        <current-msg-box/>
      </Card>
      <Card  v-if="$store.state.hasSingin"  id="send_message">
        <p slot="title">{{ $t('message.sendMsg') }}</p>
        <msg-sender :label="$t('message.receiver')"/>
      </Card>  
      <Divider id="data" v-if="$store.state.hasSingin&&$store.state.isAdmin">数据分析服务</Divider>
      <Card  v-if="$store.state.hasSingin&&$store.state.isAdmin" >
        <total-use-rate />
      </Card>
      <Card  v-if="$store.state.hasSingin&&$store.state.isAdmin" >
        <monthly-rate />
      </Card>
    </div>
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
.anchor{
  position: absolute;
  max-width: 100px;
  margin-left: -50px;
  text-align: left;
}
.home{
  margin-left: 50px;
}
</style>
