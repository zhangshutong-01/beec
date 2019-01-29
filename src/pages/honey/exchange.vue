<template lang="html">
  <div class="exchange">
    <!-- 兑换蜂蜜 -->
    <div class="exchange_form">
      <h1>请选择兑换的g数</h1>
      <div class="mybottons">
        <div :class="mybeeg==300?'bee_g_red':'bee_g_gray'" @click="changeBee(300)">300g</div>
        <div :class="mybeeg==500?'bee_g_red':'bee_g_gray'" @click="changeBee(500)">500g</div>
        <div :class="mybeeg==800?'bee_g_red':'bee_g_gray'" @click="changeBee(800)">800g</div>
        <div :class="mybeeg==1000?'bee_g_red':'bee_g_gray'" @click="changeBee(1000)">1000g</div>
      </div>
      <h1>请填写收货地址</h1>
      <div class="address_box">
        <div class="perbox underline">
          <span>姓名：</span>
          <input type="text" name="username" v-model="userinfo.username"/>
        </div>
        <div class="perbox underline">
          <span>手机号：</span>
          <input name="phoneNum" v-model="userinfo.phoneNum"/>
        </div>
        <div class="perbox">
          <span>收货地址：</span>
          <textarea name="address" v-model="userinfo.address"/>
        </div>

      </div>
      <div class="makesure" @click="makesure"><span>确认兑换</span></div>
    </div>
    <!--弹框 -->
    <div class="exchange_box" v-if="isshow">
      <div class="exchange_success">
        <div class="sucimg"><img src="../../assets/honey/exchangesuc.png" style="width:130px;"/></div>
        <div class="suc">您的{{mybeeg}}g蜂蜜将在14天内到达，请耐心等待</div>
        <div class="me_know" @click="close">
          <span>我知道了</span>
        </div>
      </div>
      <div class="myclose" @click="close">
        <img src="../../assets/honey/close.png"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { toExchangeHoney ,queryUserInfo} from '@/api/honey'

  export default {
    data() {
      return {
        //选择的蜂蜜克数
        mybeeg:0,
        isshow:false,
        userinfo:{
          username:'',
          phoneNum:'',
          address:'',
        },
        openid:''
      }
    },
    methods:{
      changeBee(number){
        this.mybeeg = number;
      },
      open(){
        this.isshow = true;
      },
      close(){
        this.isshow = false;
      },
      makesure(){
        //兑换蜂蜜
        let that = this;

        let mydata = {
          'openId':that.openid,
          'honeyNums': that.mybeeg,
          'name': that.userinfo.username,
          'address': that.userinfo.address,
          'phoneNum': that.userinfo.phoneNum
        } ;
        if(that.mybeeg == 0 ){
          alert("请选择兑换的g数");
          return ;
        }else if(that.userinfo.username == "" || that.userinfo.username ==null ||that.userinfo.username ==undefined){
          alert("请您输入姓名");
          return ;
        }else if(that.userinfo.phoneNum == "" || that.userinfo.phoneNum ==null ||that.userinfo.phoneNum ==undefined){
          alert("请您输入手机号");
          return ;
        }else if(that.userinfo.address == "" || that.userinfo.address ==null ||that.userinfo.address ==undefined){
          alert("请您输入收货地址");
          return ;
        }

        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(that.userinfo.phoneNum)) {
          alert("请输入正确的手机号码")
          return ;
        }

        toExchangeHoney(mydata).then(res => {
          if(res.data.statusCode == '200'){
            that.open();
          }else {
            alert(res.data.message)
          }
        })
      },
      getAddress(){
        let that = this;
        let mydata = {'openId':that.openid} ;
        queryUserInfo(mydata).then(res => {
          if(res.data.statusCode == '200'){
            that.userinfo.username= res.data.result.userName;
            that.userinfo.phoneNum= res.data.result.userPhone;
            that.userinfo.address= res.data.result.userAddress;
            that.mybeeg = 0;
          }
        })
      }
    },
    created(){
      this.openid = this.$route.query.openid;
      this.getAddress();
    }
  }
</script>

<style lang="less" scoped>
  .exchange {
    .exchange_form{
      position: relative;
      margin-top: 20px;
      h1{
        font-size: 15px;
        color: #333333;
        text-align: left;
        margin-left:22px;
        margin-bottom:5px;
      }
      .mybottons{
        width:100%;
        height:160px;

      }
      .bee_g_red{
        width:130px;
        height:50px;
        background: #FF5500;
        box-shadow: 0 4px 20px 0 #E8E8EB;
        border-radius: 8px;
        color:#fff;
        line-height: 50px;
        text-align: center;
        margin-left:40px;
        margin-top:15px;
        float:left;
      }
      .bee_g_gray{
        width:130px;
        height:50px;
        background: #FFFFFF;
        box-shadow: 0 4px 20px 0 #E8E8EB;
        border-radius: 8px;
        color:#333333;
        line-height: 50px;
        text-align: center;
        margin-left:40px;
        margin-top:15px;
        float:left;
      }
    }
    .address_box{width:331px;height:215px;margin:20px auto;background: #FFFFFF;box-shadow: 0 4px 20px 0 #E8E8EB;border-radius: 8px;}
    .address_box .perbox{width:300px;height:66px;line-height: 66px;margin:0 auto;font-size:14px;color:#333333;}
    .address_box .perbox span{display:block;float:left;}
    .address_box .underline{ border-bottom: 1px #F2F2F2 dashed;}
    .address_box input{font-size:14px;margin-left:15px;}
    .address_box .perbox textarea{width:210px;font-size:14px;margin-left:15px;margin-top:15px;height:40px;line-height:20px;}
    .makesure{width:220px;height:40px;margin:60px auto;background:#FF5500;border-radius: 20px;color:#fff;font-size: 18px;text-align: center;line-height:40px;}
    .exchange_box{position: absolute;top:0px;z-index: 1000;height: 100%;width: 100%;background: url('../../assets/coupon/couponmeng.png') no-repeat center ;}
    .exchange_box .sucimg{width:130px;height:169px; margin: 0 65px;padding-top: 20px;
      img{
        width: 130px;
      }
    }
    .exchange_box .exchange_success{width:260px;height:308px;background: url("../../assets/honey/exchangesuccess.png") no-repeat center;margin:100px auto 0px auto;}
    .exchange_box .exchange_success .suc{    width: 235px;
      height: 17px;
      line-height: 17px;
      font-size: 12px;
      color: #382308;
      margin: 10px auto;
      /* top: 203px; */
      position: relative;
      text-align: center;}
    .exchange_box .exchange_success .me_know{width:220px;height:48px;line-height:48px;background:#FF5500;margin:30px auto;border-radius: 22px;position: relative;color:#FFFFFF;text-align: center;font-size:18px;}
    .exchange_box .myclose {width:26px;margin:30px auto 0 auto;}
  }
</style>;
