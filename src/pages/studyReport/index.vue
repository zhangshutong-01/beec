<template lang="html">
  <div class="report">
    <!--生成图片前-->
    <div class="report_before" v-show="isStudyReport">
      <!--<div class="reportImg" ref="reportImg">-->
      <!--没有学习记录-->
      <!--<div class="noReport" v-show="noReport">-->
      <!--<div class="report_heade">-->
      <!--<p class="imgWrap">-->
      <!--<img :src="studyInfor.userHeadImgUrl+'?'+new Date().getTime()" class="userImg" crossOrigin="anonymous"/>-->
      <!--</p>-->
      <!--<p class="userpickname">我家<span>{{studyInfor.babyName}}</span>今天啥也没学</p>-->
      <!--</div>-->
      <!--<div class="reportBtn">-->
      <!--</div>-->
      <!--</div>-->
      <!--有学习记录-->
      <!--<div class="haveReport" v-show="haveReport">-->
      <!--<div class="report_heade">-->
      <!--<p class="imgWrap">-->
      <!--&lt;!&ndash;<img src="../../assets/mine/photo.png" class="userImg"/>&ndash;&gt;-->
      <!--<img :src="studyInfor.userHeadImgUrl+'?'+new Date().getTime()" class="userImg" crossOrigin="anonymous"/>-->
      <!--</p>-->
      <!--<p class="userpickname">我家<span>{{studyInfor.babyName}}</span>今天学习了<span>{{studyInfor.keyWord}}</span></p>-->
      <!--</div>-->
      <!--<div class="report_img">-->
      <!--&lt;!&ndash;<img src="../../assets/mine/invitation.png"/>&ndash;&gt;-->
      <!--<img :src="studyInfor.imgUrlP+'?'+new Date().getTime()" crossOrigin="anonymous"/>-->
      <!--</div>-->
      <!--<div class="courseDes">-->
      <!--<p class="course">{{studyInfor.sectionDescribe}}</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="report_code">-->
      <!--<div class="report_qrCode">-->
      <!--<span></span>-->
      <!--<span></span>-->
      <!--<span></span>-->
      <!--<span></span>-->
      <!--<img src="../../assets/studyReport/qrcode1.png"/>-->
      <!--</div>-->
      <!--<div class="qrCodeCont">-->
      <!--<p class="qrtit">蜜蜂乐园</p>-->
      <!--<p class="qrcont">扫码进入公众号,点击左下角"思维课程"</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <div class="baogao" ref="reportImg">
        <div class="baogao_cont">
          <p class="userImgUrl">
            <img :src="studyInfor.userHeadImgUrl+'?'+new Date().getTime()" class="userImg" crossOrigin="anonymous" />
          </p>
          <div class="baogao_desc">
            <img :src="studyInfor.imgUrlM+'?'+new Date().getTime()" class="userImg" crossOrigin="anonymous" />
            <!--<img src="../../assets/studyReport/describe.png"/>-->
          </div>
          <div class="finsh">
            <img src="../../assets/studyReport/cp.png" />
          </div>
          <div class="kechengtu">
            <!--<img src="../../assets/studyReport/kejiantu.png"/>-->
            <img :src="studyInfor.imgUrlP+'?'+new Date().getTime()" class="userImg" crossOrigin="anonymous" />
          </div>
        </div>
      </div>
    </div>
    <!--生成图片后-->
    <div class="report_after" :style="{display: state.isDownloadImg ? 'block':'none'}">
      <img :src="state.imgUrl" id="saveImg" />
    </div>
    <!--分享按钮-->
    <div class="baogaoBtn">
      <p class="goBackBtn" @click="goBackBtn">
        <img src="../../assets/studyReport/gobackbtn.png" />
      </p>
      <p class="goShareBtn" @click="shareFriend">
        <img src="../../assets/studyReport/sharebtn.png" />
      </p>
    </div>
    <div class="empty2"></div>
    <!--提示-->
    <!--<div class="shareBtn" v-show="isShareTip">-->
    <!--长按图片识别二维码体验课程-->
    <!--</div>-->
    <!--分享按钮-->
    <!--<div class="btns" v-show="isShareBtnFriend">-->
    <!--&lt;!&ndash;<div class="saveReport">长按保存海报</div>&ndash;&gt;-->
    <!--<div class="shareFriend" @click="shareFriend">分享朋友圈领10g蜂蜜</div>-->
    <!--</div>-->
    <!--<div class="goStudy" @click="goStudy" v-show="isgostudy">去学习</div>-->
    <!--<div class="empty"></div>-->
    <!--蒙层-->
    <div class="honeyMask" v-show="isHoneyMask">
      <div class="teacherCode">
        <p class="getHoney">恭喜你获得<span>10g</span>蜂蜜</p>
        <div class="qrCode">
          <img src="../../assets/mine/qrcode.png" />
        </div>
        <div class="addTeacher">
          <p>长按二维码加老师为好友领取奖励</p>
        </div>
      </div>
      <div class="close" @click="close"></div>
    </div>
    <div class="shareMask" v-show="isShareMask" @click="maskHide()">
      <p class="shareImg">
        <img src="../../assets/mine/sharetip.png" />
      </p>
      <p class="shareTip">点击右上角分享好友或朋友圈</p>
      <p class="shareTip1">长按保存图片酷炫分享</p>
    </div>
  </div>
