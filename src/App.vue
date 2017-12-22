<template>
  <div id="app">
    <nav></nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: ['nav']
}
</script>

<style>
html,
body,
#app {
	height: 100%;
}
body {
	margin: 0;
	font-family: 'Roboto', Helvetica, Arial, sans-serif;
}
</style>
