<template lang="html">
     <v-coupon  :myopenid="openid" @backItem="backItem"></v-coupon>
</template>

<script>
  import Coupon  from '@/components/_coupon.vue'
  export default {
    components:{
      'v-coupon': Coupon,
    },
    data() {
      return {
        openid:'',//当前用户oepind
    }
    },
    methods:{
      backItem(isclose){
        this.$router.push({
          name:'mine',
          query:{openid:this.openid}
        })
      },
    },
    created(){
      this.openid  = this.$route.query.openid;
    }
  }
</script>

<style lang="less" scoped>
</style>
