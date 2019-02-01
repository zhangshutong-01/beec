<template>
  <div class="moneyDetail">
    <div class="moneyTop">
      <div class="GroupShop">
        <h1>您已购课成功</h1>
      </div>
      <span class="tag" @click="courseDetail()">课程介绍</span>
      <section class="member">
        <div class="menyShop" v-if="payType==1">
          <div v-for="(item,index) in user" :key="index">
            <img :src="item.userHeadImgUrl">
            <span v-if="item.ranking===1">团长</span>
            <p>{{item.nickName}}</p>
          </div>
        </div>
        <div class="menyShop" v-if="payType==2">
          <div>
            <img :src="shopPeo.userHeadImgUrl">
            <span>直购</span>
            <p>{{shopPeo.nickName}}</p>
          </div>
        </div>
      </section>
      <div class="moneyTags">
        <div class="getCourse" @click="goCourse()">去上课</div>
        <div class="getMoney" @click="openPoster()">选好友，赚奖金</div>
      </div>
    </div>
    <div class="moneyBottom">
      <div class="posterTag" @click="poster()">
        专属海报
      </div>
      <div class="banner">
        <img src="../../assets/honeybee/tags/banner.png">
      </div>
      <div class="money_num">
        <div class="money_num_tit">已得奖学金</div>
        <p><b>￥</b>{{schoolMoney.totalAmount}}</p>
        <div>
          已提现：<span>￥{{schoolMoney.cashWithdrawalAmount}}</span>
        </div>
      </div>
      <section class="rules">
        <div class="rules_box1">
          <img src="../../assets/honeybee/tags/yaoqinggonglue.png" alt="">
        </div>
        <div class="rules_box2">
          <div class="rules_section">
            <dl>
              <dt>
                <img src="../../assets/honeybee/tags/1step.png" alt="">
              </dt>
              <dd>
                <h1>第一步：购买课程</h1>
                <p>确保您已经购课成功，获得学习资格</p>
              </dd>
            </dl>
          </div>
          <div class="rules_section">
            <dl>
              <dt>
                <img src="../../assets/honeybee/tags/2step.png" alt="">
              </dt>
              <dd>
                <h1>第二步：邀请好友</h1>
                <p>选择您已经购买的任何课程，发送给好友。</p>
              </dd>
            </dl>
          </div>
          <div class="rules_section">
            <dl>
              <dt>
                <img src="../../assets/honeybee/tags/3step.png" alt="">
              </dt>
              <dd>
                <h1>第三步：好友购买成功</h1>
                <p>好友通过您发出的海报或链接，拼团或原价购买成功。</p>
              </dd>
            </dl>
          </div>
          <div class="rules_section">
            <dl>
              <dt>
                <img src="../../assets/honeybee/tags/4step.png" alt="">
              </dt>
              <dd>
                <h1>第四步：奖金到账</h1>
                <p>好友购买成功后，成为你的学弟或学妹，奖学金到账。若有延迟请耐心等待，每人每天可以提现10次。</p>
              </dd>
            </dl>
          </div>
          <div class="rules_section">
            <dl>
              <dt>
                <img src="../../assets/honeybee/tags/5step.png" alt="">
              </dt>
              <dd>
                <h1>第五步：附加奖金</h1>
                <p>如果你的（学弟或学妹）再次介绍给他的好友成功购买同一个课程，你同时可以得到该课程推荐奖学金的20%奖励。</p>
              </dd>
            </dl>
          </div>
        </div>
        <div class="rules_box3">
          <img src="../../assets/honeybee/tags/bottom banner.png" alt="">
        </div>
      </section>
      <div class="invite" @click="choseCourse">
        <img src="../../assets/button.png">
        <p>邀请好友，赚<span>30</span>元</p>
      </div>
    </div>
    <div class="shareMask" v-if="isShareMask" @click="maskHide()">
      <div class="choseSussBox">
        <img src="../../assets/honeybee/tags/arroow.png" alt="">
        <div class="choseSuss">
          <div class="choseSussBottom">
            邀请好友一起学习
          </div>
        </div>
      </div>
    </div>
    <div class="shareMask" v-if="activeImg">
      <div class="save">
        <p>已经为您生成专属海报，</p>
        <p><span>98%的家长</span>转发后成功获得奖学金，</p>
        <p><span>长按图片保存海报</span></p>
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
              <p>我是 {{posterList.nickName}}</p>
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
    <div class="shareMask" v-if="actionMask" @click="actionMaskHide">
      <p class="action_one">关注"你拍一蜜蜂乐园"<br>才能正常上课</p>
      <img src="../../assets/erweima.png" />
      <p class="changan">长按二维码识别关注</p>
    </div>
  </div>
</template>

