<template>
  <div class="hello">
    <mt-header fixed :title="title">
        <mt-button slot="left"  v-show='closeBack' @click="pageBack"  icon="back">返回</mt-button>
    </mt-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Home from "@/components/index/home";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to my world",
      title : this.$route.name
    };
  },
  methods: {
    pageBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    closeBack() {
      let hide = this.$route.path;
      if (hide == "/home/index") {
        return false;
      } else {
        return true;
        
      }
    }
  },
  watch: {
    $route() {
      alert("改变");
    }
  },
  components: {
    Home
  }
};
</script>

<style scoped>

</style>
