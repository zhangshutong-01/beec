<template>
  <transition @after-leave="afterLeave">
    <div class="dialogauto" :class="{'dialogautoaddclass':iconhw}" v-show='isShow'>
      <img class="iconType" src="./fail.png" alt="" v-if='icontype ==="fail"'>
      <img class="iconType" src="./success.png" alt="" v-if='icontype === "success"'>
      <p class="iconText">{{icontext}}</p>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'dialogauto',
    props: {
      icontype: {
        type: String,
        default: 'fail',
      },
      icontext: {
        type: String,
      },
      icontime: {
        type: Number,
        default: 1400,
      },
      iconhw: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isShow: true,
      };
    },
    methods: {
      toggleModel() {
        this.timer = setTimeout(() => {
          this.isShow = false;
        }, this.icontime);
      },
      afterLeave() {
        this.$emit('closed');
      },
    },
    mounted() {
      this.toggleModel();
    },
    beforeDestory() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
  };

</script>
<style lang="less">
  .dialogauto {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999 !important;
    margin: auto;
    box-sizing: border-box;
    padding: 16px 7px;
    width: 250px;
    height: 120px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 14px;
    text-align: center;
    border-radius: 8px;

    &.dialogautoaddclass {
      width: 360px;
      height: 140px;
    }

    .iconType {
      width: 32px;
      height: 32px;
    }

    .iconText {
      padding: 8px 10px 0 10px;
      margin: 0;
      line-height: 1.6em;
    }
  }

</style>