<script>
  import {
    checkConcerned
  } from '@/api/pay'
  import {
    queryGroupDetails
  } from '@/api/groupon'
  import {
    queryAccountAmount,
    queryPostInfo
  } from '@/api/money'
  import {
    queryUserInfo
  } from '@/api/honey'
  import {
    share
  } from '@/api/wx'
  import html2canvas from "html2canvas";
  export default {
    data() {
      return {
        openid: '',
        courseid: '',
        isShareMask: false,
        activeImg: false,
        actionMask: false,
        user: [],
        schoolMoney: [],
        shopPeo: {},
        payType: '',
        posterList: {}
      };
    },
    created() {
      this.courseid = this.$route.query.courseid
      this.openid = this.$route.query.openid
      this.payType = this.$route.query.payType
      console.log(this.payType)
      console.log(this.$route.query.openid)
      if (this.payType == 1) {
        this.getGroupDetails()
      } else {
        this.getshop()
      }

      this.getMoney()
      this.wxshare()
    },
    methods: {
      getshop() {
        queryUserInfo({
          openId: this.openid
        }).then(res => {
          console.log(res)
          this.shopPeo = res.data.result
        })
      },
      getMoney() {
        const parmas = {
          openId: this.openid
        }
        console.log(this.openid)
        queryAccountAmount(parmas).then(res => {
          console.log('1111', res)
          this.schoolMoney = res.data.result
        })
      },
      getGroupDetails() {
        const parmas = {
          id: this.$route.query.sourceId
        }
        queryGroupDetails(parmas).then(res => {
          console.log(res)
          this.user = res.data.result.userList
        })
      },
      actionMaskHide() {
        this.actionMask = false;
      },
      choseCourse() {
        this.isShareMask = true
      },
      courseDetail(item) {
        this.$router.push({
          path: "/courseinfo",
          query: {
            openid: this.openid,
            courseid: this.courseid,
            isShow: true
          }
        })
      },
      goCourse(item) {
        let params = {
          openId: this.$route.query.openid
        }
        console.log('22222222', params)
        checkConcerned(params).then(res => {
          console.log('333333333', res)
          if (!res.data.result.concerned) {
            this.actionMask = true
          } else if (!res.data.result.hasPhone) {
            this.$router.push({
              path: "/login",
              query: {
                openid: this.openid,
                courseid: this.courseid,
                sourceId: this.$route.query.sourceId
              }
            })
          } else {
            this.$router.push({
              path: "/courselist2",
              query: {
                openid: this.openid,
                courseid: this.courseid,
                sourceId: this.$route.query.sourceId,
                payType: this.$route.query.payType,
                isShow: false
              }
            })
          }
        })

      },
      openPoster() {
        this.isShareMask = true
      },
      maskHide() { // 邀请好友 关闭蒙层 解除滑动限制
        this.isShareMask = false;
        this.poster()
      },
      poster() {
        this.activeImg = true
        queryPostInfo({
          openId: this.$route.query.openid,
          courseId: this.$route.query.courseid
        }).then(res => {
          console.log(res.data.result)
          this.posterList = res.data.result
          this.screenshots()
        })
      },
      close() {
        this.activeImg = false
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
                'hideMenuItems'
              ] // 必填，需要使用的JS接口列表，这里只写支付的
            });

            wx.ready(function () {
              //通过ready接口处理成功验证
              // config信息验证成功后会执行ready方法
              let mytitle =
                "孩子明年上小学啦，送ta一套蜜蜂乐园思维，爱上思考，变聪明！";
              let mydesc = "蜜蜂乐园";
              let mylink =
                "http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/tourbuy?invited=" +
                that.$route.query.openid + "%26courseid=" + that.$route.query.courseid + "%26payType=" + that.$route
                .query.payType + "%26sourceId=" + that.$route.query.sourceId; //分享到首页
              let myimgUrl = "http://thyrsi.com/t6/665/1548835210x2728279033.png";
              // wx.hideMenuItems({
              //   menuList: ["menuItem:copyUrl"]
              // });
              wx.hideMenuItems({
                menuList: [
                  'menuItem:copyUrl'
                ]
              });
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
      screenshots() { //生成图片；
        let b64;
        html2canvas(this.$refs.reportImg, {
          useCORS: true
        }).then(canvas => {
          try {
            b64 = canvas.toDataURL("image/png");
            // console.log(b64);
          } catch (err) {
            console.log(err)
            // alert(err)
          }
          this.state = {
            imgUrl: b64,
            isDownloadImg: true,
          };
          this.isStudyReport = false;
        });
      },
    }
  };

</script>

