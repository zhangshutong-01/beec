<template lang="html">
  <div class="groupon_haoyou1">
    <v-loading v-if="load"></v-loading>
    <v-footer></v-footer>
    <div class="groupon2_haoyou1">
      <div class="count2_down" v-if='groupState'>
        <div class="count2_down_top">
          <p class="touxiang_left">
            <img :src="faqiUser.userHeadImgUrl" />
          </p>
          <div class="miaoshu_right">
            <p class="miaoshu_right_one">{{faqiUser.nickName}}</p>
            <p class="miaoshu_right_two">我发现一个超棒的课程！推荐给你~</p>
          </div>
        </div>
        <div class="bottom">
          <img :src="courseData.imgUrlA" alt="">
          <div>
            <h1>{{courseData.courseName}}</h1>
            <p>{{payType==1?"3人团":"直购"}}/￥{{payType==1?courseData.groupPrice:courseData.originalPrice}}</p>
            <div>
              {{courseData.groupDescribe}}
            </div>
          </div>
        </div>
      </div>
      <div class="count_down" v-if="payType==1||payType==3">
        <div class="group2_count_down" v-if="!success">
          <div class="remaining_time">还差<span class="shengyuhaoyou">{{remainNumber}}</span>人拼团成功</div>
          <div class="shengyu">
            <div class="shengyutime">剩余时间</div>
            <div class="time">
              <p class="hour">{{hour}}</p>
              <p class="maohao">:</p>
              <p class="hour">{{minute}}</p>
              <p class="maohao">:</p>
              <p class="hour">{{second}}</p>
            </div>
          </div>
        </div>
        <div class="invitation_friends">
          <div class="myimages" v-if="users.length>0">
            <img v-for="item in users" :src="item.userHeadImgUrl" class="user_img user2_img" />
            <span class="user2_tip">团长</span>
            <!-- <span v-for="item in users">{{item.nickName}}</span> -->
            <img v-if="users.length < 2" class="add_user" src="../../assets/groupon/nosuccessicon.png" />
            <img v-if="users.length < 3" class="add_user" src="../../assets/groupon/nosuccessicon.png" />
          </div>
        </div>
        <div class="group2_inviteBtn" v-if="!groupState&&!success" @click="maskshow">邀请好友</div>
        <div class="group2_inviteBtn" v-if="groupState&&!success" @click="groupPay">一键参团</div>
        <div class="successGroup" v-if="success">
          <div class="successTip">
            <p v-if="!mySuccess&&timeOut">该团已拼课成功！自己开团试试吧~</p>
            <p v-if="mySuccess&&timeOut">您已拼团成功，可以去上课啦</p>
            <p v-if="!mySuccess&&!timeOut">该团已超时，请重新购买</p>
          </div>
          <div class="buyBtn" v-if="!mySuccess||!timeOut">
            <div class="ninemoney" @click="paynet('199')">
              <p class="oldprice"><span>¥{{courseData.originalPrice}}</span></p>
              <p class="onlybuy">单独购买</p>
            </div>
            <div class="threemoney" @click="paynet('99')">
              <p class="pintuan">¥{{courseData.groupPrice}}</p>
              <p class="group">一键成团（3人团）</p>
            </div>
          </div>
          <div class="buyBtn" v-if="mySuccess">
            <div class="goCourse" @click="goCourse">
              去上课
            </div>
          </div>
        </div>
      </div>
      <div class="count_down" v-if="payType==2">
        <div class="invitation_friends">
          <div class="myimages">
            <img :src="onePeo.userHeadImgUrl" class="user_img user2_img active">
            <span class="user2_tip tipactive">直购</span>
          </div>
        </div>
        <div class="successGroup">
          <div class="buyBtn" v-if="!oneshop">
            <div class="ninemoney" @click="paynet('199')">
              <p class="oldprice"><span>¥{{courseData.originalPrice}}</span></p>
              <p class="onlybuy">单独购买</p>
            </div>
            <div class="threemoney" @click="paynet('99')">
              <p class="pintuan">¥{{courseData.groupPrice}}</p>
              <p class="group">一键成团（3人团）</p>
            </div>
          </div>
          <div class="buyBtn" v-if="oneshop">
            <div class="goCourse" @click="goCourse">
              去上课
            </div>
          </div>
        </div>
      </div>
      <div class="shareMask" v-show="isShareMask" @click="maskHide">
        <p class="shareImg">
          <img src="../../assets/mine/sharetip.png" />
        </p>
        <p class="shareTip">点击右上角分享好友或朋友圈</p>
      </div>
      <!-- <div class="actionMask" v-show="actionMask" @click="actionMaskHide">
        <p class="action_one">关注“<span>蜜蜂乐园</span>”才能正常</p>
        <p>上课，掌握实时拼团进度</p>
        <img src="../../assets/erweima.png" />
        <p class="changan">长按二维码识别关注</p>
      </div> -->
    </div>
    <div class="coursedetails" style="width:100%;margin:0 auto;margin-top:20px;">

      <div class="courseInfo">
        <div class="banner">
          <mt-swipe :auto="2000">
            <mt-swipe-item>
              <img src="../../assets/courseinfo/banner/1.png">
            </mt-swipe-item>
            <mt-swipe-item>
              <img src="../../assets/courseinfo/banner/2.png">
            </mt-swipe-item>
            <mt-swipe-item>
              <img src="../../assets/courseinfo/banner/3.png">
            </mt-swipe-item>
            <mt-swipe-item>
              <img src="../../assets/courseinfo/banner/4.png">
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="courserDesc">
          <div class="desc_top">
            <p>¥{{courseData.groupPrice}}</p>
            <div class="desc_line">
              <span>{{courseData.courseTote}}节课</span>
              <span class="line"></span>
              <span>{{courseData.courseDescribe | changeAge}}岁</span>
              <span class="line"></span>
              <span class="lastChild">买完即学</span>
            </div>
          </div>
          <div class="desc_bot">
            <p class="head_img">
              <img src="../../assets/course/head.png" />
            </p>
            <p>等{{courseData.perNumber}}人已参加</p>
          </div>
        </div>
        <div class="information">
          <div class="tabcContent">
            <div class="headerCont tabHeader">
              <ul>
                <li :class="mynum==1?'active':''" @click="courseInfor(1)"><span>课程详情</span></li>
                <li :class="mynum==2?'active':''" @click="courseInfor(2)"><span>产品展示</span></li>
                <li :class="mynum==3?'active':''" @click="courseInfor(3)"><span>购买须知</span></li>
              </ul>
            </div>
            <div>
              <div class="tabDetails_eight">
                <img src="../../assets/courseinfo/11.png" alt="">
                <img src="../../assets/courseinfo/22.png" class="img22" alt="">
              </div>
              <div class="tabDetails_nine">
                <h1>【课程动画视频】</h1>
                <video src="https://wangxiaonewbucket4.oss-cn-beijing.aliyuncs.com/bee-math/MV/eb16152d291c5e1a4c83a3e426f6d94d.mp4"
                  controls></video>
              </div>
              <div class="tabDetails_ten">
                <img src="../../assets/courseinfo/2 2.png" alt="">
                <img src="../../assets/courseinfo/33.png" alt="">

                <div class="classDetail">
                  <img src="../../assets/courseinfo/77.png" class="img18">
                </div>
              </div>
            </div>
          </div>
          <img src="../../assets/course/18.png" class="img18" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Time from '@/utils/time';
  import Loading from '@/components/_loading.vue';
  import Teacher from '@/components/_teacher.vue';
  import {
    Indicator,
    Toast
  } from 'mint-ui';
  import {
    queryGroupDetails
  } from '@/api/groupon'
  import {
    share,
  } from '@/api/wx'
  import {
    createOrderInfo,
    checkConcerned
  } from '@/api/pay'
  import {
    queryCourseById
  } from '@/api/course'
  import {
    queryUserInfo
  } from '@/api/honey'
  import {
    checkTradingstate
  } from '@/api/course'
  export default {
    data() {
      return {
        openid: '',
        sourceId: '',
        invited: '',
        hour: '',
        minute: '',
        second: '',
        groupDetail: [],
        users: [],
        remainNumber: '', //成团所差人数
        courseid: this.$route.query.courseid,
        courseData: {},
        isShareMask: false,
        mynum: 1,
        randomNum: parseInt(Math.random() * 10) + 15,
        faqiUser: [],
        list: [],
        gogroup: false,
        groupState: false,
        hasBuyId: [],
        success: false,
        mySuccess: false,
        payType: '',
        onePeo: {},
        oneshop: null,
        load: true,
        timeOut: true
      }
    },
    components: {
      "v-loading": Loading,
      "v-teacher": Teacher
    },
    filters: {
      changeAge(data) {
        if (data) {
          let babyage = data.substring(2, 5);
          return babyage;
        }
      },
    },
    mounted() {
      setTimeout(() => {
        this.load = false
      }, 1000);
    },
    methods: {
      courseInfor(num) {
        this.mynum = num
        if (num === 1) {
          var h = $('.tabcContent').offset().top - 50;
          $("html, body").animate({
            scrollTop: h
          }, 500)
        } else if (num === 2) {
          var h = $('.tabDetails_nine').offset().top - 100;
          $("html, body").animate({
            scrollTop: h
          }, 500)
        } else if (num === 3) {
          var h = $('.img18').offset().top - 50;
          $("html, body").animate({
            scrollTop: h
          }, 500)
        }
      },
      goCourse() {
        this.$router.push({
          path: '/moneyDetail',
          query: {
            openid: this.$route.query.openid,
            courseid: this.$route.query.courseid,
            sourceId: this.sourceId,
            payType: this.payType
          }
        })
      },
      groupPay() {
        const parmas = {
          openId: this.openid,
          orderSource: 3,
          administrationId: this.groupDetail.administrationId,
          invitationId: this.invited,
          sourceId: this.sourceId
        }
        createOrderInfo(parmas).then(res => {
          console.log(res)
          if (res.data.statusCode === "200") {
            this.$router.push({
              path: '/pay',
              query: {
                orderNo: res.data.result.orderNo,
                courseid: this.$route.query.courseid,
                sourceId: this.sourceId,
                openid: this.openid,
                orderSource: res.data.result.orderSource
              }
            })
          }
        })
      },
      maskshow() {
        console.log(1111)
        this.isShareMask = true
      },
      maskHide() {
        this.isShareMask = false
      },
      getCourseDetail() {
        console.log(typeof this.courseid)
        const parmas = {
          id: this.courseid
        }
        queryCourseById(parmas).then(res => {
          console.log('1233333', res)
          this.courseData = res.data.result
        })
      },
      scrollChange() {
        //设置滑动距离
        $(window).scroll(function () {
          // console.log($(window).scrollTop());
          if ($(window).scrollTop() >= 700) {
            $(".headerCont").addClass("activeTabHeader");
          } else {
            $(".headerCont").removeClass("activeTabHeader");
          }
        });
      },
      wxshare() {
        let that = this;
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
              jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'hideMenuItems'] // 必填，需要使用的JS接口列表，这里只写支付的
            });
            wx.ready(function () { //通过ready接口处理成功验证
              // config信息验证成功后会执行ready方法
              // let mytitle= that.mycourse.courseName;
              let mytitle = '点击领取让孩子受用一生的数理思维课程';
              let mydesc = '9大生活场景让小朋友爱上数学';
              let mylink =
                'http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/tourbuy?sourceId=' +
                that.sourceId + '%26courseid=' + that.$route.query.courseid + '%26invited=' + that.openid +
                '%26payType=' + that.payType; //分享购买 团id
              let myimgUrl = 'http://thyrsi.com/t6/665/1548835210x2728279033.png';
              wx.hideMenuItems({
                menuList: [
                  'menuItem:copyUrl'
                ]
              });
              wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
                title: mytitle, // 分享标题
                desc: mydesc, // 分享描述
                link: mylink, // 分享链接
                imgUrl: myimgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  // 用户确认分享后执行的回调函数
                  that.maskHide();
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
                  that.maskHide();
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
      countDown(times) {
        var timer = null;
        var that = this
        timer = setInterval(() => {
          var day = 0,
            hour = 0,
            minute = 0,
            second = 0; //时间默认值
          if (times > 0) {
            day = Math.floor(times / (60 * 60 * 24));
            hour = Math.floor(times / (60 * 60)) - (day * 24);
            minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
          }
          if (day <= 9) day = '0' + day;
          if (hour <= 9) hour = '0' + hour;
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          times--;
          this.hour = hour
          this.minute = minute
          this.second = second
        }, 1000);
        if (times <= 0) {
          clearInterval(timer);
        } else if (times === 0) {
          window.location.reload()
        }
      },
      paynet(names) {
        if (names == "99") {
          let that = this;
          let mydata = {
            openId: this.openid,
            orderSource: 1,
            administrationId: this.courseData.administrationId,
            invitationId: this.$route.query.invited
          };
          createOrderInfo(mydata).then(res => {
            console.log(res)
            if (res.data.statusCode == "200") {
              that.$router.push({
                path: "/pay",
                query: {
                  openid: this.openid,
                  courseid: this.courseid,
                  sourceId: res.data.result.sourceId,
                  orderNo: res.data.result.orderNo,
                  orderSource: res.data.result.orderSource
                }
              });
            } else {
              alert(
                res.data.message
              );
            }
          });
        } else {
          console.log(123)
          let that = this;
          let mydata = {
            openId: this.openid,
            orderSource: 2,
            administrationId: this.courseData.administrationId,
            invitationId: this.$route.query.invited
          };
          console.log('2222222', mydata)
          createOrderInfo(mydata).then(res => {
            console.log('222', res)
            if (res.data.statusCode == "200") {
              this.$router.push({
                path: "/pay",
                query: {
                  openid: this.openid,
                  courseid: this.courseid,
                  orderid: res.data.result.id,
                  orderNo: res.data.result.orderNo,
                  orderSource: res.data.result.orderSource
                }
              });
            } else {
              alert(
                res.data.message
              );
            }
          });
        }
      },
    },
    created() {
      this.openid = this.$route.query.openid;
      this.sourceId = this.$route.query.sourceId;
      this.invited = this.$route.query.invited
      this.payType = this.$route.query.payType
      checkTradingstate({
        openId: this.openid,
        courseId: this.$route.query.courseid
      }).then(res => {
        console.log('是否成功', res)
        if (res.data.result.isPay === 1) {
          if (res.data.result.payType === 2) {
            this.groupState = false
            this.payType = res.data.result.payType
            this.sourceId = res.data.result.sourceId
            queryUserInfo({
              openId: this.openid
            }).then(res => {
              console.log(res)
              this.faqiUser = res.data.result
              this.onePeo = res.data.result
              this.oneshop = true
            })
          } else if (res.data.result.payType === 1 || res.data.result.payType === 3) {
            this.payType = 1
            this.success = true
            this.mySuccess = true
            this.sourceId = res.data.result.sourceId
            const parmas = {
              id: res.data.result.sourceId
            }
            queryGroupDetails(parmas).then(res => {
              console.log('123', res)
              this.groupDetail = res.data.result
              this.users = res.data.result.userList
            })
          }
        } else if (res.data.result.isPay === 2) {
          this.payType = 1
          this.groupState = false
          this.sourceId = res.data.result.sourceId
          const parmas = {
            id: res.data.result.sourceId
          }
          queryGroupDetails(parmas).then(res => {
            console.log(res)
            this.groupDetail = res.data.result
            this.users = res.data.result.userList
            this.remainNumber = 3 - this.users.length
            this.countDown(this.groupDetail.times)
            // this.faqiUser = this.users[0]
            if (this.groupDetail.groupStatus === 3) {
              console.log(123)
              this.timeOut = false
              this.mySuccess = false
              this.success = true
            } else if (this.groupDetail.groupStatus === 1) {
              this.users.forEach(element => {
                this.hasBuyId.push(element.openId)
              });
              if (this.hasBuyId.indexOf(this.$route.query.openid) >= 0) {
                this.mySuccess = true
                this.groupState = false
              } else {
                this.groupState = true
              }
              if (this.groupDetail.times === 0) {
                this.success = true
              }
            }
          })
        } else if (res.data.result.isPay === 3) {
          this.groupState = false
          this.openid = this.$route.query.openid
          this.sourceId = res.data.result.sourceId
          checkTradingstate({
            openId: this.invited,
            courseId: this.$route.query.courseid
          }).then(res => {
            this.payType = res.data.result.payType
            console.log('yaoqingrenxinxi', res)
            if (res.data.result.isPay === 3) {
              // this.openid=this.$route.query.openid
              const parmas = {
                id: this.$route.query.sourceId
              }
              queryGroupDetails(parmas).then(res => {
                console.log("weigoumai", res)
                if (res.data.result.groupStatus === 3) {
                  this.groupState = false
                  this.success = true
                  this.mySuccess = false
                  this.timeOut = false
                  this.payType = 1
                  this.faqiUser = res.data.result.userList[0]
                  this.onePeo = res.data.result.userList[0]
                  this.users = res.data.result.userList
                  this.sourceId = this.$route.query.sourceId
                } else {
                  this.groupState = true
                  this.payType = 1
                  this.faqiUser = res.data.result.userList[0]
                  this.onePeo = res.data.result.userList[0]
                  this.users = res.data.result.userList
                  this.sourceId = this.$route.query.sourceId
                  this.countDown(res.data.result.times)
                }

              })
            } else if (res.data.result.isPay === 4) {
              this.payType = res.data.result.payType
              if (res.data.result.payType == 3) {

                const parmas = {
                  id: res.data.result.sourceId
                }
                queryGroupDetails(parmas).then(res => {
                  console.log('时效信息111', res)
                  if (res.data.result.groupStatus === 3) {
                    this.success = true
                    this.users = res.data.result.userList
                    this.mySuccess = false
                    this.timeOut = false
                  } else {
                    this.success = true
                    this.users = res.data.result.userList
                    this.mySuccess = false
                    this.timeOut = false
                  }

                })
              } else {
                const parmas = {
                  id: res.data.result.sourceId
                }
                queryGroupDetails(parmas).then(res => {
                  console.log('时效信息', res)
                  this.success = true
                  this.users = res.data.result.userList
                  this.mySuccess = false
                  this.timeOut = false
                })
              }

            } else {
              if (res.data.result.payType === 1) {
                this.payType = res.data.result.payType
                this.sourceId = res.data.result.sourceId
                queryUserInfo({
                  openId: this.invited
                }).then(res => {
                  console.log(res)
                  this.faqiUser = res.data.result
                  this.onePeo = res.data.result
                  this.oneshop = true
                })
                const parmas = {
                  id: res.data.result.sourceId
                }
                queryGroupDetails(parmas).then(res => {
                  console.log(res)
                  this.groupDetail = res.data.result
                  this.users = res.data.result.userList
                  this.remainNumber = 3 - this.users.length
                  this.countDown(this.groupDetail.times)
                  if (this.groupDetail.groupStatus === 3) {
                    this.timeOut = false
                    this.mySuccess = false
                    this.success = true
                    this.groupState = false
                    this.sourceId = this.$route.query.sourceId
                    this.openid = this.$route.query.invited
                    console.log(this.openid)
                  } else if (this.groupDetail.groupStatus === 1) {
                    this.users.forEach(element => {
                      this.hasBuyId.push(element.openId)
                    });
                    if (this.hasBuyId.indexOf(this.$route.query.openid) >= 0) {
                      this.mySuccess = true
                      this.groupState = false
                    } else {
                      this.groupState = true
                    }
                    if (this.groupDetail.times === 0) {
                      this.success = true
                    }
                  } else {
                    this.success = true
                    this.mySuccess = false
                    this.timeOut = true
                    this.groupState = true
                  }
                })
              } else if (res.data.result.payType === 2) {
                this.groupState = true
                this.payType = res.data.result.payType
                queryUserInfo({
                  openId: this.invited
                }).then(res => {
                  console.log(res)
                  this.faqiUser = res.data.result
                  this.onePeo = res.data.result
                  this.oneshop = false
                })
              } else {
                this.payType = 1
                this.sourceId = res.data.result.sourceId
                queryUserInfo({
                  openId: this.invited
                }).then(res => {
                  console.log(res)
                  this.faqiUser = res.data.result
                  this.onePeo = res.data.result
                  this.oneshop = true
                })
                const parmas = {
                  id: res.data.result.sourceId
                }
                queryGroupDetails(parmas).then(res => {
                  console.log(res)
                  this.groupDetail = res.data.result
                  this.users = res.data.result.userList
                  this.remainNumber = 3 - this.users.length
                  this.countDown(this.groupDetail.times)
                  if (this.groupDetail.groupStatus === 3) {
                    this.timeOut = false
                    this.mySuccess = false
                    this.success = true
                    this.groupState = false
                    this.sourceId = this.$route.query.sourceId
                    this.openid = this.$route.query.invited
                    console.log(this.openid)
                  } else if (this.groupDetail.groupStatus === 1) {
                    this.users.forEach(element => {
                      this.hasBuyId.push(element.openId)
                    });
                    if (this.hasBuyId.indexOf(this.$route.query.openid) >= 0) {
                      this.mySuccess = true
                      this.groupState = false
                    } else {
                      this.groupState = true
                    }
                    if (this.groupDetail.times === 0) {
                      this.success = true
                    }
                  } else {
                    this.success = true
                    this.mySuccess = false
                    this.timeOut = true
                    this.groupState = true
                  }
                })
              }
            }
          })
        } else if (res.data.result.isPay === 4) {
          this.openid = this.$route.query.openid
          checkTradingstate({
            openId: this.invited,
            courseId: this.$route.query.courseid
          }).then(res => {
            console.log("yaoqngre", res)
            if (res.data.result.isPay === 1) {
              this.payType = res.data.result.payType
              this.groupState = true
              this.sourceId = res.data.result.sourceId
              if (this.payType === 2) {
                queryUserInfo({
                  openId: this.invited
                }).then(res => {
                  this.faqiUser = res.data.result
                  this.onePeo = res.data.result
                })
              } else {
                queryUserInfo({
                  openId: this.invited
                }).then(res => {
                  this.faqiUser = res.data.result
                  this.onePeo = res.data.result
                })
                const parmas = {
                  id: res.data.result.sourceId
                }
                queryGroupDetails(parmas).then(res => {
                  console.log(res)
                  this.groupDetail = res.data.result
                  this.users = res.data.result.userList
                  this.remainNumber = 3 - this.users.length
                  this.countDown(this.groupDetail.times)
                  // this.faqiUser = this.users[0]
                  if (this.groupDetail.groupStatus === 3) {
                    console.log(123)
                    this.timeOut = false
                    this.mySuccess = false
                    this.success = true
                  } else if (this.groupDetail.groupStatus === 1) {
                    this.users.forEach(element => {
                      this.hasBuyId.push(element.openId)
                    });
                    if (this.hasBuyId.indexOf(this.$route.query.openid) >= 0) {
                      this.mySuccess = true
                      this.groupState = false
                    } else {
                      this.groupState = true
                    }
                    if (this.groupDetail.times === 0) {
                      this.success = true
                    }
                  } else if (this.groupDetail.groupStatus === 2) {
                    this.success = true
                  }
                })
              }

            } else if (res.data.result.isPay === 2) {
              this.payType = 1
              this.groupState = false
              this.sourceId = res.data.result.sourceId
              queryUserInfo({
                openId: this.invited
              }).then(res => {
                this.faqiUser = res.data.result
                this.onePeo = res.data.result
              })
              const parmas = {
                id: res.data.result.sourceId
              }
              queryGroupDetails(parmas).then(res => {
                console.log(res)
                this.groupDetail = res.data.result
                this.users = res.data.result.userList
                this.remainNumber = 3 - this.users.length
                this.countDown(this.groupDetail.times)
                // this.faqiUser = this.users[0]
                if (this.groupDetail.groupStatus === 3) {
                  console.log(123)
                  this.timeOut = false
                  this.mySuccess = false
                  this.success = true
                } else if (this.groupDetail.groupStatus === 1) {
                  this.users.forEach(element => {
                    this.hasBuyId.push(element.openId)
                  });
                  if (this.hasBuyId.indexOf(this.$route.query.openid) >= 0) {
                    this.mySuccess = true
                    this.groupState = false
                  } else {
                    this.groupState = true
                  }
                  if (this.groupDetail.times === 0) {
                    this.success = true
                  }
                }
              })
            } else if (res.data.result.isPay === 3) {
              // this.openid=this.$route.query.openid
              const parmas = {
                id: this.$route.query.sourceId
              }
              queryGroupDetails(parmas).then(res => {
                console.log("weigoumai", res)
                this.groupState = true
                this.payType = 1
                this.faqiUser = res.data.result.userList[0]
                this.onePeo = res.data.result.userList[0]
                this.users = res.data.result.userList
                this.sourceId = this.$route.query.sourceId
                this.countDown(res.data.result.times)
              })
            } else if (res.data.result.isPay === 4) {
              const parmas = {
                id: res.data.result.sourceId
              }
              queryGroupDetails(parmas).then(res => {
                console.log('邀请人失效', res)
                this.mySuccess = false
                this.timeOut = false
                this.users = res.data.result.userList
                this.success = true
              })
            }
          })
        }
      })
      this.scrollChange()
      this.getCourseDetail()
      this.wxshare()
    }
  }

