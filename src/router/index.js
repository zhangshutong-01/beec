import Vue from 'vue'
import Router from 'vue-router'
import Coupon from '@/pages/coupon'
import Paycoupon from '@/pages/coupon/paycoupon'
import Exchange from '@/pages/honey/exchange'
import Course from '@/pages/course/index'
import Courselist from '@/pages/course/courseList'
import Courselist2 from '@/pages/course/courseList2'
import CourseInfo from '@/pages/course/courseInfo'


import Register from '@/pages/register/index'
import RecordInfor from '@/pages/honey/recordInfor'
import Pay from '@/pages/pay/index'
import Groupon from '@/pages/groupon/index'
import Share from '@/pages/groupon/share'
import Share1 from '@/pages/groupon/share1'
import Groupon1 from '@/pages/groupon/index1'



import ExchangeRecord from '@/pages/honey/exchangeRecord'
import Mehoney from '@/pages/honey/index'
import Mine from '@/pages/mine'
import Order from '@/pages/order/index'
import OrderDetails from '@/pages/order/orderDetails'
import Invitation from '@/pages/Invitation'
import StudyReport from '@/pages/studyReport/index'
import Test from '@/pages/course/test'
import Test2 from '@/pages/course/test2'
import Money from '@/pages/money/money'
import Evaluate from '@/pages/evaluate/evaluate'
import MoneyDetail from '@/pages/money/moneyDetail'

import Login from '@/pages/login/login';
import BabyInfo from '@/pages/login/babyInfo';

import MyCourse from '@/pages/mycourse/myCourse';
import AfterPay from '@/pages/afterPay/afterPay';

import TourBuy from '@/pages/tourBuy/TourBuy';

import Protocol from '@/pages/protocol/protocol';

import logins from '@/pages/logins';


Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: '/beec/',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
      path: '/',
      name: 'home',
      component: Course
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: Coupon,
      meta: {
        title: '现金券'
      }
    },
    {
      path: '/Paycoupon',
      name: 'Paycoupon',
      component: Paycoupon,
      meta: {
        title: '现金券'
      }
    },

    {
      path: '/honey',
      name: 'honey',
      component: Mehoney,
      meta: {
        title: '我的蜂蜜'
      }
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: Exchange,
      meta: {
        title: '兑换蜂蜜'
      }
    },
    {
      path: '/exchangeRecord',
      name: 'exchangeRecord',
      component: ExchangeRecord,
      meta: {
        title: '交易记录'
      }
    },
    {
      path: '/recordInfor',
      name: 'recordInfor',
      component: RecordInfor,
      meta: {
        title: '记录详情'
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine,
      meta: {
        title: '我的'
      }
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/orderDetails',
      name: 'orderDetails',
      component: OrderDetails,
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/invitation',
      name: 'invitation',
      component: Invitation,
      meta: {
        title: '邀请新用户'
      }
    },
    {
      path: '/course',
      name: 'course',
      component: Course,
      meta: {
        title: '蜜蜂乐园'
      } //课程列表
    },
    {
      path: '/courselist',
      name: 'courselist',
      component: Courselist,
      meta: {
        title: '课程内容列表'
      } //章节列表
    },
    {
      path: '/courseInfo',
      name: 'courseInfo',
      component: CourseInfo,
      meta: {
        title: '课程详情'
      },
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: {
        title: '课程游戏'
      }
    },
    {
      path: '/test2',
      name: 'test2',
      component: Test2,
      meta: {
        title: '课程游戏'
      }
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay,
      meta: {
        title: '确认支付'
      }
    },
    {
      path: '/groupon',
      name: '拼团',
      component: Groupon,
      meta: {
        title: '拼团解锁本期课程'
      }
    },
    {
      path: '/groupon1',
      name: '拼团',
      component: Groupon1,
      meta: {
        title: '拼团解锁本期课程'
      }
    },
    {
      path: '/share',
      name: '拼团',
      component: Share,
      meta: {
        title: '拼团解锁本期课程'
      }
    },
    {
      path: '/share1',
      name: '拼团',
      component: Share1,
      meta: {
        title: '拼团解锁本期课程'
      }
    },
    {
      path: '/studyReport',
      name: 'studyReport',
      component: StudyReport,
      meta: {
        title: '学习报告'
      }
    }, {
      path: '/money',
      name: 'money',
      component: Money,
      meta: {
        title: '奖学金'
      }
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: Evaluate,
      meta: {
        title: '评价'
      }
    }, {
      path: '/Courselist2',
      name: 'Courselist2',
      component: Courselist2,
      meta: {
        title: '课程列表'
      }
    }, {
      path: '/moneyDetail',
      name: 'moneyDetail',
      component: MoneyDetail,
      meta: {
        title: "邀请详情"
      }
    }, {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: "绑定手机号"
      }
    }, {
      path: '/logins',
      name: 'logins',
      component: logins,
      meta: {
        title: "奖学金"
      }
    }, {
      path: '/babyInfo',
      name: 'babyInfo',
      component: BabyInfo,
      meta: {
        title: "宝宝信息"
      }
    }, {
      path: '/mycourse',
      name: 'mycourse',
      component: MyCourse,
      meta: {
        title: "我的课程"
      }
    }, {
      path: '/afterPay',
      name: 'afterPay',
      component: AfterPay,
      meta: {
        title: "拼团进行中"
      }
    }, {
      path: '/tourbuy',
      name: 'TourBuy',
      component: TourBuy,
      meta: {
        title: "购买详情"
      }
    },
    {
      path: '/protocol',
      name: 'protocol',
      component: Protocol,
      meta: {
        title: "蜜蜂乐园用户服务协议"
      }
    }

  ]
})
router.beforeEach((to, form, next) => {
  /*路由变化修改title*/
  if (to.query.name) {
    document.title = to.query.name;
  } else if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})


export default router
