<template lang="html">
  <div class="course" id="course" ref="course">
    <v-teacher></v-teacher>
    <v-loading v-if="load"></v-loading>
    <!-- <v-active /> -->
    <!-- <div class="top"></div>
      <div class="per_course" v-for="item in courselist" @click="gonext(item)">
        <div class="course_topic"><img :src="item.imgUrl" width="100%" height="199" /></div>
        <div class="course_desc">
          <p class="desc">
            <span>{{item.courseName}}</span>
            <strong>{{item.courseDescribe}}</strong>
          </p>
          <p class="goStudy">
            <span>去学习</span>
          </p>
        </div>
      </div>
     -->
    <div class="background" id="background">
      <img src="http://thyrsi.com/t6/665/1548857508x2890174076.png" class="bj" />
      <div :class="[shopshow?'shop active':'shop']" @click="jump(courselist[0])">
        <img src="../../assets/honeybeeIndex/csd.png" />
        <img src="../../assets/honeybeeIndex/jqqdd.png" />
      </div>
      <div :class="[rocketshow?'rocket active':'rocket']" @click="jump(courselist[1])">
        <img :src="courselist[1].imgUrl" />
        <img src="../../assets/honeybeeIndex/4_06.png" v-if="courselist[1].status===0" />
        <img src="../../assets/honeybeeIndex/4_03.png" v-if="courselist[1].status===1" />
        <img src="../../assets/honeybeeIndex/4_09.png" class="gomoney" v-if="courselist[1].status===2" />
      </div>
      <div :class="[clockshow?'clock active':'clock']" @click="jump(courselist[2])">
        <img src="../../assets/honeybeeIndex/zb.png" />
        <img src="../../assets/honeybeeIndex/jqqdd.png" />
      </div>
      <div :class="[carshow?'car active':'car']" @click="jump(courselist[3])">
        <img src="../../assets/honeybeeIndex/dg.png" />
        <img src="../../assets/honeybeeIndex/jqqdd.png" />
      </div>
      <div :class="[expressshow?'express active':'express']" @click="jump(courselist[4])">
        <img src="../../assets/honeybeeIndex/kd.png" />
        <img src="../../assets/honeybeeIndex/jqqdd.png" />
      </div>
    </div>
    <v-footer :myopenid='openid' :iscourse='isCourse' :ismy='isMy' :ismoney='ismoney' />
  </div>
