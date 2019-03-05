<template>
  <div class="ar_content" v-cloak>
    <vue-showdown v-if="item.content != null" :markdown="item.content"/>
  </div>
</template>
<script src="@/assets/js/simple/modules/article/article_detail_content.js"></script>
<style scoped>
[v-cloak] {
  display: none !important;
}
</style>
