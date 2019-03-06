<template>
  <div class="flex-panel warp">
    <Card class="card">
      <add-announcement @added='rel'></add-announcement>
    </Card>
      <announcement-list></announcement-list>
  </div>
</template>
<script>
import AddAnnouncement from '@/components/Announcement/AddAnnouncement'
import AnnouncementList from '@/components/Announcement/AnnouncementList'
export default {
  components: { AddAnnouncement, AnnouncementList},
  inject:  ['reloadAdmin'],
  methods:{
    rel (){
      this.reloadAdmin
    }
  }
}
</script>