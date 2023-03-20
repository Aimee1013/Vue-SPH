<template>
  <div>
    <!-- 使用三级联动全局组件（全局组件无需引入、注册，可直接使用） -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Floor v-for="(floor,index) in getFloorList"
           :key="floor.id"
           :list='floor' />
  </div>
</template>
<script>
import ListContainer from '@/pages/Home/ListContainer/ListContainer.vue'
import Recommend from '@/pages/Home/Recommend/Recommend.vue'
import Floor from '@/pages/Home/Floor/Floor.vue'
import { mapState } from 'vuex'
export default {
  components: { ListContainer, Recommend, Floor },
  name: '',
  data() {
    return {}
  },
  mounted() {
    // 派发action，获取floor组件的数据
    this.$store.dispatch('home/getFloorList')
  },
  computed: {
    ...mapState('home', ['getFloorList']),
  },
}
</script>
<style scoped></style>