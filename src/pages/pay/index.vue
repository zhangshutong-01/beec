<template lang="html">
  <!-- 拼团确认支付 和解锁所有课程 确认支付页面 -->

  <div @touchmove.prevent>
    <div v-if="!iscoupon" class="groupon">
      <div class="makesure" v-if="isgroupon">
        <div class="topic"><img :src="course.courseimg" width="100%" height="199" /></div>
        <strong>{{course.coursename}}</strong>
        <span>{{course.coursedesc}}</span>
        <hr>
        <div class="groupon_price">
          <cite>拼团价格：</cite>
          <em>¥ 3</em>
        </div>
        <div class="old_price">
          <cite>原价：</cite>
          <em>¥ 9.9</em>
        </div>
        <div class="tishi">
          确认支付5小时后没有拼团成功，则支付金额原路返回。
        </div>
        <!--<div class="cashcoupon" @click="showCoupon">-->
        <!--<tt>现金券：</tt>-->
        <!--<img src="../../assets/pay/jiantou.png" />-->
        <!--<b v-if="couponid == ''">选择现金券</b>-->
        <!--<b v-else>¥ {{couponAmount}}元</b>-->
        <!--</div>-->
      </div>
      <div class="makesure2" v-if="!isgroupon">
        <div class="topic"><img :src="course.courseimg" width="100%" height="199" /></div>
        <strong>{{course.coursename}}</strong>
        <span>{{course.coursedesc}}</span>
        <hr>
        <div class="groupon_price">
          <cite>价格：</cite>
          <em>¥ 9.9</em>
        </div>
        <!--<div class="cashcoupon" @click="showCoupon">-->
        <!--<tt>现金券：</tt>-->
        <!--<img src="../../assets/pay/jiantou.png" />-->
        <!--<b v-if="couponid == ''">选择现金券</b>-->
        <!--<b v-else>¥ {{couponAmount}}元</b>-->
        <!--</div>-->
      </div>
      <div class="pay_button" @click="groupon">
        确认支付¥<span>{{orderAmount}}</span>
      </div>

    </div>
    <v-coupon v-if="iscoupon" :myopenid="openid" @selectItem="myselect" @backItem="backItem"></v-coupon>
  </div>
</template>

