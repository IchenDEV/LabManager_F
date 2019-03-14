<template>
  <div>
    <h1>
      <ui-icon class="center" slot="icon" icon="home"></ui-icon>Home
    </h1>
    <div class="flex-panel">
      <Card v-if="$store.state.hasSingin" :class="{'modelCard':$store.state.modal}" :bordered="false">
        <p slot="title">{{ $t('message.announcement') }}</p>
        <announcement-list/>
      </Card>
      <Card :class="{'modelCard':$store.state.modal}" v-if="$store.state.hasSingin" :bordered="false">
        <p slot="title">{{ $t('message.myBookInfo') }}</p>
        <current-book-info-box/>
      </Card>
      <Card :class="{'modelCard':$store.state.modal}" v-if="$store.state.hasSingin" :bordered="false">
        <p slot="title">{{ $t('message.message') }}</p>
        <current-msg-box/>
      </Card>
      <Card :class="{'modelCard':$store.state.modal}" v-if="$store.state.hasSingin" :bordered="false">
        <p slot="title">{{ $t('message.sendMsg') }}</p>
        <msg-sender :label="$t('message.receiver')"/>
      </Card>
      <Card :class="{'modelCard':$store.state.modal}" :bordered="false" style="width:70%;">
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
import msgSender from "@/components/msg/msgSender";
export default {
  components: { currentUserBox,currentMsgBox, msgSender,currentBookInfoBox, announcementList }
};
</script>
