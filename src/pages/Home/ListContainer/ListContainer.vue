<template>
  <div>
    <div class="w">
      <div class="main">
        <div class="focus">
          <!-- 原生写的静态结构 -->
          <!-- <a href=""
             class="arrow-left"><i></i></a>
          <a href=""
             class="arrow-right"><i></i></a>
          <ul>
            <li
                v-for="(carousel,index) in getBannerList"
                :key="carousel.id">
              <a href=""><img :src="carousel.imgUrl"
                     alt=""></a>
            </li>
          </ul> -->

          <!-- 引入swiper样式的结构 -->
          <div class="swiper-container"
               ref="mySwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide"
                   v-for="(carousel,index) in getBannerList"
                   :key="carousel.id">
                <img :src="carousel.imgUrl"
                     alt="">
              </div>
            </div>
          </div>
          <!-- 需要分页器 -->
          <div class="swiper-pagination"></div>
          <!-- 需要左右切换导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>

          <!-- 原生的导航圆点 -->
          <!-- <ol class="circle">
            <li></li>
            <li class="current"></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ol> -->
        </div>
        <div class="newsflash">
          <div class="news">
            <div class="news-hd">
              <p>品优购快报</p><a href="">更多<i></i></a>
            </div>
            <div class="news-bd">
              <ul>
                <li><a href=""><span>[特惠]</span>备战开学季全民半价购数码</a></li>
                <li><a href=""><span>[公告]</span>备战开学季全民半价购数码</a></li>
                <li><a href=""><span>[特惠]</span>备战开学季全民半价购数码</a></li>
                <li><a href=""><span>[公告]</span>备战开学季全民半价购数码</a></li>
                <li><a href=""><span>[特惠]</span>备战开学季全民半价购数码</a></li>
              </ul>
            </div>
          </div>
          <div class="lifeservice">
            <ul class="grid-area">
              <li>
                <a href="">
                  <i class="service-icon service-icon-huafei"></i>
                  <p>话费</p>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="service-icon service-icon-huafei"></i>
                  <p>话费</p>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="service-icon service-icon-huafei"></i>
                  <p>话费</p>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="service-icon service-icon-huafei"></i>
                  <p>话费</p>
                </a>
                <span class="hot">省</span>
              </li>
              <li>
                <a href="">
                  <i class="service-icon service-icon-huafei"></i>
                  <p>话费</p>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="service-icon service-icon-huafei"></i>
                  <p>话费</p>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="service-icon service-icon-huafei"></i>
                  <p>话费</p>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="service-icon service-icon-huafei"></i>
                  <p>话费</p>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="service-icon service-icon-huafei"></i>
                  <p>话费</p>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="service-icon service-icon-huafei"></i>
                  <p>话费</p>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="service-icon service-icon-huafei"></i>
                  <p>话费</p>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="service-icon service-icon-huafei"></i>
                  <p>话费</p>
                </a>
              </li>
            </ul>
          </div>
          <div class="bargin">
            <img src="./img/ad.jpg"
                 alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// 引入swiper包
import Swiper from 'swiper'

export default {
  name: 'ListContainer',
  data() {
    return {}
  },
  // 组件挂载完毕，就可以向服务器发起请求
  mounted() {
    // 组件挂载完毕后，通知Vuex发送请求，获取数据，存储于仓库中
    this.$store.dispatch('home/getBannerList')

    // 把new Swiper实例放在mounted中不行，因为dispatch中涉及到异步语句，导致v-for遍历时，结构还没完全展示，所以需要加个定时器(轮播图的一种做法)
    // setTimeout(() => {
    //   var mySwiper = new Swiper(document.querySelector('.swiper-container'), {
    //     loop: true,
    //     pagination: { el: '.swiper-pagination', clickable: true },
    //     navigation: {
    //       nextEl: '.swiper-button-next',
    //       prevEl: '.swiper-button-prev',
    //     },
    //   })
    // }, 1000)
  },
  computed: {
    ...mapState('home', ['getBannerList']),
  },
  // 轮播图的第二种做法：通过watch来监听getBannerList的属性值的变化
  watch: {
    getBannerList: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          // nextTick：在下次DOM更新 循环结束之后，执行延迟回调，在修改数据之后，立即使用该方法，可以获取更新后的DOM
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      },
    },
  },
}
</script>

<style scoped>
.main {
  width: 980px;
  height: 455px;
  margin: 10px 0 0 219px;
  /* background-color: pink; */
}

.focus {
  position: relative;
  float: left;
  width: 720px;
  height: 455px;
  /* background-color: yellow; */
}
.focus ul img {
  width: 100%;
  height: 455px;
}
.arrow-left,
.arrow-right {
  position: absolute;
  top: 50%;
  margin-top: -20px;
  font-family: 'icomoon';
  font-size: 16px;
  width: 24px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  /* 透明色设置 */
  background: rgba(0, 0, 0, 0.4);
}
.arrow-right {
  left: 696px;
}

.swiper-pagination {
  position: absolute;
  left: 330px;
  bottom: 10px;
}

.circle {
  position: absolute;
  left: 50px;
  bottom: 10px;
}
.circle li {
  float: left;
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 50%;
  cursor: pointer;
  /* 做空心小圆点，且边框半透明效果 */
  border: 2px solid rgba(204, 204, 204, 0.5);
  /* 做实心小圆点 */
  /* background-color: green; */
}
.current {
  background-color: red;
  box-shadow: 0 0 5px #204;
}
.newsflash {
  float: right;
  width: 250px;
  height: 455px;
  /* background-color: aqua; */
}
.news {
  /* width: 250px; */
  height: 163px;
  border: 1px solid pink;
}
.news-hd {
  height: 32px;
  line-height: 32px;
  padding: 0 20px;
  font-size: 15px;
  border-bottom: 1px dotted #ccc;
}
.news-hd p {
  float: left;
}
.news-hd a {
  float: right;
  font-size: 12px;
}
.news-hd a:hover {
  color: red;
}
.news-hd i {
  font-family: 'icomoon';
}
.news-bd {
  padding: 10px 0 0 15px;
}
.news-bd li {
  height: 23px;
}
.news-bd li span {
  margin-right: 10px;
}

.lifeservice {
  height: 208px;
  border: 1px solid #ccc;
  border-top: none;
}
.grid-area {
  display: grid;
  grid-template-columns: repeat(4, 62px);
  grid-template-rows: repeat(3, 69px);
}
.grid-area li {
  position: relative;
  width: 62px;
  height: 70px;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  text-align: center;
}
.hot {
  position: absolute;
  top: 0;
  right: 0;
  width: 14px;
  height: 17px;
  line-height: 15px;
  background-color: red;
  color: #fff;
  font-size: 13px;
}
.service-icon {
  display: block;
  width: 24px;
  height: 24px;
  margin: 10px auto;
  background: url(~@/assets/images/icons.png) no-repeat;
}
.service-icon-huafei {
  background-position: -17px -16px;
}

.bargin {
  height: 75px;
  margin-top: 5px;
}
</style>