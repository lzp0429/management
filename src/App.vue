<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";  /* 深色主题 */
/*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
  .el-upload{
    line-height: unset !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
    .el-table td,.el-table th {
        text-align:center !important
    }
</style>
<script>
export default {
  // created() {
  //   if (localStorage.ms_username) {
  //     //  this.$router.push("/login");
  //   } else {
  //     this.$router.push("/Login");
  //   }
  // },
  mounted() {
    //监听函数，监听是否是页面刷新或者直接退出，通过时差判断是否需要重新进入登录界面，注意！！！！如果电脑卡顿，刷新时间过长也会退出程序
    window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    window.addEventListener("unload", e => this.unloadHandler(e));
  },
  destroyed() {
    window.removeEventListener("beforeunload", e =>
      this.beforeunloadHandler(e)
    );
    window.removeEventListener("unload", e => this.unloadHandler(e));
  },
  methods: {
    beforeunloadHandler() {
      this._beforeUnload_time = new Date().getTime();
    },
    unloadHandler(e) {
      this._gap_time = new Date().getTime() - this._beforeUnload_time; //页面执行时间来判定是否是刷新
      //判断是窗口关闭还是刷新
      if (this._gap_time <= 5) {
        //如果是登录状态，关闭窗口前，移除缓存
        if (localStorage.ms_username) {
          localStorage.removeItem("ms_username");
          localStorage.removeItem("token");
        }
      }
    }
  },
  updated() {}
};
</script>
