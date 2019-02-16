<template lang="html">
  <!--发起者支付成功到 发起拼团页面 -->
  <div class="groupon">
    <!--提示信息 -->
    <div class="tishi" v-if="groupState == 1">
      <span>此团已经拼团成功</span>
    </div>
    <div class="tishi" v-else>
      <span>您已发起拼团，邀请好友一起学习</span>
    </div>

    <!-- 分享主题-->
    <div class="share_topic">
      <div class="topic"><img :src="mycourse.imgUrl" width="100%" height="199" /></div>
      <div class="desc"><span>{{mycourse.groupDescribe}} </span></div>
    </div>
    <!--倒计时 -->
    <div class="count_down" v-if='groupState ==0'>
      <div class="remaining_time">拼团剩余时间</div>
      <div class="time">
        <strong>{{time.hh.h1}}</strong>
        <em>{{time.hh.h2}}</em>
        <cite>时</cite>

        <strong>{{time.mm.m1}}</strong>
        <em>{{time.mm.m2}}</em>
        <cite>分</cite>

        <strong>{{time.ss.s1}}</strong>
        <em>{{time.ss.s2}}</em>
        <cite>秒</cite>
      </div>
      <div class="road">
        确认支付5小时后没有拼团成功，则支付金额原路返回。
      </div>
    </div>
    <!--倒计时 -->
    <div class="count_down" v-else>
      <div class="road">
        确认支付5小时后没有拼团成功，则支付金额原路返回。
      </div>
    </div>

    <!--邀请好友 -->
    <div class="invitation_friends" v-if="groupState == 0 ">
      <p>再邀请<em>{{remainNumber}}</em>名好友即可拼团成功</p>
      <div class="myimages">
        <img v-for="item in users" :src="item.userHeadImgUrl" class="user_img" />
        <img v-if="users.length < 2" class="add_user" src="../../assets/groupon/adduser.png" @click="shareMask" />
        <img v-if="users.length < 3" class="add_user" src="../../assets/groupon/adduser.png" @click="shareMask" />
      </div>
    </div>
    <div class="invitation_friends" v-else>
      <p>拼团成功</p>
      <div class="myimages">
        <img v-for="item in users" :src="item.userHeadImgUrl" class="user_img" />
        <img v-if="users.length < 2" class="add_user" src="../../assets/groupon/default.png" />
        <img v-if="users.length < 3" class="add_user" src="../../assets/groupon/default.png" />
      </div>
    </div>

    <!--分享到微信朋友圈 -->
    <div class="share_weixin_friends">
      <p>分享到<em>3</em>个微信群，成功率高达98%</p>
      <div class="fenhaopengyou">
        <div class="wx_fr_box">
          <img src="../../assets/groupon/weixin.png" @click="shareMask" />
          <span>微信好友</span>
        </div>
        <div class="wx_fr_box">
          <img src="../../assets/groupon/firend.png" @click="shareMask" />
          <span>朋友圈</span>
        </div>
      </div>
    </div>

    <!-- 查看订单 --->
    <div class="view_order" @click="viewOrder">
      <span>查看订单</span>
    </div>

    <div class="shareMask" v-show="isShareMask" @click="maskHide">
      <p class="shareImg">
        <img src="../../assets/mine/sharetip.png" />
      </p>
      <p class="shareTip">点击右上角分享好友或朋友圈</p>
    </div>

  </div>
