<template>
  <div class="moneyDetail">
    <div class="moneyTop">
      <div class="GroupShop">
        <h1>您已购课成功</h1>
      </div>
      <span class="tag" @click="courseDetail({id:'10001',courseName:'超市购物系列'})">课程介绍</span>
      <section class="member">
        <div class="menyShop" v-if="data.length===3">
          <div v-for="(item,index) in data" :key="index">
            <img :src="item.img">
            <span v-if="item.identity===1">{{item.status}}</span>
            <p>{{item.name}}</p>
          </div>
        </div>
        <div class="menyShop" v-if="data.length===1">
          <div v-for="(item,index) in data" :key="index">
            <img :src="item.img">
            <span v-if="item.identity===1">{{item.status}}</span>
            <p>{{item.name}}</p>
          </div>
        </div>
      </section>
      <div class="moneyTags">
        <div class="getCourse" @click="goCourse()">去上课</div>
        <div class="getMoney" @click="openPoster()">选好友，赚奖金</div>
      </div>
    </div>
    <div class="moneyBottom">
      <div class="posterTag" @click="poster()">
        专属海报
      </div>
      <div class="banner">
        <img src="../../assets/honeybee/tags/banner.png">
      </div>
      <div class="money_num">
        <div class="money_num_tit">本课已得奖学金</div>
        <p><b>￥</b>0</p>
        <div>
          已提现：<span>￥0</span>
        </div>
      </div>
      <section class="rules">
        <div class="rules_box1">
          <img src="../../assets/honeybee/tags/yaoqinggonglue.png" alt="">
        </div>
        <div class="rules_box2">
          <div class="rules_section">
            <dl>
              <dt>
                <img src="../../assets/honeybee/tags/1step.png" alt="">
              </dt>
              <dd>
                <h1>第一步：购买课程</h1>
                <p>确保您已经购课成功，获得学习资格</p>
              </dd>
            </dl>
          </div>
          <div class="rules_section">
            <dl>
              <dt>
                <img src="../../assets/honeybee/tags/2step.png" alt="">
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
                <img src="../../assets/honeybee/tags/3step.png" alt="">
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
                <img src="../../assets/honeybee/tags/4step.png" alt="">
              </dt>
              <dd>
                <h1>第四步：奖金到账</h1>
                <p>好友购买成功后，成为你的学弟或学妹，奖学金到账。若有延迟请耐心等待，每人每天可以提现10次。</p>
              </dd>
            </dl>
          </div>
          <div class="rules_section">
            <dl>
              <dt>
                <img src="../../assets/honeybee/tags/5step.png" alt="">
              </dt>
              <dd>
                <h1>第五步：附加奖金</h1>
                <p>如果你的（学弟或学妹）再次介绍给他的好友成功购买同一个课程，你同时可以得到该课程推荐奖学金的20%奖励。</p>
              </dd>
            </dl>
          </div>
        </div>
        <div class="rules_box3">
          <img src="../../assets/honeybee/tags/bottom banner.png" alt="">
        </div>
      </section>
      <div class="invite" @click="choseCourse">
        <img src="../../assets/honeybee/tags/yaoqing button.png">
      </div>
    </div>
    <div class="shareMask" v-if="isShareMask" @click="maskHide()">
      <div class="choseSussBox">
        <img src="../../assets/honeybee/tags/arroow.png" alt="">
        <div class="choseSuss">
          <div class="choseSussBottom">
            邀请好友一起学习
          </div>
        </div>
      </div>
    </div>
    <div class="shareMask" v-if="activeImg">
      <div class="save">
        <p>已经为您生成专属海报，</p>
        <p><span>98%的家长</span>转发后成功获得奖学金，</p>
        <p><span>长按图片保存海报室系列</span></p>
      </div>
      <div class="activeImg">
        <span class="close" @click="close">
          <img class="close_icon" src="../../assets/honeybee/tags/close.png">
        </span>
        <img class="active_img" src="../../assets/honeybee/tags/big pop.png">
      </div>
    </div>
    <div class="shareMask" v-if="actionMask" @click="actionMaskHide">
      <p class="action_one">关注"你拍一蜜蜂乐园"<br>才能正常上课</p>
      <img src="../../assets/erweima.png" />
      <p class="changan">长按二维码识别关注</p>
    </div>
  </div>
