<template>
  <div id="app">
    <Nav/>
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav'
console.log(Nav)
export default {
  name: 'app',
  components: { Nav }
}
</script>

<style>
html,
body,
#app {
	height: 100%;
  margin: 0 10px
}
body {
	margin: 0;
	font-family: 'Roboto', Helvetica, Arial, sans-serif;
}
</style>
