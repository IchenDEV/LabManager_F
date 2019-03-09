<template>
  <div>
    <h1>{{ $t('message.search') }}</h1>
    <search-bar v-model="data" />
    <search-result :data="data" />
    <!-- <list-book></list-book> -->
  </div>
</template>
<script>
import SearchBar from '@/components/SearchBar'
import SearchResult from '@/components/SearchResult'
export default {
  components: { SearchBar,SearchResult},
  data (){
    return{
      data:{info:{list:[]}}
    }
  }
}
</script>