</template>

<script>
  import {
    checkConcerned
  } from '@/api/pay'
  export default {
    data() {
      return {
        data: [{
            img: "http://b-ssl.duitang.com/uploads/item/201510/14/20151014001324_8R3QB.jpeg",
            name: "冯瑞",
            identity: 1,
            status: "团长"
          },
          {
            img: "http://b-ssl.duitang.com/uploads/item/201510/14/20151014001324_8R3QB.jpeg",
            name: "冯瑞",
            identity: 0,
            status: "团购"
          },
          {
            img: "http://b-ssl.duitang.com/uploads/item/201510/14/20151014001324_8R3QB.jpeg",
            name: "冯瑞",
            identity: 0,
            status: "团购"
          }
        ],
        openid: '',
        isShareMask: false,
        activeImg: false,
        actionMask: false
      };
    },
    methods: {
      actionMaskHide() {
        this.actionMask = false;
      },
      choseCourse() {
        this.isShareMask = true
      },
      courseDetail(item) {
        this.$router.push({
          path: "/courseinfo",
          query: {
            openid: this.openid,
            courseid: item.id,
            name: item.courseName,
            isShow: true
          }
        })
      },
      goCourse(item) {
        let params = {
          openId: this.$route.query.openid
        }
        console.log('22222222', params)
        checkConcerned(params).then(res => {
          console.log('333333333', res)
          if (res.data.result.concerned && res.data.result.concerned.hasPhone) {
            this.$router.push({
              path: "/courselist2",
              query: {
                openid: this.openid,
                courseid: '10001',
                isShow: false
              }
            })
          } else {
            this.actionMask = true
          }
        })

      },
      openPoster() {
        this.isShareMask = true
      },
      maskHide() { // 邀请好友 关闭蒙层 解除滑动限制
        this.isShareMask = false;
        this.poster()
      },
      poster() {
        this.activeImg = true
      },
      close() {
        this.activeImg = false
      }
    }
  };

</script>

