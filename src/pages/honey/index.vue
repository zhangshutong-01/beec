<template lang="html">
  <div class="mehoney">
    <div class="honeyInfo">
      <div class="infoTit">
        <p class="infoTitle">我的蜂蜜</p>
        <p class="exchange_record" @click="exchangeRecord">交易记录</p>
      </div>
      <p class="honeyTotal">{{honeyData.honeyTotal}}<span>g</span></p>
      <div class="honeyBottle">
          <img src="../../assets/mine/honeywrap.png"/>
      </div>
      <div class="btnCommon invitation" @click="invitaNewUser(honeyData.honeyTotal,honeyData.moneyTotal)">
        邀请新用户得蜂蜜
      </div>
      <div class="btnCommon exchange" @click="exchangeHoney">
        兑换实物
      </div>
    </div>
    <div class="rule">
      <div class="ruleTop">
        <p class="ruleTitle">兑换规则</p>
        <p class="circleBg"></p>
      </div>
      <div class="ruleContent">
        <div>
          <p class="tipNum">1、</p>
          <p>每周只能兑换一次。</p>
        </div>
        <div>
          <p class="tipNum">2、</p>
          <p>最终解释权归北京天赋通科技有限公司所有。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Indicator, Toast} from 'mint-ui';
  import { isused } from '@/api/mine';

  export default {
    name: 'mehoney',
    data() {
      return {
        honeyData:{},
        useid:'',//是否刷新字段
      }
    },
    mounted(){
      this.initData();
    },
    methods:{
      changeStatus(item1,item2){
        let params ='id='+this.useid+'&three='+'';
        Indicator.open();
        isused(params).then(res => {
          // console.log(res);
          let resData = res.data;
          Indicator.close();
          if(resData.statusCode == 200){
            // console.log(resData);
            this.$router.push({
              name:'invitation',
              query:{honey:item1, money:item2,openid:this.honeyData.openId,refresh:resData.result}
            })
          }else {
            Indicator.close();
            Toast(resData.message);
          }
        })
      },
      initData(){
        this.honeyData = Object.assign({}, this.$route.query);
        console.log(this.honeyData);
      },
      exchangeRecord(){//交易记录
        this.$router.push({
          name:'exchangeRecord',
          query:{openid:this.honeyData.openId}
        })
      },
      invitaNewUser(item1,item2){
        // this.$router.push({
        //   name:'invitation',
        //   query:{honey:item1, money:item2,openid:this.honeyData.openId}
        // })
        this.changeStatus(item1,item2)
      },
      exchangeHoney(){
        // this.$router.push({
        //   name:'exchange',
        //   query:{openid: this.honeyData.openId}
        // })
        Toast('稍后开放，敬请期待！');
      },
    },
  }
</script>

<style lang="less" scoped>
  .mehoney {
    .honeyInfo {
      width: 331px;
      margin: 0 auto;
      padding-bottom: 30px;
      padding-top: 20px;
      margin-top: 20px;
      box-shadow: 0 4px 20px 0 #E8E8EB;
      border-radius: 8px;
      .infoTit{
        width:100%;
        font-size: 15px;
        color: #444444;
        font-family: PingFangSC-Regular;
        position: relative;
        .infoTitle{
          text-align: center;
        }
        .exchange_record{
          position: absolute;
          font-size: 14px;
          color: #FF5500;
          right:15px;
          top:0;
        }
      }
      .honeyTotal{
        text-align: center;
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #FF5500;
        margin-top:5px;
        span{
          color: #000000;
        }
      }
      .honeyBottle{
        width:128px;
        height:128px;
        margin:0 auto;
        margin-top: 15px;
        /*box-shadow: 0 4px 20px 0 #E8E8EB;*/
        border-radius:50%;
        img{
          display: inline-block;
          width: 100%;
        }
      }
      .btnCommon{
        width: 220px;
        height:40px;
        border-radius: 100px;
        margin:0 auto;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        font-family: PingFangSC-Regular;
      }
      .invitation{
        background: #FF5500;
        color: #ffffff;
        margin-top: 30px;
      }
      .exchange{
        border: 1px solid #FF5500;
        margin-top: 16px;
      }
    }
    .rule {
      padding: 0 22.8px;
      margin-top: 40px;
      font-family: PingFangSC-Regular;
      .ruleTop {
        position: relative;
        padding: 0 13px;
        .ruleTitle {
          font-size: 14px;
          color: #FF5500;
        }
        .circleBg {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: url("../../assets/mine/circle1.png") no-repeat center;
          background-size: 100% 100%;
          position: absolute;
          top: -4px;
          left: 0;
          z-index: -99;
        }
      }
      .ruleContent {
        font-size: 13px;
        color: #151515;
        padding: 0 13px;
        margin-top: 10px;
          div {
            display: flex;
            justify-content: flex-start;
          p {
            margin-top: 10px;
            line-height: 18px;
          }
          .tipNum {
            color: #FF5500;
            display: inline-block;
          }
        }
      }
    }
  }
</style>
