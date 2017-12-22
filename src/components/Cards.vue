<template>
<div>
  <div class="google-map" :id="mapName"></div>
  <div>{{ results }}</div>
  </div>
</template>

<script>
export default {
  name: 'google-map',
  props: ['results'],
  data: function () {
    return {
    }
  },
  mounted: function () {
}
</script>

<style scoped>

</style>