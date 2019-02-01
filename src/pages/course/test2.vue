<template lang="html">
  <!--<div class="courseCont">-->
  <!--<div class="subGrade" @click="submit">提交成绩</div>-->
  <!--</div>-->
  <iframe :src="currentUrl" width="100%" height="100%" frameborder="no" ></iframe>
</template>
<script>
  import { Indicator, Toast} from 'mint-ui';
  import { submitGrade } from '@/api/course'
  import { authorize, share } from '@/api/wx'
  // import { isused } from '@/api/mine';

  export default {
    data(){
      return {
        openid:'',
        courseId:'',
        sectionId:'',
        sectionurl:'',
        currentUrl:'',
        baseUrl:'http://test-yunying.coolmath.cn/beec/',
        useid:'',
      }
    },
    created: function () {
      this.noshare();
      this.useid = this.$route.query.refresh;
      console.log(this.useid);

      this.openid = this.$route.query.openid;
      this.courseId = this.$route.query.courseid;
      this.sectionId = this.$route.query.sectionid;
      this.sectionurl = this.$route.query.sectionurl;
      this.currentUrl = this.baseUrl+this.sectionurl+"/index.html?openId="+this.openid+"&courseId="+this.courseId+"&sectionId="+this.sectionId;
      console.log(this.currentUrl);
    },
    mounted(){
      this.changeStatus();
    },
    methods:{
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
      // changeStatus(){
      //   let params ='id='+this.useid+'&three='+'';
      //   Indicator.open();
      //   isused(params).then(res => {
      //     let resData = res.data;
      //     Indicator.close();
      //     if(resData.statusCode == 200){
      //       // console.log(resData.result);
      //       let params ='id='+this.useid+'&three='+'three';
      //       Indicator.open();
      //       isused(params).then(res => {
      //         window.location.reload();
      //       })
      //     }else {
      //       Indicator.close();
      //       Toast(resData.message);
      //     }
      //   })
      // },
      changeStatus() {
        let params = 'id=' + this.useid + '&three=' + '';
        // isused(params).then(res => {
        //   let resData = res.data;
        //   if (resData.statusCode == 200) {
        //     // console.log(resData.result);
        //     let params = 'id=' + this.useid + '&three=' + 'three';
        //     isused(params).then(res => {
        //       window.location.reload();
        //     })
        //   }
        // })
      },
    },
  }
</script>
<style lang="less" scoped>
  .courseCont{
    .subGrade{
      width: 150px;
      height: 50px;
      background: #FF5500;
      border-radius: 100px;
      color: #ffffff;
      font-size: 20px;
      margin:0 auto;
      margin-top: 50px;
      text-align: center;
      line-height: 50px;
    }
  }
</style>
