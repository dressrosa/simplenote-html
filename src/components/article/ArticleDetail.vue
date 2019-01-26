<template>
  <div>
    <common_header_view/>
    <div
      class="container main article"
      style="position: absolute; overflow-y: scroll; -webkit-overflow-scrolling: touch;"
    >
      <div class="part_down">
        <div class="ar_title">
          <h2 v-html="item.title"></h2>
          <span class="ar_date" v-html="item.createDate"></span>
          <span v-if="item.attr!=null" class="ar_view">浏览量:{{item.attr.readNum}}</span>
          <span v-if="item.attr==null" class="ar_view">浏览量:0</span>
        </div>
        <div class="note_each">
          <div class="ar_content">
            <vue-showdown v-if="item.content != null" :markdown="item.content"/>
          </div>
          <div class="ar_time">
            <i class="fa fa-tint"></i>
            <label v-html="item.createTime"></label>
          </div>
          <div class="ar_more">
            <a>查看全文</a>
          </div>
        </div>
      </div>

      <div class="part_up">
        <div class="side_right">
          <div class="i_content red" style="color: #bfbfbf">
            <i class="fa fa-thumbs-o-up"></i>
            <label v-html="item.attr==null?'':item.attr.likeNum"></label>
          </div>
          <div class="i_content green" style="color: #bfbfbf">
            <i class="fa fa-comment-o"></i>
            <label v-html="item.attr==null?'':item.attr.commentNum">0</label>
          </div>
          <div class="i_content blue" style="color: #bfbfbf">
            <i class="fa fa-heart-o"></i>
            <label v-html="item.attr==null?'':item.attr.collectNum">0</label>
          </div>
        </div>
        <div class="side_left">
          <div style="display: table;margin:0 auto;padding: 5px;">
            <img
              v-if="item.user!=null"
              class="avatar"
              img-type="avatar"
              :src="headForImg+item.user.avatar"
              :onerror="headForImg"
            >
            <img
              v-if="item.user==null"
              class="avatar"
              img-type="avatar"
              src="../../assets/img/default.png"
            >
            <div class="p_username">
              <label
                v-if="item.user!=null"
                class="nickname"
                v-html="item.user==null?'':item.user.nickname"
              ></label>
            </div>
            <div class="p_love" data-love="0">关注</div>
          </div>
        </div>
      </div>
      <div class="co_comment" style="margin-bottom: 50px;">
        <div class="co_num">
          <span>最新评论</span>
        </div>
        <div v-if="commentsItems != null" class="co_list">
          <div
            v-for="coItem in commentsItems"
            class="co_item"
            :key="coItem.commentId"
            :data-id="coItem.commentId"
            track-by="$index"
          >
            <div class="item_up">
              <div>
                <img img-type="avatar " class="avatar tiny" :src="headForImg+coItem.replyerAvatar">
              </div>
              <div class="item_p">
                <label class="item_p_username">
                  <a v-html="coItem.replyerName"></a>
                </label>
                <label v-if="coItem.parentReplyerName !=null" class="item_p_label">回复</label>
                <label class="item_p_username" v-html="coItem.parentReplyerName"></label>
                <p v-html="coItem.content"></p>
              </div>
              <div v-if="coItem.isLike == 1" class="item_like">
                <i class="fa fa-thumbs-up" style="color:#fd4d4d;" data-like="1"></i>
                <label class="co_item_label" v-html="coItem.num"></label>
              </div>
              <div v-if="coItem.isLike == 0" class="item_like">
                <i class="fa fa-thumbs-o-up" data-like="0"></i>
                <label class="co_item_label" v-html="coItem.num"></label>
              </div>
            </div>
            <div class="item_down">
              <label class="item_p_title_pure" v-html="coItem.createDate"></label>
            </div>
          </div>
          <div class="co_all">
            <span>
              <a @click="getAllComments()">查看全部</a>
            </span>
          </div>
        </div>
        <div v-else class="blank_mug">
          <span>
            <i class="icon_mug" style="cursor: default;"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="part_comment">
      <textarea class="co_tt" placeholder="说说你的见解呗" rows="1" maxlength="50" name="co_tt"></textarea>
      <input class="co_btn" type="button" value="评论" @click="doComment()">
    </div>
  </div>
</template>

<script src="@/assets/js/simple/modules/article/article_detail.js"></script>
<style scoped>
@import "../../assets/css/font-awesome/css/font-awesome.min.css";
</style>