</template>
<script>
  import html2canvas from "html2canvas";
  import {
    Indicator,
    Toast
  } from 'mint-ui';
  import {
    toShare
  } from '@/api/mine';
  import {
    honeyAndMoneyInfo,
    newPoster
  } from '@/api/mine';
  import {
    share
  } from '@/api/wx'

  export default {
    name: 'studyReport',
    data() {
      return {
        isgostudy: false,
        isShareMask: false,
        isShareBtnFriend: false, //是否显示分享朋友圈按钮
        isShareTip: false, //分享进来的页面是否显示提示
        noReport: false,
        haveReport: false,
        isStudyReport: true, //学习报告生成之前
        isHoneyMask: false,
        state: {
          isDownloadImg: false,
          imgUrl: ''
        },
        reportData: {}, //没有学习记录数据
        studyInfor: {}, //海报数据或者没有学习记录数据
        openid: '',
        isShare: 0, //0不是从分享页进来，1是从分享页面进来的。分享url上字段判断是否是分享进来的
        useid: '',
      }
    },
    created() {
      this.useid = this.$route.query.refresh;
      this.isShare = this.$route.query.isShare;
      // console.log(this.isShare);
      if (this.isShare == 1) {
        this.openid = this.$route.query.inviterId;
        // this.isShareTip = true;
        this.isShareBtnFriend = false;
        this.studyData();
      } else {
        this.openid = this.$route.query.openid;
        this.isShareBtnFriend = true;
        // this.isShareTip = false;
        this.studyData();
      }
      // console.log(this.isShare);
      // this.reportData = Object.assign({}, this.$route.query) || '';
      // // console.log(this.reportData);
    },
    mounted() {
      this.wxshare();
      this.changeStatus();
    },
    methods: {
      changeStatus() {
        let params = 'id=' + this.useid + '&three=' + '';
        Indicator.open();
        // isused(params).then(res => {
        //   let resData = res.data;
        //   Indicator.close();
        //   if (resData.statusCode == 200) {
        //     // console.log(resData.result);
        //     let params = 'id=' + this.useid + '&three=' + 'three';
        //     Indicator.open();
        //     isused(params).then(res => {
        //       window.location.reload();
        //     })
        //   } else {
        //     Indicator.close();
        //     Toast(resData.message);
        //   }
        // })
      },
      jump() {
        this.$router.push({
          name: 'mine',
          query: {
            openid: this.openid
          }
        })
      },
      studyData() {
        console.log(this.openid);
        let params = {
          openId: this.openid
        };
        Indicator.open();
        newPoster(params).then(res => {
          let resData = res.data;
          Indicator.close();
          if (resData.statusCode == 200) {
            this.studyInfor = resData.result;
            this.studyInfor.studyStatus = 1; //1有学习记录
            this.noReport = false;
            this.isgostudy = false;
            this.haveReport = true;
            this.screenshots();
          } else if (resData.statusCode == 1001) {
            this.studyInfor = resData.result;
            this.studyInfor.studyStatus = 0; //0没有学习记录
            this.isShareBtnFriend = false;
            this.noReport = true;
            this.isgostudy = true;
            this.haveReport = false;

          } else {
            Indicator.close();
            // Toast(resData.message);
          }
        })
      },
      // saveReport(){
      //   Toast('长按保存海报');
      // },
      goBackBtn() {
        this.$router.push({
          path: '/course',
          query: {
            openid: this.$route.query.openid,
            flag: this.$route.query.flag
          }
        })
      },
      shareFriend() {
        this.isShareMask = true;
      },
      maskHide() {
        this.isShareMask = false;
      },
      close() {
        this.isHoneyMask = false;
      },
      goStudy() {
        this.$router.push({
          name: 'course',
          query: {
            openid: this.openid
          }
        })
        // this.$router.go(-1)
      },
      screenshots() { //生成图片；
        let b64;
        html2canvas(this.$refs.reportImg, {
          useCORS: true
        }).then(canvas => {
          try {
            b64 = canvas.toDataURL("image/png");
            // console.log(b64);
          } catch (err) {
            console.log(err)
            // alert(err)
          }
          this.state = {
            imgUrl: b64,
            isDownloadImg: true,
          };
          this.isStudyReport = false;
        });
      },
      share() { //用户分享海报成功之后调用一次，记录今日是否分享
        console.log('调取后台接口统计今天是否分享过');
        let params = {
          openId: this.openid,
          courseId: this.studyInfor.courseId,
          honeyNums: 10,
        };
        Indicator.open();
        toShare(params).then(res => {
          // console.log(res);
          let resData = res.data;
          Indicator.close();
          if (resData.statusCode == 200) {
            Toast(resData.message);
          } else {
            Indicator.close();
            // Toast(resData.message);
          }
        })
      },
      wxshare() {
        let me = this;
        //wx是引入的微信sdk
        // wx.config('这里有一些参数');//通过config接口注入权限验证配置
        let mydata = {
          'url': window.location.href
        };
        share(mydata).then(res => {
          // console.log(res)
          if (res.data.statusCode == '200') {
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.result.appId, // 必填，公众号的唯一标识
              timestamp: res.data.result.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.result.noncestr, // 必填，生成签名的随机串
              signature: res.data.result.signature, // 必填，调用js签名，
              jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseImage', 'hideMenuItems'] // 必填，需要使用的JS接口列表，这里只写支付的
            });
            wx.ready(function () { //通过ready接口处理成功验证
              // config信息验证成功后会执行ready方法
              let mytitle = '孩子明年上小学啦，送ta一套蜜蜂乐园思维，爱上思考，变聪明！';
              let mydesc = '蜜蜂乐园';
              let mylink =
                'http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/studyReport?inviterId=' +
                me.openid + '%26isShare=1'; //分享到首页
              let myimgUrl = 'http://thyrsi.com/t6/665/1548835210x2728279033.png';
              wx.hideMenuItems({
                menuList: [
                  'menuItem:copyUrl'
                ]
              });
              // wx.updateAppMessageShareData({
              //   title: mytitle, // 分享标题
              //   desc: mydesc, // 分享描述
              //   link: mylink, // 分享链接
              //   imgUrl: myimgUrl, // 分享图标
              // }, function(res) {
              //   console.log(res);
              //   console.log(res.errMsg);
              //   alert(11111);
              //     //这里是回调函数
              // });
              wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
                title: mytitle, // 分享标题
                desc: mydesc, // 分享描述
                link: mylink, // 分享链接
                imgUrl: myimgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function (res) {
                  // 用户确认分享后执行的回调函数
                  // alert(res.errMsg);
                  // if(res.errMsg.sendAppMessage == 'ok'){
                  me.share();
                  me.isShareMask = false;
                  me.$router.push({
                    name: 'mine',
                    query: {
                      openid: me.openid
                    }
                  });
                  // }else{
                  //   Toast('取消分享')
                  // }
                },
                fail: function (res) {
                  alert('分享失败');
                },
                cancel: function (res) {
                  // 用户取消分享后执行的回调函数
                  alert('取消操作失败');
                }
              });
              wx.onMenuShareTimeline({ //分享朋友圈
                title: mytitle, // 分享标题
                link: mylink, // 分享链接
                imgUrl: myimgUrl, // 分享图标分享图标
                success: function (res) {
                  // 用户确认分享后执行的回调函数
                  // alert(res.errMsg+'--------');
                  // if(res.errMsg.shareTimeline == 'ok'){
                  me.share();
                  me.isShareMask = false;
                  me.$router.push({
                    name: 'mine',
                    query: {
                      openid: me.openid
                    }
                  });
                  // }else{
                  //   Toast('取消分享');
                  // }
                },
                fail: function (res) {
                  alert('分享失败');
                },
                cancel: function (res) {
                  // 用户取消分享后执行的回调函数
                  alert('取消操作失败');
                }
              });
              // wx.updateTimelineShareData({
              //   title: mytitle, // 分享标题
              //   link: mylink, // 分享链接
              //   imgUrl: myimgUrl, // 分享图标
              // }, function(res) {
              //     //这里是回调函数
              //   console.log(res);
              //   console.log(res.errMsg);
              //   alert(22222);
              // });
            });
            wx.error(function (res) { //通过error接口处理失败验证
              // config信息验证失败会执行error函数
            });
          } else {

          }
        })
      },
    },
  }

