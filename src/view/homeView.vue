<template>
  <div class="flex-panel">
    <Card>
       <p slot="title">预定信息</p>
    </Card>
    <Card>
       <p slot="title">通信信息</p>
    </Card>
    <Card style="width:70%;">
       <p slot="title">个人信息</p>
       <current-user-box simple='true'></current-user-box>
    </Card>
  </div>
</template>
<script>
import CurrentUserBox from '@/components/CurrentUserBox/CurrentUserBox'
export default {
  components: {CurrentUserBox}
}
</script>
<style>
.flex-panel {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: white
}
.flex-panel > div {
  padding: 10px;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 300px; /* 让过渡表现良好。（从/到'width:auto'的过渡
                      至少在 Gecko 和 Webkit 上是有 bug 的。
                      更多信息参见 http://bugzil.la/731886 ） */

  -webkit-transition: width 0.7s ease-out;
  transition: width 0.7s ease-out;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  margin-top: 0.5rem
}
</style>
