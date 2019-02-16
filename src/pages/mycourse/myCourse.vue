<template>
  <div class="mycourse">
    <v-load v-if="load"></v-load>
    <main v-if="this.list.length!==0">
      <section v-for="(item,index) in list" :key="index" @click="jump(item)">
        <div class="top">
          <img :src="item.imgUrlG">
          <div>
            <div class="describe">
              <h1>
                {{item.courseName}}
                <p>
                  <span>{{item.orderSource===1||item.orderSource===3?'3人团':'直购'}}</span>
                  <span>￥{{item.orderAmount}}</span>
                </p>
              </h1>
              <p>{{item.courseDescribe}}</p>
              <span v-if="item.orderSource===1||item.orderSource===3&&item.status===1">成团日期:{{item.endTime}}</span>
              <span v-if="item.status===0">剩余时间:{{hour}}:{{minute}}:{{second}}</span>
              <span v-if="item.orderSource===2&&item.status==1">购买日期:{{item.endTime}}</span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <p>
            <span v-if="item.status===1">{{item.orderSource===1||item.orderSource===3?'拼团成功':'直购成功'}}</span>
            <span v-if="item.status===0">拼团中</span>
          </p>
          <button>{{item.status===0?"拼团详情":"去上课"}}</button>
        </div>
      </section>
    </main>
    <main v-if="this.list.length===0">
      <p class="nocourse">您还没有购买课程哦</p>
    </main>
    <div class="shareMask" v-if="actionMask" @click="actionMaskHide">
      <div class='guanzhu'>
        <div class="action_one">关注"你拍一蜜蜂乐园"<br>才能正常上课</div>
        <img src="../../assets/erweima.png" class="erweima" />
        <p class="changan">长按二维码识别关注</p>
      </div>
    </div>
    <v-footer :myopenid='openid' :iscourse='isCourse' :ismy='isMy' />
  </div>
</template>

<script>
  import Footer from '@/components/_footer.vue';
  import Loading from '@/components/_loading.vue';
  import {
    checkConcerned
  } from '@/api/pay'
  import {
    share,
  } from '@/api/wx'
  import {
    queryOrderInfo
  } from '@/api/mine';
  export default {
    data() {
      return {
        list: [],
        openid: '',
        isCourse: false,
        isMy: true,
        hour: '',
        minute: '',
        second: '',
        load: true,
        actionMask: false
      }
    },
    components: {
      "v-footer": Footer,
      "v-load": Loading
    },
    created() {
      this.noshare()
      queryOrderInfo({
        openId: this.$route.query.openid
      }).then(res => {
        this.list = res.data.result
        console.log(res)
        this.list.forEach(element => {
          if (element.surplusSecond) {
            this.countDown(element.surplusSecond)
          }
        })
      })
      this.wxshare()
    },
    methods: {
      jump(item) {
        console.log(item)
        if (item.status === 1) {
          // this.$router.push({
          //   path: '/moneyDetail',
          //   query: {
          //     openid: item.openId,
          //     courseid: item.courseId,
          //     sourceId: item.sourceId,
          //     payType: item.orderSource
          //   }
          // })
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
                  openid: item.openId,
                  courseid: item.courseId,
                  sourceId: item.sourceId
                }
              })
            } else if (!res.data.result.hasBabyInfo) {
              this.$router.push({
                path: "/login",
                query: {
                  openid: item.openId,
                  courseid: item.courseId,
                  sourceId: item.sourceId
                }
              })
            } else {
              this.$router.push({
                path: "/courselist2",
                query: {
                  openid: item.openId,
                  courseid: item.courseId,
                  sourceId: item.sourceId,
                  payType: item.orderSource,
                  isShow: false
                }
              })
            }
          })
        } else if (item.status === 0) {
          this.$router.push({
            path: '/tourbuy',
            query: {
              openid: item.openId,
              courseid: item.courseId,
              sourceId: item.sourceId,
              payType: item.orderSource
            }
          })
        }
      },
      actionMaskHide() {
        this.actionMask = false;
      },
      countDown(times) {
        var timer = null;
        var that = this
        timer = setInterval(() => {
          var day = 0,
            hour = 0,
            minute = 0,
            second = 0; //时间默认值
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
        if (times <= 0) {
          clearInterval(timer);
        }
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
              jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'hideMenuItems'] // 必填，需要使用的JS接口列表，这里只写支付的
            });
            wx.ready(function () { //通过ready接口处理成功验证
              // config信息验证成功后会执行ready方法
              // let mytitle= that.mycourse.courseName;
              let mytitle = '点击领取让孩子受用一生的数理思维课程';
              let mydesc = '9大生活场景让小朋友爱上数学';
              let mylink =
                'http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/tourbuy?sourceId=' +
                that.$route.query.sourceId + '%26courseid=' + that.$route.query.courseid + '%26invited=' + that
                .$route
                .query.openid + '%26payType=' + that
                .$route
                .query.payType; //分享购买 团id
              let myimgUrl = 'http://thyrsi.com/t6/665/1548835210x2728279033.png';
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
      noshare() {
        function onBridgeReady() {
          console.log('禁用微信分享')
          WeixinJSBridge.call('hideOptionMenu');
        }

        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        } else {
          onBridgeReady();
        }
      },
    },
    mounted() {
      setTimeout(() => {
        this.load = false
      }, 1000);
    }
  }

</script>

<style lang="less" scoped>
  .mycourse {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #000;
    background: #F2F2F2;
    font-size: .24rem;

    main {
      width: 90%;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      margin-top: .3rem;

      .nocourse {
        width: 100%;
        text-align: center;
        font-size: .32rem;
      }

      section {
        flex: 1;
        width: 100%;
        height: 3rem;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: .2rem;
        // margin-bottom: .8rem;
        padding: .2rem;
        display: flex;
        flex-direction: column;

        .top {
          width: 100%;
          height: 70%;
          display: flex;
          border-bottom: 1px solid #c3c3c3;
          padding-bottom: .2rem;

          img {
            width: 35%;
            display: block;
            margin-right: .2rem;
          }

          >div {
            flex: 1;
            display: flex;
            flex-direction: column;
            position: relative;

            .describe {
              width: 100%;
              height: 100%;
              padding: 0 .1rem;
              box-sizing: border-box;
              position: relative;

              h1 {
                margin-bottom: .2rem;
                display: flex;
                justify-content: space-between;
                font-weight: 500;

                p {
                  color: #000;

                  span:nth-child(2) {
                    color: #FE7738;
                  }
                }
              }

              p {
                font-size: .24rem;
                color: #c3c3c3;
              }

              >span {
                position: absolute;
                bottom: 0;
                font-size: .24rem;
              }
            }
          }
        }

        .bottom {
          width: 100%;
          flex: 1;
          align-items: center;
          display: flex;
          justify-content: space-between;
          padding: .3rem .1rem;
          box-sizing: border-box;
          margin-top: .3rem;

          span:nth-child(1) {
            padding: .1rem .2rem;
            border: 1px solid #D3D3D3;
          }

          span:nth-child(2) {
            font-size: .24rem;
            color: #909090;
          }

          button {
            padding: .1rem .3rem;
            background: #FE7738;
            border-radius: .5rem;
            color: #fff;
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

      .guanzhu {
        width: 100%;
        text-align: center;

        .erweima {
          width: 25%;
        }

        .action_one {
          /*margin-top: 220px;*/
          color: #FF5500;
          margin-top: 40%;
          margin-bottom: 1rem;
          width: 100%;
          text-align: center;
        }

        p {
          line-height: 1.3rem;
          color: #FF5500;
        }
      }

    }
  }

</style>