<style lang="less" scoped>
  .moneyDetail {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    position: relative;

    .GroupShop {
      width: 100%;
      text-align: center;
      line-height: 3rem;
      color: #ff4700;
      font-size: 1.2rem;
      font-weight: bolder;
      margin-top: 1rem;

      h1 {
        font-weight: bold;
      }
    }

    .tag {
      position: absolute;
      right: 0;
      top: 8%;
      display: block;
      background: #ff4906;
      padding: 0.2rem 0.3rem 0.2rem 1rem;
      color: #fff;
      border-top-left-radius: 1.5rem;
      border-bottom-left-radius: 1.5rem;
      z-index: 99;
    }

    .member {
      width: 100%;

      margin-top: 1rem;

      .menyShop {
        width: 100%;
        display: flex;
        justify-content: center;

        >div {
          width: 23%;
          text-align: center;
          position: relative;

          img {
            width: 75%;
            display: block;
            margin: 0 auto;
            border-radius: 50%;
            border: 5px solid yellow;
          }

          span {
            width: 70%;
            display: block;
            position: absolute;
            background: #fd8a00;
            color: #fff;
            bottom: -0.5rem;
            left: 50%;
            margin-left: -35%;
            border-radius: 0.3rem;
          }

          p {
            width: 100%;
            text-align: center;
            position: absolute;
            bottom: -2rem;
            color: #ec9539;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap
          }
        }
      }
    }

    .moneyTags {
      margin-top: 3rem;
      width: 100%;
      display: flex;
      justify-content: space-around;
      padding: 0 2rem;
      box-sizing: border-box;

      .getCourse {
        background: #ff8e4e;
        width: 30%;
        text-align: center;
        padding: 0.5rem;
        border-radius: 1.2rem;
        color: #fff;
      }

      .getMoney {
        background: #ff6c1b;
        padding: 0.5rem 1rem;
        border-radius: 1.2rem;
        color: #fff;
      }
    }

    .moneyBottom {
      width: 100%;
      flex: 1;
      margin-top: 2rem;

      .banner {
        width: 100%;

        img {
          width: 100%;
        }
      }

      .money_num {
        width: 84%;
        height: 10rem;
        background: #fff;
        background: url('../../assets/honeybee/tags/jiangjinkuang.png');
        background-size: 100% 100%;
        margin: 0 auto;
        border-radius: 0.6rem;
        display: flex;
        flex-direction: column;
        margin-top: -15%;
        position: relative;
        align-items: center;

        .money_num_tit {
          width: 100%;
          text-align: center;
          height: 2.5rem;
          line-height: 2.5rem;
          font-size: 1.2rem;
          margin-top: 1rem;
        }

        p {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: .5rem;
          color: #F95600;
          font-size: 1.6rem;
          font-weight: bold;

          b {
            font-size: 1rem;
          }
        }
      }

      .rules {
        width: 100%;
        height: 1rem;
        flex: 1;
        margin-top: 1rem;
        padding-bottom: 3rem;

        .rules_box1 {
          width: 61.6%;
          margin: 0 auto;

          img {
            width: 100%;
          }
        }

        .rules_box2 {
          width: 94%;
          margin: 0 auto;

          .rules_section {
            width: 100%;
            padding: 1rem 0;

            &:nth-child(even) {
              h1 {
                color: #4A90E2;
              }
            }

            dl {
              width: 100%;
              display: flex;

              dt {
                flex: 2;
                padding: 0 1rem;

                img {
                  width: 100%;
                }
              }

              dd {
                flex: 7;

                h1 {
                  font-family: PingFangHK-Semibold;
                  font-size: 1.4rem;
                  color: #FF4E00;
                  letter-spacing: 1.9px;
                  font-weight: bold;
                  padding-bottom: .5rem;
                }

                p {
                  font-family: PingFangHK-Regular;
                  font-size: 1.2rem;
                  color: #4A4A4A;
                  letter-spacing: 1.8px;
                }
              }
            }
          }
        }

        .rules_box3 {
          width: 100%;
          margin-top: 1.5rem;

          img {
            width: 100%;
          }
        }
      }

      .invite {
        width: 94.9%;
        margin: 0 auto;
        position: fixed;
        bottom: 3%;
        left: 50%;
        margin-left: -48%;
        z-index: 90;
        animation: shake .5s infinite;

        img {
          width: 100%;
        }

        p {
          position: absolute;
          top: 0;
          width:100%;
          text-align: center;
          line-height: 52.5px;
          font-size: 1.5rem;
          color:chocolate
        }
      }

      .posterTag {
        width: 5rem;
        height: 2rem;
        background: #33BEA3;
        position: fixed;
        right: -1%;
        top: 50%;
        margin-top: -1rem;
        text-align: center;
        line-height: 2rem;
        color: #fff;
        border-radius: 8px;
        font-family: PingFangHK-Regular;
        z-index: 99
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
        display: block;
        width: 116px;
        margin: 0 auto;
      }

      .action_one {
        /*margin-top: 220px;*/
        color: #FF5500;
        margin-top: 40%;
        width: 100%;
        text-align: center;
      }

      .changan {
        margin-top: 30px;
        color: #FF5500;
        text-align: center;
      }

      .choseSussBox {
        width: 100%;
        height: 100%;
        position: relative;

        img {
          width: 25%;
          position: absolute;
          right: 1rem;
          top: -1rem;
        }

        .choseSuss {
          width: 70%;
          height: auto;
          position: fixed;
          left: 50%;
          top: 50%;
          margin-left: -35%;
          margin-top: -30%;

          .choseSussBottom {
            width: 100%;
            text-align: center;
            line-height: 3rem;
            margin-top: 1rem;
            padding-bottom: .6rem;
            font-size: 1.2rem;
            color: #FE7738;
          }
        }
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

  }

  @keyframes shake {
    0% {
      bottom: 10px;
    }

    50% {
      bottom: 25px
    }

    100% {
      bottom: 10px
    }
  }

</style>
