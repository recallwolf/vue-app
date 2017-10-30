<template>
  <div id="app">
    <top-header v-bind:seller="seller" v-if="seller!=undefined"></top-header>
    <mid-nav></mid-nav>
    <router-view v-bind:seller="seller" v-if="seller!=undefined"></router-view>
  </div>
</template>

<script>
  import topHeader from '@/components/header'
  import midNav from '@/components/nav'
  export default {
    data(){
      return {
        seller: undefined
      }
    },
    name: 'app',
    components: {
      midNav,
      topHeader
    },
    created(){
      this.$http.get('/api/seller').then(response => {
        response = response.body
        if(response.errno === 0){
          this.seller = response;
        }
      });
    }
  }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
