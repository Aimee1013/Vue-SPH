<template>
  <div>
    <!-- floor楼层区 start -->
    <div class="floor">
      <div class="jiadian w">
        <div class="box-hd">
          <h3>{{list.name}}</h3>
          <div class="tab-list">
            <ul>
              <li v-for="(nav,index) in list.navList"
                  :key="index"><a href=""
                   class="style-red">{{nav.text}}</a>|</li>
              <!-- <li><a href="">大家电</a>|</li>
              <li><a href="">生活电器</a>|</li>
              <li><a href="">日常电器</a>|</li>
              <li><a href="">个护健康</a>|</li>
              <li><a href="">日常电器</a>|</li>
              <li><a href="">空气/净水</a>|</li>
              <li><a href="">新热门</a>|</li>
              <li><a href="">热门电器</a></li> -->
            </ul>
          </div>
        </div>
        <div class="box-bd">
          <ul class="tab-con">
            <li>
              <ul class="tab-con-list">
                <li v-for="(keyword,index) in list.keywords"
                    :key="index"><a href="">{{keyword}}</a></li>
              </ul>
              <img :src="list.imgUrl"
                   alt="">
            </li>
            <!-- <li>
              <a href=""><img src="./img/floor-1-b01.png"
                     alt=""></a>
            </li> -->

            <!-- 引入swiper样式的结构 -->
            <li class="swiper-container"
                ref="cur">
              <div class="swiper-wrapper">
                <div class="swiper-slide"
                     v-for="(carousel,index) in list.carouselList"
                     :key="carousel.id">
                  <img :src="carousel.imgUrl"
                       alt="">
                </div>
              </div>
              <!-- 需要分页器 -->
              <div class="swiper-pagination"></div>
              <!-- 需要左右切换导航按钮 -->
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </li>

            <li>
              <div class="tab-con-item">
                <a href=""><img :src="list.recommendList[0]"
                       alt=""></a>
              </div>
              <div class="tab-con-item">
                <a href=""><img :src="list.recommendList[1]"
                       alt=""></a>
              </div>
            </li>
            <li>
              <div class="tab-con-item">
                <a href=""><img :src="list.bigImg"
                       alt=""></a>
              </div>
            </li>
            <li>
              <div class="tab-con-item">
                <a href=""><img :src="list.recommendList[2]"
                       alt=""></a>
              </div>
              <div class="tab-con-item">
                <a href=""><img :src="list.recommendList[3]"
                       alt=""></a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="shouji w">
        <div class="box-hd">
          <h3>手机通讯</h3>
          <div class="tab-list">
            <ul>
              <li><a href=""
                   class="style-red">热门</a>|</li>
              <li><a href="">大家电</a>|</li>
              <li><a href="">生活电器</a>|</li>
              <li><a href="">日常电器</a>|</li>
              <li><a href="">个护健康</a>|</li>
              <li><a href="">日常电器</a>|</li>
              <li><a href="">空气/净水</a>|</li>
              <li><a href="">新热门</a>|</li>
              <li><a href="">热门电器</a></li>
            </ul>
          </div>
        </div>
        <div class="box-bd">
          <ul class="tab-con">
            <li>
              <ul class="tab-con-list">
                <li><a href="">节能补贴</a></li>
                <li><a href="">节能补贴</a></li>
                <li><a href="">节能补贴</a></li>
                <li><a href="">节能补贴</a></li>
                <li><a href="">节能补贴</a></li>
                <li><a href="">节能补贴</a></li>
              </ul>
              <img src="./img/floor-1-1.png"
                   alt="">
            </li>
            <li>
              <a href=""><img src="./img/floor-1-b01.png"
                     alt=""></a>
            </li>
            <li>
              <div class="tab-con-item">
                <a href=""><img src="./img/floor-1-2.png"
                       alt=""></a>
              </div>
              <div class="tab-con-item">
                <a href=""><img src="./img/floor-1-3.png"
                       alt=""></a>
              </div>
            </li>
            <li>
              <div class="tab-con-item">
                <a href=""><img src="./img/floor-1-4.png"
                       alt=""></a>
              </div>
            </li>
            <li>
              <div class="tab-con-item">
                <a href=""><img src="./img/floor-1-5.png"
                       alt=""></a>
              </div>
              <div class="tab-con-item">
                <a href=""><img src="./img/floor-1-6.png"
                       alt=""></a>
              </div>
            </li>
          </ul>
        </div>
      </div> -->
    </div>
    <!-- floor楼层区 end -->
  </div>
</template>
<script>
// 引入swiper包
import Swiper from 'swiper'
export default {
  name: '',
  props: ['list'],
  data() {
    return {}
  },
  mounted() {
    var mySwiper = new Swiper(this.$refs.cur, {
      loop: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  },
}
</script>
<style scoped>
/* floor 楼层区样式 */
.box-hd {
  height: 30px;
  border-bottom: 2px solid #c81623;
  margin-top: 25px;
}
.box-hd h3 {
  float: left;
  font-size: 18px;
  color: #c81623;
}
.box-hd .tab-list {
  float: right;
}
.box-hd .tab-list li {
  float: left;
  line-height: 30px;
}
.box-hd .tab-list li a {
  margin: 0 15px;
}

.box-bd {
  height: 360px;
  /* background-color: pink; */
}
.box-bd > ul > li {
  float: left;
  height: 360px;
}

.box-bd > ul > li:nth-of-type(1) {
  width: 209px;
}
.box-bd > ul > li:nth-of-type(2) {
  width: 329px;
}
.box-bd > ul > li:nth-of-type(3) {
  width: 219px;
  border-right: 1px solid #ccc;
}
.box-bd > ul > li:nth-of-type(4) {
  width: 220px;
  border-right: 1px solid #ccc;
}
.box-bd > ul > li:nth-of-type(5) {
  width: 220px;
}
.swiper-container {
  position: relative;
}
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 180px;
}

.tab-con-item {
  border-bottom: 1px solid #ccc;
}

.tab-con-list {
  /* 清除浮动--父元素未设置高 */
  overflow: hidden;
  margin-bottom: 15px;
}
.tab-con-list li {
  float: left;
  width: 86px;
  height: 32px;
  line-height: 32px;
  border-bottom: 1px solid #ccc;
  margin-left: 10px;
  text-align: center;
}
.box-bd li {
  overflow: hidden;
}
.box-bd img {
  transition: all 0.5s;
}
.box-bd img:hover {
  margin-left: 8px;
}
</style>