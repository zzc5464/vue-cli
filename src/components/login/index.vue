<template>
  <div>
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516266305583&di=c2594132f6c81454e100a234f5e6b67a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dd0dba3b0c1ef7609280691dc46b4c9b9%2F4a36acaf2edda3cca0f61f0d0be93901213f9289.jpg" alt="">
    <mt-field label="邮箱" :state='vlidataUser' placeholder="请输入邮箱" type="email" v-model.trim="email"></mt-field>
    <mt-field label="密码" :state='vlidataPwd' placeholder="请输入密码" type="password" v-model.trim="password"></mt-field>
    <mt-button @click='btn_login' class="mt10" type="primary" size="large">确认登录</mt-button>
    <mt-button @click='btn_reset' class="mt10" type="danger" size="large">重置</mt-button>
  </div>
</template>
<script>
import { setToken } from '@/untils/token';
export default {
  data(){
      return {
          email:'',
          password : '',
          vlidataUser:'',
          vlidataPwd:'',
      }
  },
  methods : {
      btn_login(){
          if(this.email == '') {
              this.vlidataUser = 'error';
              return false;
          }
          if(this.password == '') {
              this.vlidataPwd = 'error';
              return false;
          }
          setToken('1');
        //   this.$router.push({ path: '/home/index' })
      },
      btn_reset(){
          this.email = '';
          this.password = '';
      }
  }
}
</script>
<style scoped>
img {
    width: 100%;
}
</style>

