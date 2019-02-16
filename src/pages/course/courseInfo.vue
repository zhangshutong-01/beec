<template>
  <div class="courseInfo">
    <div class="banner">
      <mt-swipe :auto="2000">
        <!--<mt-swipe-item v-for="item in banneritems" :key="item.id">-->
        <!--&lt;!&ndash;<a :href="item.href">&ndash;&gt;-->
        <!--<img :src="item.url"/>-->
        <!--&lt;!&ndash;</a>&ndash;&gt;-->
        <!--</mt-swipe-item>-->
        <mt-swipe-item>
          <img src="../../assets/courseinfo/banner/1.png">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../../assets/courseinfo/banner/2.png">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../../assets/courseinfo/banner/3.png">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../../assets/courseinfo/banner/4.png">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="courserDesc">
      <div class="desc_top">
        <p>¥{{courseData.groupPrice}}</p>
        <span>单独购买￥{{courseData.originalPrice}}</span>
        <div class="desc_line">
          <span>{{courseData.courseTote}}节课</span>
          <span class="line"></span>
          <span>{{courseData.courseDescribe | changeAge}}岁</span>
          <span class="line"></span>
          <span class="lastChild">买完即学</span>
        </div>
      </div>
      <div class="desc_bot">
        <p class="head_img">
          <img src="../../assets/course/head.png">
        </p>
        <p>等{{courseData.perNumber}}人已参加</p>
      </div>
    </div>
    <div class="information">
      <div class="headerCont tabHeader">
        <ul>
          <li :class="mynum==1?'active':''" @click="courseInfor(1)"><span>课程详情</span> </li>
          <li :class="mynum==2?'active':''" @click="courseInfor(2)"><span>产品展示</span></li>
          <li :class="mynum==3?'active':''" @click="courseInfor(3)"><span>购买须知</span> </li>
        </ul>
      </div>
      <div class="classDetail">
        <div class="tabcContent">
          <img src="../../assets/courseinfo/new/11.png">
          <img src="../../assets/courseinfo/22.png">
        </div>
        <div class="tabDetails_nine">
          <h1>【课程动画视频】</h1>
          <video src="../../assets/courseinfo/WeChat_20190125150648.mp4" controls></video>
        </div>
        <div class="tabDetails_ten">
          <img src="../../assets/courseinfo/2 2.png">
          <img src="../../assets/courseinfo/33.png">
        </div>
        <img src="../../assets/courseinfo/77.png" class="img18">
        <img src="../../assets/courseinfo/18.png" class="img18">
        <div class="empty" v-if="isShow"></div>
      </div>
    </div>
    <div class="fixedBtn" v-if="isShow&&shopThisCourse===3||shopThisCourse===4">
      <div class="ninemoney" @click="paynet('199')">
        <p class="oldprice">
          <span>¥ {{courseData.originalPrice}}</span>
        </p>
        <p class="onlybuy">单独购买</p>
      </div>
      <div class="threemoney" @click="paynet('99')">
        <p class="pintuan">¥ {{courseData.groupPrice}}</p>
        <p class="group">一键成团（3人团）</p>
      </div>
    </div>
    <div class="gocourse" v-if="shopThisCourse===1" @click="gocourse">
      去上课
    </div>
    <v-teacher></v-teacher>
  </div>
