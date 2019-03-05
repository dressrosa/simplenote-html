<template>
  <div style="margin-top: 45px;">
    <div class="footer_modules">
      <div class="footer_item">
        <div class="footer_mo" @click="goTransform(2)" id="footerNote">
          <div class="footer_item_icon">
            <i v-if="this.$route.name=='Notes'" class="fa fa-paper-plane" style="color:#ED6D54"></i>
            <i v-else class="fa fa-paper-plane-o"></i>
          </div>
          <div class="footer_item_font">
            <label v-if="this.$route.name=='Notes'" style="color:#ED6D54">纸条</label>
            <label v-else>纸条</label>
          </div>
        </div>
      </div>
      <div class="footer_item">
        <div class="footer_mo" @click="goTransform(1)">
          <div class="footer_item_icon">
            <i v-if="this.$route.name=='Home'" class="fa fa-paw" style="color:#ED6D54"></i>
            <i v-else class="fa fa-paint-brush"></i>
          </div>
          <div class="footer_item_font">
            <label v-if="this.$route.name=='Home'" style="color:#ED6D54">札记</label>
            <label v-else>札记</label>
          </div>
        </div>
      </div>
      <div class="footer_item">
        <div class="footer_mo" @click="goTransform(3)">
          <div class="footer_item_icon">
            <i v-if="this.$route.name=='Mine'" class="fa fa-circle" style="color:#ED6D54"></i>
            <i v-else class="fa fa-circle-o"></i>
          </div>
          <div class="footer_item_font">
            <label v-if="this.$route.name=='Mine'" style="color:#ED6D54">我的</label>
            <label v-else>我的</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/simple/footer.js"></script>
<style>
@import "../assets/css/simple_mobile.css";
</style>
<style scoped>
@import "../assets/css/font-awesome/css/font-awesome.min.css";
.footer_modules {
  display: flex;
  width: 100%;
  position: fixed;
  bottom: 0px;
  z-index: 9999;
  -ms-flex-align: center;
  align-items: center;
  background: #ffffff;
}

.footer_item {
  text-align: center;
  margin: 0 auto;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  display: inline;
}
.footer_mo {
  padding-left: 5px;
  padding-right: 5px;
}
.footer_item_icon {
  font-size: 16px;
  margin-top: 1px;
  margin-bottom: 0px;
  padding-bottom: 0px;
}

.footer_item_font {
  font-size: 4px;
  margin-top: -10px;
  padding-top: 0px;
  font-size: 12px;
  -webkit-transform: scale(0.75);
  -o-transform: scale(1);
}
</style>
