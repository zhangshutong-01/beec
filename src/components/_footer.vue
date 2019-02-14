<template lang="html">
  <footer class="footer">
    <div class="baritem" @click="gotoRouter('课程')" v-if="!iscourse">
      <div class="mybox">
        <img src="../assets/common/course.png" />
        <span>首页</span>
      </div>
    </div>
    <div class="baritem" @click="gotoRouter('课程')" v-else>
      <div class="mybox">
        <img src="../assets/common/courseselect.png" />
        <span class="myspan">首页</span>
      </div>
    </div>

    <div class="baritem" @click="gotoRouter('我的')" v-if="!ismy">
      <div class="mybox">
        <img src="../assets/common/my.png" />
        <span>我的课</span>
      </div>
    </div>

    <div class="baritem" @click="gotoRouter('我的')" v-else>
      <div class="mybox">
        <img src="../assets/common/myselect.png" />
        <span class="myspan">我的课</span>
      </div>
    </div>

    <div class="baritem" @click="gotoRouter('奖学金')" v-if="!ismoney">
      <div class="mybox">
        <img src="../assets/common/money.png" />
        <span>奖学金</span>
      </div>
    </div>

    <div class="baritem" @click="gotoRouter('奖学金')" v-else>
      <div class="mybox">
        <img src="../assets/common/moneyselect.png" />
        <span class="myspan">奖学金</span>
      </div>
    </div>

  </footer>
</template>

<script>
  // import {
  //   isused
  // } from '@/api/mine';
  export default {
    data() {
      return {
        openid: ''
      }
    },
    props: {
      myopenid: String,
      iscourse: Boolean,
      ismy: Boolean,
      ismoney: Boolean
    },
    methods: {
      gotoRouter(name) {
        //跳转路由
        switch (name) {
          case '课程':
            setTimeout(() => {
              let params = 'id=&three=';
              this.$router.push({
                path: '/course',
                query: {
                  openid: this.openid
                }
              })
            }, 500);
            break;
          case '我的':
            setTimeout(() => {
              this.$router.push({
                path: '/mycourse',
                query: {
                  "openid": this.openid
                }
              });
            }, 500);
            break;
          case '奖学金':
            setTimeout(() => {
              this.$router.push({
                path: '/money',
                query: {
                  "openid": this.openid,
                }
              });
            }, 500);
            break;
        }
      }
    },
    created() {
      this.openid = this.myopenid;
      let openid = this.$route.query.openid;
      if (openid != undefined) {
        this.openid = openid;
      }
    }
  }

</script>

<style lang="less" scoped>
  .footer {
    width: 100%;
    height: 50px;
    margin: 0 auto;
    color: #999999;
    background: #FFFFFF;
    font-size: 12px;
    position: fixed;
    bottom: 0;
    display: flex;

    .baritem {
      flex: 1;
      height: 50px;


      .mybox {
        height: 50px;
        margin: 0 auto;
        text-align: center;


        img {
          width: 20px;
          height: 22px;
          margin: 0 auto;
          vertical-align: top;
          margin-top: .1rem;
        }

        span {
          width: 100%;
          text-align: center;
          display: block;
        }

        .myspan {
          color: #333333;
        }
      }

    }
  }

</style>
