<template lang="html">
  <div class="courselist">
    <div v-for="(item,index) in datalist">
      <div class="per_courselist" :id="'anchor-'+index" v-if="index==0" @click="submit2(item)">
        <div class="topic"><img :src="item.imgUrl" width="100%" height="199" /></div>
        <span>{{item.sectionName}}</span>
        <strong>{{item.sectionSort}}</strong>
        <!--<img  src="../../assets/course/honey.png" class="honey" v-if="lastSection==0"/>-->
      </div>
      <!--<div class="per_courselist"  :id="'anchor-'+index" v-else-if="islock" @click="open(item)">-->
      <!--<div class="topic"><img :src="item.imgUrl" width="100%" height="199"/></div>-->
      <!--<span>{{item.sectionName}}</span>-->
      <!--<strong>{{item.sectionSort}}</strong>-->
      <!--<img  src="../../assets/course/lock.png" class="lock" />-->
      <!--</div>-->
      <!--<div class="per_courselist"  :id="'anchor-'+index" v-else-if="!islock && index <=lastSection" @click="submit2(item)">-->
      <div class="per_courselist" :id="'anchor-'+index" v-else-if="index <=lastSection" @click="submit2(item)">
        <div class="topic"><img :src="item.imgUrl" width="100%" height="199" /></div>
        <span>{{item.sectionName}}</span>
        <strong>{{item.sectionSort}}</strong>
        <img src="../../assets/course/honey.png" class="honey" v-if="index >= lastSection" />
      </div>

      <!--<div class="per_courselist"  :id="'anchor-'+index" v-else-if="!islock && index > lastSection" @click="openAlert(item)">-->
      <div class="per_courselist" :id="'anchor-'+index" v-else-if="index > lastSection" @click="openAlert(item)">
        <div class="topic"><img :src="item.imgUrl" width="100%" height="199" /></div>
        <span>{{item.sectionName}}</span>
        <strong>{{item.sectionSort}}</strong>
        <img src="../../assets/course/honey.png" class="honey" v-if="index >= lastSection" />
      </div>
    </div>
    <!-- 拼团或者直接支付弹框-->
    <!--<div class="course_box" v-if="isshow"  @touchmove.prevent>-->
    <!--<div v-if="!isrule">-->
    <!--<div class="paytypebox">-->
    <!--<img class="couser_ban" src="../../assets/course/courseban.png" width="80%" height="100"/>-->
    <!--<div class="topic_title">{{myitem.sectionName}}</div>-->
    <!--<div class="topic_lock">解锁本期课程</div>-->
    <!--<div class="groupon" @click="goPaynext('99',myitem)">3人拼团3元解锁(限购5000份)</div>-->
    <!--<div class="payower"  @click="goPaynext('199',myitem)">支付9.9元直接解锁本期所有课程</div>-->
    <!--<div class="groupon_rule" @click="openRule">拼团规则>></div>-->
    <!--</div>-->
    <!--<div class="close" @click="close">-->
    <!--<img src="../../assets/honey/close.png" />-->
    <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash;拼团规则&ndash;&gt;-->
    <!--<div class="coupon_box2" v-if="isrule">-->
    <!--<div class="coupon_big">-->
    <!--<div class="rule">-->
    <!--<span class="rule_context">拼团规则</span>-->
    <!--</div>-->
    <!--<p>-->
    <!--<i>1、</i><span>确认支付5小时后没有拼团成功，则支付金额原路返回。</span>-->
    <!--</p>-->
    <!--<div class="me_know" @click="closeRule">-->
    <!--<span>我知道了</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<v-footer :openid = "openid"/>-->
  </div>

