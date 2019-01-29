<template lang="html">
  <div class="register">
    <div class="write">
      <div class="writeInfor">填写信息</div>
      <div class="babyInfor" v-show="isBabyInfor">填写宝宝正确的信息哦</div>
      <div class="babyAge" v-show="isBabyAge">请选择宝宝年龄</div>
    </div>
    <div class="babyOne" v-show="isBabySexName">
      <div class="babySexName">
        <div class="sex clearfix">
          <div class="sex_left">
            <p class="sexImg">
              <img src="../../assets/register/icon-boy.png" />
            </p>
            <p class="girlBoy">男孩</p>
            <p class="circle" :class="sex=='1' ? 'selCircle' :'circle'" @click="changeSex('1')"></p>
          </div>
          <div class="sex_left sex_right">
            <p class="sexImg">
              <img src="../../assets/register/icon-girl.png" />
            </p>
            <p class="girlBoy">女孩</p>
            <p class="circle" :class="sex=='0' ? 'selCircle' :'circle'" @click="changeSex('0')"></p>
          </div>
        </div>
        <div class="inputWrap">
          <input type="text" v-model="uName" name="uName" placeholder="请输入宝宝姓名" class="babynameInput" />
          <em v-show="uName!= ''" class="icon-clear" @click="uNameCloseBtn"></em>
        </div>
      </div>
      <div class="nextBtn" @click="nextBtn">下一步</div>
    </div>
    <div class="babyTwo" v-show="isSelBabyAge">
      <div class="selBabyAge clearfix">
        <p :class="age=='3' ? 'selAge' :'noSelAge'" @click="changeAge('3')">3岁</p>
        <p class="even" :class="age=='4' ? 'selAge' :'noSelAge'" @click="changeAge('4')">4岁</p>
        <p :class="age=='5' ? 'selAge' :'noSelAge'" @click="changeAge('5')">5岁</p>
        <p class="even" :class="age=='6' ? 'selAge' :'noSelAge'" @click="changeAge('6')">6岁</p>
      </div>
      <div class="goBtn" @click="goBtn">进入</div>
    </div>
  </div>
</template>


<script>
  import {
    Indicator,
    Toast
  } from 'mint-ui';
  import {
    register
  } from '@/api/home';

  export default {
    name: 'register',
    data() {
      return {
        uName: '',
        isBabyInfor: true,
        isBabyAge: false,
        isBabySexName: true,
        isSelBabyAge: false,
        sex: '1', //0女孩，1男孩
        age: '3',
        openId: '',
        inviterId: '' //邀请人id
      }
    },
    components: {
      Toast,
      Indicator
    },
    methods: {
      changeSex(number) {
        this.sex = number;
      },
      changeAge(number) {
        this.age = number;
      },
      uNameCloseBtn() { //清除按钮;
        if (this.uName !== '') {
          this.uName = '';
        }
      },
      nextBtn() {
        if (!this.uName) {
          Toast('请输入宝宝姓名');
          return;
        }
        if (new RegExp("^[ ]+$").test(this.uName)) {
          Toast('请输入宝宝姓名');
          return;
        }

        var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

        if (regEn.test(this.uName) || regCn.test(this.uName)) {
          Toast("名称不能包含特殊字符");
          return;
        }

        // console.log(this.uName);
        // console.log(this.sex);
        this.isBabySexName = false;
        this.isSelBabyAge = true;
        this.isBabyInfor = false;
        this.isBabyAge = true;
      },
      goBtn() {
        // console.log(this.age);
        let params = {
          babyName: this.uName,
          babySex: this.sex,
          babyAge: this.age,
          openId: this.openId,
          inviterId: this.inviterId ? this.inviterId : ''
        };
        let stringParams = JSON.stringify(params);
        console.log(stringParams)
        Indicator.open();
        register(stringParams).then(res => {
          // console.log(res);
          let resData = res.data;
          Indicator.close();
          if (resData.statusCode == 200) {
            Toast(resData.message);
            this.$router.push({
              name: 'course',
              query: {
                openid: this.openId,
                inviterId: this.inviterId
              }
            })
          } else {
            Indicator.close();
            Toast(resData.message);
          }
        })
      },
    },
    created() {
      // let openid = this.$route.query.openid;
      this.openId = this.$route.query.openid;
      this.inviterId = this.$route.query.inviterId;
      // this.inviterId = 'ojjgp0uqhHNQeKHrDgCS-Joos9U0';
      // this.openId = 'ojjgp0gBkgutOXjgPmgTngn7KgSU'
    }
  }

