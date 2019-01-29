<template lang="html">
  <div class="order">
    <div class="orderStatus" v-for="item in orderList" @click="orderDetails(item)" v-show="haveOrder">
      <div class="orderStatus_top">
        <p class="statusicon iconing" v-if="item.orderState ==0"></p>
        <p class="status" v-if="item.orderState ==0">拼团中</p>
        <p class="statusicon succicon" v-if="item.orderState ===1 || item.orderState ==4"></p>
        <p class="status" v-if="item.orderState ==1 || item.orderState ==4">拼团成功</p>
        <p class="statusicon succicon" v-if="item.orderState ===2"></p>
        <p class="status" v-if="item.orderState ==2">购买成功</p>
        <p class="hour">{{item.createTimeL | changeTime}}</p>
      </div>
      <div class="orderStatus_midd">
        <!--<img src="../../assets/order/banner.png"/>-->
        <img :src="item.imgUrl"/>
      </div>
      <div class="orderStatus_bot">
        <p class="bot_topic">{{item.courseName}}</p>
        <p class="bot_age">{{item.courseDescribe}}</p>
      </div>
    </div>
    <div class="noorder" v-show="noOrder">
      <img src="../../assets/mine/icon_wudingdan.png"/>
      <p class="noorderTip">这里竟然空空如也</p>
      <div class="goBack" @click="goBack">返回</div>
    </div>
    <v-footer :myopenid= 'openid' :iscourse= 'isCourse' :ismy= 'isMy'/>
  </div>
</template>


<script>
  import Footer from '@/components/_footer.vue'
  import { Indicator, Toast} from 'mint-ui';
  import { orderInfor } from '@/api/mine';


  export default {
    name: 'order',
    components: {
      'v-footer': Footer
    },
    data() {
      return {
        haveOrder:true,//有订单；
        noOrder:false,//暂无订单页；
        orderList:[
          {
            id:'',
            orderState:'',//0：拼团中，1：拼团成功，2：直接购买成功
            createTimeL:'',
            time:'',
            hour:'',
            courseName:'',
            courseDescribe:'',
            imgUrl:''
            // couponId: null,
            // courseDescribe: "适合3-4岁宝宝",
            // courseId: "0606dbc7287c4538b6b01f839dbd49bf",
            // courseName: "小蜜蜂美食记",
            // coursePrice: null,
            // createTime: "2018-10-19T02:30:52.000+0000",
            // createTimeL: "2018-10-19 10:30:52",
            // groupDescribe: null,
            // groupNo: "PTa0abceadc05441a29a53c6bc4e1a5427",
            // groupState: 0,
            // id: "a1c4d91f1c8b47d4a470d3d39a49c63b",
            // imgUrl: "https://wangxiaonewbucket4.oss-cn-beijing.aliyuncs.com/bee-math/course/01-%E5%B0%8F%E8%9C%9C%E8%9C%82%E7%BE%8E%E9%A3%9F%E8%AE%B0.png",
            // imgUrlL: null,
            // invitationsNums: 100,
            // nickName: null,
            // openId: "ojjgp0lqbHpWOtgeKeW6ovrXVDWI",
            // orderAmount: 0.02,
            // orderSource: 1,
            // orderState: 4,
            // pageNum: 0,
            // pageSize: 0,
            // payState: 1,
            // sourceId: "ojjgp0kRU9O6GctX0eTCVDuQSRBU",
            // userHeadImgUrl: null,
          },
        ],
        openid:'',
        time6:'',
        isCourse:false,
        isMy:true,
      }
    },
    mounted(){
      this.initData();
    },
    filters:{
      changeTime(date){
        let time= date.replace(/-/g,".").substring(0,16);
        return time;
      }
    },
    created(){
      this.noshare();
      let openID = this.$route.query.openid;
      this.openid = openID;
    },
    methods: {
      initData(){
        let params = {
          pageNum:'',
          pageSize:'',
          openId: this.openid,
        };
        Indicator.open();
        orderInfor(params).then(res => {
          let resData = res.data;
          Indicator.close();
          if(resData.statusCode == 200){
            // Toast(resData.message);
            if(resData.result == ''){
              this.noOrder = true;
              this.haveOrder = false;
            }else{
              this.orderList = resData.result;
              // console.log(this.orderList);
              this.noOrder = false;
              this.haveOrder = true;
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
      orderDetails(item){
        this.$router.push({
          name:'orderDetails',
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
    }
  }
</script>

<style lang="less" scoped>
  .order {
    padding-top: 20px;
    margin-bottom:70px;
    a{
      display: block;
    }
    .orderStatus{
      width: 335px;
      height: 320px;
      margin: 0 auto;
      box-shadow: 0 4px 20px 0 #E8E8EB;
      border-radius: 8px;
      background: #FFFFFF;
      margin-bottom:20px;
      .orderStatus_top{
        width: 100%;
        height:60px;
        display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
        display: -moz-box;     /* 老版本语法: Firefox (buggy) */
        display: -ms-flexbox;  /* 混合版本语法: IE 10 */
        display: -webkit-flex; /* 新版本语法: Chrome 21+ */
        display: flex;
        justify-content: flex-start;
        -webkit-justify-content: flex-start;
        -moz-justify-content: flex-start;
        -ms-justify-content: flex-start;
        -o-justify-content: flex-start;
        align-items: center;
        -webkit-align-items:center;
        -moz-align-items:center;
        -ms-align-items:center;
        -o-align-items:center;
        position:relative;
        font-size: 12px;
        color: #444444;
        font-family:PingFangSC-Regular;
        /*border-radius: 8px;*/
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        background: rgba(255,85,0,0.05);
        .statusicon{
          width: 20px;
          height: 20px;
          border-radius: 10px;
          margin-left: 15px;
        }
        .succicon{
          background: url("../../assets/order/succicon.png") no-repeat center;
          background-size: 100% 100%;
        }
        .iconing{
          background: url("../../assets/order/iconing.png") no-repeat center;
          background-size: 100% 100%;
        }
        /*.buysucc{*/
          /*margin-left: -15px!important;*/
        /*}*/
        .status{
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #FF5500;
          margin-left: 10px;
          line-height: 16px;
        }
        .hour{
          position: absolute;
          right: 15px;
        }
        .time{
          position: absolute;
          right: 55px;
        }
      }
      .orderStatus_midd{
        height: 188px;
        width: 100%;
        border-bottom: 1px solid #F2F2F2;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .orderStatus_bot{
        width: 100%;
        height: 72px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        overflow: hidden;
        .bot_topic{
          font-family: PingFangSC-Medium;
          font-size: 20px;
          color: #444444;
          margin-top: 11px;
          margin-left: 15px;
        }
        .bot_age{
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #999999;
          margin-top: 5px;
          margin-left: 15px;
        }
      }
    }
  }
  .noorder{
    img{
      display: block;
      width:160px;
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
</style>
