<template lang="html">
  <!--发起者支付成功到 发起拼团页面 -->
  <div class="groupon_haoyou1">
    <!--提示信息 -->
    <!--未购买课程 拼团成功 当前用户没有购买 -->
    <div class="tishi" v-if="groupState == 1">
      <span>此团已经拼团成功</span>
    </div>
    <div class="tishi" v-else>
      <span v-if="faqiUser.openId == openid">您已发起拼团，邀请好友一起学习</span>
      <span v-else-if="currentUserPay">您已参与拼团，邀请好友一起学习</span>
      <div v-else-if="!currentUserPay">
        <img :src="faqiUser.userHeadImgUrl" />
        <span >您的好友{{faqiUser.nickName}}邀请您一起学习</span>
      </div>
    </div>

    <!-- 分享主题-->
    <div class="share_topic">
      <div class="topic"><img :src="mycourse.imgUrl" width="100%" height="199"/></div>
      <div class="desc"><span >{{mycourse.groupDescribe}}   </span></div>
    </div>

    <!--倒计时 团购中显示-->
    <div class="count_down" v-if="groupState == 0">
      <div class="remaining_time">拼团剩余时间</div>
      <div class="time">
        <strong>{{time.hh.h1}}</strong>
        <em>{{time.hh.h2}}</em>
        <cite>时</cite>

        <strong>{{time.mm.m1}}</strong>
        <em>{{time.mm.m2}}</em>
        <cite>分</cite>

        <strong>{{time.ss.s1}}</strong>
        <em>{{time.ss.s2}}</em>
        <cite>秒</cite>
      </div>
      <div class="road">
        确认支付5小时后没有拼团成功，则支付金额原路返回。
      </div>
    </div>

    <div class="count_down" v-if="groupState == 1">
      <div class="road">
        确认支付5小时后没有拼团成功，则支付金额原路返回。
      </div>
    </div>

    <!--邀请好友 -->
    <div class="invitation_friends" v-if="groupState == 0 ">
      <p>再邀请<em>{{remainNumber}}</em>名好友即可拼团成功</p>
      <div class="myimages">
        <img v-for="item in users" :src="item.userHeadImgUrl" class="user_img" />
        <img v-if="users.length < 2" class="add_user" src="../../assets/groupon/adduser.png" @click="shareMask"/>
        <img v-if="users.length < 3" class="add_user" src="../../assets/groupon/adduser.png" @click="shareMask"/>
      </div>
    </div>
    <div class="invitation_friends" v-else>
      <p>拼团成功</p>
      <div class="myimages">
        <img v-for="item in users" :src="item.userHeadImgUrl" class="user_img" />
        <img v-if="users.length < 2" class="add_user" src="../../assets/groupon/default.png"/>
        <img v-if="users.length < 3" class="add_user" src="../../assets/groupon/default.png"/>
      </div>
    </div>

    <!-- 拼团支付 已拼团成功 重新开团-->
    <div  v-if="groupState == 1">
      <div class="groupon_pay" v-if="!currentUserPay">
        <div class="pay_box1">
          <p>拼团价：</p>
          <span>¥66</span>
          <em>原价¥199</em>
        </div>
        <div class="pay_box2" @click="haopay2">
          <strong>开团</strong>
        </div>
      </div>
    </div>
    <!--分享到微信朋友圈  已经支付-->
    <div class="share_weixin_friends" v-else-if="currentUserPay">
      <p>分享到<em>3</em>个微信群，成功率高达98%</p>
      <div class="fenhaopengyou">
        <div class="wx_fr_box">
          <img src="../../assets/groupon/weixin.png" @click="shareMask"/>
          <span>微信好友</span>
        </div>
        <div class="wx_fr_box">
          <img src="../../assets/groupon/firend.png" @click="shareMask"/>
          <span>朋友圈</span>
        </div>
      </div>
    </div>
    <!--分享到微信朋友圈  未支付-->
    <div class="groupon_pay" v-else-if="!currentUserPay">
      <div class="pay_box1">
        <p>拼团价：</p>
        <span>¥66</span>
        <em>原价¥199</em>
      </div>
      <div class="pay_box2" @click="haopay">
        <strong>支付</strong>
      </div>
    </div>

    <!-- 查看订单 --->
    <div class="view_order" v-if="currentUserPay" @click="viewOrder">
      <span>查看订单</span>
    </div>

    <div class="shareMask" v-show="isShareMask" @click="maskHide">
      <p class="shareImg">
        <img src="../../assets/mine/sharetip.png"/>
      </p>
      <p class="shareTip">点击右上角分享好友或朋友圈</p>
    </div>

  </div>
