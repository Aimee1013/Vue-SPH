<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list"
            v-for="(cartGoods,index) in cartInfoList"
            :key="cartGoods.id">
          <li class="cart-list-con1">
            <input type="checkbox"
                   name="chk_list"
                   :checked='cartGoods.isChecked==1'
                   @change="updateChecked(cartGoods,$event)" />
          </li>
          <li class="cart-list-con2">
            <img :src="cartGoods.imgUrl" />
            <div class="item-msg">
              {{cartGoods.skuName}}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartGoods.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)"
               class="minus"
               @click="handler('minus', -1, cartGoods)">-</a>
            <input autocomplete="off"
                   type="text"
                   minnum="1"
                   class="itxt"
                   :value="cartGoods.skuNum"
                   @change="handler('change', $event.target.value*1, cartGoods)" />
            <a href="javascript:void(0)"
               class="plus"
               @click="handler('plus', 1, cartGoods)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartGoods.skuPrice * cartGoods.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet"
               @click="deleteCartGoodsById(cartGoods)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll"
               type="checkbox"
               :checked='isAllCheck&&cartInfoList.length>0'
               @change="updateAllChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{totalCheckedNum}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <!-- 没有勾选商品 不能结算 -->
          <!-- <a @click="$router.push('/trade')">结算</a> -->
          <router-link to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  methods: {
    // 获取购物车数据
    getData() {
      this.$store.dispatch('shopcart/getCartList')
    },
    // 修改某个商品的数量（节流）
    handler: throttle(async function (type, disNum, cartGoods) {
      // type:用于区分执行的动作
      // disNum(形参):+ - 变化量；input输入的值
      // cartGoods:用于区分哪个产品
      // 向服务器发送请求，修改数量
      switch (type) {
        case 'plus':
          disNum = 1
          break
        case 'minus':
          if (cartGoods.skuNum > 1) {
            disNum = -1
          } else {
            // 若产品数量小于等于1，给服务器传0，即数量不增不减
            disNum = 0
          }
          // 三元表达式写法
          // disNum = cartGoods.skuNum > 1 ? -1 : 0
          break
        case 'change':
          if (isNaN(disNum) || disNum < 1) {
            // 若输入的产品数量为负数或非法的，给服务器传0，即数量不增不减
            disNum = 0
          } else {
            disNum = parseInt(disNum) - cartGoods.skuNum
          }
          // 三元表达式写法
          // disNum = isNaN(disNum) || disNum < 1 ? 0 : parseInt(disNum) - cartGoods.skuNum
          break
      }

      // 派发action
      try {
        await this.$store.dispatch('detail/addOrUpdateShopCart', {
          skuId: cartGoods.skuId,
          skuNum: disNum,
        })
        // 需重新发请求，获取最新数据
        this.getData()
      } catch (error) {}
    }, 500),
    // 删除购物车某些商品的数据
    async deleteCartGoodsById(cartGoods) {
      try {
        await this.$store.dispatch('shopcart/deleteCartById', cartGoods.skuId)
        // 若删除成功，需再次发送请求，获取最新的数据进行展示
        this.getData()
      } catch (error) {
        // 若删除失败，给出消息
        alert(error.message)
      }
    },
    // 修改购物车商品的选择状态
    async updateChecked(cartGoods, $event) {
      try {
        let isChecked = $event.target.checked ? '1' : '0'
        await this.$store.dispatch('shopcart/updateCheckedById', {
          skuId: cartGoods.skuId,
          isChecked,
        })
        this.getData()
      } catch (error) {
        // 若失败，给出消息
        alert(error.message)
      }
    },
    // 删除选中的所有商品
    async deleteAllChecked() {
      try {
        await this.$store.dispatch('shopcart/deleteAllChecked')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 全选操作
    async updateAllChecked(event) {
      try {
        let isChecked = event.target.checked ? '1' : '0'
        // 派发action
        await this.$store.dispatch('shopcart/updateAllChecked', isChecked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
  },
  computed: {
    ...mapGetters('shopcart', ['cartList']),
    // 计算出购物车数据,
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    // 计算购物车商品总价
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach((item) => {
        item.isChecked == 1 ? (sum += item.skuNum * item.skuPrice) : ''
      })
      return sum
    },
    // 判断是否全选
    isAllCheck() {
      return this.cartInfoList.every((item) => item.isChecked == 1)
    },
    // 计算选中的商品数量
    totalCheckedNum() {
      let num = 0
      this.cartInfoList.forEach((item) => {
        item.isChecked == 1 ? num++ : ''
      })
      return num
    },
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .minus {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
        .active {
          pointer-events: none;
          background-color: gray;
        }
      }
    }
  }
}
</style>