<script>
  import Coupon from '@/components/_coupon.vue'
  import {
    payOrderInfo,
    checkConcerned
  } from '@/api/pay'
  import {
    queryGroupDetails
  } from '@/api/groupon'
  import {
    share
  } from '@/api/wx'
  import {
    queryCourseById
  } from '@/api/course'
  export default {
    components: {
      'v-coupon': Coupon,
    },
    data() {
      return {
        iscoupon: false,
        isgroupon: false,
        couponitem: {}, //选中的优惠券信息
        course: {
          coursename: '',
          coursedesc: '',
          courseimg: ''
        },
        orderid: '', //订单号
        openid: '',
        groupNo: '',
        zhijie: 0, //0：首页-支付  1 分享-支付
        courseId: '', //课程号
        orderAmount: 3,
        couponAmount: '',
        couponid: '',
        orderNo: ''
      }
    },
    methods: {
      groupon() {
        let that = this;
        let mydata = {
          orderNo: this.orderNo
        }
        console.log('123', mydata)
        payOrderInfo(mydata).then(res => {
          console.log(res)
          if (res.data.statusCode == "30") {
            alert("已经支付过此课程");
          } else if (res.data.statusCode == "12007") {
            console.log(123)
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                "appId": res.data.result.appId, //公众号名称，由商户传入
                //"timeStamp":res.data.timeStamp,         //时间戳，自1970年以来的秒数
                "timeStamp": String(res.data.result.timeStamp),
                "nonceStr": res.data.result.nonceStr, //随机串
                "package": res.data.result.package,
                "signType": "MD5", //微信签名方式：
                "paySign": res.data.result.paySign, //微信签名,
              },
              function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  if (that.zhijie == 1) {
                    that.$router.push({
                      path: '/share',
                      query: {
                        groupNo: that.groupNo,
                        openid: that.openid,
                        orderid: that.orderid,
                        orderNo: this.$route.query.orderNo
                      }
                    });
                  } else if (that.zhijie == 2) { //分享的页面进的开团
                    that.$router.push({
                      path: '/groupon',
                      query: {
                        groupNo: that.groupNo,
                        openid: that.openid,
                        orderid: that.orderid,
                        orderNo: this.$route.query.orderNo
                      }
                    });
                  } else {
                    if (that.isgroupon) { //团购跳转到分享页面
                      that.$router.push({
                        path: '/groupon',
                        query: {
                          groupNo: that.groupNo,
                          openid: that.openid,
                          orderid: that.orderid,
                          orderNo: this.$route.query.orderNo
                        }
                      });
                    } else { //到课程解锁页面
                      that.$router.push({
                        path: '/moneyDetail',
                        query: {
                          openid: that.openid,
                          flag: true
                        }
                      });
                    }
                  }
                }
              });
          } else if (res.data.statusCode === "12005") {
            this.$router.push({
              path: '/tourbuy',
              query: {
                openid: that.openid,
                orderNo: this.orderNo,
                courseid: this.$route.query.courseId
              }
            })
          }
        })
      },
      showCoupon() {
        var mo = function (e) {
          e.preventDefault();
        };
        document.body.style.overflow = 'auto'; //出现滚动条
        document.removeEventListener("touchmove", mo, false);

        this.$router.push({
          name: 'Paycoupon',
          query: {
            openid: this.openid,
            groupNo: this.groupNo,
            courseId: this.courseId,
            orderid: this.orderid,
            zhijie: this.zhijie,
            names: this.names,
          } //openid
        })
        // this.iscoupon = true;
      },
      backItem(isclose) {
        this.iscoupon = isclose;
      },
      wxshare() {
        //wx是引入的微信sdk
        // wx.config('这里有一些参数');//通过config接口注入权限验证配置
        let mydata = {
          'url': window.location.href
        };
        share(mydata).then(res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.result.appId, // 必填，公众号的唯一标识
              timestamp: res.data.result.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.result.noncestr, // 必填，生成签名的随机串
              signature: res.data.result.signature, // 必填，调用js签名，
              jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'hideMenuItems'] // 必填，需要使用的JS接口列表，这里只写支付的
            });
            wx.ready(function () { //通过ready接口处理成功验证
              // config信息验证成功后会执行ready方法
              let mytitle = '孩子明年上小学啦，送ta一套蜜蜂数学思维，爱上思考，变聪明！';
              let mydesc = '蜜蜂数学';
              let mylink =
                'http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/course'; //分享到首页
              //let mylink='http://test-yunying.coolmath.cn/beec/course';//分享到首页
              let myimgUrl = 'http://test-yunying.coolmath.cn/beec/share.png';
              wx.hideMenuItems({
                menuList: [
                  'menuItem:copyUrl'
                ]
              });
              wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
                title: mytitle, // 分享标题
                desc: mydesc, // 分享描述
                link: mylink, // 分享链接
                imgUrl: myimgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              });
              wx.onMenuShareTimeline({ //分享朋友圈
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
            });
            wx.error(function (res) { //通过error接口处理失败验证
              // config信息验证失败会执行error函数
            });
          } else {

          }
        })
      },
      getData() {
        let that = this;
        let mydata = {
          'id': this.courseId
        };
        this.$nextTick(function () {
          queryCourseById(mydata).then(res => {
            // console.log("11111111111111111111111111333333333333333333333333");
            console.log(res);
            let resData = res.data;
            if (res.data.statusCode == '200') {
              that.course.coursename = resData.result.courseName;
              that.course.coursedesc = resData.result.courseDescribe;
              that.course.courseimg = resData.result.imgUrl;
            } else {
              // console.log("11111111111111111112222222222233333333");
            }
          })
        })
      }
    },
    created() {
      //显示滚动条
      var mo = function (e) {
        e.preventDefault();
      };
      document.body.style.overflow = 'auto'; //出现滚动条
      document.removeEventListener("touchmove", mo, false);

      this.openid = this.$route.query.openid;
      this.groupNo = this.$route.query.groupNo;
      this.courseId = this.$route.query.courseId;
      this.orderid = this.$route.query.orderid;
      this.orderNo = this.$route.query.orderNo;
      console.log(this.orderNo)
      this.zhijie = this.$route.query.zhijie;
      let name = this.$route.query.names;
      this.names = name;
      if (name == 99) {
        this.isgroupon = true;
        this.orderAmount = 3;
      } else {
        this.isgroupon = false;
        this.orderAmount = 9.9;
      }
      if (this.$route.query.couponid != "" && this.$route.query.couponid != undefined) {
        this.couponid = this.$route.query.couponid;
      }
      if (this.$route.query.orderAmount != "" && this.$route.query.orderAmount != undefined) {
        this.orderAmount = this.$route.query.orderAmount;
      }
      if (this.$route.query.couponAmount != "" && this.$route.query.couponAmount != undefined) {
        this.couponAmount = this.$route.query.couponAmount;
      }

      this.getData();
      this.wxshare();

    }
  }

</script>

