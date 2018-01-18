<template>
  <div class="hello">
    <mt-header fixed title="我是头部">
        <mt-button slot="left"  v-show='isShow' @click="pageBack"  icon="back">返回</mt-button>
    </mt-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Home from '@/components/index/home';
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to my world",
      isShow : true
    };
  },
  methods: {
    pageBack(){
      this.$router.go(-1)
    }
  },
  watch : {
    $route(now,old){     //监控路由变换，控制返回按钮的显示
      console.log(now);
     if(now.path=="/home"){
            this.isShow=false;
     } else{
         this.isShow=true;
     }
    }
  },
  components : {
    Home
  }
};
</script>

<style scoped>

</style>