</script>

<style lang="less" scoped>
  .register {
    .write {
      color: #444444;
      margin-top: 20px;
      padding-left: 23px;

      .writeInfor {
        font-family: PingFangSC-Medium;
        font-size: 22px;
      }

      .babyInfor,
      .babyAge {
        font-size: 14px;
        font-family: PingFangSC-Regular;
      }
    }

    .babySexName {
      overflow: hidden;
      width: 331px;
      height: 301px;
      box-shadow: 0 4px 20px 0 #E8E8EB;
      margin: 0 auto;
      margin-top: 20px;
      border-radius: 8px;

      .sex {
        margin-top: 47px;
      }

      .sex_left {
        float: left;
        text-align: center;
        margin-left: 62px;

        .circle {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          border: 6px solid #EEEEEE;
          margin: 0 auto;
          margin-top: 5px;
        }

        .selCircle {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          margin: 0 auto;
          margin-top: 5px;
          border: 6px solid #FF5500;
        }

        .sexImg {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #F8F8F8;

          img {
            display: block;
            width: 100%;
          }
        }

        .girlBoy {
          font-size: 12px;
          color: #9C9C9C;
          font-family: PingFangSC-Regular;
          margin-top: 15px;
        }
      }

      .inputWrap {
        width: 288px;
        height: 44px;
        margin: 0 auto;
        margin-top: 40px;
        border-radius: 100px;
        background: #F8F8F8;
        position: relative;

        input {
          display: block;
          width: 100%;
          height: 44px;
          border-radius: 100px;
          text-indent: 2em;
          background: #F8F8F8;
          font-size: 14px !important;
          font-family: PingFangSC-Regular;
        }

        ::placeholder {
          color: #999999;
          font-size: 14px;
          font-family: PingFangSC-Regular;
        }

        .icon-clear {
          width: 12px;
          height: 12px;
          background: url('../../assets/register/icon_clear.png') no-repeat center;
          background-size: 100% 100%;
          position: absolute;
          top: 15px;
          right: 15px;
        }
      }
    }

    .nextBtn {
      width: 220px;
      height: 45px;
      background: #FF5500;
      border-radius: 100px;
      margin: 0 auto;
      margin-top: 149px;
      margin-bottom: 20%;
      color: #ffffff;
      text-align: center;
      line-height: 45px;
      box-shadow: 0 2px 12px 0 rgba(255, 85, 0, 0.50);
    }

    .selBabyAge {
      width: 331px;
      height: 254px;
      box-shadow: 0 2px 20px 0 #E8E8EB;
      border-radius: 8px;
      margin: 0 auto;
      margin-top: 20px;

      .noSelAge {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        font-size: 20px;
        font-family: PingFangSC-Medium;
        text-align: center;
        line-height: 58px;
        float: left;
        margin-left: 57px;
        margin-top: 40px;
        border: 1px solid #FF5500;
        color: #444444;
      }

      .selAge {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        font-size: 20px;
        font-family: PingFangSC-Medium;
        text-align: center;
        line-height: 59px;
        float: left;
        margin-left: 57px;
        margin-top: 40px;
        border: 1px solid #FF5500;
        background: #FF5500;
        color: #ffffff;
      }

      .even {
        margin-left: 97px;
      }
    }

    .goBtn {
      width: 220px;
      height: 45px;
      background: #FF5500;
      border-radius: 100px;
      margin: 0 auto;
      margin-top: 185px;
      margin-bottom: 20%;
      color: #ffffff;
      text-align: center;
      line-height: 45px;
      box-shadow: 0 2px 12px 0 rgba(255, 85, 0, 0.50);
    }

    .clearfix:before,
    .clearfix:after {
      content: " ";
      display: table;
    }

    .clearfix:after {
      clear: both;
      overflow: hidden;
    }

    .clearfix {
      zoom: 1;
    }
  }

</style>
