<template lang="html">
  <div class="invitation_newUser">
    <div class="banner">
      <img src="../../assets/mine/invitationbanner.jpg"/>
      <p class="tip">
        <span>每成功邀请1名新用户，你与新用户各得10蜜豆</span>
      </p>
    </div>
    <!--<a href="#" class="check">-->
    <div class="beeCheck">
      <p>您已累积到{{honeyTotal}}蜜豆</p>
      <!--<p>您已累积到{{honeyTotal}}g蜜豆，{{moneyTotal}}元现金券</p>-->
      <p class="look" @click="look">查看>></p>
    </div>
    <!--</a>-->
    <div class="success_record" v-show="succe">
      <div class="container">
        <p class="title">成功邀请记录</p>
      </div>
      <div class="menu">
        <div class="me_order" v-for="item in inviteData">
          <p class='suc_icon'>
            <!--<img src="../../assets/mine/circle.png"/>-->
            <img :src="item.userHeadImgUrl"/>
          </p>
          <p class="orderName">{{item.nickName}}</p>
          <p class='orderArrow'>{{item.createTimeL | changeTime}}</p>
        </div>
        <!--<div class="me_order">-->
          <!--<p class='suc_icon'></p>-->
          <!--<p class="orderName">流浪</p>-->
          <!--<p class='orderArrow'>2018.08.26</p>-->
        <!--</div>-->
      </div>
    </div>
    <div class="fail_record" v-show="fail">
      <p class="no_record">暂无邀请记录</p>
    </div>
    <div class="rule">
      <div class="ruleTop">
        <p class="ruleTitle">邀请新用户得蜜豆规则</p>
        <p class="circleBg"></p>
      </div>
      <div class="ruleContent">
        <div>
          <p class="tipNum">1、</p>
          <p>新用户点击邀请链接进入课程页面后，完成第一节即为邀请成功；</p>
        </div>
        <div>
          <p class="tipNum">2、</p>
          <p>每成功邀请一名新用户，您与新用户各获得10蜜豆；</p>
        </div>
        <div>
          <p class="tipNum">3、</p>
          <p>当天内邀请新用户得蜜豆的上限为100蜜豆；</p>
        </div>
        <div>
          <p class="tipNum">4、</p>
          <p>最终解释权归北京天赋通教育科技有限公司所有。</p>
        </div>
      </div>
      <div class="invitationBtn"  @click="shareMask">
        立即邀请
      </div>
      <div class="empty"></div>
    </div>
    <div class="shareMask" v-show="isShareMask" @click="maskHide()">
      <p class="shareImg">
        <img src="../../assets/mine/sharetip.png"/>
      </p>
      <p class="shareTip">点击右上角分享好友或朋友圈</p>
    </div>
  </div>
</template>
<script>
  import { Indicator, Toast} from 'mint-ui';
  import { inviteRecord,isused} from '@/api/mine';
  import { authorize, share } from '@/api/wx'

  export default {
    name: 'invitation_newUser',
    data() {
      return {
        isShareMask: false,
        honeyTotal: '',
        moneyTotal: '',
        inviteData:[],
        openid:'',
        succe:false,
        fail:false,
        useid:'',
        refresh:''
      }
    },
    mounted(){
      this.wxshare();
      this.initData();
      this.inviteInfor();
    },
    created(){
      this.useid = this.$route.query.refresh;
      // console.log(this.useid);
      this.changeStatus();
    },
    filters:{
      changeTime(date){
        let time= date.replace(/-/g,".").substring(0,11);
        return time;
      }
    },
    methods:{
      changeStatus(){
        let params ='id='+this.useid+'&three='+'';
        Indicator.open();
        isused(params).then(res => {
          let resData = res.data;
          Indicator.close();
          if(resData.statusCode == 200){
            // console.log(resData.result);
            let params ='id='+this.useid+'&three='+'three';
            Indicator.open();
            isused(params).then(res => {
              window.location.reload();
            })
          }else {
            Indicator.close();
            Toast(resData.message);
          }
        })
      },
      initData(){
        this.honeyTotal = this.$route.query.honey;
        this.moneyTotal = this.$route.query.money;
        this.openid = this.$route.query.openid;
      },
      inviteInfor(){
        let params = {
          openId: this.openid,
        };
        Indicator.open();
        inviteRecord(params).then(res => {
          // console.log(res);
          let resData = res.data;
          Indicator.close();
          if(resData.statusCode == 200){
            if(resData.result == ''){
              this.fail = true;
              this.succe = false;
            }else {
              this.inviteData = resData.result;
              // console.log(this.inviteData);
              this.fail = false;
              this.succe = true;
            }
          }else {
            Indicator.close();
            Toast(resData.message);
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
      look(){
        this.$router.push({
          name:'mine',
          query:{
            openid:this.openid
          }
        })
      },
      maskHide(){
        this.isShareMask= false;
        this.move();
      },
      shareMask(){
        this.isShareMask = true;
        this.stop();
      },
      wxshare(){
        let me = this;
        //wx是引入的微信sdk
        // wx.config('这里有一些参数');//通过config接口注入权限验证配置
        let mydata = {'url':window.location.href};
        share(mydata).then(res => {
          // console.log(res)
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
              let mytitle='孩子明年上小学啦，送ta一套蜜蜂数学思维，爱上思考，变聪明！';
              let mydesc='蜜蜂数学';
              // let mylink ='https://wangxiaonewbucket4.oss-cn-beijing.aliyuncs.com/bee-math/course/01-%E5%B0%8F%E8%9C%9C%E8%9C%82%E7%BE%8E%E9%A3%9F%E8%AE%B0.png'
              let mylink='http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/course?inviterId='+me.openid;//分享到首页
              let myimgUrl='http://test-yunying.coolmath.cn/beec/share.png';
              // let myimgUrl ='https://wangxiaonewbucket4.oss-cn-beijing.aliyuncs.com/bee-math/course/01-%E5%B0%8F%E8%9C%9C%E8%9C%82%E7%BE%8E%E9%A3%9F%E8%AE%B0.png'

              wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
                title: mytitle, // 分享标题
                desc: mydesc, // 分享描述
                link: mylink, // 分享链接
                imgUrl: myimgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                  // 用户确认分享后执行的回调函数
                  // alert('分享成功');
                  me.maskHide();
                },
                fail:function(){
                  alert('分享失败');
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
                  // alert('分享成功');
                  me.maskHide();
                },
                fail:function(){
                  alert('分享失败');
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
    },
  }
</script>
<style lang="less" scoped>
  @import "index.less";
</style>
