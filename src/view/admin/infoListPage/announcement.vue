<template>
  <div class="flex-panel warp">
    <Card  >
      <add-announcement @added="refresh" />
    </Card>
    <Card  >
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