<template>
  <div class="loginWrap">
    <header>
      <div>
        <img src="http://thyrsi.com/t6/659/1547801246x2728278668.png" alt="">
      </div>
      <h1>手机号绑定</h1>
      <p>根据国家规定需要绑定手机号之后才能体验完整功能</p>
    </header>
    <div class="loginInput">
      <div class="form" action="">
        <label>
          <div>
            <input type="tel" name="text" maxlength="11" placeholder="请输入手机号" v-model="phone" @input="checkPhone">
          </div>
        </label>
        <div class="error"><span v-if="isPhone">{{this.phone===''?'您输入的手机号不能为空':'您输入的格式不正确'}}</span></div>
        <label>
          <div>
            <input class="codeInput" type="number" name="" id="" placeholder="请输入验证码" v-model="identifying_code">
            <button @click="identifying" ref="time">{{!isTime?'发送验证码':time+'s后重新获取验证码'}}</button>
          </div>
        </label>
        <footer>
          <label>
            <input type="checkbox" v-model="ckeckVal">&nbsp;
            绑定手机号表示您已同意《<a href="#" @click="protocol">你拍一蜜蜂乐园用户协议</a>》
          </label>
        </footer>
        <button :class="!ckeckVal?'push active':'push'" @click="checkForm()" :disabled='!ckeckVal'>完成</button>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    MessageBox
  } from "mint-ui";
  import {
    share
  } from "@/api/wx";
  import {
    getSMSCode,
    checkSMSCode
  } from '@/api/ShortMessage';
  export default {
    data() {
      return {
        phone: '',
        identifying_code: '',
        courseid: '',
        isTime: false,
        time: '',
        timer: null,
        isPhone: false,
        ckeckVal: false,
        isFooter: true
      }
    },
    created() {
      this.noshare()
      this.courseid = this.$route.query.courseid
      this.wxshare()
    },
    mounted() {
      this.watchKeybord()
      console.log(this.ckeckVal)
    },
    methods: {
      protocol() {
        this.$router.push({
          path: '/protocol'
        })
      },
      identifying() {
        if (this.phone === '') {
          MessageBox.alert("", {
            message: "请输入手机号"
          });
        } else if (this.isPhone === true) {
          MessageBox.alert("", {
            message: "您输入的手机格式不正确"
          });
        } else {
          const parmas = {
            openId: this.$route.query.openid,
            userPhone: this.phone
          }
          getSMSCode(parmas).then(res => {
            if (res.data.statusCode === "13002") {
              MessageBox.alert("", {
                message: "一分钟内请勿重复发送"
              });
            } else {
              if (res.data.result) {
                MessageBox.alert("", {
                  message: "验证码发送成功"
                });
                clearInterval(this.timer);
                this.isTime = true
                this.time = 60
                this.$refs.time.disabled = true
                this.timer = setInterval(() => {
                  if (this.time > 0) {
                    this.time = this.time
                    this.time--
                  } else if (this.time === 0) {
                    this.isTime = false
                    this.$refs.time.disabled = false
                    clearInterval(this.timer)
                  }
                }, 1000);
              } else {
                MessageBox.alert("", {
                  message: "验证码发送失败，稍后重试"
                });
              }
            }
          })
          console.log(this.phone)

        }
      },

      checkPhone() {
        if (!/^1[34578]\d{9}$/.test(this.phone)) {
          this.isPhone = true
        } else {
          this.isPhone = false
        }
      },
      checkForm() {
        let form = {
          phone: this.phone,
          identifying_code: this.identifying_code
        }
        console.log(form)
        if (this.phone === '') {
          MessageBox.alert("", {
            message: "请输入手机号"
          });
        } else if (this.isPhone === true) {
          MessageBox.alert("", {
            message: "您输入的手机格式不正确"
          });
        } else if (this.identifying_code === '') {
          MessageBox.alert("", {
            message: "验证码不能为空"
          });
        } else {
          const parmas = {
            openId: this.$route.query.openid,
            code: this.identifying_code
          }
          checkSMSCode(parmas).then(res => {
            console.log(res)
            if (res.data.result) {
              this.$router.push({
                path: '/babyinfo',
                query: {
                  openid: this.$route.query.openid,
                  courseid: this.courseid,
                  sourceId: this.$route.query.sourceId
                }
              })
            } else if (res.data.statusCode === "13005") {
              MessageBox.alert("", {
                message: "验证码已失效"
              });
            } else {
              MessageBox.alert("", {
                message: "验证码错误"
              });
            }
          })
        }
      },
      watchKeybord() {
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        console.log(clientHeight)
        $(window).on('resize', function () {
          var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
          if (clientHeight > nowClientHeight) {
            //键盘弹出的事件处理
            this.isFooter = false
          } else {
            //键盘收起的事件处理
            setTimeout(() => {
              this.isFooter = true
            }, 200);
          }
        });
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
              let mydesc = '学完9节课让小朋友爱上思考';
              let mylink =
                'http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/course'
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
    }
  }

</script>

<style lang="less" scoped>
  .loginWrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #000;
    overflow: hidden;
    background: #F2F2F2;

    header {
      width: 100%;

      div {
        display: block;
        margin: .2rem auto;
        margin-top: .5rem;
        width: 25%;
        text-align: center;

        img {
          width: 100%;
        }
      }

      h1 {
        width: 100%;
        // height: 1rem;
        font-size: .32rem;
        text-align: center;
      }

      p {
        width: 100%;
        margin-top: .2rem;
        font-size: .24rem;
        text-align: center;
      }
    }

    .loginInput {
      display: flex;
      width: 100%;
      height: 15rem;
      margin-top: .5rem;

      .form {
        width: 100%;
        height: 15rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        footer {
          width: 100%;
          margin: .2rem 0;

          label {
            height: 100%;
            font-size: .2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            align-self: flex-end;

            a {
              color: #FC5813;
            }
          }
        }

        label {
          width: 80%;
          height: .6rem;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          align-items: center;
          position: relative;

          div {
            flex: 1;
            display: flex;

            input {
              flex: 1;
              height: .6rem;
              padding-left: .3rem;
              box-sizing: border-box;
              display: block;
              border-radius: 1.5rem;
            }

            .codeInput {
              width: 60%;
              height: .6rem;
            }

            button {
              position: absolute;
              width: 100px;
              height: .6rem;
              border-bottom: 1px solid #c3c3c3;
              background: #F5A623;
              font-size: .2rem;
              box-sizing: border-box;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              display: block;
              border-left: none;
              padding: 0 .3rem;
              border-radius: 1.5rem;
              right: 0;
              color: #fff;
            }
          }
        }

        .error {
          width: 78%;
          height: .5rem;
          margin: 0 auto;
          font-size: .2rem;
          line-height: .5rem;

          span {
            color: red;
            text-align: center;
          }
        }
      }
    }

    .push {
      width: 80%;
      height: 1rem;
      display: block;
      margin: 0 auto;
      font-size: .32rem;
      background: #FE7738;
      color: #fff;
      margin-top: .6rem;
      border-radius: 2rem;
    }

    .active {
      background: #ccc;
    }
  }

</style>