</template>
<script>
  import {
    Toast,
    Indicator,
    Swipe,
    SwipeItem
  } from "mint-ui";
  import Teacher from '@/components/_teacher.vue';
  import Footer from "@/components/_footer.vue";
  import {
    querySectionForC,
    queryCourseById,
  } from "@/api/course";
  import {
    createOrderInfo
  } from "@/api/pay";
  import {
    authorize,
    share
  } from "@/api/wx";
  import {
    checkTradingstate
  } from '@/api/course'
  export default {
    components: {
      "mt-swipe": Swipe,
      "mt-swipe-item": SwipeItem,
      "v-teacher": Teacher
    },
    data() {
      return {
        banneritems: [{
          url: ""
        }],
        courseData: {}, // 课程详情
        mynum: 1,
        course: {},
        openid: "",
        sectionid: "", // 课程小结id
        isShare: 0, // 0不是从分享页进来，1是从分享页面进来的。分享url上字段判断是否是分享进来的
        useid: "",
        courselist: [],
        useid1: "",
        isShow: true,
        administrationId: '',
        shopThisCourse: null,
        payType: '',
        sourceId: ''
      };
    },
    mounted() {
      this.wxshare();
      this.getCourseData();
      this.scrollChange();
    },
    created: function () {
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        if (window.name != 'open') {
          window.name = 'open';
          window.location.reload();
        }
      }
      this.course.courseid = this.$route.query.courseid;
      this.useid = this.$route.query.refresh;
      this.isShare = this.$route.query.isShare;
      if (this.$route.query.isShow) {
        this.isShow = !this.$route.query.isShow
      } else {
        this.isShow = true
      }
      if (this.isShare === '1') {
        this.openid = this.$route.query.openid;
      } else {
        this.openid = this.$route.query.openid;
      }
      if (this.$route.query.courseid != undefined) {
        this.course.courseid = this.$route.query.courseid;
      }
      checkTradingstate({
        openId: this.openid,
        courseId: this.course.courseid
      }).then(res => {
        console.log('21312321', res)
        this.shopThisCourse = res.data.result.isPay
        this.payType = res.data.result.payType
        this.sourceId = res.data.result.sourceId
      })

    },
    filters: {
      changeAge(data) {
        if (data) {
          let babyage = data.substring(2, 5);
          return babyage;
        }
      }
    },
    methods: {
      gocourse() {
        console.log(123)
        this.$router.push({
          path: "/moneyDetail",
          query: {
            openid: this.openid,
            courseid: this.course.courseid,
            sourceId: this.sourceId,
            payType: this.payType
          }
        });
      },
      getCourseData() {
        //获取课程详情数据；
        var me = this;
        let params = {
          id: me.course.courseid
        };
        Indicator.open();
        queryCourseById(params).then(res => {
          console.log('详情数据', res.data.result)
          let resData = res.data;
          Indicator.close();
          if (resData.statusCode == 200) {
            me.courseData = resData.result;
            // console.log(me.courseData);
          } else {
            Indicator.close();
            Toast(resData.message);
          }
        });
      },
      scrollChange() {
        //设置滑动距离
        $(window).scroll(function () {
          // console.log($(window).scrollTop());
          if ($(window).scrollTop() >= 200) {
            $(".headerCont").addClass("activeTabHeader");
          } else {
            $(".headerCont").removeClass("activeTabHeader");
          }
        });
      },
      courseInfor(num) {
        this.mynum = num
        if (num === 1) {
          var h = $('.tabcContent').offset().top - 50;
          $("html, body").animate({
            scrollTop: h
          }, 500)
        } else if (num === 2) {
          var h = $('.tabDetails_nine').offset().top - 100;
          $("html, body").animate({
            scrollTop: h
          }, 500)
        } else if (num === 3) {
          var h = $('.img18').offset().top - 50;
          $("html, body").animate({
            scrollTop: h
          }, 500)
        }
      },
      paynet(names) {
        console.log(names)
        if (names == "99") {
          let that = this;
          let mydata = {
            openId: this.openid,
            orderSource: 1,
            administrationId: this.courseData.administrationId
          };
          createOrderInfo(mydata).then(res => {
            console.log(res)
            if (res.data.statusCode == "200") {
              that.$router.push({
                path: "/pay",
                query: {
                  openid: this.openid,
                  courseid: this.course.courseid,
                  sourceId: res.data.result.sourceId,
                  orderNo: res.data.result.orderNo,
                  orderSource: res.data.result.orderSource
                }
              });
            } else if (res.data.statusCode == "29") {
              alert(
                "您已参与此课程的拼团，24小时后没有拼团成功，则支付金额原路返回。"
              );
            }
          });
        } else {
          console.log(123)
          let that = this;
          let mydata = {
            openId: this.openid,
            orderSource: 2,
            administrationId: this.courseData.administrationId
          };
          createOrderInfo(mydata).then(res => {
            console.log('222', res)
            if (res.data.statusCode == "200") {
              this.$router.push({
                path: "/pay",
                query: {
                  openid: this.openid,
                  courseid: this.course.courseid,
                  orderNo: res.data.result.orderNo,
                  orderSource: res.data.result.orderSource
                }
              });
            }
          });
        }
      },
      wxshare() {
        let me = this;
        //wx是引入的微信sdk
        // wx.config('这里有一些参数');//通过config接口注入权限验证配置
        let mydata = {
          url: window.location.href
        };
        share(mydata).then(res => {
          // console.log(res)
          if (res.data.statusCode == "200") {
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.result.appId, // 必填，公众号的唯一标识
              timestamp: res.data.result.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.result.noncestr, // 必填，生成签名的随机串
              signature: res.data.result.signature, // 必填，调用js签名，
              jsApiList: [
                "onMenuShareAppMessage",
                "onMenuShareTimeline",
                "chooseImage",
                'hideMenuItems'
              ] // 必填，需要使用的JS接口列表，这里只写支付的
            });
            wx.ready(function () {
              //通过ready接口处理成功验证
              // config信息验证成功后会执行ready方法
              let mytitle = "点击领取让孩子受用一生的数理思维课程";
              let mydesc = "9大生活场景让小朋友爱上数学";
              let mylink =
                "http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/courseInfo?isShare=1%26courseid=" +
                me.course.courseid; //分享到首页
              let myimgUrl = "http://thyrsi.com/t6/665/1548835210x2728279033.png";
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
                success: function (res) {},
                fail: function (res) {
                  alert("分享失败");
                },
                cancel: function (res) {
                  // 用户取消分享后执行的回调函数
                  alert("取消操作失败");
                }
              });
              wx.onMenuShareTimeline({
                //分享朋友圈
                title: mytitle, // 分享标题
                link: mylink, // 分享链接
                imgUrl: myimgUrl, // 分享图标分享图标
                success: function (res) {},
                fail: function (res) {
                  alert("分享失败");
                },
                cancel: function (res) {
                  // 用户取消分享后执行的回调函数
                  alert("取消操作失败");
                }
              });
            });
            wx.error(function (res) {
              //通过error接口处理失败验证
              // config信息验证失败会执行error函数
            });
          }
        });
      }
    },
  };

