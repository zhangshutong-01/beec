<template>
  <div class="recordInfor">
    <div class="details" v-show="isinvitation">
      <div class="details_top">
        <p class="details_user" v-show="inforData.honeyInfoType == 0 && inforData.honeySource == 0">分享朋友圈:<span>+{{inforData.honeyNums}}</span></p>
        <p class="details_user" v-show="inforData.honeyInfoType == 0 && inforData.honeySource == 2">新人有礼:<span>+{{inforData.honeyNums}}</span></p>
        <p class="details_user" v-show="inforData.honeyInfoType == 0 && inforData.honeySource == 1">成功邀请:<span>+{{inforData.honeyNums}}</span></p>
        <p class="details_time">时间:<span>{{inforData.createTimeL | changeTime}}</span></p>
      </div>
      <div class="details_bot" v-show="isInviterName">
        <p class="details_newuser">新用户信息</p>
        <p class="details_pickname">昵称：<span>{{inforData.inviterName}}</span></p>
      </div>
    </div>
    <div class="ex_details" v-show="isexchange">
      <div class="details_top">
        <p class="details_user ex_details_user">兑换数量:<span>-{{inforData.honeyNums}}</span></p>
        <p class="details_time">时间:<span>{{inforData.createTimeL | changeTime}}</span></p>
      </div>
      <div class="details_bot">
        <div class="message">
          <p class="details_newuser">收货人信息</p>
        </div>
        <div class="message">
          <p class="user_infor">姓名：</p>
          <p class="userInfor">{{inforData.name}}</p>
        </div>
        <div class="message">
          <p class="user_infor">手机号：</p>
          <p class="userInfor">{{inforData.phoneNum}}</p>
        </div>
        <div class="message">
          <p class="user_infor">地址：</p>
          <p class="userInfor addr">{{inforData.address}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "recordInfor",
    data() {
      return {
        isinvitation: false,
        isexchange: false,
        isInviterName:true,//是否显示分享人信息
        inforData:{
          id:'',
          honeyNums:'',
          createTimeL:'',
          honeyInfoType:'',//邀请0，消费1
          inviterName:'',
          name:'',
          phoneNum:'',
          address:''
        },
      }
    },
    mounted(){
      this.init();
    },
    filters:{
      timechange(time){
        let d = new Date(time);
        let times = d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate();
        return times;
      },
      changeTime(date){
        let time= date.replace(/-/g,".").substring(0,11);
        return time;
      }
    },
    methods:{
      init(){
        this.inforData= Object.assign({}, this.$route.query);
        console.log(this.inforData);
        if(this.inforData.honeyInfoType == 0){
          if(this.inforData.honeyInfoType == 0&&this.inforData.honeySource == 2){
            this.isInviterName = false;
          }
          if(this.inforData.honeyInfoType == 0&&this.inforData.honeySource == 0){
            this.isInviterName = false;
          }
          this.isinvitation = true;
          this.isexchange = false;
        }else{
          this.isexchange = true;
          this.isinvitation = false;
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .recordInfor{
      .details{
        overflow: hidden;
        width: 100%;
        height:210px;
        margin:0 auto;
        /*margin-top: 30px;*/
        background: url("../../assets/honey/recordBg1.png") no-repeat center;
        background-size: 100% 100%;
      }
      .ex_details{
        overflow: hidden;
        width: 100%;
        min-height:280px;
        margin:0 auto;
        margin-top: 30px;
        background: url("../../assets/honey/recordBg2.png") no-repeat center;
        background-size: 100% 100%;
      }
    .details_top{
        margin-top:40px;
        padding-left:40px;
        .details_user{
          font-size: 15px;
          font-family: PingFangSC-Medium;
          color: #444444;
            span{
              color: #80D0FF;
              padding-left: 10px;
            }
          }
          .ex_details_user{
            span{
              color: #FF5500;
            }
          }
        .details_time{
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color:#999999;
          margin-top: 7px;
            span{
              padding-left: 10px;
            }
        }
    }
    .details_bot{
        padding-left: 40px;
        padding-right: 40px;
        margin-top: 40px;
        .details_newuser{
          font-size: 15px;
          font-family: PingFangSC-Medium;
          color: #444444;
        }
        .details_pickname{
          margin-top: 7px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color:#999999;
            span{
              color: #333333;
            }
        }
        .message{
          display: flex;
          font-family: PingFangSC-Regular;
          margin-top:8px;
          .user_infor{
            font-size: 13px;
            color:#999999;
            width: 52px;
          }
          .userInfor{
            flex: 1;
            font-size: 13px;
            color: #333333;
          }
        }
    }

  }
</style>
