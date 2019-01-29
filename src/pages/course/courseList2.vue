<template>
  <div class="courselistWrap">
    <header>
      <img src="../../assets/courseList/assets/shiyanshi.png">
    </header>
    <main>
      <div class="courselists">
        <img src="../../assets/courseList/assets/road.png" alt="">
        <div class="mainCourse" v-for="(item,index) in list" :key="index" :style="{top:item.top,left:item.left}">
          <p>
            <img src="../../assets/courseList/assets/oral-button.png">
          </p>
          <div class="courseName">
            <span>嗡嗡长高了</span>
          </div>
          <span>
            <img src="../../assets/courseList/assets/brown star copy.png">
            <img src="../../assets/courseList/assets/brown star copy.png">
            <img src="../../assets/courseList/assets/brown star copy.png">
          </span>
        </div>
      </div>

    </main>
    <div class="shareMask" v-if="activeImg">
      <div class="save">
        <p>已经为您生成专属海报，</p>
        <p><span>98%的家长</span>转发后成功获得奖学金，</p>
        <p><span>长按图片保存海报室系列</span></p>
      </div>
      <div class="activeImg">
        <span class="close" @click="close">
          <img class="close_icon" src="../../assets/honeybee/tags/close.png">
        </span>
        <img class="active_img" src="../../assets/honeybee/tags/big pop.png">
      </div>
    </div>
    <div class="shareMask" v-if="ifShare" @click="maskHide">
      <img src="../../assets/honeybee/tags/arroow.png" alt="">
      <div class="choseSussBottom">
        邀请好友一起学习
      </div>
    </div>
    <footer @click="wantShare">
      <img src="../../assets/courseList/assets/Bbutton.png">
      <div class="footerCon">
        <div class="footerConLeft">
          <span>分享赚￥40</span>
          <img src="../../assets/courseList/assets/tixian.png">
        </div>
        <div class="footerConRight">
          <div @click.stop="poster">
            <p><img src="../../assets/courseList/assets/pop icon.png"></p>
            <span>领取海报</span>
          </div>
          <div @click="wantShare">
            <p><img src="../../assets/courseList/assets/share.png"></p>
            <span>分享</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [{
          top: -6 + '%',
          left: 4 + '%'
        }, {
          top: -6 + '%',
          left: 35 + '%'
        }, {
          top: -6 + '%',
          left: 66 + '%'
        }, {
          top: 40 + '%',
          left: 4 + '%'
        }, {
          top: 40 + '%',
          left: 35 + '%'
        }, {
          top: 40 + '%',
          left: 66 + '%'
        }, {
          top: 84 + '%',
          left: 4 + '%'
        }, {
          top: 84 + '%',
          left: 35 + '%'
        }, {
          top: 84 + '%',
          left: 66 + '%'
        }],
        activeImg: false,
        ifShare: false
      }
    },
    methods: {
      poster() {
        this.activeImg = true
      },
      close() {
        this.activeImg = false
      },
      wantShare() {
        this.ifShare = true
      },
      maskHide() {
        this.ifShare = false
        this.activeImg = true
      }
    }
  }

</script>

<style lang="less" scoped>
  .courselistWrap {
    width: 100%;
    height: 100%;
    background: #FFDDA6;
    overflow: auto;
    display: flex;
    flex-direction: column;

    header {
      width: 100%;
      height: 5rem;
      padding-top: 1rem;
      text-align: center;

      img {
        width: 59.2%;
        margin: 0 auto;
      }
    }

    main {
      width: 100%;
      height: 30rem;
      display: flex;
      align-items: center;
      margin-top: .5rem;

      .courselists {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        position: relative;

        img {
          width: 80%;
          height: 100%;
          display: block;
          margin: 0 auto;
        }

        .mainCourse {
          width: 30%;
          height: 9rem;
          position: absolute;
          top: -6%;
          left: 0;

          p {
            width: 100%;

            img {
              width: 75%;
              display: block;
              margin: 0 auto;
            }
          }

          .courseName {
            width: 90%;
            height: 1.7rem;
            position: absolute;
            background: url('../../assets/courseList/assets/S-button.png');
            background-repeat: no-repeat;
            background-size: 100%;
            left: 50%;
            margin-left: -45%;
            bottom: 32%;



            span {
              margin-top: -1%;
              text-align: center;
              display: block;
              width: 100%;
              height: 100%;
              line-height: 1.7rem;
              font-size: .6rem;
              color: #fff;
            }
          }

          span {
            display: block;
            margin: 0 auto;
            width: 70%;
            display: flex;
            text-align: center;
            margin-top: 1rem;

            img {
              width: 1.5rem;
              height: 1.5rem;
            }
          }
        }
      }


    }

    footer {
      width: 100%;
      text-align: center;
      position: fixed;
      bottom: 1rem;
      opacity: .7;

      animation: shake .5s infinite;

      >img {
        width: 90%;
      }

      .footerCon {
        height: 2.7rem;
        width: 90%;
        display: flex;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -45%;
        padding: 0 .8rem;
        justify-content: space-between;
        box-sizing: border-box;
        color: #fff;
        align-items: center;

        .footerConLeft {
          img {
            width: 4rem;
          }
        }

        .footerConRight {
          display: flex;
          height: 100%;

          div {
            height: 30px;
            padding: 0 .5rem;

            img {
              width: 1rem;
            }

            span {
              font-size: .4rem;
            }
          }
        }
      }
    }

    .shareMask {
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      top: 0;
      left: 0;
      z-index: 999;

      img {
        position: absolute;
        right: 4%;
        top: 3%;
        width: 8rem;
      }
    }

    .save {
      width: 90%;
      text-align: center;
      color: #fff;
      margin: 0 auto;
      margin-top: 8%;
      padding-bottom: .9rem;

      p {
        line-height: 1.4rem;
      }

      span {
        color: #FE7738;
      }
    }

    .activeImg {
      width: 65%;
      position: fixed;
      top: 50%;
      left: 50%;
      margin-left: -32%;
      margin-top: -50%;

      .active_img {
        width: 100%;
        height: auto;
      }

      .close {
        width: 20px;
        height: 20px;
        position: absolute;
        right: -17px;
        top: -25px;
      }

      .close_icon {
        width: 20px;
        height: 20px;
      }
    }

    .choseSussBottom {
      width: 60%;
      height: 5rem;
      background: #fff;
      text-align: center;
      line-height: 5rem;
      border-radius: 1rem;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -30%;
      margin-top: -5rem;
    }
  }

  @keyframes shake {
    0% {
      bottom: 10px;
    }

    50% {
      bottom: 20px
    }

    100% {
      bottom: 10px
    }
  }

</style>
