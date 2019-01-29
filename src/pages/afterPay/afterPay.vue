<template>
  <div class="afterPay">
    <div class="top">
      <h1>还差<span>2</span>人拼团成功</h1>
      <p>
        剩余时间 <span>{{hour}}</span> : <span>{{minute}}</span> : <span>{{second}}</span>
      </p>
      <div class='member'>
        <div v-for="(item,index) in member" :key="index">
          <img :src="item" alt="">
        </div>
      </div>
      <button @click="share">邀请好友</button>
    </div>
    <main>
      <p>扫码关注<span>“蜜蜂乐园”</span><br>才能<span>正常上课</span>，掌握实时<span>拼团进度</span></p>
      <img src="../../assets/erweima.png" alt="">
      <p>若拼团失败，48小时立即退款</p>
    </main>
    <div class="bottom">
      <img :src="list.imgUrl" alt="">
      <div>
        <h1>{{list.courseName}}</h1>
        <p>{{list.activityPrice}}人团/￥{{list.activityPrice}}</p>
        <div>
          包括《购物清单》、《逛超市》、《购物结账》
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
  import Time from '@/utils/time';
  export default {
    data() {
      return {
        hour: '',
        minute: '',
        second: '',
        list: [],
        isShareMask: false,
        member: [
          'http://b-ssl.duitang.com/uploads/item/201510/14/20151014001324_8R3QB.jpeg',
          'http://b-ssl.duitang.com/uploads/item/201510/14/20151014001324_8R3QB.jpeg',
          'http://b-ssl.duitang.com/uploads/item/201510/14/20151014001324_8R3QB.jpeg'
        ]
      }
    },
    mounted() {
      this.countDown(1000)
    },
    created() {
      const params = {
        id: "d58ab14473f7425f8fbee38b8a0297c5"
      }
      queryCourseById(params).then(res => {
        console.log(res)
        this.list = res.data.result
      })
    },
    methods: {
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
      }
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

    .top {
      width: 96%;
      height: 15rem;
      background: #fff;
      margin: 1rem auto .5rem auto;
      border-radius: .3rem;
      border: 1px solid #c3c3c3;
      box-sizing: border-box;

      h1 {
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        font-weight: bold;

        span {
          font-size: 1.3rem;
          color: #FC5424;
        }
      }

      p {
        width: 100%;
        text-align: center;
        line-height: 1.5rem;

        span {
          display: inline-block;
          width: 1.5rem;
          height: 1.5rem;
          background: #FF6125;
          color: #fff;
          border-radius: .5rem;
        }
      }

      .member {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 4rem;
        box-sizing: border-box;
        margin-top: 1rem;

        img {
          width: 4rem;
          border-radius: 50%;
          border: 1px solid #ccc;
        }
      }

      button {
        width: 50%;
        height: 2.5rem;
        color: #fff;
        background: #FF3400;
        display: block;
        margin: 0 auto;
        margin-top: 1.5rem;
        border-radius: 3rem;
      }
    }

    main {
      width: 96%;
      height: 15rem;
      background: #fff;
      margin: 0 auto;
      margin-bottom: .5rem;
      border-radius: .3rem;
      border: 1px solid #c3c3c3;
      box-sizing: border-box;

      p {
        margin-top: 1rem;
        width: 100%;
        text-align: center;
        line-height: 1.5rem;

        span {
          color: #FB4B28;
        }
      }

      img {
        width: 30%;
        display: block;
        margin: 0 auto;
        margin-top: .8rem;

      }
    }

    .bottom {
      width: 96%;
      height: 7rem;
      background: #fff;
      margin: 0 auto .5rem auto;
      border-radius: .3rem;
      border: 1px solid #c3c3c3;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      img {
        width: 8rem;
        margin: 0 .8rem;
      }

      >div {
        width: 100%;

        h1 {
          font-weight: bold;
          font-size: 1.1rem;
        }

        p {
          font-size: 1rem;
          color: #8E8E8E;
        }

        div {
          font-size: .9rem;
          color: #9E9E9E;
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
          right: 1rem;
          top: -1rem;
        }

        .choseSuss {
          width: 70%;
          height: auto;
          background: #fff;
          position: fixed;
          left: 50%;
          top: 50%;
          border-radius: .5rem;
          margin-left: -35%;
          margin-top: -30%;

          .choseSussBottom {
            width: 100%;
            text-align: center;
            line-height: 3rem;
            margin-top: 1rem;
            padding-bottom: .8rem;
            font-size: 1.2rem;
            color: #FE7738;
          }
        }
      }
    }
  }

</style>
