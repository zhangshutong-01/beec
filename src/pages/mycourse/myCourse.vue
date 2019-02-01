<template>
  <div class="mycourse">
    <main v-if="this.list.length!==0">
      <section v-for="(item,index) in list" :key="index">
        <div class="top">
          <img :src="item.imgUrlG">
          <div>
            <div class="describe">
              <h1>
                {{item.courseName}}
                <p>
                  <span>{{item.orderSource===1?'3人团':'直购'}}</span>
                  <span>￥{{item.orderAmount}}</span>
                </p>
              </h1>
              <p>{{item.courseDescribe}}</p>
              <span v-if="item.orderSource===1&&item.status===1">成团日期:{{item.endTime}}</span>
              <span v-if="item.status===0">剩余时间:{{hour}}:{{minute}}:{{second}}</span>
              <span v-if="item.orderSource===2">购买日期:{{item.endTime}}</span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <p>
            <span v-if="item.status===1">{{item.orderSource===1?'拼团成功':'直购成功'}}</span>
            <span v-if="item.status===0">拼团中</span>
          </p>
          <button @click="jump(item)">{{item.status===0?"拼团详情":"赚奖金"}}</button>
        </div>
      </section>
    </main>
    <main v-if="this.list.length===0">
      <p class="nocourse">你还没有购买课程哦</p>
    </main>
    <v-footer :myopenid='openid' :iscourse='isCourse' :ismy='isMy' />
  </div>
</template>

<script>
  import Footer from '@/components/_footer.vue';
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
        second: ''
      }
    },
    components: {
      "v-footer": Footer
    },
    created() {
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
    },
    methods: {
      jump(item) {
        if (item.status === 1) {
          this.$router.push({
            path: '/moneyDetail',
            query: {
              openid: item.openId,
              courseid: item.courseId,
              sourceId: item.sourceId,
              payType: item.orderSource
            }
          })
        }else if(item.status===0){
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

    main {
      width: 90%;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      margin-top: 1rem;

      .nocourse {
        width: 100%;
        text-align: center;
      }

      section {
        flex: 1;
        width: 100%;
        height: 10rem;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: .5rem;
        margin-bottom: .8rem;
        padding: .5rem;
        display: flex;
        flex-direction: column;

        .top {
          width: 100%;
          height: 75%;
          display: flex;
          border-bottom: 1px solid #c3c3c3;
          padding-bottom: .5rem;

          img {
            width:35%;
            display: block;
            margin-right: .5rem;
          }

          >div {
            flex: 1;
            display: flex;
            flex-direction: column;
            position: relative;

            .describe {
              width: 100%;
              height: 100%;
              padding: 0 .5rem;
              box-sizing: border-box;
              position: relative;

              h1 {
                margin-bottom: .3rem;
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
                font-size: .9rem;
                color: #c3c3c3;
              }

              >span {
                position: absolute;
                bottom: 0;
                font-size: .9rem;
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
          padding: 1rem .6rem;
          box-sizing: border-box;
          margin-top: .3rem;

          span:nth-child(1) {
            padding: .2rem .5rem;
            border: 1px solid #D3D3D3;
          }

          span:nth-child(2) {
            font-size: .8rem;
            color: #909090;
          }

          button {
            padding: .3rem .7rem;
            background: #FE7738;
            border-radius: .5rem;
            color: #fff;
          }
        }
      }
    }
  }

</style>
