<template>
  <div>
  </div>
</template>

<script>
  export default {
    name: 'logins',
    created() {
      let url = 'http://test-yunying.coolmath.cn/beec/logins'
      let return_url = encodeURIComponent(url);
      if (!localStorage.getItem('utoken')) {
        location.href =
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxeac125aaacee378d&redirect_uri=${return_url}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
        let reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
          sessionStorage.setItem('code', unescape(r[2]))
          location.href = 'http://test-yunying.coolmath.cn/beec/money'
        } else {
          return null;
        }
      } else {
        location.href = 'http://test-yunying.coolmath.cn/beec/money'
      }
    }
  }

</script>

<style scoped>

</style>