</script>
<style lang="less" scoped>
  .courseInfo {
    width: 100%;
    min-width: 320px;
    position: relative;
    background: #f2f2f2;
    /*background: pink;*/
    font-family: PingFangSC-Regular;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch; //解决移动端 滑动不流畅的


    .clearfix:before,
    .clearfix:after {
      content: " ";
      display: table;
    }

    .clearfix:after {
      clear: both;
      overflow: hidden;
    }

    .clearfix {
      zoom: 1;
    }

    .banner {
      width: 100%;
      height: 211.5px;

      img {
        display: block;
        width: 100%;
      }
    }

    .courserDesc {
      background: #ffffff;
      /*width: 90%;*/
      padding: 0 15px;
      margin: 0 auto;

      .desc_top {
        height: 58px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e9e9e9;
        >span{
          font-size: .26rem;
          margin-left:-.7rem;
        }
        p {
          font-size: 23px;
          color: #f85430;
        }

        .desc_line {
          font-size: 13px;
          color: #949494;
          height: 18.5px;
          line-height: 18.5px;

          .line {
            border-right: 1px solid #949494;
            margin: 0 4px;
          }

          .lastChild {
            color: red;
          }
        }
      }

      .desc_bot {
        display: flex;
        align-items: center;
        height: 46px;
        font-size: 11px;
        color: #949494;

        .head_img {
          width: 105px;
          margin-right: 15px;

          img {
            display: block;
            width: 100%;
          }
        }
      }
    }

    .information {
      width: 100%;
      background: #EDF3EE;
      overflow: hidden;

      /*margin-bottom: 54px;*/
      img {
        display: block;
        width: 100%;
        margin: 0 auto;
        border: none;
      }

      .tabHeader {
        position: relative;
        z-index: 9999;
        width: 100%;
        height: 45px;
        margin-top: 9px;
        background: #ffffff;
        font-size: 17px;
        font-family: PingFangSC-Medium !important;
        color: #666666;

        ul {
          display: flex;
          height: 45px;
          justify-content: space-around;
          text-align: center;
          align-items: center;
        }

        ul li {
          // height: 45px;
          flex: 1;
          // list-style: none;
          // float: left;
          // line-height: 45px;
          // width: 100%;

          >span {
            border-right: 1px solid #949494;
            width: 99%;
            height: 100%;
            display: inline-block;
          }

          &:nth-child(3) {
            span {
              border-right: none;
            }
          }
        }

        .active {
          color: #fb7c27;
        }
      }

      .activeTabHeader {
        position: fixed;
        top: 0;
        left: 0;
        margin-top: 0px;
        z-index: 99;
      }

      .tabcContent {
        width: 100%;
        overflow: hidden;
        padding-top: .4rem;

        img {
          &:nth-child(2) {
            padding: .4rem 0 .2rem 0;
          }
        }
      }

      .tabDetails_nine {
        margin-top: .1rem;

        h1 {
          width: 100%;
          background: #fff;
          text-align: center;
          font-size: .4rem;
          padding: .2rem 0;
        }

        video {
          width: 100%;
        }
      }

      .tabDetails_ten {
        width: 100%;

        img {
          display: block;
          width: 96%;
          margin: 0 auto;
          margin-top: 30px;

          &:nth-child(2) {
            width: 100%;
            margin-top: 30px;
          }

          &:nth-child(3) {
            width: 100%;
            margin-top: 30px;
          }
        }

        >div {
          img {
            margin-top: -.5rem;
          }
        }

        .classDetail {
          background: url('../../assets/courseinfo/RectangleCopy8.png') center top;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%
        }
      }

      .img18 {
        width: 100%;
        margin: 0 auto;
        margin-top: 30px;
      }

      .empty {
        width: 100%;
        height: 51.5px;
      }
    }

    .fixedBtn {
      width: 100%;
      height: 53.5px;
      color: #ffffff;
      display: flex;
      text-align: center;
      position: fixed;
      left: 0;
      bottom: 0;

      .ninemoney {
        background: #fe7738;
        width: 45%;

        .oldprice {
          font-family: PingFangSC-Medium;
          font-size: 19px;
          margin-top: 5px;
        }

        .through {
          font-size: 14px;
          margin-left: 8px;
          text-decoration: line-through;
        }

        .onlybuy {
          font-size: 13px;
        }
      }

      .threemoney {
        width: 55%;
        background: #ff4e00;
        color: #ffffff;

        .pintuan {
          font-size: 19px;
          font-family: PingFangSC-Medium;
          margin-top: 5px;
        }

        .group {
          font-size: 13px;
        }
      }
    }

    .gocourse {
      width: 100%;
      height: 53.5px;
      color: #ffffff;
      text-align: center;
      position: fixed;
      left: 0;
      bottom: 0;
      text-align: center;
      font-size: .36rem;
      background: #f85430;
      line-height: 53.5px;
    }
  }

</style>
