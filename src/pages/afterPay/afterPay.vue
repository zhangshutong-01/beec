<template>
  <div class="afterPay">
    <div class="top">
      <h1 v-if="!change">还差<span>{{remainNumber}}</span>人拼团成功</h1>
      <h1 v-if="change">拼团成功</h1>
      <p v-if="!change">
        剩余时间 <span>{{hour}}</span> : <span>{{minute}}</span> : <span>{{second}}</span>
      </p>
      <div class='member'>
        <img v-for="(item,index) in users" :key="index" :src="item.userHeadImgUrl" class="user_img user2_img" />
        <!-- <span v-for="item in users">{{item.nickName}}</span> -->
        <img v-if="users.length < 2" class="add_user" src="../../assets/groupon/nosuccessicon.png" />
        <img v-if="users.length < 3" class="add_user" src="../../assets/groupon/nosuccessicon.png" />
      </div>
      <button v-if="!change" @click="share">邀请好友</button>
      <button v-if="change" @click="goCourse">去上课</button>
    </div>
    <main>
      <p>扫码关注<span>“蜜蜂乐园”</span><br>才能<span>正常上课</span>，掌握实时<span>拼团进度</span></p>
      <img src="../../assets/erweima.png" alt="">
      <p>若拼团失败，24小时立即退款</p>
    </main>
    <div class="bottom">
      <img :src="list.imgUrlA" alt="">
      <div>
        <h1>{{list.courseName}}</h1>
        <p>3人团/￥{{list.groupPrice}}</p>
        <div>
          {{list.groupDescribe}}
        </div>
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
  </div>
</template>

<script>
  import {
    queryCourseById
  } from "@/api/course"
  import {
    queryGroupDetails
  } from '@/api/groupon'
  import {
    share
  } from '@/api/wx'
  import Time from '@/utils/time';
  export default {
    data() {
      return {
        hour: '',
        minute: '',
        second: '',
        openid: '',
        list: [],
        isShareMask: false,
        remainNumber: 0,
        groupDetail: [],
        users: [],
        change: false,
        member: [
          'http://b-ssl.duitang.com/uploads/item/201510/14/20151014001324_8R3QB.jpeg',
          'http://b-ssl.duitang.com/uploads/item/201510/14/20151014001324_8R3QB.jpeg',
          'http://b-ssl.duitang.com/uploads/item/201510/14/20151014001324_8R3QB.jpeg'
        ]
      }
    },
    created() {
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        if (window.name != 'open') {
          window.name = 'open';
          window.location.reload();
        }
      }
      const params = {
        id: this.$route.query.courseid
      }
      this.openid = this.$route.query.openid
      queryCourseById(params).then(res => {
        console.log(res)
        this.list = res.data.result
      })
      this.times()
      this.wxshare()
    },
    methods: {
      goCourse() {
        this.$router.push({
          path: '/moneyDetail',
          query: {
            openid: this.$route.query.openid,
            courseid: this.$route.query.courseid,
            sourceId: this.$route.query.sourceId,
            payType: this.$route.query.payType
          }
        })
      },
      times() {
        const parmas = {
          id: this.$route.query.sourceId
        }
        queryGroupDetails(parmas).then(res => {
          console.log(res)
          this.groupDetail = res.data.result
          this.users = res.data.result.userList
          this.remainNumber = 3 - this.users.length
          this.countDown(this.groupDetail.times)
          if (this.groupDetail.times === 0) {
            this.change = true
          }
        })
      },
      countDown(times) {
        var timer = null;
        var that = this
        timer = setInterval(() => {
          var day = 0,
            hour = 0,
            minute = 0,
            second = 0; //时间默认值
          if (times <= 0) {
            console.log('结束之后的操作')
            clearInterval(timer);
          }
          if (times > 0) {
            day = Math.floor(times / (60 * 60 * 24));
            hour = Math.floor(times / (60 * 60)) - (day * 24);
            minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
          }
          if (day <= 9) day = '0' + day;
          if (hour <= 9) hour = '0' + hour;
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          times--;
          this.hour = hour
          this.minute = minute
          this.second = second
        }, 1000);

      },
      share() {
        this.isShareMask = true
      },
      maskHide() {
        this.isShareMask = false
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
              jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，这里只写支付的
            });
            wx.ready(function () { //通过ready接口处理成功验证
              // config信息验证成功后会执行ready方法
              // let mytitle= that.mycourse.courseName;
              let mytitle = '点击领取让孩子受用一生的数理思维课程';
              let mydesc = '学完9节课让小朋友爱上思考';
              let mylink =
                'http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/tourbuy?sourceId=' +
                that.$route.query.sourceId + '%26courseid=' + that.$route.query.courseid + '%26invited=' + that
                .$route
                .query.openid + '%26payType=' + that.$route.query.payType; //分享购买 团id
              let myimgUrl = 'http://thyrsi.com/t6/665/1548835210x2728279033.png';
              // wx.hideMenuItems({
              //   menuList: [
              //     'menuItem:copyUrl'
              //   ]
              // });
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
          } else {}
        })
      },

    }
  }

