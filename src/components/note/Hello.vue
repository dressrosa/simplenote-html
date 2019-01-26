<template>
  <div class="main">
    <common_header_view/>
    <div class="hello">
      <div class="list_item">
        <div class="item_userinfo">
          <div class="item_useravatar">
            <img
              class="avatar small"
              img-type="avatar"
              src="http://xiaoyu1-1253813687.costj.myqcloud.com/common/4.jpg"
              id="ar.user.userId"
              @click="avatarClick($event)"
            >
          </div>
          <div class="item_desc">
            <dt class="item_username">小明</dt>
            <p class="item_usersign">24243</p>
          </div>
        </div>
        <div class="item_ar" id="ar.articleId" @click="itemClick($event)">
          <dt class="item_ar_title">54353</dt>
          <p class="item_ar_content">543gdfsgfdg</p>
        </div>
      </div>
    </div>
    <common_footer_view/>
  </div>
</template>
<script src="@/assets/js/simple/modules/note/hello.js"></script>
<style scoped>
.hello {
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  height: 100%;
}
.sha {
  text-align: center;
  margin: 0 auto;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}
</style>
