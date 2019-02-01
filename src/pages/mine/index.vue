<template lang="html">
  <div class="mine" ref="mine">
    <div class="mine_header">
      <div class="header_top clearfix">
        <div class="photo">
          <img class="userPhoto" src="../../assets/mine/photo.png" v-show="!userInfor.userHeadImgUrl "/>
          <img class="userPhoto" :src="userInfor.userHeadImgUrl" v-show="userInfor.userHeadImgUrl "/>
        </div>
        <div class="infor">
          <p class="babyName">{{userInfor.babyName}}</p><span class="babyAge">{{userInfor.babyAge}}岁</span>
          <p class="babyNum">{{userInfor.userPhone}}</p>
        </div>
      </div>
      <div class="header_bot">
        <div class="bot_left" @click="myHoney(userInfor)">
          <p class="beeNum">{{userInfor.honeyTotal}}</p>
          <p class="beeDesc">蜜豆（可兑换实物）</p>
        </div>
        <p class="line"></p>
        <div class="bot_right" @click="myCoupon">
          <!--<p class="ticketMoney">{{userInfor.moneyTotal}}元</p>-->
          <p class="ticketMoney">0元</p>
          <p class="ticket">现金券</p>
        </div>
      </div>
    </div>
    <div class="invisite" @click="invisite(userInfor.honeyTotal,userInfor.moneyTotal)">
      <!--<img src="../../assets/mine/invisite.png"/>-->
      <img src="../../assets/mine/mineBanner.jpg"/>
    </div>
    <div class="menu">
      <div class="me_order" @click="myorder">
        <p class='orderIcon meOrder'></p>
        <p class="orderName">我的订单</p>
        <p class='orderArrow'></p>
      </div>
      <!--<div class="me_order" @click="studyreport(userInfor.openId,0)">-->
        <!--<p class='orderIcon report'></p>-->
        <!--<p class="orderName">学习报告</p>-->
        <!--<p class="shareBee" v-show="userInfor.isShare == 0 ? true : false">分享领蜂蜜</p>-->
        <!--<p class='orderArrow'></p>-->
      <!--</div>-->
      <div class="me_order" @click="referTeacher">
        <p class='orderIcon teacher'></p>
        <p class="orderName">咨询老师</p>
        <p class='orderArrow'></p>
      </div>
      <a href="tel:4006941888">
        <div class="me_order">
          <p class='orderIcon tell'></p>
          <p class="orderName">电话咨询</p>
          <p class='orderArrow'></p>
        </div>
      </a>
      <div class="me_order" @click="money">
        <p class='orderIcon teacher'></p>
        <p class="orderName">奖学金</p>
        <p class='orderArrow'></p>
      </div>
    </div>
    <!--蒙层弹框-->
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
    <v-footer :myopenid= 'openid' :iscourse= 'isCourse' :ismy= 'isMy'/>
  </div>
</template>
<script>
  import Footer from '@/components/_footer.vue';
  import { Indicator, Toast} from 'mint-ui';
  import { honeyAndMoneyInfo} from '@/api/mine';

  export default {
    name: 'mine',
    components: {
      'v-footer': Footer
    },
    data() {
      return {
        isMaskShow: false,
        userInfor:{
          // isShare:'',
          // babyName: '',
          // babyAge: '',
          // userPhone: '',
          // honeyTotal:'',
          // moneyTotal:'',
          // userHeadImgUrl:'',
          // openId:''
        },
        userPhotoImg:'',//用户头像；
        userNickName:'',//用户昵称
        openid:'',//用户openid
        useid:'',//是否刷新字段
        isCourse:false,
        isMy:true,
      }
    },
    mounted(){
      this.initData();
    },
    methods:{
      changeStatus(item1,item2){
        let params ='id='+this.useid+'&three='+'';
        Indicator.open();
        // isused(params).then(res => {
        //   // console.log(res);
        //   let resData = res.data;
        //   Indicator.close();
        //   if(resData.statusCode == 200){
        //     // console.log(resData);
        //     this.$router.push({
        //       name:'invitation',
        //       query:{honey:item1, money:item2,openid:this.openid,refresh:resData.result}
        //     })
        //   }else {
        //     Indicator.close();
        //     // Toast(resData.message);
        //   }
        // })
      },
      changeReport(item1,item2){
        let params ='id='+this.useid+'&three='+'';
        Indicator.open();
        // isused(params).then(res => {
        //   let resData = res.data;
        //   Indicator.close();
        //   if(resData.statusCode == 200){
        //     this.$router.push({
        //       name:'studyReport',
        //       query:{openid:item1, isShare:item2,refresh:resData.result}
        //     })
        //   }else {
        //     Indicator.close();
        //     // Toast(resData.message);
        //   }
        // })
      },
      initData(){
        let params = {
          openId: this.openid
        };
        Indicator.open();
        honeyAndMoneyInfo(params).then(res => {
          // console.log(res);
          let resData = res.data;
          Indicator.close();
          if(resData.statusCode == 200){
            this.userInfor = resData.result;
            this.userPhotoImg = resData.result.userHeadImgUrl;
            this.userNickName = resData.result.nickName;
            // console.log(this.userInfor);
          }else {
            Indicator.close();
            // Toast(resData.message);
          }
        })
      },
      stop(){//滑动限制
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
      },
      move(){//取消滑动限制
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
      },
      myHoney(honeytotal){
        Toast('稍后开放，敬请期待');
        // this.$router.push({
        //   name:'honey',
        //   query:honeytotal //openid
        // })
      },
      myCoupon(){
        Toast('稍后开放，敬请期待');
        // this.$router.push({
        //   name:'coupon',
        //   query:{openid:this.openid} //openid
        // })
      },
      referTeacher(){
        this.isMaskShow = true;
        this.stop();
      },
      myorder(){
        this.$router.push({
          name:'order',
          query:{openid:this.openid} //openid
        })
      },
      money(){
         this.$router.push({
          path:'/money',
          query:{openid:this.openid} //openid
        })
      },
      studyreport(item1,item2){
        // this.$router.push({ //openid
        //   name:'studyReport',
        //   query:{
        //     openid:this.openid,
        //     isShare: 0
        //   }
        // })
        this.changeReport(item1,item2);
      },
      close(){
        this.isMaskShow = false;
        this.move();
      },

      invisite(item1,item2){ //openid
        this.changeStatus(item1,item2);
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
    },
    created(){
      this.noshare();
      let openID = this.$route.query.openid;
      // let openID = 'ojjgp0p1DqCxU_Tp7kPTnsvd_3ao';
      // let openID = 'ojjgp0lqbHpWOtgeKeW6ovrXVDWI';
      // let openID = "ojjgp0uqhHNQeKHrDgCS-Joos9U0";
      console.log("wode:"+openID)   ;
      this.openid = openID;
    }
  }
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