</script>

<style lang="less" scoped>
  .afterPay {
    width: 100%;
    height: 100%;
    background: #F1F2F1;
    color: #000;
    overflow: auto;
    font-size: .32rem;

    .top {
      width: 96%;
      background: #fff;
      margin: .5rem auto .3rem auto;
      border-radius: .2rem;
      border: 1px solid #c3c3c3;
      box-sizing: border-box;

      h1 {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-weight: bold;

        span {
          font-size: .37rem;
          color: #FC5424;
        }
      }

      p {
        width: 100%;
        text-align: center;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          display: inline-block;
          margin: 0 .1rem;
          width: .5rem;
          height: .5rem;
          background: #FF6125;
          color: #fff;
          border-radius: .1rem;
          line-height: .5rem;
        }
      }

      .member {
        width: 100%;
        display: flex;
        justify-content: center;

        box-sizing: border-box;
        margin-top: .3rem;

        img {
          width: 1.3rem;
          margin: 0 .2rem;
          height: 1.3rem;
          border-radius: 50%;
          border: 1px solid #ccc;
        }
      }

      button {
        width: 50%;
        height: 1rem;
        color: #fff;
        background: #FF3400;
        display: block;
        margin: 0 auto;
        margin-top: .5rem;
        margin-bottom: .5rem;
        border-radius: 3rem;
      }
    }

    main {
      width: 96%;
      // height: 15rem;
      background: #fff;
      margin: 0 auto;
      margin-bottom: .3rem;
      border-radius: .2rem;
      border: 1px solid #c3c3c3;
      box-sizing: border-box;

      p {
        // margin-top: 1rem;
        width: 100%;
        text-align: center;
        line-height: .6rem;

        span {
          color: #FB4B28;
        }
      }

      img {
        width: 30%;
        display: block;
        margin: 0 auto;

      }
    }

    .bottom {
      width: 96%;
      // height: 7rem;
      background: #fff;
      margin: 0 auto .5rem auto;
      border-radius: .2rem;
      border: 1px solid #c3c3c3;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: .3rem 0;

      img {
        width: 40%;
        margin: 0 .2rem;
      }

      >div {
        width: 100%;

        h1 {
          font-weight: bold;
          font-size: .36rem;
        }

        p {
          font-size: .24rem;
          color: #8E8E8E;
        }

        div {
          font-size: .24rem;
          color: #9E9E9E;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */

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
        display: block;
        width: 116px;
        margin: 0 auto;
        margin-top: 30px;
      }

      .choseSussBox {
        width: 100%;
        height: 100%;
        position: relative;

        img {
          width: 25%;
          position: absolute;
          right: .5rem;
          top: -.1rem;
        }

        .choseSuss {
          width: 70%;
          height: auto;
          background: #fff;
          position: fixed;
          left: 50%;
          top: 50%;
          border-radius: .2rem;
          margin-left: -35%;
          margin-top: -20%;

          .choseSussBottom {
            width: 100%;
            text-align: center;
            padding: .5rem 0;
            font-size: .24rem;
            color: #FE7738;
          }
        }
      }
    }
  }

</style>
