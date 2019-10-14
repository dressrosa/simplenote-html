<template>
  <div class="ar_content">
    <!-- <i v-if="loading == true" class="loading fa fa-spinner fa-pulse"></i> -->
    <!-- <vue-showdown v-else :markdown="item.content" v-cloak/> -->
    <vue-showdown v-if="item !=null" :markdown="item.content" v-cloak />
  </div>
</template>
<script src="@/assets/js/simple/modules/article/article_detail_content.js"></script>
<style scoped>
.loading {
  font-size: 20px;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  display: -webkit-flex;
}
[v-cloak] {
  display: none !important;
}
</style>