</template>
<script>
  import Footer from '@/components/_footer.vue'
  import {
    querySectionForC
  } from '@/api/course'
  import {
    createOrderInfo
  } from '@/api/pay'
  import {
    share
  } from '@/api/wx'
  // import {
  //   isused
  // } from '@/api/mine';
  import {
    Indicator,
    Toast
  } from 'mint-ui';
  export default {
    components: {
      'v-footer': Footer
    },
    data() {
      return {
        flag: 6,
        datalist: [
          // {
          //   id:'1',
          //   name:'小蜜蜂美食记',
          //   kejie:'第一节'
          // },
          // {
          //   id:'2',
          //   name:'摘果子',
          //   kejie:'第二节'
          // },
          // {
          //   id:'3',
          //   name:'做蛋糕',
          //   kejie:'第三节'
          // },
          // {
          //   id:'4',
          //   name:'小蜜蜂美食记',
          //   kejie:'第一节'
          // },
          // {
          //   id:'5',
          //   name:'摘果子',
          //   kejie:'第二节'
          // },
          // {
          //   id:'6',
          //   name:'小蜜蜂美食记',
          //   kejie:'第一节'
          // },
          // {
          //   id:'7',
          //   name:'摘果子',
          //   kejie:'第二节'
          // },
          // {
          //   id:'8',
          //   name:'做蛋糕',
          //   kejie:'第三节'
          // },
          // {
          //   id:'9',
          //   name:'小蜜蜂美食记',
          //   kejie:'第一节'
          // },
          // {
          //   id:'10',
          //   name:'摘果子',
          //   kejie:'第二节'
          // },
          // {
          //   id:'11',
          //   name:'做蛋糕',
          //   kejie:'第三节'
          // },
          // {
          //   id:'12',
          //   name:'做蛋糕',
          //   kejie:'第三节'
          // },
        ],
        myitem: {
          // id:'57f46ae0ac634df699b1df1904627e01',
          // name:'搬运蜂蜜罐',
          // kejie:'第1节',
          // sectionUrl:'course01/1',
        },
        course: {

        },
        isfist: true,
        islock: true,
        isshow: false,
        isrule: false,
        openid: '',
        sectionid: '', //课程小结id
        lastSection: 0, //第一个课程 最后课节序号
        useid: '', //是否刷新字段
        useid1: '', //是否刷新字段

      }
    },
    methods: {
      submit(item) { //跳到提交成绩页面；
        console.log(this.openid + '=============');
        this.$router.push({
          name: 'test',
          query: {
            openid: this.openid,
            courseid: this.course.courseid,
            sectionid: item.id
          }
        })
      },
      submit2(item) { //跳到提交成绩页面；跳转游戏界面，判断是否有游戏
        // isEnable 0 代表有游戏，1，代表无游戏
        if (item.isEnable == 1) {
          alert("敬请期待")
        } else if (item.isEnable == 0) {
          // this.$router.push({
          //   name:'test2',
          //   query:{
          //     name:item.sectionName,
          //     openid:this.openid,
          //     courseid:this.course.courseid,
          //     sectionid:item.id,
          //     sectionurl:item.sectionUrl,
          //   }
          // })
          this.changeReport(item);
        }
      },
      changeReport(item) { //页面刷新
        let params = 'id=' + this.useid1 + '&three=' + '';
        Indicator.open();
        isused(params).then(res => {
          let resData = res.data;
          Indicator.close();
          if (resData.statusCode == 200) {
            this.$router.push({
              name: 'test2',
              query: {
                name: item.sectionName,
                openid: this.openid,
                courseid: this.course.courseid,
                sectionid: item.id,
                sectionurl: item.sectionUrl,
                refresh: resData.result
              }
            })
          } else {
            Indicator.close();
            // Toast(resData.message);
          }
        })
      },
      openAlert(item) {
        if (item.isEnable == 1) {
          alert("敬请期待")
        } else if (item.isEnable == 0) {
          alert(`请先学习第${this.lastSection+1}节课哦`);
        }
      },
      // open(item){
      //   //打开锁
      //   this.myitem = item;
      //   this.isshow = true;
      //   var mo=function(e){e.preventDefault();};
      //   document.body.style.overflow='hidden';
      //   document.addEventListener("touchmove",mo,false);//禁止页面滑动
      // },
      // close(){
      //   this.isshow = false;
      //   var mo=function(e){e.preventDefault();};
      //   document.body.style.overflow='auto';//出现滚动条
      //   document.removeEventListener("touchmove",mo,false);
      // },
      // open(item){
      //   console.log(item);
      //   alert('尚未解锁')
      // },
      // openRule(){
      //   this.isrule = true;
      // },
      // closeRule(){
      //   this.isrule = false;
      // },
      goPaynext(names, item) {

        var mo = function (e) {};
        document.body.style.overflow = 'auto'; //出现滚动条
        document.removeEventListener("touchmove", mo, false);

        // openId	[string]	是	用户的openId	展开
        // courseId	[string]	是	课程Id	展开
        // orderAmount	[string]	是	订单金额	展开
        // sourceId	[string]		邀请人的openId	展开
        // orderSource	[string]	是	订单来源标识（0：发起拼团，1：参与拼团，2：直接支付）
        //先调用创建订单 然后在跳转
        if (names == "99") {
          let that = this;
          let mydata = {
            'openId': this.openid,
            'courseId': that.course.courseid,
            'orderAmount': 3,
            'orderSource': 0
          };
          createOrderInfo(mydata).then(res => {
            if (res.data.statusCode == '200') {
              that.$router.push({
                path: '/pay',
                query: {
                  openid: this.openid,
                  groupNo: res.data.result.groupNo,
                  courseId: this.course.courseid,
                  zhijie: 0, //到确认支付，再到分享页面
                  orderid: res.data.result.id,
                  "names": 99
                }
              });
            } else if (res.data.statusCode == '29') {
              alert("您已参与此课程的拼团，5小时后没有拼团成功，则支付金额原路返回。");
              //如果是29 这跳转到结果页
              let groupNo = res.data.result.groupNo;
              let zhifuopenid = res.data.result.openId;
              // let sourceId = res.data.result.sourceId;
              // let faqirenopenid = '';
              // if(sourceId==null || sourceId==undefined || sourceId==""){
              //   faqirenopenid = zhifuopenid;
              // }else{
              //   faqirenopenid = sourceId;
              // }
              let params = 'id=&three=';
              isused(params).then(res2 => {
                // console.log(res);
                let resData = res2.data;
                if (resData.statusCode == 200) {
                  that.$router.push({
                    path: '/share',
                    query: {
                      openid: zhifuopenid,
                      groupNo: groupNo,
                      useid: resData.result
                    }
                  });
                }
              });

            }
          })
        } else {
          let that = this;
          let mydata = {
            'openId': this.openid,
            'courseId': this.course.courseid,
            'orderAmount': 9.9,
            'orderSource': 2
          };
          createOrderInfo(mydata).then(res => {
            if (res.data.statusCode == '200') {
              this.$router.push({
                path: '/pay',
                query: {
                  openid: this.openid,
                  groupNo: this.groupNo,
                  courseId: this.course.courseid,
                  zhijie: 0, //到确认支付，再到分享页面
                  orderid: res.data.result.id,
                  "names": 199
                }
              });
            } else {
              alert("您已参与此课程的拼团，5小时后没有拼团成功，则支付金额原路返回。");
            }
          })
        }
      },
      goAnchor(selector) {
        var anchor = document.querySelector(selector);
        document.body.scrollTop = anchor.offsetTop;
        document.documentElement.scrollTop = anchor.offsetTop;
        //document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
      },
      getList() {
        let that = this;
        let mydata = {
          'openId': this.openid,
          'courseId': this.course.courseid
        };
        querySectionForC(mydata).then(res => {
          if (res.data.statusCode == '200') {
            console.log(res.data);
            that.datalist = res.data.result.list;
            that.lastSection = res.data.result.lastSection;
            if (that.lastSection == 0) {
              this.goAnchor("#anchor-0");
            } else {
              let zuijin = that.lastSection - 1;
              this.goAnchor("#anchor-" + zuijin);
            }
            // if(res.data.result.isUnlock ==1){
            //   that.islock = false;
            // }
          } else {
            this.$message.error('拉取失败');
            //that.datalist = [];
          }
        })
      },
      wxshare() {
        //wx是引入的微信sdk
        // wx.config('这里有一些参数');//通过config接口注入权限验证配置
        let mydata = {
          'url': window.location.href
        };
        share(mydata).then(res => {
          console.log(res)
          if (res.data.statusCode == '200') {
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.result.appId, // 必填，公众号的唯一标识
              timestamp: res.data.result.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.result.noncestr, // 必填，生成签名的随机串
              signature: res.data.result.signature, // 必填，调用js签名，
              jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，这里只写支付的
            });
            wx.ready(function () { //通过ready接口处理成功验证
              // config信息验证成功后会执行ready方法
              let mytitle = '孩子明年上小学啦，送ta一套蜜蜂乐园思维，爱上思考，变聪明！';
              let mydesc = '蜜蜂乐园';
              let mylink =
                'http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/course'; //分享到首页
              //let mylink='http://test-yunying.coolmath.cn/beec/course';//分享到首页
              let myimgUrl = 'http://thyrsi.com/t6/665/1548835210x2728279033.png';

              wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
                title: mytitle, // 分享标题
                desc: mydesc, // 分享描述
                link: mylink, // 分享链接
                imgUrl: myimgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              });
              wx.onMenuShareTimeline({ //分享朋友圈
                title: mytitle, // 分享标题
                link: mylink, // 分享链接
                imgUrl: myimgUrl, // 分享图标分享图标
                success: function () {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              });
            });
            wx.error(function (res) { //通过error接口处理失败验证
              // config信息验证失败会执行error函数
            });
          } else {

          }
        })
      },
      noshare() {
        function onBridgeReady() {
          console.log('禁用微信分享')
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
    mounted() {
      // this.goAnchor("#anchor-6")
    },
    created() {
      //禁用分享功能
      this.noshare();
      this.openid = this.$route.query.openid;
      /*if(this.$route.query.courseimg != undefined
        && this.$route.query.coursename != undefined
        && this.$route.query.coursedesc != undefined
        && this.$route.query.courseid != undefined)  {
         this.course.courseid = this.$route.query.courseid;
         this.course.coursename = this.$route.query.coursename;
         this.course.coursedesc = this.$route.query.coursedesc;
         this.course.courseimg = this.$route.query.courseimg;
      }*/
      if (this.$route.query.courseid != undefined) {
        this.course.courseid = this.$route.query.courseid;
      }
      this.getList();
      this.wxshare();
    }
  }

</script>
<style lang="less" scoped>
  //课程列表页
  .courselist {
    padding-bottom: 20px;

    .per_courselist {
      /* width:335px;*/
      height: 247px;
      background: #FFFFFF;
      box-shadow: 0 4px 20px 0 #E8E8EB;
      border-radius: 8px;
      margin: 20px;

      .topic {
        /*width:335px;*/
        height: 199px;
        border-bottom: 1px #F2F2F2 solid;

        img {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
      }

      span {
        display: block;
        font-size: 20px;
        color: #444444;
        margin-left: 15px;
        float: left;
        height: 42px;
        line-height: 42px;
      }

      strong {
        display: block;
        font-size: 13px;
        color: #999999;
        font-weight: normal;
        float: right;
        height: 42px;
        line-height: 42px;
        margin-right: 15px;
      }

      .lock {
        float: right;
        margin-right: 5px;
        margin-top: 10px;
      }

      .honey {
        float: right;
        margin-right: 5px;
        margin-top: 10px;
        height: 22px;
        width: 20px;
      }
    }

    .course_box {
      position: fixed;
      background: url("../../assets/coupon/couponmeng.png") repeat-y center;
      background-size: cover;
      bottom: 0px;
      z-index: 1000;
      height: 100%;
      width: 100%;

      .paytypebox {
        width: 260px;
        height: 352px;
        border-radius: 12px;
        background: #FFFFFF;
        margin: 125px auto 0;

        .couser_ban {
          margin: 0 auto;
          display: block;
          padding-top: 25px;
        }

        .topic_title {
          font-size: 18px;
          color: #FF5500;
          width: 260px;
          text-align: center;
          margin-top: 10px;
        }

        .topic_lock {
          font-size: 12px;
          color: #333333;
          width: 260px;
          text-align: center;
          /*top:135px;*/
          /*position: relative;*/
        }

        .groupon {
          /*top:135px;*/
          /*position: relative;*/
          width: 220px;
          height: 40px;
          line-height: 40px;
          color: #FFFFFF;
          text-align: center;
          border-radius: 20px;
          background: #FF5500;
          margin: 15px auto 0;
          font-size: 13px;
        }

        .payower {
          /*top:135px;*/
          /*position: relative;*/
          width: 220px;
          height: 40px;
          line-height: 40px;
          color: #333333;
          text-align: center;
          border-radius: 20px;
          /*background:#FF5500;*/
          border: 1px #FF5500 solid;
          margin: 20px auto 0;
          font-size: 13px;
        }

        .groupon_rule {
          /*top:135px;*/
          /*position: relative;*/
          font-size: 12px;
          color: #333333;
          margin: 15px auto 0;
          text-align: center;
        }
      }

      .coupon_box2 {

        /*position: fixed;*/
        /*top:0px;*/
        /*bottom:0px;*/
        /*left:0px;*/
        /*right:0px;*/
        /*z-index: 1000;*/
        /*height: 100%;*/
        /*width: 100%;*/
        //background: url('../../assets/coupon/couponmeng.png') no-repeat center ;
        .coupon_big {
          width: 260px;
          height: 263px;
          background: #fff;
          border-radius: 12px;
          margin: 150px auto 0;

          .rule {
            width: 125px;
            height: 48px;
            margin-left: 67px;
            text-align: center;
            padding-top: 2px;
            font-weight: lighter;
            background: url('../../assets/coupon/couponrule.png') no-repeat center;

            .rule_context {
              font-size: 14px;
              color: #FFFFFF;
            }
          }

          p {
            margin-top: 20px;
            width: 230px;
            margin-left: 15px;
            font-size: 13px;

            i {
              color: #FF5500;
              float: left;
              margin-bottom: 10px;
            }

            span {
              float: left;
              width: 209px;
              margin-bottom: 10px;
              line-height: 18px;
            }
          }

          .me_know {
            width: 220px;
            height: 40px;
            background: url("../../assets/coupon/couponbotton.png") no-repeat center;
            margin: 138px auto 0;
            color: #fff;
            text-align: center;
            line-height: 40px;
            font-size: 13px;
            font-weight: lighter;
          }
        }
      }

      .close {
        width: 26px;
        height: 26px;
        margin: 30px auto 0px;

      }
    }
  }

</style>