</template>
<script>
  import Time from '@/utils/time';
  import {
    queryGroupDetails
  } from '@/api/groupon'
  import {
    share,
    reload
  } from '@/api/wx'

  export default {
    data() {
      return {
        remain: '',
        time: {
          hh: {
            h1: '0',
            h2: '0'
          },
          mm: {
            m1: '0',
            m2: '0'
          },
          ss: {
            s1: '0',
            s2: '0'
          }
        },
        groupNo: '',
        users: [], //团购的用户列表
        faqiUser: {}, //当前用户,
        mycourse: {}, //课程信息
        groupState: '', //拼团状态
        isfirst: true, //是否是第一进来
        orderid: '', //订单id
        isShareMask: false, //
        remainNumber: 2, //该团剩余拼团人数
      }
    },
    methods: {
      countTime() {
        if (this.remain != '结束') {
          this.remain = this.remain - 1;
          if (this.remain > 0) {
            this.time = Time.formattime(this.remain)
            setTimeout(this.countTime, 1000);
          }
        }
      },
      initData() {
        let that = this;
        let mydata = {
          'groupNo': this.groupNo
        };
        //let mydata = {'groupNo':'PTf7480b2f57c94b6cb4386bf207aac32e'} ;
        queryGroupDetails(mydata).then(res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            that.mycourse.courseName = res.data.result.courseName;
            that.mycourse.courseDescribe = res.data.result.courseDescribe;
            that.mycourse.groupDescribe = res.data.result.groupDescribe;
            that.mycourse.coursePrice = res.data.result.coursePrice;
            that.mycourse.imgUrl = res.data.result.imgUrl;
            that.groupState = res.data.result.groupState;

            let users_db = res.data.result.userList;
            that.users = users_db;
            users_db.forEach(item => {
              if (item.isInit) {
                this.faqiUser = item;
              }
            })
            //团创建时间

            //初始化倒计时时间
            that.remain = Time.initTime(res.data.result.groupTime, 5);
            if (that.remain != '结束') {
              that.time = Time.formattime(that.remain)
            }
            //倒计时
            that.countTime();
            this.wxshare();
          } else {}
        })
      },
      wxshare() {
        let that = this;
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
              jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline','hideMenuItems'] // 必填，需要使用的JS接口列表，这里只写支付的
            });
            wx.ready(function () { //通过ready接口处理成功验证
              // config信息验证成功后会执行ready方法
              let mytitle = that.mycourse.courseName;
              let mydesc = '【蜜蜂乐园】儿童思维启蒙，这个课程很有意思！你也来看看';
              let mylink =
                'http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/share?groupNo=' +
                that.groupNo; //分享购买 团id
              let myimgUrl = that.mycourse.imgUrl;

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
                  that.maskHide();
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
                  that.maskHide();
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
      isLoad() {
        let that = this;
        let mydata = {
          'orderId': that.orderid
        };
        //let mydata = {'groupNo':'PTf7480b2f57c94b6cb4386bf207aac32e'} ;
        reload(mydata).then(res => {
          if (res.data.result == 'true') {
            console.log('111111111111111111111111' + res.data.result)
            let mydata2 = {
              'orderId': that.orderid
            };
            reload(mydata2).then(res => {
              if (res.data.result == 'false') {
                window.location.href = window.location.href;
                window.location.reload()
              }
            });
          } else {
            console.log('222222222222222222222222' + res.data.result)
            // window.location.href = window.location.href;
            // window.location.reload()
          }
        });
      },
      maskHide() {
        this.isShareMask = false;
      },
      shareMask() {
        this.isShareMask = true;
      },
      viewOrder() {
        window.location.href =
          "http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/course";
      },
    },
    created() {
      this.openid = this.$route.query.openid;
      this.groupNo = this.$route.query.groupNo;
      this.orderid = this.$route.query.orderid;
      this.isLoad();
      this.initData();
    }
  }

</script>

