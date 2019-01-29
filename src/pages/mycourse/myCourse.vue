<template>
  <div class="mycourse">
    <main>
      <section v-for="(item,index) in list" :key="index">
        <div class="top">
          <img :src="item.imgUrl">
          <div>
            <div class="describe">
              <h1>
                {{item.courseName}}
                <p>
                  <span>{{item.courseTote}}人团</span>
                  <span>￥{{item.coursePrice}}</span>
                </p>
              </h1>
              <p>{{item.courseDescribe}}</p>
            </div>
          </div>
        </div>
        <div class="bottom">
          <p>
            <span>拼课成功</span>
            <span>成团日期:2019.1.16</span>
          </p>
          <button>赚奖金</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
  import {
    queryAllCourseByPayStatus
  } from '@/api/money';
  export default {
    data() {
      return {
        list: []
      }
    },
    created() {
      queryAllCourseByPayStatus({
        pageNum: '',
        pageSize: '',
        openId: 'ogdrw0vW21b0E1mCoONNUP4nZK24'
      }).then(res => {
        this.list = res.data.result
        console.log(this.list)
      })
    },
    methods: {

    }
  }

</script>

<style lang="less" scoped>
  .mycourse {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #000;
    background: #F2F2F2;

    main {
      width: 90%;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      margin-top: 1rem;

      section {
        flex: 1;
        width: 100%;
        height: 10rem;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: .5rem;
        margin-bottom: .8rem;
        padding: .5rem;
        display: flex;
        flex-direction: column;
        box-shadow: 0 2px 4px 0;

        .top {
          width: 100%;
          height: 75%;
          display: flex;
          border-bottom: 1px solid #c3c3c3;
          padding-bottom: .5rem;

          img {
            width: 30%;
            height: 6rem;
            display: block;
            margin-right: .5rem;
          }

          >div {
            flex: 1;
            display: flex;
            flex-direction: column;
            position: relative;

            .describe {
              width: 100%;
              height: 4rem;
              padding: 0 .5rem;
              box-sizing: border-box;

              h1 {
                margin-bottom: .3rem;
                display: flex;
                justify-content: space-between;
                font-weight: 500;

                p {
                  color: #000;

                  span:nth-child(2) {
                    color: #FE7738;
                  }
                }
              }

              p {
                font-size: .9rem;
                color: #c3c3c3;
              }
            }
          }
        }

        .bottom {
          width: 100%;
          flex: 1;
          align-items: center;
          display: flex;
          justify-content: space-between;
          padding: 1rem .6rem;
          box-sizing: border-box;
          margin-top: .3rem;

          span:nth-child(1) {
            padding: .2rem .5rem;
            border: 1px solid #D3D3D3;
          }

          span:nth-child(2) {
            font-size: .8rem;
            color: #909090;
          }

          button {
            padding: .3rem .7rem;
            background: #FE7738;
            border-radius: .5rem;
            color: #fff;
          }
        }
      }
    }
  }

</style>