</script>

<style lang="less" scoped>
  .groupon_haoyou1 {
    font-size: .32rem;

    .tishi {
      background: rgba(255, 85, 0, 0.10);
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      color: #444444;

      img {
        width: 28px;
        height: 28px;
        border-radius: 14px;
        margin-left: 22px;
      }

      span {
        margin-left: 10px;
      }
    }

    .share_topic {
      /* width: 335px; */
      /* height: 200px; */
      background: #FFFFFF;
      -webkit-box-shadow: 0 4px 20px 0 #E8E8EB;
      box-shadow: 0 4px 20px 0 #E8E8EB;
      border-radius: 8px;
      /* margin: 20px auto 0; */
      margin: 20px;

      .topic {
        font-size: 20px;
        color: #FF5500;
        /*height:20px;*/
        line-height: 20px;
        text-align: center;
        /*top:100px;*/
        /*padding-top:59px;*/
        border-radius: 8px;

        img {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
      }

      .desc {
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        /*text-align: center;*/
        padding: 15px;
      }
    }

    .count_down {
      /*margin: 20px;*/
      /*width: 375px;*/
      padding-bottom: 20px;

      .remaining_time {
        font-size: 15px;
        color: #444444;
        text-align: center;
      }

      .time {
        /*height: 48px;*/
        /*width: 288px;*/
        /*margin: 15px auto 0;*/
        display: flex;

        .hour {
          width: 21px;
          height: 21px;
          background: #FE4C04;
          text-align: center;
          line-height: 21px;
          font-size: 16px;
          color: #ffffff;
          font-family: PingFangHK-Regular;
        }

        .maohao {
          padding: 0 8px;
        }

        cite {
          font-size: 13px;
          color: #333333;
          font-style: normal;
          height: 48px;
          line-height: 48px;
          width: 18px;
          display: block;
          float: left;
          margin-left: 5px;
          margin-right: 3px;
        }
      }

      .road {
        font-size: 14px;
        color: #FF5500;
        height: 14px;
        line-height: 14px;
        text-align: center;
        margin: 10px auto 20px;
      }
    }

    .group2_count_down {
      /*display: flex;*/
      width: 90%;
      /*height:252px;*/
      margin: 0 auto;
      /*border: 1px solid red;*/
      padding-bottom: 20px;
      margin-top: 20px;
      background: #FFFFFF;
      /*box-shadow: 0 2px 4px 0 rgba(0,0,0,0.15);*/
      /*border-radius: 8px;*/
      overflow: hidden;

      .remaining_time {
        margin-top: 20px;
        font-size: 14px;
        font-family: PingFangHK-Medium;
        color: #333333;

      }

      .shengyu {
        display: flex;
        justify-content: center;
        margin-top: 10px;

        .shengyutime {
          font-size: 15px;
          color: #333333;
          font-family: PingFangHK-Regular;
          margin-right: 10px;
        }
      }

      .shengyuhaoyou {
        font-size: 17px;
        color: #FE4C04;
        font-family: PingFangHK-Medium;
      }
    }

    .successGroup {
      /*width: 90%;*/
      width: 100%;
      margin: 0 auto;
      background: #FFFFFF;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      /*border: 1px solid;*/
      margin-top: 20px;
      padding: 15px 0;

      .successTip {
        width: 90%;
        margin: 0 auto;
        text-align: center;
        padding-bottom: 20px;

        p {
          font-size: 14px;
          font-family: PingFangHK-Medium;
          color: #FE4C04;
        }
      }

      .buyBtn {
        /*border: 1px solid;*/
        width: 90%;
        height: 53.5px;
        color: #ffffff;
        display: flex;
        text-align: center;
        justify-content: space-around;
        margin: 0 auto;

        .goCourse {
          width: 2rem;
          height: .7rem;
          color: #fff;
          background: #FE7738;
          border-radius: .5rem;
          line-height: .7rem;

        }

        .ninemoney {
          background: #FE7738;
          border-radius: 50px;
          width: 145px;

          .oldprice {
            font-family: PingFangSC-Medium;
            font-size: 19px;
            margin-top: 3px;
          }

          .through {
            font-size: 14px;
            margin-left: 8px;
            text-decoration: line-through;
          }

          .onlybuy {
            font-size: 13px;
          }
        }

        .threemoney {
          width: 145px;
          background: #FF4E00;
          border-radius: 50px;

          .pintuan {
            font-size: 19px;
            font-family: PingFangSC-Medium;
            margin-top: 3px;
          }

          .group {
            font-size: 13px;
          }
        }
      }
    }

    .invitation_friends {
      /*height:123px;*/
      background: #FFFFFF;
      /*box-shadow: 0 4px 20px 0 #E8E8EB;*/
      /*border-radius: 8px;*/
      margin: 20px;

      p {
        font-size: 15px;
        color: #333333;
        text-align: center;
        padding-top: 13px;

        em {
          color: #FF5500;
          font-style: normal;
        }
      }

      .myimages {
        width: 250px;
        margin: 0 auto;
        position: relative;
        display: flex;

        img {
          width: 60px;
          height: 60px;
          border-radius: 30px;
          margin-top: 14px;
        }

        img:nth-child(2) {
          margin-left: 9.6%;
        }

        img:nth-child(3) {
          margin-left: 10.7%;
        }

        img:nth-child(4) {
          margin-left: 10.7%;
        }

        .user2_img {
          border: 2px solid #00C1FF;
          border-radius: 50%;
        }

        .active {
          display: block;
          margin: 0 auto;
        }

        .tipactive {
          left: 100px !important;
        }

        .user2_tip {
          display: inline-block;
          width: 48px;
          height: 20px;
          background: #00C1FF;
          border-radius: 19.5px;
          color: #ffffff;
          font-size: 12px;
          text-align: center;
          line-height: 20px;
          position: absolute;
          top: 60px;
          left: 6px;
        }
      }
    }

    .group2_inviteBtn {
      background: #FE4C04;
      border-radius: 45px;
      width: 60%;
      height: 40px;
      text-align: center;
      font-size: 17px;
      color: #ffffff;
      line-height: 40px;
      margin: 0 auto;
      margin-top: 17px;
    }

    .groupon_pay {
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
      .pay_box1 {
        width: 60%;
        float: left;

        p,
        span,
        em,
        strong {
          display: block;
          ;
          float: left;
          font-style: normal;
          font-weight: normal;
        }

        p {
          margin-left: 18px;
          font-size: 18px;
        }

        span {
          margin-left: 14px;
          color: #FF5500;
        }

        em {
          margin-left: 10px;
          text-decoration: line-through;
          font-size: 12px;
          color: #9B9B9B;
        }
      }

      .pay_box2 {
        width: 40%;
        float: right;

        strong {
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

    .share_weixin_friends {
      height: 160px;
      margin: 30px 20px;
      background: #FFFFFF;
      box-shadow: 0 4px 20px 0 #E8E8EB;
      border-radius: 8px;

      p {
        font-size: 15px;
        color: #333333;
        text-align: center;
        padding-top: 13px;

        em {
          color: #FF5500;
          font-style: normal;
        }
      }

      .fenhaopengyou {
        width: 196px;
        margin: 0 auto;

        .wx_fr_box {
          width: 60px;
          height: 82px;
          float: left;
          margin-top: 29px;

          img {
            width: 60px;
            height: 60px;
          }

          span {
            display: block;
            height: 22px;
            width: 60px;
            text-align: center;
            font-size: 12px;
            color: #444444;
            margin-top: 5px;
          }
        }

        .wx_fr_box:nth-child(2) {
          margin-left: 66px;
        }

        .wx_fr_box:nth-child(3) {
          margin-left: 70px;
        }

      }

    }

    //蒙层
    .shareMask {
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      top: 0;
      left: 0;
      z-index: 999;

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

      .shareTip {
        font-size: 15px;
        color: #ffffff;
        font-family: PingFangSC-Regular;
        margin-top: 138px;
        text-align: center;
      }
    }

    //关注蒙层
    .actionMask {
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      top: 0;
      left: 0;
      z-index: 999;
      font-size: 19px;
      color: #ffffff;
      font-family: PingFangHK-Medium;
      text-align: center;

      span {
        color: #FF5500;
      }

      img {
        display: block;
        width: 116px;
        margin: 0 auto;
        margin-top: 30px;
      }

      .action_one {
        /*margin-top: 220px;*/
        margin-top: 40%;
      }

      .changan {
        margin-top: 30px;
      }
    }

    .view_order {
      /*height:100px;*/
      width: 60%;
      margin: 0 auto;
      font-size: 18px;
      text-align: center;

      /*margin:0 20px 50px 20px;*/
      span {
        color: #FFFFFF;
        border-radius: 25px;
        background: #FF5500;
        height: 50px;
        line-height: 50px;
        display: block;
      }
    }

    .count2_down {
      /*width:90%;*/
      width: 100%;
      margin: 0 auto;
      background: #FFFFFF;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      /*border: 1px solid;*/
      padding-bottom: 10px;
      margin-top: 15px;

      /*height: 405px;*/
      .count2_down_top {
        display: flex;
        align-items: center;
        padding: 0 15px;
        padding-top: 15px;

        .touxiang_left {
          width: 55px;
          height: 55px;
          border-radius: 50%;

          img {
            display: block;
            width: 100%;
            border-radius: 50%;
          }
        }

        .miaoshu_right {
          font-family: PingFangHK-Medium;
          margin-left: 17px;

          .miaoshu_right_one {
            font-size: 15px;
            color: #333333;
          }

          .miaoshu_right_two {
            font-size: 14px;
            color: #888888;
          }
        }
      }

      .count2_down_bot {
        padding: 0 15px;
        margin-top: 25px;
        display: flex;
        align-items: center;

        .kecheng_left {
          width: 158px;
          height: 89px;

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        .kecheng_right {
          font-family: PingFangHK-Medium;
          flex: 1;
          padding-left: 10px;

          .kecheng1 {
            font-size: 15px;
            color: #333333;
            margin-top: 5px;
          }

          .kecheng2 {
            font-size: 15px;
            color: #888888;
          }

          .kecheng3 {
            font-size: 12px;
            color: #888888;
          }
        }
      }

      .bottom {
        width: 96%;
        background: #fff;
        margin: .5rem auto .5rem auto;
        border-radius: .2rem;
        border: 1px solid #c3c3c3;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: .3rem 0;

        img {
          width: 40%;
          margin: 0 .2rem;
        }

        >div {
          width: 100%;

          h1 {
            font-weight: bold;
            font-size: .32rem;
          }

          p {
            font-size: .24rem;
            color: #8E8E8E;
          }

          div {
            font-size: .24rem;
            padding-right: .2rem;
            color: #9E9E9E;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */

          }
        }
      }
    }

    .count3_down {
      width: 90%;
      margin: 0 auto;
      background: #FFFFFF;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      /*border:1px solid;*/
      margin-top: 20px;
    }

    .groupon2_haoyou1 {
      width: 90%;
      margin: 0 auto;
      background: #FFFFFF;
      /*box-shadow: 0 2px 4px 0 rgba(0,0,0,0.15);*/
      /*border-radius: 8px;*/
    }
  }

  .courseInfo {
    width: 100%;
    min-width: 320px;
    position: relative;
    background: #ffffff;
    font-family: PingFangSC-Regular;

    .clearfix:before,
    .clearfix:after {
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

    .banner {
      width: 100%;
      height: 211.5px;

      img {
        display: block;
        width: 100%;
      }
    }

    .courserDesc {
      width: 90%;
      margin: 0 auto;

      .desc_top {
        height: 58px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #E9E9E9;

        p {
          font-size: 23px;
          color: #F85430;
        }

        .desc_line {
          font-size: 13px;
          color: #949494;
          height: 18.5px;
          line-height: 18.5px;

          .line {
            border-right: 1px solid #949494;
            margin: 0 4px;
          }

          .lastChild {
            color: red;
          }
        }
      }

      .desc_bot {
        display: flex;
        align-items: center;
        height: 46px;
        font-size: 11px;
        color: #949494;

        .head_img {
          width: 105px;
          margin-right: 15px;

          img {
            display: block;
            width: 100%;
          }
        }
      }
    }

    .information {
      width: 100%;
      background: #EDF3EE;
      overflow: hidden;

      /*margin-bottom: 54px;*/
      img {
        display: block;
        width: 100%;
        margin: 0 auto;
        border: none;
      }

      .tabHeader {
        position: relative;
        z-index: 99;
        width: 100%;
        height: 45px;
        margin-top: 9px;
        background: #ffffff;
        font-size: 17px;
        font-family: PingFangSC-Medium !important;
        color: #666666;

        ul {
          display: flex;
          height: 45px;
          justify-content: space-around;
          text-align: center;
          align-items: center;
        }

        ul li {
          // height: 45px;
          flex: 1;
          // list-style: none;
          // float: left;
          // line-height: 45px;
          // width: 100%;

          >span {
            border-right: 1px solid #949494;
            width: 99%;
            height: 100%;
            display: inline-block;
          }

          &:nth-child(3) {
            span {
              border-right: none;
            }
          }
        }

        .active {
          color: #fb7c27;
        }
      }

      .activeTabHeader {
        position: fixed;
        top: 0;
        left: 0;
        margin-top: 0px;
        z-index: 99;
      }

      .tabDetails_eight {
        width: 100%;
        margin-top: .4rem;

        .img22 {
          padding: .3rem 0;
          padding-top: .4rem;
        }
      }

      .tabDetails_nine {

        h1 {
          width: 100%;
          background: #fff;
          text-align: center;
          font-size: .34rem;
          padding: .2rem 0;
        }

        video {
          width: 100%;
        }
      }

      .tabDetails_ten {
        width: 100%;

        img {
          display: block;
          width: 100%;
          margin: 0 auto;
          margin-top: 20px;
        }

        .classDetail {
          background-repeat: no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;

          img:nth-child(1) {
            width: 94%;
          }
        }
      }

      .img18 {
        width: 100%;
        margin: 0 auto;
        margin-top: 30px;
      }
    }


    .fixedBtn {
      width: 100%;
      height: 53.5px;
      color: #ffffff;
      display: flex;
      text-align: center;
      position: fixed;
      left: 0;
      bottom: 0;

      .ninemoney {
        background: #FE7738;
        width: 45%;

        .oldprice {
          font-family: PingFangSC-Medium;
          font-size: 19px;
          margin-top: 5px;
        }

        .through {
          font-size: 14px;
          margin-left: 8px;
          text-decoration: line-through;
        }

        .onlybuy {
          font-size: 13px;
        }
      }

      .threemoney {
        width: 55%;
        background: #FF4E00;
        color: #ffffff;

        .pintuan {
          font-size: 19px;
          font-family: PingFangSC-Medium;
          margin-top: 5px;
        }

        .group {
          font-size: 13px;
        }
      }
    }

  }

</style>
