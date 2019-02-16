<template>
  <div>
    <div class="teacher" @click="openTeacher">
      <img src="../assets/teacher.png" alt="">
    </div>
    <div class="shareMask" v-show="isShow">
      <span class="close" @click="close">
        <img class="close_icon" src="../assets/honeybee/tags/close.png">
      </span>
      <img src="../assets/teacher-erweima.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      openTeacher() {
        this.isShow = true
      },
      close() {
        this.isShow = false
      }
    }
  }

</script>

<style lang="less" scoped>
  .teacher {
    position: fixed;
    right: 0;
    top: 34%;
    width: 1.3rem;
    z-index: 9999;

    img {
      width: 100%;
    }
  }

  .shareMask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    top: 0;
    left: 0;
    z-index: 9999;

    .close {
      width: .5rem;
      height: .5rem;
      display: block;
      position: absolute;
      right: 10%;
      top: 17%;

      .close_icon {
        width: 100%;
        height: 100%;
      }
    }

    >img {
      position: absolute;
      width: 60%;
      top: 50%;
      left: 50%;
      margin-left: -30%;
      margin-top: -50%;
    }
  }

</style>
