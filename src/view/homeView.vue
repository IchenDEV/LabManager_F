<template>
  <div>
    <h1>
      <ui-icon class="center" slot="icon" icon="home"></ui-icon>Home
    </h1>
    
    <div class="flex-panel">
      <hot-device-box v-if="$store.state.hasSingin" class="hdb" />
      <Card :class="{'modelCard':$store.state.modal}" v-if="$store.state.hasSingin&&$store.state.isAdmin" >
        <total-use-rate />
      </Card>
      <Card  :class="{'modelCard':$store.state.modal}" >
        <p slot="title">{{ $t('message.announcement') }}</p>
        <announcement-list/>
      </Card>
      <Card :class="{'modelCard':$store.state.modal}" v-if="$store.state.hasSingin" >
        <p slot="title">{{ $t('message.myBookInfo') }}</p>
        <current-book-info-box/>
      </Card>
      <Card :class="{'modelCard':$store.state.modal}" v-if="$store.state.hasSingin" >
        <p slot="title">{{ $t('message.message') }}</p>
        <current-msg-box/>
      </Card>
      <Card :class="{'modelCard':$store.state.modal}" v-if="$store.state.hasSingin" >
        <p slot="title">{{ $t('message.sendMsg') }}</p>
        <msg-sender :label="$t('message.receiver')"/>
      </Card>
      <Card :class="{'modelCard':$store.state.modal}"  style="width:70%;">
        <p slot="title">{{ $t('message.personalInfo') }}</p>
        <current-user-box simple="true"/>
      </Card>
    </div>
  </div>
</template>
<script>
import currentUserBox from "@/components/currentUserBox/currentUserBox";
import currentMsgBox from "@/components/msg/currentMsgBox";
import currentBookInfoBox from "@/components/book/currentBookInfoBox";
import announcementList from "@/components/announcement/announcementList";
import hotDeviceBox from '@/components/device/hotDeviceList'
import msgSender from "@/components/msg/msgSender";
import totalUseRate from "@/components/statistics/totalUseRate";
export default {
  components: { currentUserBox,currentMsgBox, msgSender,currentBookInfoBox, announcementList,hotDeviceBox,totalUseRate }
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
