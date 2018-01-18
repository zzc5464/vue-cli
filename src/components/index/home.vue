<template>
  <div>
      <section class="clearfix">
      <div>
        <router-link to="/total">
        <p class="fa fa-envira red"></p>
          {{menusName[0]}}
        </router-link>
      </div>
      <div>
        <router-link to="/total">
        <p class="fa fa-gg darkorange"></p>
          {{menusName[1]}}
        </router-link>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data(){
      return {
        menusName : ['统计','盘库','xx','是的'],
        iconColor: {
          cyan : 'true',
          red : true,
          '#069' : 'true'
        }
      }
  }
}
</script>
<style scoped>
section {

}
section div {
  float: left;
  width: 50%;
  line-height: 50px;
  text-align:center;
  padding: 0 20px;
}
section div p {
  font-size: 30px;
  width: 100%;
  text-align: center;
  line-height: 30px;
}
section div a {
  text-decoration: none;
  color: #000;
}
.red {
  color: red;
}
.darkorange {
  color: darkorange;
}

</style>

