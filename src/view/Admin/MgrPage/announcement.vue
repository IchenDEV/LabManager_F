<template>
  <div class="flex-panel warp">
    <Card class="card">
      <add-announcement @added="rel" />
    </Card>
    <Card :bordered="false">
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