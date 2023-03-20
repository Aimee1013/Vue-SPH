<template>
  <div>
    <!-- 顶部快捷导航start -->
    <div class="shortcut">
      <div class="w">
        <div class="w_right">
          <ul>
            <li>品优购欢迎您！</li>
            <!-- 没有用户名，表示尚未登陆，就显示登录 注册 字样 -->
            <li v-if="!userName"><span>请</span>
              <!-- 声明式导航：务必要有to属性 -->
              <router-link to="/login"
                           class="style-red">登录</router-link>
              <span>免费</span>
              <router-link to="/register"
                           class="style-red">注册</router-link>
            </li>
            <!-- 有用户名，表示用户已登录，就显示用户名 -->
            <li v-else>
              <a>{{userName}}</a>
              <span>|</span>
              <a class="style-red"
                 @click="logout">退出登录</a>
            </li>
          </ul>
        </div>
        <div class="w_left">
          <ul>
            <li>
              <router-link to="/center/myorder"
                           href="#">我的订单</router-link>
            </li>
            <li class="spacer"></li>
            <li>
              <router-link to="/shopcart"
                           href="#">我的购物车</router-link> <i class="icomoon"></i>
            </li>
            <li class="spacer"></li>
            <li><a href="#">我的品优购</a> <i class="icomoon"></i></li>
            <li class="spacer"></li>
            <li><a href="#">品优购会员</a></li>
            <li class="spacer"></li>
            <li><a href="#">企业采购</a></li>
            <li class="spacer"></li>
            <li><a href="#">关注品优购</a> <i class="icomoon"></i></li>
            <li class="spacer"></li>
            <li><a href="#">客户服务</a> <i class="icomoon"></i></li>
            <li class="spacer"></li>
            <li><a href="#">网站导购</a> <i class="icomoon"></i></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 顶部快捷导航end -->

    <!-- header部分start -->
    <header class="w">
      <div class="logo">
        <h1>
          <router-link to="/home"
                       title="品优购">品优购</router-link>
        </h1>
      </div>
      <div class="search">
        <input type="text"
               class="text"
               placeholder="请搜索内容..."
               v-model="keyword">
        <!-- 编程式导航 -->
        <button class="btn"
                @click="goSearch">搜索</button>
      </div>
      <div class="hotwords">
        <a href="#"
           class="style-red">优惠购首发</a>
        <a href="#">亿元优惠</a>
        <a href="#">99元团购</a>
        <a href="#">美满99减30</a>
        <a href="#">办公用品</a>
        <a href="#">电脑</a>
        <a href="#">通信</a>
      </div>
      <div class="shopcar"
           @click="$router.push('/shopcart')">
        <i class="car"></i> 我的购物车 <i class="arrow"></i>
        <i class="count">80</i>
      </div>
    </header>
    <!-- header部分end -->
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      keyword: '',
    }
  },
  methods: {
    // 搜索按钮的回调函数：需要向search路由进行跳转
    goSearch() {
      // 路由传递参数：
      // 第一种：字符串形式（不常用）
      // this.$router.push(
      //   '/search/' + this.keyword + '?k=' + this.keyword.toUpperCase()
      // )
      // 第二种：模板字符串（不常用）
      this.$router.push(`/search/${this.keyword}`)
      this.keyword = ''
      // 第三种：对象写法（常用）
      // 判断：如果有query参数，也一起传过去
      // if (this.$route.query) {
      //   let location = {
      //     name: 'search',
      //     params: { keyword: this.keyword || undefined },
      //   }
      //   location.query = this.$route.query
      //   this.$router.push({ location })
      // }
    },
    // 退出登录
    async logout() {
      // 退出登录需要做的事情
      // 1.需要发请求，通知服务器退出登录（清除一些数据，如token）
      // 2.清除项目中本地的数据，如userInfo, token
      try {
        // 若成功退出登录，路由跳转，回到首页
        await this.$store.dispatch('user/getUserLogout')
        this.$router.push('/home')
      } catch (error) {}
    },
  },
  computed: {
    // 计算获得用户名信息
    userName() {
      return this.$store.state.user.userInfo.name
    },
  },
}
</script>

<style scoped>
/* @import '@/common/common.css'; */
/* @import '@/common/base.css'; */
/* @import '../../common/base.css'; */

/* 顶部快捷导航 */
.shortcut {
  height: 31px;
  background-color: #f1f1f1;
  line-height: 31px;
}
.shortcut > div {
  display: flex;
  justify-content: space-between;
}
.w_right ul {
  display: flex;
}
.w_left ul {
  display: flex;
}

/* header 部分 */
header {
  height: 105px;
  /* background-color: pink; */
  position: relative;
}
.logo {
  position: absolute;
  width: 175px;
  height: 56px;
  /* background-color: #c81623; */
  top: 25px;
  left: 0;
}
.logo a {
  display: block;
  width: 175px;
  height: 56px;
  background: url(./img/logo.png) no-repeat;
  /* 淘宝做法 */
  text-indent: -999px;
  overflow: hidden;
  /* 这种写法也能让a标签中的自消失不见-京东做法 */
  /* font-size: 0;  */
}
.search {
  position: absolute;
  top: 25px;
  left: 348px;
}
.search .text {
  float: left;
  width: 445px;
  height: 32px;
  border: 2px solid #b1191a;
  padding-left: 10px;
  color: #ccc;
}
.search .btn {
  float: left;
  width: 82px;
  height: 36px;
  color: #fff;
  background: #b1191a;
  border: 0;
  font-size: 16px;
}
.hotwords {
  position: absolute;
  top: 65px;
  left: 348px;
}
.hotwords a {
  margin: 0 10px;
}
.shopcar {
  width: 138px;
  height: 34px;
  border: 1ps solid #dfdfdf;
  background-color: #f7f7f7;
  position: absolute;
  top: 25px;
  right: 64px;
  line-height: 34px;
  text-align: center;
  cursor: pointer;
}
.shopcar .car {
  font-family: 'icomoon';
  color: #da5555;
}
.shopcar .arrow {
  font-family: 'icomoon';
  margin-left: 5px;
}
.count {
  position: absolute;
  top: -5px;
  left: 100px;
  background-color: #e60012;
  height: 14px;
  line-height: 14px;
  padding: 0 3px;
  border-radius: 7px 7px 7px 0;
  color: #fff;
}
</style>