<style lang="less" scoped>
  .moneyDetail {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    position: relative;

    .GroupShop {
      width: 100%;
      text-align: center;
      line-height: 3rem;
      color: #ff4700;
      font-size: 1.2rem;
      font-weight: bolder;
      margin-top: 1rem;

      h1 {
        font-weight: bold;
      }
    }

    .tag {
      position: absolute;
      right: 0;
      top: 8%;
      display: block;
      background: #ff4906;
      padding: 0.2rem 0.3rem 0.2rem 1rem;
      color: #fff;
      border-top-left-radius: 1.5rem;
      border-bottom-left-radius: 1.5rem;
      z-index: 99;
    }

    .member {
      width: 100%;

      margin-top: 1rem;

      .menyShop {
        width: 100%;
        display: flex;
        justify-content: center;

        >div {
          width: 23%;
          text-align: center;
          position: relative;

          img {
            width: 75%;
            display: block;
            margin: 0 auto;
            border-radius: 50%;
            border: 5px solid yellow;
          }

          span {
            width: 70%;
            display: block;
            position: absolute;
            background: #fd8a00;
            color: #fff;
            bottom: -0.5rem;
            left: 50%;
            margin-left: -35%;
            border-radius: 0.3rem;
          }

          p {
            width: 100%;
            text-align: center;
            position: absolute;
            bottom: -2rem;
            color: #ec9539;
          }
        }
      }
    }

    .moneyTags {
      margin-top: 3rem;
      width: 100%;
      display: flex;
      justify-content: space-around;
      padding: 0 2rem;
      box-sizing: border-box;

      .getCourse {
        background: #ff8e4e;
        width: 30%;
        text-align: center;
        padding: 0.5rem;
        border-radius: 1.2rem;
        color: #fff;
      }

      .getMoney {
        background: #ff6c1b;
        padding: 0.5rem 1rem;
        border-radius: 1.2rem;
        color: #fff;
      }
    }

    .moneyBottom {
      width: 100%;
      flex: 1;
      margin-top: 2rem;

      .banner {
        width: 100%;

        img {
          width: 100%;
        }
      }

      .money_num {
        width: 84%;
        height: 10rem;
        background: #fff;
        background: url('../../assets/honeybee/tags/jiangjinkuang.png');
        background-size: 100% 100%;
        margin: 0 auto;
        border-radius: 0.6rem;
        display: flex;
        flex-direction: column;
        margin-top: -15%;
        position: relative;
        align-items: center;

        .money_num_tit {
          width: 100%;
          text-align: center;
          height: 2.5rem;
          line-height: 2.5rem;
          font-size: 1.2rem;
          margin-top: 1rem;
        }

        p {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: .5rem;
          color: #F95600;
          font-size: 1.6rem;
          font-weight: bold;

          b {
            font-size: 1rem;
          }
        }
      }

      .rules {
        width: 100%;
        height: 1rem;
        flex: 1;
        margin-top: 1rem;
        padding-bottom: 3rem;

        .rules_box1 {
          width: 61.6%;
          margin: 0 auto;

          img {
            width: 100%;
          }
        }

        .rules_box2 {
          width: 94%;
          margin: 0 auto;

          .rules_section {
            width: 100%;
            padding: 1rem 0;

            &:nth-child(even) {
              h1 {
                color: #4A90E2;
              }
            }

            dl {
              width: 100%;
              display: flex;

              dt {
                flex: 2;
                padding: 0 1rem;

                img {
                  width: 100%;
                }
              }

              dd {
                flex: 7;

                h1 {
                  font-family: PingFangHK-Semibold;
                  font-size: 1.4rem;
                  color: #FF4E00;
                  letter-spacing: 1.9px;
                  font-weight: bold;
                  padding-bottom: .5rem;
                }

                p {
                  font-family: PingFangHK-Regular;
                  font-size: 1.2rem;
                  color: #4A4A4A;
                  letter-spacing: 1.8px;
                }
              }
            }
          }
        }

        .rules_box3 {
          width: 100%;
          margin-top: 1.5rem;

          img {
            width: 100%;
          }
        }
      }

      .invite {
        width: 94.9%;
        margin: 0 auto;
        position: fixed;
        bottom: 3%;
        left: 50%;
        margin-left: -48%;
        z-index: 90;
        animation: shake .5s infinite;

        img {
          width: 100%;
        }
      }

      .posterTag {
        width: 5rem;
        height: 2rem;
        background: #33BEA3;
        position: fixed;
        right: -1%;
        top: 50%;
        margin-top: -1rem;
        text-align: center;
        line-height: 2rem;
        color: #fff;
        border-radius: 8px;
        font-family: PingFangHK-Regular;
        z-index: 99
      }
    }

    .shareMask {
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      top: 0;
      left: 0;
      z-index: 999;

      img {
        display: block;
        width: 116px;
        margin: 0 auto;
        margin-top: 30px;
      }

      .action_one {
        /*margin-top: 220px;*/
        color: #FF5500;
        margin-top: 40%;
        width: 100%;
        text-align: center;
      }

      .changan {
        margin-top: 30px;
        color: #FF5500;
        text-align: center;
      }

      .choseSussBox {
        width: 100%;
        height: 100%;
        position: relative;

        img {
          width: 25%;
          position: absolute;
          right: 1rem;
          top: -1rem;
        }

        .choseSuss {
          width: 70%;
          height: auto;
          position: fixed;
          left: 50%;
          top: 50%;
          margin-left: -35%;
          margin-top: -30%;

          .choseSussBottom {
            width: 100%;
            text-align: center;
            line-height: 3rem;
            margin-top: 1rem;
            padding-bottom: .6rem;
            font-size: 1.2rem;
            color: #FE7738;
          }
        }
      }
    }

    .save {
      width: 90%;
      text-align: center;
      color: #fff;
      margin: 0 auto;
      margin-top: 8%;
      padding-bottom: .9rem;

      p {
        line-height: 1.4rem;
      }

      span {
        color: #FE7738;
      }
    }

    .activeImg {
      width: 65%;
      position: fixed;
      top: 50%;
      left: 50%;
      margin-left: -32%;
      margin-top: -55%;

      .active_img {
        width: 100%;
        height: auto;
      }

      .close {
        width: 20px;
        height: 20px;
        position: absolute;
        right: -17px;
        top: -25px;
      }

      .close_icon {
        width: 20px;
        height: 20px;
      }
    }

  }

  @keyframes shake {
    0% {
      bottom: 10px;
    }

    50% {
      bottom: 25px
    }

    100% {
      bottom: 10px
    }
  }

</style>
