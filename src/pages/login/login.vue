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
            <input type="tel" name="text" maxlength="11" placeholder="请输入手机号" v-model="phone" @input="checkPhone"
              @focus="focus" @blur="blur">
          </div>
        </label>
        <div class="error"><span v-if="isPhone">{{this.phone===''?'您输入的手机号不能为空':'您输入的格式不正确'}}</span></div>
        <label>
          <div>
            <input class="codeInput" type="number" name="" id="" placeholder="请输入验证码" v-model="identifying_code" @focus="focus"
              @blur="blur">
            <button @click="identifying" ref="time">{{!isTime?'发送验证码':time+'s后重新获取验证码'}}</button>
          </div>
        </label>
        <button :class="!ckeckVal?'push active':'push'" @click="checkForm()" :disabled='!ckeckVal'>完成</button>
      </div>
    </div>
    <footer v-if="isFooter">
      <label>
        <input type="checkbox" v-model="ckeckVal">&nbsp;
        绑定手机号表示您已同意《<a href="#" @click="protocol">你拍一蜜蜂乐园用户协议</a>》
      </label>
    </footer>
  </div>
</template>

<script>
  import {
    MessageBox
  } from "mint-ui";
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
        ckeckVal: true,
        isFooter: true
      }
    },
    created() {
      this.courseid = this.$route.query.courseid
    },
    mounted() {
      this.watchKeybord()
      console.log(this.isFooter)
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
          console.log(parmas)
          getSMSCode(parmas).then(res => {
            console.log(res)
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
      focus() {
        this.isFooter = false
        console.log(this.isFooter)
      },
      blur() {
        this.isFooter = true
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
      }
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
        margin: 1rem auto;
        width: 25%;
        text-align: center;
        line-height: 5rem;

        img {
          width: 100%;
        }
      }

      h1 {
        width: 100%;
        height: 3rem;
        font-size: 1.5rem;
        text-align: center;
      }

      p {
        width: 100%;
        margin-top: 1rem;
        font-size: .8rem;
        text-align: center;
      }
    }

    .loginInput {
      display: flex;
      width: 100%;
      height: 15rem;
      margin-top: 3rem;

      .form {
        width: 100%;
        height: 15rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        label {
          width: 80%;
          height: 2.2rem;
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
              height: 2.2rem;
              padding-left: 1rem;
              box-sizing: border-box;
              display: block;
              border-radius: 1.5rem;
            }

            .codeInput {
              width: 60%;
              height: 2.2rem;
            }

            button {
              position: absolute;
              width: 100px;
              height: 2.2rem;
              border-bottom: 1px solid #c3c3c3;
              background: #F5A623;
              font-size: .9rem;
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
          height: 2rem;
          margin: 0 auto;
          font-size: .5rem;
          line-height: 2rem;

          span {
            color: red;
            text-align: center;
          }
        }
      }
    }

    .push {
      width: 80%;
      height: 3rem;
      display: block;
      margin: 0 auto;
      margin-top: 4rem;
      font-size: 1.2rem;
      background: #FE7738;
      color: #fff;
      margin-bottom: 1rem;
      border-radius: 2rem;

    }

    .active {
      background: #ccc;
    }

    footer {
      width: 100%;
      // height: 15rem;
      flex: 1;

      label {
        height: 100%;
        line-height: 3rem;
        font-size: .7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: flex-end;

        a {
          color: #FC5813;
        }
      }
    }
  }

</style>
