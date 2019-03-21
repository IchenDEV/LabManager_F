<template>
  <div>
    <h1>{{ $t('message.search') }}</h1>
    <search-bar v-model="data" />
    <search-result :data="data" />
  </div>
</template>
<script>
import searchBar from '@/components/search/searchBar'
import searchResult from '@/components/search/searchResult'
export default {
  components: { searchBar,searchResult},
  data (){
    return{
      data:{info:{list:[]}}
    }
  }
}
</script>
