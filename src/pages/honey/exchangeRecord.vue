<template>
  <div class="record">
    <div class="recordMenu" v-show="isRecordMenu">
      <div class="me_order" v-for="item in orderList" @click="recordInfor(item)">
        <!--分享朋友圈+10g-->
        <p class='orderIcon' v-show="item.honeyInfoType == 0 && item.honeySource == 0 ">分享朋友圈</p>
        <p class="orderNameSucc" v-show="item.honeyInfoType == 0 && item.honeySource == 0"><span>+</span>{{item.honeyNums}}</p>
        <!--新人有礼+10g-->
        <p class='orderIcon' v-show="item.honeyInfoType == 0 && item.honeySource == 2">新人有礼</p>
        <p class="orderNameSucc" v-show="item.honeyInfoType == 0 && item.honeySource == 2"><span>+</span>{{item.honeyNums}}</p>
        <!--成功邀请-->
        <p class='orderIcon' v-show="item.honeyInfoType == 0 && item.honeySource == 1">成功邀请</p>
        <p class="orderNameSucc" v-show="item.honeyInfoType == 0 && item.honeySource == 1"><span>+</span>{{item.honeyNums}}</p>
        <!--兑换-->
        <p class='orderIcon' v-show="item.honeyInfoType == 1">兑换</p>
        <p class='orderName' v-show="item.honeyInfoType == 1"><span>-</span>{{item.honeyNums}}</p>
        <p class="shareBee">{{item.createTimeL | changeTime}}</p>
        <p class='orderArrow'></p>
      </div>
    </div>
    <div class="noorder" v-show="isNoRecord">
      <img src="../../assets/mine/icon_fengmi.png"/>
      <p class="noorderTip">这里竟然空空如也</p>
      <div class="goBack" @click="goBack">返回</div>
    </div>
  </div>
</template>
<script>
  import { Indicator, Toast} from 'mint-ui';
  import { honeyRecord } from '@/api/mine';

  export default {
    name: 'record',
    data() {
      return {
        isRecordMenu:false,
        isNoRecord:false,
        orderList:[
          {
            id:'',
            honeyNums:'',
            createTimeL:'',
            honeyInfoType:'',//获得0，消费1
            honeySource:'',//0分享，2被邀请新人有礼，3邀新
            // name:'',
            // phoneNum:'',
            // address:''
          },
        ],
        openid:'',
      }
    },
    mounted(){
      this.initData();
    },
    filters:{
      timechange(time){
        let d = new Date(time);
        let times = d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate();
        return times;
      },
      changeTime(date){
        let time= date.replace(/-/g,".").substring(0,11);
        return time;
      },
    },
    created(){
      this.noshare();
      let openID = this.$route.query.openid;
      this.openid = openID;
    },
    methods:{
      initData(){
        let params = {
          pageNum:'',
          pageSize:'',
          openId: this.openid,
        };
        Indicator.open();
        honeyRecord(params).then(res => {
          let resData = res.data;
          Indicator.close();
          if(resData.statusCode == 200){
            if(resData.result == ''){
              this.isRecordMenu = false;
              this.isNoRecord = true;
            }else{
              this.orderList = resData.result;
              // console.log(this.orderList);
              this.isNoRecord = false;
              this.isRecordMenu = true;
            }
          }else {
            Indicator.close();
            Toast(resData.message);
          }
        })
      },
      noshare(){
        function onBridgeReady() {
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
      recordInfor(item){
        // console.log(item);
        this.$router.push({
          name:'recordInfor',
          query:item,
        })
      },
      goBack(){
        this.$router.push({
          name:'mine',
          query:{
            openid:this.openid
          }
        })
      },
    },
  }
</script>
<style lang="less" scoped>
  .record {
    .recordMenu{
      /*margin-top: 30px;*/
      /*.nav_list{*/
        /*display: block;*/
        .me_order{
          width: 331px;
          margin:0 auto;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding-top: 30.5px;
          padding-bottom: 15px;
          border-bottom:1px solid #E1E1E1;
          .orderIcon{
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color:#444444;
          }
          .orderName{
            font-size: 14px;
            color: #FF5500;
            font-family:PingFangSC-Medium;
            margin-left: 5px;
          }
          .orderNameSucc{
            color: #80D0FF;
            font-size: 14px;
            font-family:PingFangSC-Medium;
            margin-left: 5px;
          }
          .shareBee{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #999999;
            position: absolute;
            right: 48px;
          }
          .orderArrow{
            width: 12px;
            height: 14.8px;
            background: url("../../assets/mine/arrow.png") no-repeat center;
            position: absolute;
            right: 22px;
          }
        }
      /*}*/
    }
    .noorder{
      img{
        display: block;
        width:225px;
        height:160px;
        margin:0 auto;
        padding-top: 101px;
      }
      .noorderTip{
        text-align: center;
        color:#9B9B9B;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        margin-top: 20px;
      }
      .goBack{
        width: 100px;
        height: 32px;
        background: #ff5500;
        color: #ffffff;
        font-size: 14px;
        border-radius: 100px;
        text-align: center;
        line-height: 32px;
        margin:0 auto;
        margin-top: 20px;
      }
    }
  }
</style>
