<template>
  <div class="evaluateWrap">
    <header>
      <div class="homeIcon" @click="goHome">
        <img src="../../assets/evaluate/assets/home.png">
      </div>
    </header>
    <div class="evaluateStar">
      <h1>你喜欢吗?</h1>
      <div class="like">
        <div class="likeBox" v-for="(item,index) in list" :key='index'>
          <img :src="xing>index?stara:starb" @click="star(index)" :data-index="index">
          <p>{{item}}</p>
        </div>
      </div>
      <h1>你觉得难吗?</h1>
      <div class="like">
        <div class="likeBox" v-for="(item,index) in diff" :key='index'>
          <img :src="Star>index?stara:starb" @click="diffStar(index)" :data-index="index+5">
          <p>{{item}}</p>
        </div>
      </div>
    </div>
    <form>
      <textarea class="evaluate" placeholder="吐个槽吧..." maxlength="100" ref="text" @input="key"></textarea>
      <span>{{num}}/100</span>
    </form>
    <div>
      <img class="btn" src="../../assets/evaluate/assets/TIJIAO button.png" alt="">
    </div>
  </div>
</template>

<script>
  import '../../assets/evaluate/assets/yellow star.png';
  export default {
    data() {
      return {
        list: ['不喜欢', '不太喜欢', '一般', '还不错', '非常喜欢'],
        diff: ['太简单了', '有点简单', '刚好', '有点挑战', '难得想哭'],
        stara: require('../../assets/evaluate/assets/yellow star.png'), //亮星星
        starb: require('../../assets/evaluate/assets/brown star.png'), //暗星星
        xing: 0,
        Star: 0,
        openid: '',
        num: 0
      }
    },
    created() {
      this.openid = this.$route.openid
    },
    methods: {
      key() {
        this.num = this.$refs.text.value.length
      },
      star(val) {
        this.xing = val + 1
      },
      diffStar(val) {
        this.Star = val + 1
      },
      goHome() {
        this.$router.push({
          path: '/course',
          query: {
            openid: this.openid,
          }
        })
      }
    }
  }

</script>

<style lang="less" scoped>
  .evaluateWrap {
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #FFDDA6;
    position: relative;

    header {
      width: 100%;
      height: 3rem;
      margin-top: 1rem;
      position: absolute;



      .homeIcon {
        width: 3rem;
        height: 3rem;
        position: absolute;
        top: .5rem;
        left: .8rem;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }



    .evaluateStar {
      width: 100%;
      margin-top: 2rem;

      h1 {
        height: 100%;
        line-height: 4rem;
        text-align: center;
        font-size: 1.5rem;
        color: #773F25;
      }

      .like {
        width: 100%;
        display: flex;
        padding: 0 1rem;
        box-sizing: border-box;

        .likeBox {
          flex: 1;
          text-align: center;

          img {
            width: 2.5rem;

          }

          p {
            color: #773F25;
            padding: .5rem 0;
            font-size: .8rem;
          }
        }
      }
    }

    form {
      width: 85%;
      height: 30%;
      margin: 0 auto;
      margin-top: 3rem;
      position: relative;

      .evaluate {
        border: 2px solid #F69B55;
        border-radius: 20px;
        width: 100%;
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;
        font-size: 1.1rem;
      }

      span {
        color: #000;
        position: absolute;
        right: 10%;
        bottom: -20%;
      }
    }

    .btn {
      width: 35%;
      margin: 0 auto;
      display: block;
      margin-top: 3rem;
    }
  }

</style>
