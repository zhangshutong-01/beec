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
      }
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

    header {
      width: 100%;
      height: 7rem;
      margin-top: 2rem;

      >div {
        width: 9rem;
        margin: 0 auto;
        position: relative;


        img {
          width: 100%;
          margin: 0 auto;
          text-align: center;
          line-height: 5rem;
          position: relative;
          z-index: 25;
        }

        img:nth-child(2) {
          position: absolute;
          width: 5rem;
          height: 5rem;
          ;
          top: 50%;
          left: 50%;
          margin-top: -2.5rem;
          margin-left: -2.5rem;
          z-index: 1;
        }

        p {
          position: absolute;
          width: 80%;
          height: 1.5rem;
          line-height: 1.5rem;
          text-align: center;
          left: 1rem;
          bottom: .4rem;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          z-index: 29;
        }
      }
    }

    main {
      height: 13rem;
      margin-top: 2rem;

      ul {
        width: 70%;
        height: 15rem;
        margin: 0 auto;

        li {
          margin-bottom: 1.5rem;
          width: 100%;
          height: 2rem;

          span {
            width: 5rem;
            display: inline-block;
          }

          &:nth-child(1) {
            width: 100%;
            height: 2rem;

            label {
              height: 2rem;
              width: 100%;
              display: flex;
              align-items: center;

              input {
                flex: 1;
                height: 2rem;
                border-bottom: 1px solid #c3c3c3;
                // padding-left: 1rem;
                box-sizing: border-box;
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
                padding: .5rem .4rem;
                width: 5rem;
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
                  width: .7rem;
                }
              }

              img {
                width: 1rem;
              }
            }



          }
        }
      }
    }

    .add {
      width: 80%;
      height: 3rem;
      margin: 2rem auto;
      display: block;
      background: coral;
      margin-bottom: 3rem;
      color: #fff;
      border-radius: 1.5rem;
    }
  }

</style>
