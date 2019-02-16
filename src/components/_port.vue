<template>
  <div class="shareMask">
    <div class="save">
      <p>已经为您生成专属海报，</p>
      <p><span>98%的家长</span>转发后成功获得奖学金，</p>
      <p><span>长按图片保存实验室系列</span></p>
    </div>
    <div class="activeImg">
      <span class="close" @click="close">
        <img class="close_icon" src="../assets/honeybee/tags/close.png">
      </span>
      <div ref="reportImg">
        <img class="active_img" :src="posterList.imgUrl+'?'+new Date().getTime()" crossOrigin="anonymous">
        <div class="userInfo">
          <img :src="posterList.headUrl+'?'+new Date().getTime()" class="header_img" crossOrigin="anonymous">
          <div class="name">
            <p>我是{{posterList.nickName}}</p>
            <p>我发现一个超棒的课程！推荐给你~</p>
          </div>
        </div>
        <div class="posterBottom">
          <div>
            <h1>限时特价<span>￥29</span></h1>
            <p>(9节精品课程 永久有效)</p>
            <p>长按识别二维码，了解详情</p>
          </div>
          <img :src="posterList.codeUrl+'?'+new Date().getTime()" crossOrigin="anonymous">
        </div>
      </div>
      <div class="report_after" :style="{display: state.isDownloadImg ? 'block':'none'}">
        <img :src="portImg" id="saveImg" />
      </div>
    </div>

  </div>
</template>

<script>
  import html2canvas from "html2canvas";
  import {
    queryPostInfo,
  } from "@/api/money";
  export default {
    data() {
      return {
        posterList: [],
        portImg: '',
        state: {
          imgUrl: '',
          isDownloadImg: false,
        },
        courseid: '',
        img: false
      }
    },
    mounted() {
      queryPostInfo({
        openId: this.$route.query.openid,
        courseId: '10002'
      }).then(res => {
        console.log('2323',res.data.result);
        this.posterList = res.data.result;
        setTimeout(() => {
          this.screenshots();
        }, 1000);
      });
    },
    methods: {
      screenshots() { //生成图片；
        let b64;
        html2canvas(this.$refs.reportImg, {
          useCORS: true
        }).then(canvas => {
          try {
            b64 = canvas.toDataURL("image/png");
          } catch (err) {
            console.log(err)
          }
          this.state = {
            imgUrl: b64,
            isDownloadImg: true,
          };
          if (!window.sessionStorage.getItem('portimg')) {
            window.sessionStorage.setItem('portimg', this.state.imgUrl)
            this.portImg = window.sessionStorage.getItem('portimg', this.state.imgUrl)
          } else {
            this.portImg = window.sessionStorage.getItem('portimg', this.state.imgUrl)
          }
          this.activess = false
        });
      },
      close() {
        //  点击关闭海报
        this.$emit("active", false)
      }
    }
  }

</script>

<style lang="less" scoped>
  .save {
    width: 90%;
    text-align: center;
    color: #fff;
    margin: 0 auto;
    margin-top: 8%;

    p {
      line-height: .5rem;
    }

    span {
      color: #FE7738;
    }
  }

  .activeImg {
    width: 60%;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -30%;
    margin-top: -45%;

    div {
      width: 100%;
      height: 100%;
      position: relative;

      .active_img {
        width: 100%;
        height: auto;
      }

      .userInfo {
        position: absolute;
        width: 96%;
        height: 2rem;
        top: .2rem;
        left: .2rem;
        color: #000;
        display: flex;
        display: -webkit-box;
        /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
        display: -moz-box;
        /* 老版本语法: Firefox (buggy) */
        display: -ms-flexbox;
        /* 混合版本语法: IE 10 */
        display: -webkit-flex;
        /* 新版本语法: Chrome 21+ */

        .header_img {
          width: .8rem;
          height: .8rem;
          border-radius: 50%;
          margin-right: .1rem;
        }

        .name {
          width: 100%;
          height: .4rem;
          line-height: .4rem;
          font-size: .4rem;

          p {
            font-size: .26rem;
            color: #000;

            &:nth-child(2) {
              font-size: .14rem;
            }
          }
        }
      }

      .posterBottom {
        position: absolute;
        bottom: 4%;
        left: 0;
        display: flex;
        display: -webkit-box;
        /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
        display: -moz-box;
        /* 老版本语法: Firefox (buggy) */
        display: -ms-flexbox;
        /* 混合版本语法: IE 10 */
        display: -webkit-flex;
        /* 新版本语法: Chrome 21+ */
        width: 100%;
        padding: 0 .3rem;
        box-sizing: border-box;
        height:auto;
        align-items: center;

        >div {
          width: 100%;
          margin-right: .1rem;

          h1 {
            color: #fff;
            font-size: .32rem;

            span {
              color: #F6EC71;
              font-size: .4rem;
            }
          }

          p {
            color: #fff;
            font-size: .2rem;
            line-height: .3rem;
            margin-top: .1rem;
            margin-left: .4rem;

            &:nth-child(3) {
              margin-left: 0;
            }
          }
        }

        img {
          width: 1.2rem;
          height: 1.2rem;
          margin-top:.05rem;
        }
      }
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

  .report_after {
    width: 100%;
    height: 100%;
    position: relative;

    img {
      width: 60%;
      position: fixed;
      border-radius: .2rem;
      top: 50%;
      left: 50%;
      margin-left: -30%;
      margin-top: -45%;
      z-index: 99
    }
  }

</style>