</script>

<style lang="less" scoped>
  .report {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #000000;

    .shareBtn {
      width: 100%;
      height: 50px;
      background: #FF5500;
      color: #ffffff;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      text-align: center;
      line-height: 50px;
      position: fixed;
      bottom: 0;
    }

    .btns {
      width: 95%;
      margin: 0 auto;
      /*display: -webkit-box;  !* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. *!*/
      /*display: -moz-box;     !* 老版本语法: Firefox (buggy) *!*/
      /*display: -ms-flexbox;  !* 混合版本语法: IE 10 *!*/
      /*display: -webkit-flex; !* 新版本语法: Chrome 21+ *!*/
      /*display: flex;*/
      height: 50px;
      color: #ffffff;
      text-align: center;
      line-height: 50px;
      font-family: PingFangSC-Regular;
      font-size: 18px;

      .saveReport {
        color: #ffffff;
        width: 125px;
        background: #FF5500;
        opacity: 0.7;
        border-radius: 25px;
      }

      .shareFriend {
        /*width: 215px;*/
        width: 90%;
        margin: 0 auto;
        background: #FF5500;
        border-radius: 25px;
        margin-left: 15px;
      }
    }

    .empty {
      height: 30px;
    }

    .shareMask {
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      top: 0;
      left: 0;
      z-index: 999;
    }

    .shareTip {
      font-size: 15px;
      color: #ffffff;
      font-family: PingFangSC-Regular;
      margin-top: 138px;
      text-align: center;
    }

    .shareTip1 {
      font-size: 18px;
      color: #ffffff;
      font-family: PingFangSC-Regular;
      margin-top: 30px;
      text-align: center;
    }

    .shareImg {
      width: 64px;
      height: 64px;
      margin-top: 64px;
      position: absolute;
      right: 30px;

      img {
        display: inline-block;
        width: 100%;
      }
    }

    .reportImg {
      width: 331px;
      margin: 0 auto;
      box-shadow: 0 4px 20px 0 #E8E8EB;
      border-radius: 8px;
      /*margin-top:20px;*/
      overflow: hidden;

      .report_heade {
        height: 72px;
        display: flex;
        align-items: center;
        padding: 0 15px;

        p {
          display: inline-block;
        }

        .imgWrap {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          box-shadow: 0 2px 10px 0 #E1E1E1;

          .userImg {
            display: inline-block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            margin: 0 auto;
          }
        }

        .userpickname {
          flex: 1;
          padding-left: 13px;
          font-size: 13px;
          font-family: PingFangSC-Regular;
          color: #444444;
        }
      }

      .report_img {
        height: 331px;

        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }

      .reportBtn {
        overflow: hidden;
        height: 331px;
        background: url("../../assets/mine/noreportBg.png") no-repeat center;
        background-size: 100% 100%;
      }

      .courseDes {
        height: 56px;
        border-bottom: 1px #C8C8C8 dashed;
        padding: 0 15px;
        padding-top: 10px;
        line-height: 20px;

        .course {
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #000000;
        }
      }

      .report_code {
        padding: 15px;
        display: flex;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 10%;

        .report_qrCode {
          position: relative;
          width: 85px;
          height: 85px;

          img {
            display: inline-block;
            width: 100%;
            height: 100%;
            margin: 0 auto;
          }

          span:nth-child(1) {
            position: absolute;
            left: -5px;
            top: -5px;
            padding: 5px;
            border-style: solid;
            border-color: #FF5500;
            border-width: 2px 0 0 2px;
          }

          span:nth-child(2) {
            position: absolute;
            right: -5px;
            top: -5px;
            padding: 5px;
            border-style: solid;
            border-color: #FF5500;
            border-width: 2px 2px 0 0;
          }

          span:nth-child(3) {
            position: absolute;
            right: -5px;
            bottom: -5px;
            padding: 5px;
            border-style: solid;
            border-color: #FF5500;
            border-width: 0 2px 2px 0;
          }

          span:nth-child(4) {
            position: absolute;
            left: -5px;
            bottom: -5px;
            padding: 5px;
            border-style: solid;
            border-color: #FF5500;
            border-width: 0 0 2px 2px;
          }
        }

        .qrCodeCont {
          flex: 1;
          margin-left: 30px;

          .qrtit {
            font-size: 22px;
            color: #333333;
            font-family: PingFangSC-Medium;
            line-height: 35px;
          }

          .qrcont {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            opacity: 0.8;
          }
        }
      }
    }
  }

  .goStudy {
    /*width:141px;*/
    width: 90%;
    height: 43.5px;
    background: #FF5500;
    margin: 0 auto;
    text-align: center;
    line-height: 43.5px;
    border-radius: 100px;
    color: #ffffff;
    font-size: 20px;
    font-family: PingFangSC-Medium;
    /*margin-top: 256px;*/
  }

  .report_before {
    background: #000000;
    /*margin-bottom: 30px;*/
  }

  .report_after {
    /*width:331px;*/
    width: 100%;
    margin: 0 auto;

    /*margin-top: 20px;*/
    /*margin-bottom:50px;*/
    img {
      display: block;
      width: 100%;
    }
  }

  /*蒙层*/
  .honeyMask {
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
    height: 335px;
    border-radius: 12px;
    background: #ffffff;
    background: url("../../assets/mine/teacherbg.png") no-repeat center;
    background-size: 100% 100%;
    margin: 0 auto;
    margin-top: 100px;
    overflow: hidden;
  }

  .qrCode {
    width: 176px;
    height: 176px;
    margin: 0 auto;

    /*margin-bottom: 90px;*/
    img {
      display: inline-block;
      width: 100%;
    }
  }

  .getHoney {
    font-size: 15px;
    line-height: 15px;
    font-family: PingFangSC-Regular;
    color: #333333;
    margin: 20px 0;
    text-align: center;

    span {
      color: #FF5500;
    }
  }

  .addTeacher {
    position: relative;
    top: 45px;

    p {
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #FF5500;
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

  .baogao {
    width: 100%;
    position: relative;
    /*border: 1px solid;*/
    background: rgba(0, 0, 0, 0.8) url("../../assets/studyReport/studyBg3.png") no-repeat;
    background-size: 100% 100%;
    height: 100%;
    min-height: 605px;

    .baogao_cont {
      width: 100%;
      margin: 0 auto;
      /*margin-top: 241px;*/
      position: relative;
      overflow: hidden;

      .userImgUrl {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        /*margin-left: 120px;*/
        /*margin-top: 241px;*/
        margin-top: 190px;
        margin-left: 31%;

        img {
          display: block;
          width: 100%;
          border-radius: 50%;
          /*margin-top: 4px;*/
        }
      }

      .baogao_desc {
        /*width: 237px;*/
        width: 67%;
        height: 99.5px;
        /*margin-left: 71.5px;*/
        margin-top: 17px;
        margin-left: 17%;

        img {
          display: block;
          width: 100%;
          height: 100%;
          margin: 0 auto;
        }
      }

      .finsh {
        width: 133.5px;
        height: 133.5px;
        border-radius: 50%;
        position: absolute;
        /*left:227px;*/
        top: 305px;
        left: 63%;

        img {
          display: block;
          width: 100%;
          margin: 0 auto;
          border-radius: 50%;
        }
      }

      .kechengtu {
        /*width:277px;*/
        width: 75%;
        height: 168px;
        /*margin-left: 50px;*/
        margin-top: 34px;
        margin-left: 13%;

        img {
          display: block;
          width: 100%;
          height: 100%;
          margin: 0 auto;
        }
      }
    }
  }

  .baogaoBtn {
    background: #000000;
    /*padding-bottom: 10px;*/
    display: -webkit-box;
    /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box;
    /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox;
    /* 混合版本语法: IE 10 */
    display: -webkit-flex;
    /* 新版本语法: Chrome 21+ */
    display: flex;
    justify-content: center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    -o-justify-content: center;

    .goBackBtn {
      width: 125.5px;

      /*margin-left: 52.5px;*/
      img {
        display: block;
        width: 100%;
        margin: 0 auto;
      }
    }

    .goShareBtn {
      display: inline-block;
      width: 125.5px;
      margin-left: 20px;

      img {
        display: block;
        width: 100%;
        margin: 0 auto;
      }
    }
  }

  .empty2 {
    display: block;
    height: 20px;
    background: #000000;
  }

</style>
