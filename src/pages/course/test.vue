<template lang="html">
  <div class="courseCont">
    <div class="subGrade" @click="submit">提交成绩</div>
  </div>
</template>
<script>
  import { Indicator, Toast} from 'mint-ui';
  import { submitGrade } from '@/api/course'
  import { authorize, share } from '@/api/wx'

  export default {
    data(){
      return {
        openid:'',
        learningResult:'1@1@0@0@1@1@0@0',
        courseId:'',
        sectionId:'',
      }
    },
    created: function () {
      this.openid = this.$route.query.openid;
      this.courseId = this.$route.query.courseid;
      this.sectionId = this.$route.query.sectionid;
    },
    methods:{
      submit(){
        let params = {
          openId: this.openid,
          learningResult:'1@1@0@0@1@1@0@0',
          courseId:this.courseId,
          sectionId:this.sectionId,
        };
        Indicator.open();
        submitGrade(params).then(res => {
          // console.log(res);
          let resData = res.data;
          console.log(resData);
          Indicator.close();
          if(resData.statusCode == 200){
            this.$router.push({
              name:'studyReport',
              query:{
                openid: this.openid,
                isShare: 0
              }
            })
          }else {
            Indicator.close();
            Toast(resData.message);
          }
        })
      }
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
