<template>
  <div id="app">
    <top-header></top-header>
    <mid-nav></mid-nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import topHeader from '@/components/header'
  import midNav from '@/components/nav'
  export default {
    name: 'app',
    components: {
      midNav,
      topHeader
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
