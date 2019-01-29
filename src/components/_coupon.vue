<template lang="html">
  <div class="coupon">
    <!--蒙版层-->
    <div class="coupon_box" v-show="isshow" id="coupon_box">
      <div class="coupon_big">
        <div class="rule">
          <span class="rule_context">现金券使用规则</span>
        </div>
        <p>
          <i>1、</i><span>可用于购买课程，抵扣相应的金额。</span>
          <i>2、</i><span>最终解释权归北京天赋通教育科技有限公司所有。</span>
        </p>
        <div class="me_know" @click="close">
          <span>我知道了</span>
        </div>
      </div>
    </div>

    <div class="coupon_list" v-if="datalist.length > 0">
      <!-- 1 start-->
      <div class="list" v-for="item in datalist" @click="select(item)">
        <div class="coupon_up">
          <div class="coupon_up_left">
            <span>现金券</span>
          </div>
          <div class="coupon_up_right">
            <em>¥</em>
            <strong>{{item.couponAmount}}</strong>
          </div>
        </div>
        <div class="coupon_center"></div>
        <div class="coupon_down">
          <span>有效期至<i>{{item.couponExpirationL }}</i></span>
        </div>
      </div>

      <!-- 1 end-->
      <!-- 现金券使用规则提示-->
      <span class="cash_coupon_rule" @click="open">现金券使用规则>></span>
    </div>

    <div class="coupon_list" v-else>
      <img class="nocoupon" src="../assets/coupon/nocoupon.png" width="56%" height="161"/>
      <p>这里竟然空空如也</p>
      <span class="back" @click="back">返回</span>
    </div>


  </div>
</template>

<script>
  import Time from '@/utils/time';
  import { queryCouponInfo } from '@/api/coupon'
  export default {
    data() {
      return {
        isshow:false,
        datalist:[],
        openid:'',
        jiezhitime:'',
        doc:"",
      }
    },
    props:{
      myopenid:String,//
    },
    methods:{
      open(){
        this.isshow = true;
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
        // let top = document.body.scrollHeight - document.body.clientHeight;

        // document.getElementById("coupon_box").style.top = top+"px";

      },
      close(){
        this.isshow = false;
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='auto';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
      },
      select(item){
        //把选择的对象传给父组件
        this.$emit('selectItem',item,false);//yhqCheckedDataEditAdd 为了展示
      },
      back(){
        //把选择的对象传给父组件
        this.$emit('backItem',false);//yhqCheckedDataEditAdd 为了展示
      },
      getList(){
        let that = this;
        let mydata = {'openId':that.openid} ;
        queryCouponInfo(mydata).then(res => {
          if(res.data.statusCode == '200'){
            that.datalist = res.data.result;
            that.datalist.map((value,key,arr) => {
              value.couponExpirationL = value.couponExpirationL.split(" ")[0];
            });
          }else {
            this.$message.error('拉取失败');
            that.datalist = [];
          }
        })
      }
    },
    created() {
      this.openid = this.myopenid;
      this.getList();
      //显示滚动条
      var mo=function(e){e.preventDefault();};
      document.body.style.overflow='auto';//出现滚动条
      document.removeEventListener("touchmove",mo,false);

    },
  }
</script>

<style lang="less" scoped>
  .coupon {
    width: 100%;
    .coupon_list{
      .list{
        height: 160px;
        background: url(../assets/coupon/couponbg.png) no-repeat 50%;
        background-size: 100% 100%;
        margin: 20px;
        box-shadow: 0 2px 20px 0 hsla(0,0%,78%,.35);
        border-radius: 10px;
        .coupon_up{
          position: relative;
          height: 42px;
          padding-top: 24px;
          padding-left: 10px;
          .coupon_up_left{
            width:90px;
            position: relative;
            float:left;
            span{
              font-size: 30px;
              color: #FFFFFF;
              text-align: center;
              height: 42px;
            }
          }
          .coupon_up_right{
            width: 42px;
            height: 42px;
            margin-left: 170px;
            position: absolute;
            right: 18px;
            em{
              width: 11px;
              font-size: 20px;
              color: #FFFFFF;
              text-align: center;
              font-style: normal;
              float: left;
              position: relative;
              margin-top: 12px;
            }
            strong{
              width: 31px;
              font-size: 30px;
              color: #FFFFFF;
              text-align: center;
              line-height: 28px;
              font-weight: normal;
              float: left;
              height: 42px;
              line-height: 42px;
            }
          }
        }
        .coupon_center{
          height: 2px;
          margin-left: 10px;
          margin-right: 10px;
          border-bottom: 1px dashed #fff;
          margin-top: 25px;
        }
        .coupon_down{
          widht: 114px;
          height: 17px;
          font-size: 12px;
          color: #fff;
          margin-left: 10px;
          font-weight: lighter;
          margin-top: 20px;
        }
      }
      .cash_coupon_rule{
        display:block;
        font-size: 11px;
        color: #FF3D4A;
        margin-top:20px;
        text-align: center;
        margin-bottom: 50px;
      }
      .nocoupon{
        margin:100px auto 0;
        display:block;
      }
      p{
        margin-top:20px;
        text-align: center;
        font-size: 14px;
        color: #9B9B9B;
      }
      .back{
        width:99px;
        height:32px;
        line-height: 32px;
        border-radius: 16px;
        font-size: 14px;
        color: #FFFFFF;
        display:block;
        text-align: center;
        background:#FF5500;
        margin:20px auto 0;
      }
    }
    .coupon_box{
      position: fixed;
      width: 100%;
      height: 100%;
      top:0;
      bottom:0;
      left:0;
      right:0;
      z-index: 999;
      background: url('../assets/coupon/couponmeng.png') no-repeat center;
      background-size: cover;
      /*position: fixed;*/
      /*background:url("../../assets/coupon/couponmeng.png") repeat-y center;*/
      /*background-size: cover;*/
      /*bottom: 0px;*/
      /*z-index: 1000;*/
      /*height: 100%;*/
      /*width: 100%;*/
      .coupon_big{
        width:260px;
        height:263px;
        background:#fff;
        border-radius: 12px;
        margin:150px auto 0;
        .rule{
          width:125px;
          height:48px;
          margin-left:67px;
          text-align: center;
          padding-top:2px;
          font-weight: lighter;
          background:url('../assets/coupon/couponrule.png') no-repeat center;
          .rule_context{
            font-size: 14px;
            color: #FFFFFF;
          }
        }
        p{
          margin-top:20px;
          width:230px;
          margin-left:15px;
          font-size: 13px;
          i{
            color:#FF5500;
            float:left;
            margin-bottom:10px;
          }
          span{
            float:left;
            width: 209px;
            margin-bottom:10px;
          }
        }
        .me_know{
          width:220px;
          height:40px;
          background:url("../assets/coupon/couponbotton.png") no-repeat center;
          margin: 138px auto 0;
          color:#fff;
          text-align: center;
          line-height:40px;
          font-size:13px;
          font-weight: lighter;
        }
      }
    }
  }

</style>
