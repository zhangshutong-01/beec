<template lang="html">
     <v-coupon  :myopenid="openid" @backItem="backItem" @selectItem="myselect"></v-coupon>
</template>

<script>
  import Coupon  from '@/components/_coupon.vue'
  import { selectDJJ } from '@/api/coupon'
  export default {
    components:{
      'v-coupon': Coupon,
    },
    data() {
      return {
        openid:'',//当前用户oepind
        groupNo:'',
        courseId:'',
        orderid:'',
        zhijie:'',
        names:'',
        couponid:'',//优惠券id
        couponAmount:'',
        orderAmount:'',//优惠券金额
      }
    },
    methods:{
      backItem(isclose){

        this.$router.push({
          name:'pay',
          query:{
            openid:this.openid,
            groupNo:this.groupNo,
            courseId:this.courseId,
            orderid:this.orderid,
            zhijie:this.zhijie,
            names:this.names,
            couponid:this.couponid,
            couponAmount:this.couponAmount,
            orderAmount:this.orderAmount
          }
        })
      },
      myselect(item,iscoupon){
        this.couponitem = item;
        //调用优惠券选择接口
        let that = this;
        that.couponAmount = item.couponAmount;
        that.couponid = item.id;

        let mydata = {'id':that.orderid,'couponId':item.id} ;//当期订单id,现金券id
        if(that.names=='99'){
          debugger;
          this.orderAmount = 66-item.couponAmount;
        }else{
          this.orderAmount = 199-item.couponAmount;
        }
        selectDJJ(mydata).then(res => {
          if(res.data.statusCode == '200'){
            console.log("订单号："+that.orderid+"    现金券号是："+item.id+"    现金券插入成功");
          }else {
            console.log("订单号："+that.orderid+"    现金券号是："+item.id+"    现金券插入失败");
          }
        })

        this.$router.push({
          name:'pay',
          query:{
            openid:this.openid,
            groupNo:this.groupNo,
            courseId:this.courseId,
            orderid:this.orderid,
            zhijie:this.zhijie,
            names:this.names,
            couponid:this.couponid,
            orderAmount:this.orderAmount,
            couponAmount:this.couponAmount
          }
        })
      },
    },
    created(){
      this.openid  = this.$route.query.openid;
      this.groupNo = this.$route.query.groupNo;
      this.courseId = this.$route.query.courseId;
      this.orderid = this.$route.query.orderid;
      this.zhijie = this.$route.query.zhijie;
      this.names = this.$route.query.names;
      if(this.names==99){
        this.orderAmount = 66;
      }else{
        this.orderAmount = 199;
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
