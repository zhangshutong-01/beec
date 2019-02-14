<template>
  <div class="babyInfo">
    <header>
      <div>
        <img src="http://thyrsi.com/t6/659/1547801985x2728278811.png" alt="">
        <img :src="userInfo.userHeadImgUrl" alt="">
        <p>{{userInfo.nickName}} </p>
      </div>
    </header>
    <main>
      <ul>
        <li>
          <label>
            <span>宝宝名字</span>
            <input type="text" name="" id="" ref="babyName">
          </label>
        </li>
        <li>
          <span>
            出生年月
          </span>
          <div class="data">
            <select class="year" ref="babyYear">
              <option v-for="(item, index) in years" :key="index" :value="item">{{item}}年</option>
            </select>
            <select class="month" ref="babyMonth" v-model="couponSelected">
              <option v-for="(item, index) in month" :key="index" :value="item">{{item}}月</option>
            </select>
          </div>
        </li>
        <li v-show="cityShow">
          <span>
            所在城市
          </span>
          <div class="data">
            <select class="year" ref="babyYear">
              <option v-for="(item, index) in years" :key="index" :value="item">北京</option>
            </select>
            <select class="month" ref="babyMonth" v-model="couponSelected">
              <option v-for="(item, index) in month" :key="index" :value="item">北京</option>
            </select>
          </div>
        </li>
        <li>
          <div v-for="(item,index) in peo" :key="index" @click="select({sex:item.id,ind:index})">
            <img :src="index===num?item.select:item.noselect">
            {{item.name}}
          </div>
        </li>
      </ul>
    </main>
    <button class="add" @click="push">完成</button>
  </div>
</template>

<script>
  import img1 from "../../assets/login/boy.png"
  import img2 from "../../assets/login/girl.png"
  import {
    addBabyInfo
  } from "@/api/mine";
  import {
    queryUserInfo
  } from "@/api/honey";
  import {
    share
  } from "@/api/wx";
  export default {
    data() {
      return {
        years: [],
        month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        peo: [{
          name: '男',
          id: '1',
          noselect: 'http://thyrsi.com/t6/659/1547802423x2728278692.png',
          select: 'http://thyrsi.com/t6/659/1547802453x2890174094.png'
        }, {
          name: '女',
          id: '0',
          noselect: 'http://thyrsi.com/t6/659/1547802483x2890174321.png',
          select: 'http://thyrsi.com/t6/659/1547802495x2890208847.png'
        }],
        num: 0,
        sex: '1',
        nowYear: '',
        nowMonth: '',
        couponSelected: '',
        cityShow: false,
        userInfo: []
      }
    },
    created() {
      this.noshare()
      var myDate = new Date();
      let year = myDate.getFullYear()
      let month = myDate.getMonth()
      this.couponSelected = this.month[month];
      console.log(this.nowMonth)
      for (let i = 0; i < 12; i++) {
        this.years.push(year--)
      }
      const parmas = {
        openId: this.$route.query.openid
      }
      queryUserInfo(parmas).then(res => {
        console.log(res)
        this.userInfo = res.data.result
      })
      this.wxshare()
    },
    methods: {
      select(item) {
        this.num = item.ind
        this.sex = item.sex
      },
      push() {
        var yearIndex = this.$refs.babyYear.selectedIndex
        let yearValue = this.$refs.babyYear.options[yearIndex].value
        this.nowYear = yearValue
        var monthIndex = this.$refs.babyMonth.selectedIndex
        let monthValue = this.$refs.babyMonth.options[monthIndex].value
        this.nowMonth = monthValue
        const parmas = {
          openId: this.$route.query.openid,
          babyName: this.$refs.babyName.value,
          babyDate: `${this.$refs.babyYear.value || this.nowYear}.${this.$refs.babyMonth.value || this.nowMonth}`,
          locationCity: '111',
          locationProvince: '2222',
          babySex: this.sex,
        }
        console.log(parmas)
        addBabyInfo(parmas).then(res => {
          console.log(res)
          if (res.data.statusCode === "200") {
            this.$router.push({
              path: '/courselist2',
              query: {
                openid: this.$route.query.openid,
                courseid: this.$route.query.courseid,
                sourceId: this.$route.query.sourceId
              }
            })
          }
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
  .babyInfo {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-size: .32rem;

    header {
      width: 100%;
      height: 3rem;
      margin-top: 1rem;

      >div {
        width: 2rem;
        margin: 0 auto;
        position: relative;


        img {
          width: 100%;
          margin: 0 auto;
          text-align: center;
          line-height: 2rem;
          position: relative;
          z-index: 25;
        }

        img:nth-child(2) {
          position: absolute;
          width: 1.2rem;
          height: 1.2rem;
          top: 50%;
          left: 50%;
          margin-top: -.6rem;
          margin-left: -.6rem;
          z-index: 1;
        }

        p {
          position: absolute;
          width: 72%;
          height: .5rem;
          font-size: .24rem;
          line-height: .5rem;
          text-align: center;
          left: .3rem;
          bottom: .03rem;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          z-index: 29;
        }
      }
    }

    main {
      margin-top: .5rem;

      ul {
        width: 80%;
        margin: 0 auto;

        li {
          margin-bottom: .5rem;
          width: 100%;
          height: 1rem;

          span {
            width: 25%;
            display: inline-block;
          }

          &:nth-child(1) {
            width: 100%;
            height: 1rem;

            label {
              height: 1rem;
              width: 100%;
              display: flex;
              align-items: center;

              input {
                flex: 1;
                height: .8rem;
                border-bottom: 1px solid #c3c3c3;
                box-sizing: border-box;
                font-size: .3rem;
              }
            }
          }

          &:nth-child(2) {
            display: flex;
            align-items: center;

            .data {
              flex: 1;

              select {
                border-radius: .5rem;
                padding: .1rem .2rem;
                width: 1.7rem;
              }
            }
          }

          &:nth-child(3) {
            display: flex;
            align-items: center;

            .data {
              flex: 1;

              select {
                border-radius: .5rem;
                padding: .5rem .4rem;
                width: 5rem;
              }
            }
          }

          &:nth-child(4) {
            display: flex;
            align-items: center;

            div {
              flex: 1;
              text-align: center;
              margin: 0 .5rem;
              padding: .5rem 0;

              &:nth-child(2) {
                img {
                  width: .3rem;
                }
              }

              img {
                width: .5rem;
              }
            }
          }
        }
      }
    }

    .add {
      width: 80%;
      height: 1rem;
      margin: 1rem auto;
      display: block;
      background: coral;
      margin-bottom: 1rem;
      color: #fff;
      border-radius: 1.5rem;
    }
  }

</style>
