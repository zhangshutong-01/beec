  /**
   * 格式化时间
   */
  export default {
    formattime: function (remain) {
      var h1, h2, m1, m2, s1, s2 = null;
      let hh = Math.floor((remain / 60 / 60) % 24);
      let mm = Math.floor((remain / 60) % 60);
      let ss = Math.floor(remain % 60);
      h1 = parseInt(hh / 10);
      h2 = hh % 10;
      m1 = parseInt(mm / 10);
      m2 = mm % 10;
      s1 = parseInt(ss / 10);
      s2 = ss % 10;
      let json = {
        hh: {
          h1: h1,
          h2: h2
        },
        mm: {
          m1: m1,
          m2: m2
        },
        ss: {
          s1: s1,
          s2: s2
        }
      }
      return json;
    },
    /**
     *@param starttime 倒计时开始时间
     *@param hour 倒计时小数数
     */

    initTime: function (starttime, hour) {
      //1536733716692  14点28分
      let longtime = hour * 3600000;
      let endtime = starttime + longtime;
      let nowtime = new Date().getTime();

      if (endtime > nowtime) { //倒计时未结束
        let remain = (endtime - nowtime) / 1000;
        return remain;
      } else { //倒计时已经结束
        return '结束'
      }
    },
  }
