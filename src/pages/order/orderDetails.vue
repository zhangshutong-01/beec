<template>
  <div class="orderDetails">
    <div class="orDetails">
      <div class="details_top">
        <!--<p>-->
          <!--<img src="../../assets/order/banner.png"/>-->
          <img :src="orderInfor.imgUrl"/>
        <!--</p>-->
      </div>
      <div class="details_mid clearfix">
        <p class="details_mid_tit">{{orderInfor.courseName}}</p>
        <p class="details_mid_fit">{{orderInfor.courseDescribe}}</p>
      </div>
      <div class="details_bot">
        <div class="details_bot_content clearfix">
          <p class="details_bot_tit">订单状态：</p>
          <p class="details_bot_cont orderStatus">{{orderInfor.orderState | orderStatus}}</p>
        </div>
        <div class="details_bot_content clearfix">
          <p class="details_bot_tit">支付金额：</p>
          <p class="details_bot_cont">¥{{orderInfor.orderAmount}}</p>
        </div>
        <div class="details_bot_content clearfix">
          <p class="details_bot_tit clearfix">支付时间：</p>
          <!--<p class="details_bot_cont">{{orderInfor.createTime | changeHour}}<span class="hour">{{orderInfor.createTime | changeHour}}</span></p>-->
          <p class="details_bot_cont">{{orderInfor.createTimeL | changeTime}}</p>
        </div>
      </div>
      <div class="referBtn" @click="referTeacher">咨询老师</div>
    </div>
    <!--蒙层-->
    <div class="mask" v-show="isMaskShow">
      <div class="teacherCode">
        <div class="qrCode">
          <img src="../../assets/mine/teacherQRcode.jpg"/>
        </div>
        <div class="addTeacher">
          <p>长按二维码加老师为好友</p>
        </div>
      </div>
      <div class="close" @click="close"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "orderDetails",
    data() {
      return {
        isMaskShow: false,
        orderInfor:{
          createTimeL:''
        }
      }
    },
    filters:{
      changeTime(date){
        let time= date.replace(/-/g,".").substring(0,16);
        return time;
      },
      orderStatus(val){
        if(val == 0){
          let groupIng = '拼团中';
          return groupIng;
        }
        if(val == 1 || val == 4){
          let groupSucc = '拼团成功';
          return groupSucc;
        }
        if(val == 2){
          let buySucc = '购买成功';
          return buySucc;
        }
      }
    },
    mounted(){
      this.noshare();
      this.initData();
    },
    methods: {
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
      referTeacher(){
        this.isMaskShow = true;
      },
      close(){
        this.isMaskShow = false;
      },
      initData(){
        this.orderInfor = Object.assign({}, this.$route.query);
        console.log(this.orderInfor);
      }
    }
  }
</script>

<style lang="less" scoped>
  .orderDetails{
    .orDetails{
      overflow: hidden;
      width:100%;
      height:434px;
      /*margin:0 auto;*/
      background: url("../../assets/order/orderdetailBg.png") no-repeat center;
      background-size: 100% 100%;
      position:relative;
      .details_top{
        /*width:335px;*/
        width: 89%;
        height:186px;
        margin:0 auto;
        border-bottom: 1px solid #F2F2F2;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        /*position: absolute;*/
        /*top:18px;*/
        /*left:20px;*/
        margin-top: 17px;
        p{
          width: 335px;
          height: 186px;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }
        img{
          display: block;
          width: 100%;
          height: 100%;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }
      }
      .details_mid{
        width:335px;
        height:53px;
        margin: 0 auto;
        position: absolute;
        left: 20px;
        top:205px;
        line-height:53px;
        .details_mid_tit{
          font-family: PingFangSC-Medium;
          font-size: 20px;
          color: #444444;
          float: left;
          margin-left: 15px;
        }
        .details_mid_fit{
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #999999;
          float: right;
          margin-right: 30px;
        }
      }
      .details_bot{
        width: 335px;
        margin: 0 auto;
        position: absolute;
        left: 20px;
        top:260px;
        padding-top:20px;
        .details_bot_content{
          font-family: PingFangSC-Regular;
          padding-bottom: 10px;
          p{
            float: left;
          }
          .details_bot_tit{
            margin-left: 15px;
            font-size: 13px;
            color: #999999;
          }
          .details_bot_cont{
            margin-left: 10px;
            font-size: 13px;
            color: #333333;
            .hour{
              margin-left: 5px;
            }
          }
          .orderStatus{
            color: #FF5500;
          }
        }
      }
      .referBtn{
        width:104px;
        /*height: 32px;*/
        padding:7px 0;
        font-family: PingFangSC-Regular;
        color: #ffffff;
        font-size: 18px;
        line-height: 18px;
        background: #FF5500;
        border-radius: 100px;
        text-align: center;
        position: absolute;
        left:123px;
        bottom: 35px;
        /*margin: 0 auto;*/
        /*margin-top: 5px;*/
      }
    }
  }
  .clearfix:before, .clearfix:after {
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
  /*蒙层*/
    .mask {
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      top: 0;
      left: 0;
      z-index: 999;
    }

  .teacherCode {
    width: 260px;
    height: 288px;
    border-radius: 12px;
    background: #ffffff;
    background: url("../../assets/mine/teacherbg.png") no-repeat center;
    margin: 0 auto;
    margin-top: 160px;
    overflow: hidden;
  }

  .qrCode {
    width: 176px;
    height: 176px;
    margin:0 auto;
    margin-top: 30px;
    img{
      display: inline-block;
      width: 100%;
    }
  }

  .addTeacher {
    p {
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #FF5500;
      margin-top: 38px;
      text-align: center;
    }
  }

  .close {
    width: 26px;
    height: 26px;
    background: url("../../assets/mine/close.png") no-repeat center;
    background-size: 100% 100%;
    margin: 0 auto;
    margin-top: 30px;
  }

</style>
