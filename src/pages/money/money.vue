<template>
  <div class="money_wrap">
    <v-loading v-if="load"></v-loading>
    <header>
      <img src="../../assets/honeybee/tags/banner.png">
    </header>
    <div class="money_num">
      <div class="money_num_tit">奖学金累计</div>
      <div class="money_num1">
        <p>
          <b>￥</b>
          {{schoolMoney.totalAmount}}
        </p>
        <ul class="money_type" v-if="schoolMoney.totalAmount!==0">
          <li @click="cashSussess">
            <div class="money_typecons">
              <div>已提现</div>
              <span>
                ￥
                <b>{{schoolMoney.cashWithdrawalAmount}}</b>
              </span>
            </div>
            <div class="icon_more">
              <img src="../../assets/money/right.png">
            </div>
          </li>
          <li @click="cash">
            <div class="money_typecons">
              <div>去提现</div>
              <span>
                ￥
                <b>{{schoolMoney.surplusAmount}}</b>
              </span>
            </div>
            <div class="icon_more">
              <img src="../../assets/money/right.png">
            </div>
          </li>
        </ul>
      </div>
      <div class="money_num1" v-if="schoolMoney.totalAmount===0">
        <span class="tip">马上邀请好友赚取奖学金吧</span>
      </div>
    </div>
    <section class="box1">
      <div :class="[rules_show?'active':'box1_left']" @click="tab(1)">奖励规则</div>
      <div :class="[commit_show?'active':'box1_right']" @click="tab(2)">邀请记录</div>
    </section>
    <section class="rules" v-if="rules_show">
      <div class="rules_box1">
        <img src="../../assets/honeybee/tags/yaoqinggonglue.png" alt>
      </div>
      <div class="rules_box2">
        <div class="rules_section">
          <dl>
            <dt>
              <img src="../../assets/honeybee/tags/1step.png" alt>
            </dt>
            <dd>
              <h1>第一步：购买课程</h1>
              <p>确保您已经购课成功，获得学习资格。</p>
            </dd>
          </dl>
        </div>
        <div class="rules_section">
          <dl>
            <dt>
              <img src="../../assets/honeybee/tags/2step.png" alt>
            </dt>
            <dd>
              <h1>第二步：邀请好友</h1>
              <p>选择您已经购买的任何课程，发送给好友。</p>
            </dd>
          </dl>
        </div>
        <div class="rules_section">
          <dl>
            <dt>
              <img src="../../assets/honeybee/tags/3step.png" alt>
            </dt>
            <dd>
              <h1>第三步：好友购买成功</h1>
              <p>好友通过您发出的海报或链接，拼团或原价购买成功。</p>
            </dd>
          </dl>
        </div>
        <div class="rules_section">
          <dl>
            <dt>
              <img src="../../assets/honeybee/tags/4step.png" alt>
            </dt>
            <dd>
              <h1>第四步：奖金到账</h1>
              <p>好友购买成功后，成为你的学弟或学妹，奖学金到账。若有延迟请耐心等待，每人每天可以提现5次或500元。</p>
            </dd>
          </dl>
        </div>
        <div class="rules_section">
          <dl>
            <dt>
              <img src="../../assets/honeybee/tags/5step.png" alt>
            </dt>
            <dd>
              <h1>第五步：附加奖金</h1>
              <p>如果你的（学弟或学妹）再次介绍给他的好友成功购买同一个课程，你同时可以得到该课程推荐奖学金的20%奖励。</p>
            </dd>
          </dl>
        </div>
      </div>
      <div class="rules_box3">
        <img src="../../assets/honeybee/tags/bottom banner.png" alt>
      </div>
    </section>
    <section class="commit" v-if="commit_show">
      <ul class="commit_main" v-if="commitPeo.length>0">
        <li v-for="(item,index) in commitPeo" :key="index" @click="commitMan(item)">
          <div class="header_img">
            <img :src="item.headUrl">
          </div>
          <div :class="[item.successFlag===1?'userinfo':'userinfo tab']">
            <div>
              <span class="userName">{{item.nickName}}</span>
              <span>总收益：{{item.totalAmount}}</span>
              <span class="time">{{item.getTime}}</span>
            </div>
            <div>
              <span class="course">课程:《{{item.courseName}}》</span>
              <span class="shop_status" v-if="item.payType===1">{{item.successFlag===1?'团购成功':'团购失败'}}</span>
              <span class="shop_status" v-if="item.payType===2">{{item.successFlag===1?'直购成功':'直购失败'}}</span>
            </div>
          </div>
        </li>
      </ul>
      <ul class="commit_main" v-if="commitPeo.length===0">
        <p class="noCommit">您还没有邀请好友哦</p>
      </ul>
      <div class="rules_box3">
        <img src="../../assets/honeybee/tags/bottom banner.png" alt>
      </div>
    </section>
    <div class="tag" @click="choseCourse">专属海报</div>
    <div class="invite" @click="choseCourse">
      <img src="../../assets/button.png">
      <p>
        邀请好友，赚
        <span>30</span>元
      </p>
    </div>
    <div class="shareMask" v-if="isShareMask" @click="maskHide()">
      <div class="choseSussBox">
        <img src="../../assets/honeybee/tags/arroow.png" alt>
        <div class="choseSuss">
          <div class="choseSussTop">
            <h2>成功选择</h2>
            <p>{{courseName}}</p>
          </div>
          <div class="choseSussBottom">邀请好友一起学习</div>
        </div>
      </div>
    </div>
    <div class="shareMask" v-if="isShop">
      <div class="showTip">
        <p>您还没购买课程，暂无奖学金</p>
        <button @click="shopCourse">了解更多精品课</button>
      </div>
    </div>
    <div class="shareMask" v-if="isRecommend">
      <div class="recommend">
        <h1 class="recommend_title">
          请选择你要推荐给好友的课程
          <img src="../../assets/honeybee/tags/close.png" alt @click="recommend('close')">
        </h1>
        <div class="recommend_main">
          <div class="main_box" v-for="(item,index) in courseDetail" :key="index" @click="select(index,item)">
            <div class="label">
              <span>
                可赚
                <i>￥</i>
                <b>30</b>
              </span>
              <img src="../../assets/honeybee/tags/label.png" alt class="courseTag">
            </div>
            <div class="course_img">
              <img :src="item.imgUrlA" alt>
            </div>
            <div class="courseName">
              <img src="../../assets/honeybee/tags/NO SL.png" alt>
              <img src="../../assets/honeybee/tags/SL.png" alt v-if="isSelect">
              <p class="course_name">{{item.courseName}}</p>
            </div>
          </div>
        </div>
        <button class="recommend_button" @click="recommend">确定</button>
      </div>
    </div>
    <div class="shareMask" v-if="cashSuss">
      <div class="cashSuss">
        <div class="cashSussTop">
          <span>
            总收益:
            <b>+{{schoolMoney.totalAmount}}</b>
          </span>
          <span>
            总提现:
            <b>-{{schoolMoney.cashWithdrawalAmount}}</b>
          </span>
        </div>
        <div class="cashSussMain">
          <li v-for="(item,index) in tixian" :key="index">
            <div>
              <h3>提现成功</h3>
              <p class="cashTime">{{item.time}}</p>
            </div>
            <b>-{{item.amount}}</b>
          </li>
          <p v-if="tixian.length===0">您还没有提现记录哦</p>
        </div>
        <button class="cashSuss_button" @click="cashClose">关闭</button>
      </div>
    </div>
    <!-- <div class="shareMask" v-if="activeImg">
      <div class="save">
        <p>已经为您生成专属海报，</p>
        <p><span>98%的家长</span>转发后成功获得奖学金，</p>
        <p><span>长按图片保存海报室系列</span></p>
      </div>
      <div class="activeImg">
        <span class="close" @click="close">
          <img class="close_icon" src="../../assets/honeybee/tags/close.png">
        </span>
        <div ref="reportImg">
          <img class="active_img" :src="posterList.imgUrl+'?'+new Date().getTime()" crossOrigin="anonymous">
          <div class="userInfo">
            <img :src="posterList.headUrl+'?'+new Date().getTime()" alt="" class="header_img" crossOrigin="anonymous">
            <div class="name">
              <p>{{posterList.nickName}}</p>
              <p>我发现一个超棒的课程！推荐给你~</p>
            </div>
          </div>
          <div class="posterBottom">
            <div>
              <h1>限时特价<span>￥29</span></h1>
              <p>(9节精品课程 永久有效)</p>
              <p>长按二维码，了解详情</p>
            </div>
            <img :src="posterList.codeUrl+'?'+new Date().getTime()" alt="" crossOrigin="anonymous">
          </div>
        </div>
        <div class="report_after" :style="{display: state.isDownloadImg ? 'block':'none'}">
          <img :src="portImg" id="saveImg" />
        </div>
      </div>
    </div> -->
    <v-port v-if="activeImg"></v-port>
    <div class="shareMask" v-if="showCommit">
      <div class="commitMan">
        <div class="commitMater">
          <div class="header_img">
            <img :src="secondPeo.headUrl">
          </div>
          <div :class="[secondPeo.successFlag===1?'userinfo':'userinfo tab']">
            <div>
              <span class="userName">{{secondPeo.nickName}}</span>
              <span>总收益：{{secondPeo.totalAmount}}</span>
              <span class="time">{{secondPeo.getTime}}</span>
            </div>
            <div>
              <span class="course">课程:《{{secondPeo.courseName}}》</span>
              <span class="shop_status" v-if="secondPeo.payType===1">{{secondPeo.successFlag===1?'团购成功':'团购失败'}}</span>
              <span class="shop_status" v-if="secondPeo.payType===2">{{secondPeo.successFlag===1?'直购成功':'直购失败'}}</span>
            </div>
          </div>
        </div>
        <h2>{{secondPeo.nickName}}所邀请的小伙伴</h2>
        <div class="commitTwo">
          <div class="commitPeo" v-for="(value,key) in secondPeo.invitedList" :key="key">
            <div>
              <p>
                {{value.nickName}}
                <span class="commitTime">{{value.getTime}}</span>
              </p>
              <p>
                《{{value.courseName}}》
                <span>{{secondPeo.successFlag===1?'团购成功':'团购失败'}}</span>
              </p>
            </div>
            <div>+{{value.thisAmount}}</div>
          </div>
        </div>
        <button class="commitButton" @click="closeCommit">关闭</button>
      </div>
    </div>
    <!-- <v-footer :myopenid='openid' :iscourse='isCourse' :ismy='isMy' :ismoney='ismoney' /> -->
  </div>
