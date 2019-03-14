<template>
  <div class="flex-panel warp">
    <Card :class="{'modelCard':$store.state.modal}" >
      <add-announcement @added="refresh" />
    </Card>
    <Card :class="{'modelCard':$store.state.modal}" :bordered="false">
      <p slot="title">
        {{ $t('message.announcement') }}
      </p>
      <announcement-list />
    </Card>
  </div>
</template>
<script>
import addAnnouncement from '@/components/announcement/addAnnouncement'
import announcementList from '@/components/announcement/announcementList'
export default {
  components: { addAnnouncement, announcementList},
  methods:{
    refresh (){
      this.$$refs.announcementList.getInfo()
    }
  }
}
</script>