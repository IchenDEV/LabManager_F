<template>
  <div class="flex-panel warp">
    <Card :class="{'modelCard':$store.state.modal}" class="Card">
      <add-announcement @added="rel" />
    </Card>
    <Card :class="{'modelCard':$store.state.modal}" :bordered="false">
      <p slot="title">
        {{ $t('message.announcement') }}
      </p>
      <Announcement-list />
    </Card>
  </div>
</template>
<script>
import AddAnnouncement from '@/components/Announcement/AddAnnouncement'
import AnnouncementList from '@/components/Announcement/AnnouncementList'
export default {
  components: { AddAnnouncement, AnnouncementList},
  methods:{
    rel (){
      this.$$refs.announcementList.getInfo()
    }
  }
}
</script>