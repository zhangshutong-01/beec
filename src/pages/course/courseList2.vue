<template>
  <div class="courselistWrap">
    <header>
      <img src="../../assets/courseList/assets/shiyanshi.png">
    </header>
    <main>
      <div class="courselists">
        <img src="../../assets/courseList/assets/road.png" alt="">
        <div class="mainCourse" v-for="item in list" :key="item.id" @click="jump(item)">
          <p>
            <img :src="item.isUnlock===0?item.imgUrlN:item.imgUrl">
          </p>
          <span>
            <img :src="stara" v-for="(item,index) in item.maxStar" :key='index'>
            <img :src="starb" v-for="(item,index) in 3-item.maxStar" :key='index'>
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
        <div>
          <img class="active_img" :src="posterList.imgUrl">
          <div class="userInfo">
            <img :src="posterList.headUrl" alt="" class="header_img">
            <div class="name">
              <p>{{posterList.nickName}}</p>
              <p>我发现一个超棒的课程！推荐给你~</p>
            </div>
          </div>
          <div class="posterBottom">
            <div>
              <h1>限时特价<span>￥29.9</span></h1>
              <p>(9节精品课程 永久有效)</p>
              <p>长按二维码，了解详情</p>
            </div>
            <img :src="posterList.codeUrl" alt="">
          </div>
        </div>
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
          <span>分享赚￥30</span>
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
  import {
    querySectionInfo
  } from '@/api/course'
  import {
    queryPostInfo
  } from '@/api/money'
  import {
    share
  } from "@/api/wx";
  export default {
    data() {
      return {
        list: [],
        activeImg: false,
        ifShare: false,
        lastSection: '',
        starnum: [],
        stara: require('../../assets/evaluate/assets/yellow star.png'), //亮星星
        starb: require('../../assets/evaluate/assets/brown star.png'), //暗星星
        xing: 0,
        Star: 0,
        posterList: {}
      }
    },
    created() {
      const parmas = {
        openId: this.$route.query.openid,
        courseId: this.$route.query.courseid
      }
      querySectionInfo(parmas).then(res => {
        console.log(res)
        this.list = res.data.result
        this.lastSection = res.data.result.lastSection;
      })
      this.wxshare()
    },
    methods: {
      jump(item) {
        if (item.isUnlock == 0) {
          alert("请先完成之前的课程哦")
        } else if (item.isUnlock == 1) {
          this.$router.push({
            name: 'test2',
            query: {
              name: item.sectionName,
              openid: this.$route.query.openid,
              courseid: this.$route.query.courseid,
              sectionid: item.id,
              sectionurl: item.sectionUrl
            }
          })
        }
      },
      poster() {
        this.activeImg = true
        queryPostInfo({
          openId: this.$route.query.openid,
          courseId: this.$route.query.courseid
        }).then(res => {
          console.log(res.data.result)
          this.posterList = res.data.result
        })
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
      },
      wxshare() {
        let that = this
        //wx是引入的微信sdk
        // wx.config('这里有一些参数');//通过config接口注入权限验证配置
        let mydata = {
          url: location.href
        };
        console.log(mydata)
        share(mydata).then(res => {
          console.log('123456', res);
          if (res.data.statusCode == "200") {
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.result.appId, // 必填，公众号的唯一标识
              timestamp: res.data.result.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.result.noncestr, // 必填，生成签名的随机串
              signature: res.data.result.signature, // 必填，调用js签名， // 必填，调用js签名，
              jsApiList: [
                "onMenuShareAppMessage",
                "onMenuShareTimeline",
              ] // 必填，需要使用的JS接口列表，这里只写支付的
            });
            wx.ready(function () {
              //通过ready接口处理成功验证
              // config信息验证成功后会执行ready方法
              let mytitle =
                "孩子明年上小学啦，送ta一套蜜蜂乐园思维，爱上思考，变聪明！";
              let mydesc = "蜜蜂乐园";
              let mylink =
                "http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/tourbuy?openid=" +
                that.$route.query.openid + "%26courseid=" + that.$route.query.courseid + "%26sourceId=" + that.$route
                .query.sourceId + "%26payType=" + that.$route
                .query.payType; //分享到首页
              //let mylink='http://test-yunying.coolmath.cn/beec/course';//分享到首页
              let myimgUrl = "http://thyrsi.com/t6/665/1548835210x2728279033.png";
              // wx.hideMenuItems({
              //   menuList: ["menuItem:copyUrl"]
              // });
              wx.onMenuShareAppMessage({
                // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
                title: mytitle, // 分享标题
                desc: mydesc, // 分享描述
                link: mylink, // 分享链接
                imgUrl: myimgUrl, // 分享图标
                type: "", // 分享类型,music、video或link，不填默认为link
                dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  // 用户确认分享后执行的回调函数
                  console.log(1)
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                  console.log(2)
                }
              });
              wx.onMenuShareTimeline({
                //分享朋友圈
                title: mytitle, // 分享标题
                link: mylink, // 分享链接
                imgUrl: myimgUrl, // 分享图标分享图标
                success: function () {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              });
              // wx.onMenuCopyUrl({
              //   title: mytitle, // 分享标题
              //   link: mylink, // 分享链接
              //   imgUrl: myimgUrl,
              //   success: function () {
              //     // 用户确认分享后执行的回调函数
              //     console.log(123)
              //   },
              //   cancel: function () {
              //     console.log(456)
              //   }
              // })
            });
            wx.error(function (res) {
              //通过error接口处理失败验证
              // config信息验证失败会执行error函数
            });
          } else {}
        });
      },
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

        .mainCourse:nth-child(10) {
          top: 84%;
          left: 70%
        }

        .mainCourse:nth-child(2) {
          top: -6%;
          left: 2%;
        }

        .mainCourse:nth-child(3) {
          top: -6%;
          left: 35%;
        }

        .mainCourse:nth-child(4) {
          top: -6%;
          left: 70%;

        }

        .mainCourse:nth-child(5) {
          top: 40%;
          left: 2%
        }

        .mainCourse:nth-child(6) {
          top: 40%;
          left: 35%
        }

        .mainCourse:nth-child(7) {
          top: 40%;
          left: 70%
        }

        .mainCourse:nth-child(8) {
          top: 84%;
          left: 2%
        }

        .mainCourse:nth-child(9) {
          top: 84%;
          left: 35%
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

      >img {
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
      width: 75%;
      position: fixed;
      top: 50%;
      left: 50%;
      margin-left: -36%;
      margin-top: -50%;

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
          height: 3rem;
          top: .5rem;
          left: .5rem;
          color: #000;
          display: flex;

          .header_img {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            margin-right: .5rem;
          }

          .name {
            width: 100%;
            height: 3rem;
            line-height: 1.5rem;

            p {
              font-size: .7rem;
              color: #000;
            }
          }
        }

        .posterBottom {
          position: absolute;
          bottom: 5%;
          left: 0;
          display: flex;
          width: 100%;
          padding: 0 1rem;
          box-sizing: border-box;
          height: 5rem;

          >div {
            width: 100%;
            margin-right: .5rem;

            h1 {
              color: #fff;
              font-size: 1.4rem;

              span {
                color: #F6EC71;
              }
            }

            p {
              color: #fff;
              font-size: .8rem;
              line-height: 1.5rem;
            }
          }

          img {
            width: 5rem;
            height: 5rem;
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