</template>
<style lang="less" scoped>
  .course {
    width: 100%;
    height: 100%;
    overflow: auto;

    .background {
      width: 100%;
      height: auto;
      margin-bottom: 50px;
      position: relative;

      .bj {
        width: 100%;
      }

      .active {
        animation: scale 0.5s alternate;
      }

      .rocket {
        position: absolute;
        right: 16%;
        bottom: 6.5%;
        width: 40%;
        text-align: center;

        img {
          width: 100%;

          &:nth-child(2) {
            width: 2rem;
            margin-top: -16%;
            margin-left: 1rem;
          }
        }

        .gomoney {
          width: 2rem !important;
        }
      }

      .shop {
        position: absolute;
        left: 8%;
        bottom: 19%;
        width: 25%;
        text-align: center;

        img {
          // width: 130%;
          width: 130%;

          &:nth-child(2) {
            width: 2rem;
            margin-left: .3rem;
            margin-top: -25%;
          }
        }

        .gomoney {
          width: 2rem !important;
        }

      }

      .clock {
        position: absolute;
        right: 5%;
        bottom: 30.4%;
        width: 30%;
        text-align: center;

        img {
          width: 100%;

          &:nth-child(2) {
            width: 2rem;
            margin-top: -25%;
          }
        }

        .gomoney {
          width: 2rem !important;
        }
      }

      .car {
        position: absolute;
        left: 14%;
        top: 38%;
        width: 30%;
        text-align: center;

        img {
          width: 100%;

          &:nth-child(2) {
            width: 2rem;
            margin-top: -25%;
          }
        }

        .gomoney {
          width: 2rem !important;
        }

      }

      .express {
        position: absolute;
        right: 14.3%;
        top: 20.4%;
        width: 30%;
        text-align: center;

        img {
          width: 100%;

          &:nth-child(2) {
            width: 2rem;
            margin-top: -20%;
          }
        }

        .gomoney {
          width: 2rem !important;
        }

      }
    }
  }

  @keyframes scale {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(0.9);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes twinkling {
    0% {
      opacity: 0.2;
      filter: alpha(opacity=20);
      -webkit-transform: scale(1);
    }

    50% {
      opacity: 1;
      filter: alpha(opacity=100);
      -webkit-transform: scale(1.12);
    }

    100% {
      opacity: 0.2;
      filter: alpha(opacity=20);
      -webkit-transform: scale(1);
    }
  }

</style>

<script>
  import Footer from "@/components/_footer.vue";
  import Active from "@/components/_active.vue";
  import Loading from '@/components/_loading.vue';
  import Teacher from '@/components/_teacher.vue';
  import {
    Indicator,
    MessageBox,
    Toast
  } from "mint-ui";
  import {
    queryCourse,
    querySystemResources
  } from "@/api/course";
  import {
    authorize,
    share
  } from "@/api/wx";
  import {
    isused
  } from "@/api/mine";

  export default {
    components: {
      "v-footer": Footer,
      "v-active": Active,
      "v-loading": Loading,
      "v-teacher": Teacher
    },
    data() {
      return {
        courselist: [],
        openid: "",
        inviterId: "",
        isCourse: true,
        isMy: false,
        ismoney: false,
        useid: "",
        isBuy: "",
        groupNum: "", //拼团号
        orderid: "", //订单号
        useid1: "",
        close: null,
        shopshow: false,
        rocketshow: false,
        clockshow: false,
        carshow: false,
        expressshow: false,
        load: true
      };
    },
    methods: {
      jump(item) {
        console.log(item)
        if (item.isEnable === 0) {
          if (item.id === '10001') {
            if (item.isOldUser === 0) {
              this.shopshow = true
              this.$MessageBox({
                title: '',
                message: '敬请期待', // 提示的内容，作为参数，传进来
                closeOnClickModal: true, // 表示不只是点击确定按钮才能关闭弹窗，点击页面的任何地方都可以关闭弹窗
                confirmButtonClass: 'typesbtn' //给确定按钮加一个class类名（因为在页面上显示的效果是'确定'二字字体比别的字体小很多，很奇怪，所以要对它的样式单独进行调整）
              });
              setInterval(() => {
                this.shopshow = false
              }, 500);
            } else {
              this.shopshow = true
              MessageBox.alert('', {
                message: '课件升级中'
              })
              setInterval(() => {
                this.shopshow = false
              }, 500);
            }

          } else if (item.id === '10003') {
            this.clockshow = true
            MessageBox.alert('', {
              message: '敬请期待'
            })
            setInterval(() => {
              this.clockshow = false
            }, 500);
          } else if (item.id === '10004') {
            this.carshow = true
            MessageBox.alert('', {
              message: '敬请期待'
            })
            setInterval(() => {
              this.carshow = false
            }, 500);
          } else if (item.id === '10005') {
            this.expressshow = true
            MessageBox.alert('', {
              message: '敬请期待'
            })
            setInterval(() => {
              this.expressshow = false
            }, 500);
          }
        } else {
          let mydata = {
            openId: this.openid,
            courseId: item.id
          };
          console.log('23456', mydata)
          this.rocketshow = true;
          setTimeout(() => {
            console.log('12333333', item.status)
            //查看是否购买成功；购买成功：5003，购买未拼团成功(拼团中)：5002，未购买：5001
            this.rocketshow = false;
            if (item.status == 2) {
              //已购买 ==》跳转到章节列表
              this.$router.push({
                path: "/moneyDetail",
                query: {
                  openid: this.openid,
                  courseid: item.id,
                  sourceId: item.groupId,
                  payType: item.payType
                }
              });
            } else if (item.status == 1) {
              this.$router.push({
                path: "/tourbuy",
                query: {
                  openid: this.openid,
                  courseid: item.id,
                  sourceId: item.groupId,
                  payType: item.payType
                }
              });
            } else if (item.status == 0) {
              this.$router.push({
                path: "/courseInfo",
                query: {
                  openid: this.openid,
                  courseid: item.id
                }
              });
            } else {
              Toast("拉取失败");
            }
          }, 500);
        }
      },
      getList() {
        // let that = this;
        console.log("openid", this.openid);
        let mydata = {
          pageSize: "",
          pageNum: "",
          openId: this.openid
        };
        // Indicator.open()
        queryCourse(mydata).then(res => {
          if (res.data.statusCode == "200") {
            console.log('2231312', res.data)
            this.courselist = res.data.result;
          } else {
            this.$message.error("拉取失败");
            this.courselist = [];
          }
        });
      },
      wxshare() {
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
                "蜜蜂乐园给孩子最好的数理思维启蒙、生活常识";
              let mydesc = "让小蜜蜂陪孩子去成长";
              let mylink =
                "http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/course"; //分享到首页
              //let mylink='http://test-yunying.coolmath.cn/beec/course';//分享到首页
              let myimgUrl = "http://thyrsi.com/t6/670/1550222880x2728278638.png";
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
      showshare() {
        function onBridgeReady() {
          WeixinJSBridge.call("showOptionMenu");
        }

        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener(
              "WeixinJSBridgeReady",
              onBridgeReady,
              false
            );
          } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
            document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
          }
        } else {
          onBridgeReady();
        }
      },
      scrollToBottom() {
        var container = this.$refs.course;
        try {
          var container = this.$refs.course;
          container.scrollTop = container.scrollHeight;

        } catch (e) {}
        container.scrollTop = container.scrollHeight;
        // console.log(container.scrollTop, container.scrollHeight + 100);
      }
    },
    mounted() {
      setTimeout(() => {
        this.scrollToBottom();
        // Indicator.close()
        this.load = false
      }, 1000);

    },

    created: function () {
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        if (window.name != 'open') {
          window.name = 'open';
          window.location.reload();
        }
      }
      this.load = true
      this.showshare();
      this.useid = this.$route.query.refresh;
      let openid = this.$route.query.openid;
      let flag = this.$route.query.flag;
      let inviterId = this.$route.query.inviterId;
      this.openid = openid;
      this.wxshare();
      this.getList();
    }
  };

</script>
