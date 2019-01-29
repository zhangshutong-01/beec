<template>
  <div class="active_wrap" v-if="show">
    <div class="active_box">
      <span class="close">
        <img class="close_icon" src="../assets/guanbi.png" @click="close()">
      </span>
      <img class="active_img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545660191294&di=b640586784af3e5d07908a1f48bbc26a&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a7725689fdfa32f8759f045d4d6e.jpg%401280w_1l_2o_100sh.jpg">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: true
      }
    },
    created: function () {
      console.log(123)
      if (window.sessionStorage.getItem("close") !== null) {
        this.show = false
      }
    },
    methods: {
      close() {
        this.show = false
        window.sessionStorage.setItem("close", 'closeActive')
      }
    }
  }

</script>

<style scoped>
  .active_wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    /* z-index: 99; */
    color: #000;
    overflow: hidden;
  }

  .active_box {
    width: 65%;
    background: #ccc;
    height: 200px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -32%;
    margin-top: -60%;
    /* transform: translate(-50%, -60%); */
    animation: mymove 2s alternate;
  }

  .active_img {
    width: 100%;
    height: auto;
  }

  .tips {
    width: 1px;
    height: 100%;
    /*background-color: red;*/
    vertical-align: middle;
    display: inline-block;
  }

  .close {
    width: 20px;
    height: 20px;
    position: absolute;
    right: -20px;
    top: -30px;
    animation: mymove 2s alternate;
  }

  .close_icon {
    width: 20px;
    height: 20px;
  }

  @keyframes mymove {
    from {
      top: -500px;
    }

    to {
      bottom: 0px;
    }
  }

</style>