</template>
<script>
  import Time from '@/utils/time';
  import { queryGroupDetails } from '@/api/groupon'
  import { share ,reload} from '@/api/wx'
  import { createOrderInfo } from '@/api/pay'
  import { isused} from '@/api/mine';

  export default {
    data(){
      return {
        nickname:"流浪。",//发起人的昵称
        remain:'',
        time:{
          hh:{
            h1:'0',
            h2:'0'
          },
          mm:{
            m1:'0',
            m2:'0'
          },
          ss:{
            s1:'0',
            s2:'0'
          }
        },
        groupNo:'',
        users:[],//团购的用户列表
        faqiUser:{},//当前用户,
        mycourse:{},//课程信息
        groupState:'',//拼团状态，0拼团中，1拼团成功
        remainNumber:2,//该团剩余拼团人数
        openid:'',//当前授权用户openid,
        currentUserPay:false,//查询当前是否支付
        isShareMask: false,
        orderid:'',//支付完成之后的订单id
        isCurrentUsers:false,//当前授权用户是否在已经成团的用户列表里面
        useid:'',//重新刷新的标识符
      }
    },
    methods:{
      countTime(){
        if(this.remain !='结束'){
          this.remain = this.remain-1;
          if(this.remain>0){
            this.time = Time.formattime(this.remain)
            setTimeout(this.countTime,1000);
          }
        }
      },
      initData(){
        let that = this;
        let mydata = {'groupNo':this.groupNo} ;
        //let mydata = {'groupNo':'PTf7480b2f57c94b6cb4386bf207aac32e'} ;
        queryGroupDetails(mydata).then(res => {
          console.log(res)
          if(res.data.statusCode == '200'){

            that.mycourse.courseId =  res.data.result.courseId;
            that.mycourse.courseName =  res.data.result.courseName;
            that.mycourse.courseDescribe =  res.data.result.courseDescribe;
            that.mycourse.groupDescribe =  res.data.result.groupDescribe;
            that.mycourse.coursePrice =  res.data.result.coursePrice;
            that.mycourse.imgUrl =  res.data.result.imgUrl;
            that.groupState =  res.data.result.groupState;
            // that.groupState =  1;

            let users_db  = res.data.result.userList;
            that.users =  users_db;
            users_db.forEach(item=>{
              if(item.isInit == 0){
                this.faqiUser = item;
              }
            })
            that.remainNumber = 3-users_db.length;

            //查询当前用户是否支付
            let ojb = users_db.filter(item2=>item2.openId == this.openid)[0];//已经选择过了该对象
            if(ojb != null && ojb != undefined){//不存在
              this.currentUserPay = true;
            }

            console.log(res.data.result.groupTime)
            that.remain= Time.initTime(res.data.result.groupTime,5);
            if(that.remain !='结束') {
              that.time = Time.formattime(that.remain)
            }
            that.countTime();

            //当前用户如果是发起人 并且已经拼团成功进入课程页面
            if(res.data.result.groupState==1 && that.faqiUser.openId==that.openid){
              this.$router.push({
                path:'/course',
                query: {
                  openid: that.openid,
                  flag: false,//到确认支付，再到分享页面
                }
              });
            }

            this.wxshare();

          }else {

          }
        })
      },
      haopay(){//直接支付
        let that = this;
        let mydata = {
          'openId':that.openid,
          'courseId': that.mycourse.courseId,
          'orderAmount': 66,
          'orderSource': 1,
          'groupNo': that.groupNo,
          'sourceId':that.faqiUser.openId
        };
        createOrderInfo(mydata).then(res => {
          if(res.data.statusCode == '200'){
            that.$router.push({
              path:'/pay',
              query:{
                openid:this.openid,
                groupNo: that.groupNo,
                courseId: that.mycourse.courseId,
                zhijie:1,//到确认支付，再到分享页面
                "names":99,
                "courseid":res.data.result.courseId,
                "orderid":res.data.result.id,
              }
            });
          }else if(res.data.statusCode == '27'){//开团成功刷新页面
            window.location.href = window.location.href;
            window.location.reload()
          }else if(res.data.statusCode == '29'){
            alert("您已支付此课程");
          }
        })
      },
      haopay2(){//开团
        let that = this;
        let mydata = {
          'openId':this.openid,
          'courseId': that.mycourse.courseId,
          'orderAmount': 66,
          'orderSource':0,//发起开团
          'sourceId':that.faqiUser.openId
        };
        createOrderInfo(mydata).then(res => {
          if(res.data.statusCode == '200'){
            that.$router.push({
              path:'/pay',
              query:{
                openid:that.openid,
                groupNo: res.data.result.groupNo,
                courseId: that.mycourse.courseId,
                zhijie:2,//到确认支付，再到分享页面
                "names":99,
                "courseid":res.data.result.courseId,
                "orderid":res.data.result.id,
              }
            });
          }else if(res.data.statusCode == '29'){
            alert("您已支付此课程");
          }
        })
      },
      wxshare(){
        let that = this;
        //wx是引入的微信sdk
        // wx.config('这里有一些参数');//通过config接口注入权限验证配置
        let mydata = {'url':window.location.href};
        share(mydata).then(res => {
          console.log(res)
          if(res.data.statusCode == '200'){
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId:res.data.result.appId, // 必填，公众号的唯一标识
              timestamp: res.data.result.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.result.noncestr, // 必填，生成签名的随机串
              signature: res.data.result.signature,// 必填，调用js签名，
              jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表，这里只写支付的
            });
            wx.ready(function() { //通过ready接口处理成功验证
              // config信息验证成功后会执行ready方法
              let mytitle= that.mycourse.courseName;
              let mydesc='【蜜蜂乐园】儿童思维启蒙，这个课程很有意思！你也来看看';
              let mylink='http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/share?groupNo='+that.groupNo;//分享购买 团id
              let myimgUrl= that.mycourse.imgUrl;

              wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
                title: mytitle, // 分享标题
                desc: mydesc, // 分享描述
                link: mylink, // 分享链接
                imgUrl: myimgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                  // 用户确认分享后执行的回调函数
                  that.maskHide();
                },
                cancel: function() {
                  // 用户取消分享后执行的回调函数
                }
              });
              wx.onMenuShareTimeline({ //分享朋友圈
                title: mytitle, // 分享标题
                link: mylink, // 分享链接
                imgUrl: myimgUrl, // 分享图标分享图标
                success: function() {
                  // 用户确认分享后执行的回调函数
                  that.maskHide();
                },
                cancel: function() {
                  // 用户取消分享后执行的回调函数
                }
              });
            });
            wx.error(function(res){//通过error接口处理失败验证
              // config信息验证失败会执行error函数
            });
          }else {

          }
        })
      },
      maskHide(){
        this.isShareMask= false;
      },
      shareMask(){
        this.isShareMask = true;
        // this.stop();
      },
      isLoad(){
        let that = this;
        let mydata = {'orderId':that.orderid} ;
        //let mydata = {'groupNo':'PTf7480b2f57c94b6cb4386bf207aac32e'} ;
        if(that.orderid!=undefined){
          reload(mydata).then(res => {
            if (res.data.result == 'true') {
              console.log('111111111111111111111111'+res.data.result)
              let mydata2 = {'orderId':that.orderid} ;
              reload(mydata2).then(res => {
                if (res.data.result == 'false') {
                  window.location.href = window.location.href;
                  window.location.reload()
                }
              });
            }
          });
        }
        //判断是否有创建的唯一标识符，如果有就是从 解锁页面过来的
        if(that.useid!=undefined){
          let params ='id='+that.useid+'&three='+'';
          isused(params).then(res => {
            let resData = res.data;
            if(resData.statusCode == 200){
              let params ='id='+this.useid+'&three='+'three';
              isused(params).then(res => {
                window.location.reload();
              })
            }
          })
        }

      },
      viewOrder(){
        window.location.href="http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/course";
      },
    },
    created(){
      this.openid = this.$route.query.openid;
      this.groupNo = this.$route.query.groupNo;
      this.orderid = this.$route.query.orderid;
      this.useid = this.$route.query.useid;

      this.isLoad();
      this.initData();

      //初始化请启动倒计时
      // this.remain= Time.initTime(1536733716692,5);
      // if(this.remain !='结束') {
      //   this.time = Time.formattime(this.remain)
      // }
      //启动倒计时
      //this.countTime()
    }
  }