</template>

<script>
  import {
    share
  } from "@/api/wx";
  import Loading from '@/components/_loading.vue';
  import Port from '@/components/_port.vue';
  // import Footer from "@/components/_footer.vue";
  import {
    MessageBox
  } from "mint-ui";
  import {
    queryAllCourseByPayStatus,
    queryAccountAmount,
    queryAmountList,
    queryPostInfo,
    withdrawCash,
    queryWithdrawCashLog
  } from "@/api/money";
  import {
    checkTradingstate
  } from '@/api/course';
  import html2canvas from "html2canvas";
  // import ElasticFrame from '@/components/_ElasticFrame';
  export default {
    components: {
      "v-loading": Loading,
      "v-port": Port,
    },
    data() {
      return {
        rules_show: true, // 奖励规则默认展示
        commit_show: false, // 邀请记录默认隐藏
        isShareMask: false, // 蒙层
        isShop: false, // 是否一购买课程
        isRecommend: false, // 推荐课程弹框
        cashSuss: false, // 已提现是否弹出
        activeImg: false, // 海报图片
        showCommit: false, // 显示二级邀请人
        isSuss: true, // 是否团购成功
        isSelect: false,
        isSelect2: false,
        courseName: "",
        openid: "",
        courseid: "", // 课程id
        courseDetail: "",
        schoolMoney: [],
        commitPeo: [],
        secondPeo: [],
        posterList: {},
        state: {
          isDownloadImg: false,
          imgUrl: ""
        },
        activess: true,
        tixian: [],
        load: true,
        portImg: '',
        // ismoney: true,
        // isCourse: false,
        // isMy: false
      };
    },
    created() {
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        if (window.name != 'open') {
          window.name = 'open';
          window.location.reload();
        }
      }
      // if (!window.sessionStorage.getItem('code')) {
      //   location.href = 'http://test-yunying.coolmath.cn/beec/logins'
      // }
      this.wxshare();
      if (this.$route.query.share === 1) {
        this.openid = this.$route.query.openid; // 如果从分享页面进入 替换openid
      } else {
        this.openid = this.$route.query.openid; // 正常进入
      }
      queryAllCourseByPayStatus({
        pageNum: "",
        pageSize: "",
        openId: this.openid
      }).then(res => {
        console.log("123", res);
        if (res.data.result.length === 0) {
          this.isShop = true;
        } else {
          this.courseDetail = res.data.result;
          this.courseid = this.courseDetail[0].id
        }
      });
      queryAccountAmount({
        openId: this.openid
      }).then(res => {
        console.log(res);
        this.schoolMoney = res.data.result;
      });
      queryAmountList({
        openId: this.openid
      }).then(res => {
        console.log("peple", res);
        this.commitPeo = res.data.result;
      });
      queryWithdrawCashLog({
        openId: this.openid
      }).then(res => {
        console.log("12321312", res);
        this.tixian = res.data.result;
      });

    },
    mounted() {
      setTimeout(() => {
        this.load = false
      }, 1000);

    },
    methods: {
      closeCommit() {
        this.showCommit = false;
      },
      commitMan(item) {
        this.showCommit = true;
        this.secondPeo = item;
      },
      select(index, item) {
        console.log(item);
        if (index === 0) {
          this.isSelect = true;
          this.isSelect2 = false;
          this.courseName = item.courseName;
          this.courseid = item.id;
          // this.course = item.id
          // queryPostInfo({
          //   openId: this.$route.query.openid,
          //   courseId: this.courseid
          // }).then(res => {
          //   console.log(res.data.result);
          //   this.posterList = res.data.result;
          //   this.screenshots();
          // });
        } else if (index === 1) {
          this.isSelect2 = true;
          this.isSelect = false;
          this.courseName = item.courseName;
          this.courseid = item.id;
          // this.course = item.id
        }
      },
      // close() {
      //   //  点击关闭海报
      //   if (this.activeImg === true) {
      //     this.activeImg = false;
      //     this.courseName = "";
      //   }
      // },
      poster() {
        //  出现海报
        this.activeImg = true

      },
      cashSussess() {
        // 点击弹起已提现详情
        this.cashSuss = true;
      },
      cashClose() {
        // 点击关闭已提现
        this.cashSuss = false;
      },
      recommend(item) {
        // 点击确定进入下一个
        if (item === "close") {
          this.isRecommend = false;
          this.courseName = "";
        } else {
          if (this.courseName === "") {
            MessageBox.alert("", {
              message: "请选择课程"
            });
          } else {
            this.isRecommend = false;
            this.isShareMask = true;
          }
        }
      },
      cash() {
        // 去提现弹框
        // if (this.schoolMoney.totalAmount >= 30) {

        // } else {
        //   MessageBox.alert("", {
        //     message: "满30才可提现哦！快去邀请好友~"
        //   });
        // }
        MessageBox.confirm("", {
            message: "奖学金提现后会进入微信钱包",
            title: "提现确认",
            confirmButtonText: "稍后再提",
            cancelButtonText: "立即提现"
          })
          .then(action => {})
          .catch(res => {
            withdrawCash({
              code: window.sessionStorage.getItem("code")
            }).then(res => {
              if (res.data.statusCode === '14004') {
                MessageBox.alert("成功提现" + res.data.result.actual + "元，奖学金会在1~2个工作日内放入您的微信零钱中").then(action => {
                  window.location.reload()
                })
              } else if (res.data.statusCode === '14001') {
                MessageBox.alert("每天最多提现5次哦，明天再来！").then(action => {
                  window.location.reload()
                })
              } else if (res.data.statusCode === '14005') {
                MessageBox.alert("每天最多提现500哦，明天再来！").then(action => {
                  window.location.reload()
                })
              } else {
                MessageBox.alert(res.data.message).then(action => {
                  window.location.reload()
                });
              }
            });
          });
      },
      shopCourse() {
        // 未购买课程进入页面 点击跳转首页
        this.$router.push({
          path: "/course",
          query: {
            openid: this.openid
          }
        });
      },
      maskHide() {
        // 邀请好友 关闭蒙层 解除滑动限制
        this.isShareMask = false;
        this.poster();
        this.move();
      },
      shareMask() {
        // 邀请好友 开启蒙层 添加滑动限制
        this.stop();
      },
      choseCourse() {
        this.isRecommend = true;
        this.isSelect = false;
        this.isSelect2 = false;
      },
      stop() {
        //滑动限制
        var mo = function (e) {
          e.preventDefault();
        };
        document.body.style.overflow = "hidden";
        document.addEventListener("touchmove", mo, false); //禁止页面滑动
      },
      move() {
        //取消滑动限制
        var mo = function (e) {
          e.preventDefault();
        };
        document.body.style.overflow = ""; //出现滚动条
        document.removeEventListener("touchmove", mo, false);
      },
      tab(num) {
        // 奖励规则与邀请记录tab切换
        if (num === 1) {
          this.rules_show = true;
          this.commit_show = false;
        } else if (num === 2) {
          this.rules_show = false;
          this.commit_show = true;
        }
      },
      wxshare() {
        let that = this
        console.log(that.courseid)
        //wx是引入的微信sdk
        // wx.config('这里有一些参数');//通过config接口注入权限验证配置
        let mydata = {
          url: location.href
        };
        console.log(mydata)
        share(mydata).then(res => {
          console.log('123456', res);
          if (res.data.statusCode == "200") {
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.result.appId, // 必填，公众号的唯一标识
              timestamp: res.data.result.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.result.noncestr, // 必填，生成签名的随机串
              signature: res.data.result.signature, // 必填，调用js签名， // 必填，调用js签名，
              jsApiList: [
                "onMenuShareAppMessage",
                "onMenuShareTimeline",
                'hideMenuItems'
              ] // 必填，需要使用的JS接口列表，这里只写支付的
            });

            wx.ready(function () {
              //通过ready接口处理成功验证
              // config信息验证成功后会执行ready方法
              let mytitle =
                "点击领取让孩子受用一生的数理思维课程";
              let mydesc = " 学完9节课让小朋友爱上思考";
              let mylink =
                "http://test-yunying.coolmath.cn/beec/wx/authorize?returnUrl=http://test-yunying.coolmath.cn/beec/tourbuy?invited=" +
                that.$route.query.openid + "%26courseid=10002"; //分享到首页
              let myimgUrl = "http://thyrsi.com/t6/665/1548835210x2728279033.png";
              // wx.hideMenuItems({
              //   menuList: ["menuItem:copyUrl"]
              // });
              wx.hideMenuItems({
                menuList: [
                  'menuItem:copyUrl'
                ]
              });
              wx.onMenuShareAppMessage({
                // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
                title: mytitle, // 分享标题
                desc: mydesc, // 分享描述
                link: mylink, // 分享链接
                imgUrl: myimgUrl, // 分享图标
                type: "", // 分享类型,music、video或link，不填默认为link
                dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  // 用户确认分享后执行的回调函数
                  console.log(1)
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                  console.log(2)
                }
              });
              wx.onMenuShareTimeline({
                //分享朋友圈
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
              // wx.onMenuCopyUrl({
              //   title: mytitle, // 分享标题
              //   link: mylink, // 分享链接
              //   imgUrl: myimgUrl,
              //   success: function () {
              //     // 用户确认分享后执行的回调函数
              //     console.log(123)
              //   },
              //   cancel: function () {
              //     console.log(456)
              //   }
              // })
            });
            wx.error(function (res) {
              //通过error接口处理失败验证
              // config信息验证失败会执行error函数
            });
          } else {}
        });
      },
    }
  };

</script>

<style lang="less" scoped>
  @import "money.less";

</style>
