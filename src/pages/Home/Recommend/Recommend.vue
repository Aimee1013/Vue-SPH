<template>
  <div>
    <div class="recommend w">
      <div class="recommend-hd">
        <img src="./img/clock.png"
             alt="">
        <p>今日推荐</p>
      </div>
      <div class="recommend-bd">
        <ul>
          <li>
            <a href=""><img src="./img/today01.png"
                   alt=""></a>
          </li>
          <li>
            <a href=""><img src="./img/today02.png"
                   alt=""></a>
          </li>
          <li>
            <a href=""><img src="./img/today03.png"
                   alt=""></a>
          </li>
          <li class="last">
            <a href=""><img src="./img/today04.png"
                   alt=""></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {}
  },
}
</script>
<style scoped>
/* recommend模块样式 */
.recommend {
  height: 163px;
  margin-top: 10px;
  /* background-color: pink; */
}
.recommend-hd {
  float: left;
  width: 200px;
  height: 163px;
  background-color: #5c5251;
  text-align: center;
}
.recommend-hd img {
  margin: 30px 0 10px 0;
}
.recommend-hd p {
  font-size: 16px;
  color: #fff;
}
.recommend-bd {
  float: left;
  width: 1000px;
  height: 163px;
  background-color: #ebebeb;
}
.recommend-bd ul li {
  float: left;
  width: 249px;
  height: 145px;
  border-right: 1px solid #ccc;
  background-color: pink;
  margin-top: 8px;
}
.recommend-bd ul li img {
  width: 100%;
  height: 145px;
}
.recommend-bd .last {
  border-right: none;
}
</style>