<style lang="less" scoped>
  .groupon {
    margin: auto;
    margin-bottom: 60px;

    .tishi {
      background: rgba(255, 85, 0, 0.10);
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      color: #444444;

      span {
        margin-left: 20px;
      }
    }

    .share_topic {
      /* width: 335px; */
      /* height: 200px; */
      background: #FFFFFF;
      -webkit-box-shadow: 0 4px 20px 0 #E8E8EB;
      box-shadow: 0 4px 20px 0 #E8E8EB;
      border-radius: 8px;
      /* margin: 20px auto 0; */
      margin: 20px;

      .topic {
        font-size: 20px;
        color: #FF5500;
        /*height:20px;*/
        line-height: 20px;
        text-align: center;

        /*top:100px;*/
        /*padding-top:59px;*/
        img {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
      }

      .desc {
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        padding: 15px;
      }
    }

    .count_down {

      /*margin: 20px;*/
      /*width: 375px;*/
      .remaining_time {
        font-size: 15px;
        color: #444444;
        text-align: center;
      }

      .time {
        height: 48px;
        width: 288px;
        margin: 15px auto 0;

        strong,
        em {
          width: 30px;
          height: 48px;
          line-height: 48px;
          background: #FF5500;
          border-radius: 3px;
          text-align: center;
          color: #FFFFFF;
          font-size: 30px;
          font-weight: normal;
          margin-right: 5px;
          display: block;
          float: left;
          font-style: normal;
        }

        cite {
          font-size: 13px;
          color: #333333;
          font-style: normal;
          height: 48px;
          line-height: 48px;
          width: 18px;
          display: block;
          float: left;
          margin-left: 5px;
          margin-right: 3px;
        }
      }

      .road {
        font-size: 14px;
        color: #FF5500;
        height: 14px;
        line-height: 14px;
        text-align: center;
        margin: 10px auto 20px;
      }
    }

    .invitation_friends {
      height: 123px;
      background: #FFFFFF;
      box-shadow: 0 4px 20px 0 #E8E8EB;
      border-radius: 8px;
      margin: 20px;

      p {
        font-size: 15px;
        color: #333333;
        text-align: center;
        padding-top: 13px;

        em {
          color: #FF5500;
          font-style: normal;
        }
      }

      .myimages {
        width: 240px;
        margin: 0 auto;

        img {
          width: 60px;
          height: 60px;
          border-radius: 30px;
          margin-top: 14px;
        }

        img:nth-child(2) {
          margin-left: 9.6%;
        }

        img:nth-child(3) {
          margin-left: 10.7%;
        }

        img:nth-child(4) {
          margin-left: 10.7%;
        }

      }

    }

    .share_weixin_friends {
      height: 160px;
      margin: 30px 20px;
      background: #FFFFFF;
      box-shadow: 0 4px 20px 0 #E8E8EB;
      border-radius: 8px;

      p {
        font-size: 15px;
        color: #333333;
        text-align: center;
        padding-top: 13px;

        em {
          color: #FF5500;
          font-style: normal;
        }
      }

      .fenhaopengyou {
        width: 196px;
        margin: 0 auto;

        .wx_fr_box {
          width: 60px;
          height: 82px;
          float: left;
          margin-top: 29px;

          img {
            width: 60px;
            height: 60px;
          }

          span {
            display: block;
            height: 22px;
            width: 60px;
            text-align: center;
            font-size: 12px;
            color: #444444;
            margin-top: 5px;
          }
        }

        .wx_fr_box:nth-child(2) {
          margin-left: 66px;
        }

        .wx_fr_box:nth-child(3) {
          margin-left: 70px;
        }

      }

    }

    //蒙层
    .shareMask {
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      top: 0;
      left: 0;
      z-index: 999;

      .shareImg {
        width: 64px;
        height: 64px;
        margin-top: 64px;
        position: absolute;
        right: 30px;

        img {
          display: inline-block;
          width: 100%;
        }
      }

      .shareTip {
        font-size: 15px;
        color: #ffffff;
        font-family: PingFangSC-Regular;
        margin-top: 138px;
        text-align: center;
      }
    }

    .view_order {
      height: 100px;
      font-size: 18px;
      text-align: center;
      margin: 0 20px 50px 20px;

      span {
        color: #FFFFFF;
        border-radius: 25px;
        background: #FF5500;
        height: 50px;
        line-height: 50px;
        display: block;
      }
    }
  }

</style>
