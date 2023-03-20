<template>
  <div>
    <!-- nav部分start -->
    <div class="nav">
      <div class="w">
        <div class="dropdown"
             @mouseenter="enterShow"
             @mouseleave="leaveShow">
          <div class="dt">全部商品分类</div>
          <!-- 给三级联动加上动画 -->
          <transition name="sort">
            <div class="dd"
                 v-show="show">
              <div class='item'
                   v-for="(c1,index) in categoryList.slice(0,15)"
                   :key='c1.categoryId'
                   @mouseenter='changeIndex(index)'
                   @mouseleave="leaveIndex()"
                   :class="{cur:currentIndex==index}"
                   @click="goSearch">
                <a :data-categoryName='c1.categoryName'
                   :data-category1Id='c1.categoryId'>{{c1.categoryName}}</a>
                <!-- 声明式导航会卡顿 -->
                <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                <i></i>
                <div class='item_list'
                     v-for="(c2,index) in c1.categoryChild"
                     :key='c2.categoryId'>
                  <dt :style="{color:'#c81623', fontWeight: 'bold'}">
                    <a :data-categoryName='c2.categoryName'
                       :data-category2Id='c2.categoryId'>{{c2.categoryName}}</a>
                  </dt>
                  <dd :style="{color:'#c81623'}"><em v-for="(c3,index) in c2.categoryChild"
                        :key='c3.categoryId'
                        class="subitem">
                      <a :data-categoryName='c3.categoryName'
                         :data-category3Id='c3.categoryId'>{{c3.categoryName}}</a>
                    </em></dd>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <div class="navitems">
          <ul>
            <li><a href="">服装城</a></li>
            <li><a href="">美妆馆</a></li>
            <li><a href="">传智超市</a></li>
            <li><a href="">全球购</a></li>
            <li><a href="">闪购</a></li>
            <li><a href="">团购</a></li>
            <li><a href="">拍卖</a></li>
            <li><a href="">有趣</a></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- nav部分end -->
  </div>
</template>

<script>
import store from '@/store/index.js'
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
    return {
      // 存储用户鼠标移到哪个一级分类
      currentIndex: -1,
      show: true,
    }
  },
  // 组件挂载完毕，就可以向服务器发起请求
  mounted() {
    // 组件挂载完毕后，通知Vuex发送请求，获取数据，存储于仓库中
    store.dispatch('home/categoryList')
    // console.log(store.state.home.categoryList, '9999')
    // console.log(this.categoryList, '99999')

    // 当组件挂载完毕，让show属性变为false(单需要判断当前路由，若是home路由为true，search路由为false)
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    // ...mapState({
    //   categoryList(state) {
    //     return state.home.categoryList
    //   },
    // }),
    ...mapState('home', ['categoryList']),
  },
  methods: {
    changeIndex(index) {
      // console.log(index, '3333')
      this.currentIndex = index
    },
    // // 节流写法
    // changeIndex: throttle(function (index) {
    //   this.currentIndex = index
    //   console.log(index, '3333')
    // }, 50),
    leaveIndex() {
      this.currentIndex = -1
    },
    goSearch(event) {
      // 最优解决方式：编程式导航+事件委派
      //路由跳转
      // this.$router.push('/search')
      let element = event.target
      // 节点有一个dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset

      if (categoryname) {
        // 路由跳转的参数
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // 判断：若路由跳转时，带有params参数，也应传递过去
        if (this.$route.params) {
          location.params = this.$route.params
          // 动态给location配置对象添加query属性
          location.query = query
        }

        // 路由跳转
        this.$router.push(location)
      }
    },
    enterShow() {
      this.show = true
    },
    leaveShow() {
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
  },
}
</script>

<style scoped>
/* nav部分 */
.nav {
  height: 45px;
  border-bottom: 2px solid #b1191a;
}
.nav .w {
  background-color: pink;
}
.dropdown {
  float: left;
  width: 210px;
}
.dropdown .dt {
  width: 100%;
  height: 100%;
  line-height: 45px;
  background-color: #b1191a;
  color: #fff;
  text-align: center;
  font-size: 16px;
}
.dropdown .dd {
  width: 100%;
  height: 465px;
  background-color: #c81623;
  margin-top: 2px;
  color: #fff;
}
.dropdown .dd a {
  color: #fff;
  font-size: 14px;
}
.dropdown .dd i {
  font-family: 'icomoon';
  font-size: 18px;
  float: right;
}
.dropdown .dd .item {
  height: 31px;
  line-height: 31px;
  padding: 0 10px;
  transition: all 0.3s;
}

/* .dropdown .dd .item:hover {
  background-color: #fff;
  border-left: 1px solid #c81623;
  padding-left: 20px;
} */
/* 使用JS写 */
.cur {
  background-color: #fff;
  border-left: 1px solid #c81623;
  padding-left: 20px;
}
.dropdown .dd .item:hover a {
  color: #c81623;
}
.item .item_list {
  display: none;
  position: absolute;
  width: 734px;
  min-height: 460px;
  background: #f7f7f7;
  left: 370px;
  border: 1px solid #ddd;
  top: 185px;
  z-index: 9999 !important;
}
.item:hover .item_list {
  display: block;
}
.subitem {
  /* float: left; */
  width: 650px;
  padding: 0 4px 0 8px;
}

/* 三级联动的过渡动画样式 */
/* 过渡动画开始状态 */
.dropdown .sort-enter {
  height: 0;
  transform: rotate(0deg);
}
/* 过渡动画结束状态 */
.dropdown .sort-enter-to {
  height: 461px;
  transform: rotate(360deg);
}
/* 定义动画时间、速率 */
.dropdown .sort-enter-active {
  transition: all 0.5s lineaer;
}

/* 项目导航 */
.navitems {
  float: left;
  margin-left: 10px;
}
.navitems li {
  float: left;
}
.navitems li a {
  display: block;
  height: 45px;
  line-height: 45px;
  padding: 0 25px;
  font-size: 16px;
  color: #333;
}
.navitems li a:hover {
  color: #c81623;
}
</style>