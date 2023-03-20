<template>
  <div id="app">
    <Header />
    <!-- 路由出口的地方 -->
    <router-view></router-view>
    <!-- 设置Footer组件的显示与隐藏：home和search页面时显示，其他不显示（一般不用该方式），会使用路由元信息来设置 -->
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'" /> -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
}
</script>

<style>
</style>