</script>

<style lang="less" scoped>
  .groupon_haoyou1{
    margin-bottom: 80px;
    .tishi{
      background: rgba(255,85,0,0.10);
      height:44px;
      line-height: 44px;
      font-size: 14px;
      color: #444444;
      img{
        width:28px;
        height:28px;
        border-radius: 14px;
        margin-left:22px;
      }
      span{
        margin-left:10px;
      }
    }
    .share_topic{
      /* width: 335px; */
      /* height: 200px; */
      background: #FFFFFF;
      -webkit-box-shadow: 0 4px 20px 0 #E8E8EB;
      box-shadow: 0 4px 20px 0 #E8E8EB;
      border-radius: 8px;
      /* margin: 20px auto 0; */
      margin: 20px;
      .topic{
        font-size: 20px;
        color: #FF5500;
        /*height:20px;*/
        line-height: 20px;
        text-align: center;
        /*top:100px;*/
        /*padding-top:59px;*/
        border-radius: 8px;
        img{
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
      }
      .desc{
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        /*text-align: center;*/
        padding: 15px;
      }
    }
    .count_down{
      /*margin: 20px;*/
      /*width: 375px;*/
      .remaining_time{
        font-size: 15px;
        color: #444444;
        text-align: center;
      }
      .time{
        height: 48px;
        width: 288px;
        margin: 15px auto 0;
        strong,em{
          width:30px;
          height:48px;
          line-height: 48px;
          background:#FF5500;
          border-radius: 3px;
          text-align: center;
          color:#FFFFFF;
          font-size:30px;
          font-weight: normal;
          margin-right:5px;
          display:block;
          float:left;
          font-style: normal;
        }
        cite{
          font-size: 13px;
          color: #333333;
          font-style: normal;
          height:48px;
          line-height: 48px;
          width:18px;
          display:block;
          float:left;
          margin-left:5px;
          margin-right:3px;

        }
      }
      .road{
        font-size: 14px;
        color: #FF5500;
        height:14px;
        line-height: 14px;
        text-align: center;
        margin:10px auto 20px;
      }
    }
    .invitation_friends{
      height:123px;
      background: #FFFFFF;
      box-shadow: 0 4px 20px 0 #E8E8EB;
      border-radius: 8px;
      margin:20px;
      p{
        font-size: 15px;
        color: #333333;
        text-align: center;
        padding-top:13px;
        em{
          color: #FF5500;
          font-style: normal;
        }
      }
      .myimages{
        width:240px;
        margin:0 auto;
        img{
          width:60px;
          height:60px;
          border-radius: 30px;
          margin-top:14px;
        }
        img:nth-child(2){
          margin-left:9.6%;
        }
        img:nth-child(3){
          margin-left:10.7%;
        }
        img:nth-child(4){
          margin-left:10.7%;
        }

      }

    }
    .groupon_pay{
      width: 100%;
      height: 50px;
      line-height: 50px;
      position: fixed;
      bottom: 0;
      border-top: 1px solid #C8C8C8;
      background: #FFFFFF;
      /* margin: auto; */
      /* left: 0; */
      /* right: 0; */
      .pay_box1{
        width:60%;
        float:left;
        p,span,em,strong{
          display:block;;
          float:left;
          font-style: normal;
          font-weight: normal;
        }
        p{
          margin-left:18px;
          font-size: 18px;
        }
        span{
          margin-left: 14px;
          color: #FF5500;
        }
        em{
          margin-left:10px;
          text-decoration: line-through;
          font-size: 12px;
          color: #9B9B9B;
        }
      }
      .pay_box2{
        width:40%;
        float:right;
        strong{
          width: 100%;
          height: 50px;
          background: #FF5500;
          color: #FFFFFF;
          font-size: 18px;
          text-align: center;
          display: block;
        }
      }


    }
    .share_weixin_friends{
      height:160px;
      margin:30px 20px;
      background: #FFFFFF;
      box-shadow: 0 4px 20px 0 #E8E8EB;
      border-radius: 8px;
      p{
        font-size: 15px;
        color: #333333;
        text-align: center;
        padding-top:13px;
        em{
          color: #FF5500;
          font-style: normal;
        }
      }
      .fenhaopengyou{
        width:196px;
        margin:0 auto;
        .wx_fr_box{
          width:60px;
          height:82px;
          float:left;
          margin-top:29px;
          img{
            width:60px;
            height:60px;
          }
          span{
            display: block;
            height:22px;
            width:60px;
            text-align: center;
            font-size: 12px;
            color: #444444;
            margin-top:5px;
          }
        }
        .wx_fr_box:nth-child(2){
          margin-left:66px;
        }
        .wx_fr_box:nth-child(3){
          margin-left:70px;
        }

      }

    }
    //蒙层
    .shareMask{
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      top: 0;
      left: 0;
      z-index: 999;
      .shareImg{
        width: 64px;
        height: 64px;
        margin-top: 64px;
        position: absolute;
        right: 30px;
        img{
          display: inline-block;
          width: 100%;
        }
      }
      .shareTip{
        font-size: 15px;
        color: #ffffff;
        font-family: PingFangSC-Regular;
        margin-top: 138px;
        text-align: center;
      }
    }
    .view_order{
      height:100px;
      font-size: 18px;
      text-align: center;
      margin:0 20px 50px 20px;
      span{
        color: #FFFFFF;
        border-radius: 25px;
        background: #FF5500;
        height:50px;
        line-height: 50px;
        display: block;
      }
    }
  }

</style>
