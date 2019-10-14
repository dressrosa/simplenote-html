<template>
  <div>
    <!-- <div v-if="this.$route.name=='Login'"></div>
    <div v-else>
      <common_header/>
    </div>-->
    <!--页面返回不刷新-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {}
}
</script>
<style>
@import "assets/css/simple_mobile.css";
@import "assets/css/font-awesome/css/font-awesome.min.css";
</style>