<style lang="less" scoped>
  .groupon {
    .makesure {
      height: 464px;
      background: url("../../assets/pay/groupon.png") no-repeat center;
      background-size: 100% 100%;
      margin: 0 auto;

      .topic {
        margin: 20px;
        /*width:335px;*/
        height: 189px;
        border-bottom: 1px #F2F2F2 solid;

        img {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
      }

      strong {
        font-weight: normal;
        font-size: 20px;
        color: #444444;
        top: 3px;
        position: relative;
        display: block;
        left: 9.3%;
        width: 120px;
        float: left;
      }

      span {
        display: block;
        float: right;
        position: relative;
        top: 7px;
        right: 38px;
        font-size: 13px;
        color: #999999
      }

      hr {
        border: none;
        border-bottom: 1px #F2F2F2 dashed;
        width: 300px;
        position: relative;
        top: 22px;
      }

      .groupon_price {
        width: 81.4%;
        height: 20px;
        position: relative;
        top: 22px;
        left: 9.3%;
        margin-top: 20px;

        cite {
          font-style: normal;
          font-size: 14px;
          color: #333333;
          display: block;
          width: 70px;
          float: left;
          height: 20px;
          line-height: 20px;
        }

        em {
          font-style: normal;
          display: block;
          float: right;
          font-size: 14px;
          color: #FF5500;
        }

      }

      .old_price {
        height: 20px;
        position: relative;
        width: 81.4%;
        top: 4px;
        left: 9.3%;
        margin-top: 25px;

        cite {
          font-style: normal;
          font-size: 12px;
          color: #9B9B9B;
          display: block;
          width: 70px;
          float: left;
          height: 20px;
          line-height: 20px;
        }

        em {
          font-style: normal;
          display: block;
          float: right;
          font-size: 12px;
          color: #333333;
          text-decoration: line-through;
        }
      }

      .tishi {
        height: 40px;
        line-height: 40px;
        background: url("../../assets/pay/tishi_bg.png") no-repeat center;
        font-size: 12px;
        color: #FF5500;
        position: relative;
        top: 17px;
        text-align: center;
      }

      .cashcoupon {
        height: 67px;
        width: 81.4%;
        line-height: 67px;
        position: relative;
        top: 17px;
        left: 9.3%;
        float: left;

        tt {
          position: relative;
          display: block;
          float: left;
          font-size: 14px;
          color: #333333;
        }

        b {
          position: relative;
          display: block;
          float: right;
          right: 10px;
          font-size: 14px;
          color: #999999;
          font-weight: normal;
        }

        img {
          float: right;
          width: 8px;
          height: 15px;
          margin-top: 26px;
        }
      }

    }

    .pay_button {
      width: 220px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background: #FF5500;
      box-shadow: 0 2px 12px 0 rgba(255, 85, 0, 0.50);
      border-radius: 100px;
      font-size: 18px;
      color: #FFFFFF;
      margin: 14px auto 0;
    }

    .makesure2 {
      height: 407px;
      background: url("../../assets/pay/grouponno.png") no-repeat center;
      background-size: cover;
      margin: 0 auto;

      .topic {
        margin: 20px;
        /*width:335px;*/
        height: 189px;
        border-bottom: 1px #F2F2F2 solid;

        img {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
      }

      strong {
        font-weight: normal;
        font-size: 20px;
        color: #444444;
        top: 3px;
        position: relative;
        display: block;
        left: 9.3%;
        width: 120px;
        float: left;
      }

      span {
        display: block;
        float: right;
        position: relative;
        top: 7px;
        right: 38px;
        font-size: 13px;
        color: #999999
      }

      hr {
        border: none;
        /* border-bottom:1px #F2F2F2 dashed;*/
        width: 300px;
        position: relative;
      }

      .groupon_price {
        width: 81.4%;
        height: 20px;
        position: relative;
        top: 22px;
        left: 9.3%;
        margin-top: 20px;

        cite {
          font-style: normal;
          font-size: 14px;
          color: #333333;
          display: block;
          width: 70px;
          float: left;
          height: 20px;
          line-height: 20px;
        }

        em {
          font-style: normal;
          display: block;
          float: right;
          font-size: 14px;
          color: #FF5500;
        }

      }

      .old_price {
        width: 300px;
        height: 20px;
        position: relative;
        top: 4px;
        left: 38px;
        margin-top: 25px;

        cite {
          font-style: normal;
          font-size: 12px;
          color: #9B9B9B;
          display: block;
          width: 70px;
          float: left;
          height: 20px;
          line-height: 20px;
        }

        em {
          font-style: normal;
          display: block;
          float: right;
          font-size: 12px;
          color: #333333;
          text-decoration: line-through;
        }

      }

      .tishi {
        width: 335px;
        height: 40px;
        line-height: 40px;
        background: url("../../assets/pay/tishi_bg.png") no-repeat center;
        font-size: 12px;
        color: #FF5500;
        position: relative;
        top: 17px;
        left: 20px;
        text-align: center;
      }

      .cashcoupon {
        height: 67px;
        width: 81.4%;
        line-height: 67px;
        position: relative;
        top: 37px;
        left: 9.3%;
        float: left;
        border-top: 1px #F2F2F2 dashed;

        tt {
          position: relative;
          display: block;
          float: left;
          font-size: 14px;
          color: #333333;
        }

        b {
          position: relative;
          display: block;
          float: right;
          right: 10px;
          font-size: 14px;
          color: #999999;
          font-weight: normal;
        }

        img {
          float: right;
          width: 8px;
          height: 15px;
          margin-top: 26px;
        }
      }

    }
  }

</style>
