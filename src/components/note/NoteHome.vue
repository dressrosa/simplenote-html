<template>
  <div class="full_body">
    <div class="note_list" v-if="items.length > 0">
      <div
        class="note_item"
        v-for="(ar,index) in items"
        :key="ar.noteId"
        :name="index"
        track-by="$index"
      >
        <div class="item_userinfo">
          <div class="item_useravatar">
            <img
              class="avatar small"
              img-type="avatar"
              :src="headForImg+ar.user.avatar"
              id="ar.user.userId"
            />
          </div>
          <div class="item_desc">
            <dt class="note_item_username" v-html="ar.user.nickname"></dt>
            <dt class="note_item_createTime" v-html="ar.createTime"></dt>
          </div>
        </div>
        <div class="hello_piece">
          <div>
            <p class="note_item_content" v-html="ar.content"></p>
          </div>
          <div v-if="ar.files != null" class="note_floor_wrapper">
            <div class="note_floor">
              <div
                class="note_photo_wrapper"
                v-for="(ph,index) in ar.files"
                :key="ph.id"
                :sort="index"
                track-by="$index"
              >
                <img class="note_photo" :name="ph.bizId" img-type="avatar" :src="headForImg+ph.url" />
              </div>
            </div>
          </div>
          <div class="comment_bar">
            <div class="bar_part">
              <i
                v-if="ar.attr.likeNum/200  > 200"
                class="fa fa-envira"
                :data-like="ar.isLike"
                :note-id="ar.noteId"
                style="color:rgb(0, 150, 35)"
                @click="showLike($event)"
              ></i>
              <i
                v-else
                class="fa fa-envira"
                :data-like="ar.isLike"
                :note-id="ar.noteId"
                :style="ar.rgb"
                @click="showLike($event)"
              ></i>
              <label
                v-if="ar.isLike==1"
                style="margin: 2px;color:rgb(0, 150, 35)"
                v-html="ar.attr.likeNum"
              >0</label>
              <label v-else style="margin: 2px;" v-html="ar.attr.likeNum">0</label>
            </div>
            <div class="bar_part">
              <i class="fa fa-comment-o" :note-id="ar.noteId"></i>
              <label style="margin: 2px;" v-html="ar.attr.commentNum">0</label>
            </div>
            <div class="bar_part">
              <i class="fa fa-slack" :note-id="ar.noteId"></i>
              <label style="margin: 2px;">555</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="loading"
      style="visibility: hidden; font-size: 13px; text-align: center; color: rgb(144, 145, 144);"
    >
      <label>加载中</label>
      <img
        height="15px"
        withHead="0"
        style="top: 3px; position: relative;"
        width="15px"
        src="../../assets/img/loading.gif"
      />
    </div>
    <common_footer_view />
  </div>
</template>
<script src="@/assets/js/simple/modules/note/note_home.js"></script>
<style scoped>
.note_list {
  display: list-item;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
}
.full_body {
  height: 100%;
  width: 100%;
  font-size: 15px;
  overflow: hidden;
  background-color: #efefef;
}

.note_item {
  /* 设置padding不超过width100% */
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;

  background: #ffffff;
  width: 100%;
  padding: 10px;
  min-height: 120px;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 400;
  border-bottom: 1px solid #ffffff;
  /* -webkit-box-shadow: 0 1px 1px #f3f3f3;
  box-shadow: 0 1px 1px #f3f3f3; */
  position: relative;
}
.item_desc {
  margin-left: 5px;
}
.note_item_createTime {
  font-size: 12px;
  color: #888888;
}
.note_item_username {
  font-size: 14px;
}
.note_item_content {
  text-align: left;
  font-size: 15px;
}
.note_photo_wrapper {
  border-radius: 1%;
  width: 33%;
  max-width: 33%;
  text-align: center;
  margin-left: 1px;
  margin-right: 1px;
  margin-bottom: 1px;
}
.note_photo {
  border-radius: 1px;
  min-height: 100px;
  max-height: 150px;
  max-width: 100%;
}
.note_floor_wrapper {
  width: 100%;
}
.note_floor {
  width: 100%;
  display: flex;
}
</style>
