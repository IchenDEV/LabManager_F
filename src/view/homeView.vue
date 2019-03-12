<template>
  <div>
    <!--添加首页的图标-->
    <h1><ui-icon class="center" slot="icon" icon="home"></ui-icon>Home</h1>
    <div class="flex-panel">
      <Card :class="{'modelCard':$store.state.modal}"
        v-if="$store.state.hasSingin"
        :bordered="false"
      >  
        <p slot="title">
          {{ $t('message.announcement') }}
        </p>
        <Announcement-list />
      </Card>
      <Card :class="{'modelCard':$store.state.modal}"
        v-if="$store.state.hasSingin"
        :bordered="false"
      >
        <p slot="title">
          {{ $t('message.myBookInfo') }}
        </p>
        <book-box />
      </Card>
      <Card :class="{'modelCard':$store.state.modal}"
        v-if="$store.state.hasSingin"
        :bordered="false"
      >
        <p slot="title">
          {{ $t('message.message') }}
        </p>
        <msg-box />
      </Card>
      <Card :class="{'modelCard':$store.state.modal}"
        v-if="$store.state.hasSingin"
        :bordered="false"
      >
        <p slot="title">
          {{ $t('message.sendMsg') }}
        </p>
        <send-msg :label="$t('message.receiver')" />
      </Card>
      <Card :class="{'modelCard':$store.state.modal}"
        :bordered="false"
        style="width:70%;"
      >
        <p slot="title">
          {{ $t('message.personalInfo') }}
        </p>
        <current-user-box simple="true" />
      </Card>
    </div>
  </div>
</template>
<script>
import CurrentUserBox from '@/components/CurrentUserBox/CurrentUserBox'
import MsgBox from '@/components/Msg/MsgBox'
import BookBox from '@/components/Book/BookBox'
import AnnouncementList from '@/components/Announcement/AnnouncementList'
import SendMsg from '@/components/Msg/SendMsg'
export default {
  components: { CurrentUserBox,MsgBox,SendMsg,BookBox,AnnouncementList}
}
</script>
