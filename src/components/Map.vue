<template>
<div>
  <div class="google-map" :id="mapName"></div>
  <div>{{ entities }}</div>
  </div>
</template>

<script>
export default {
  name: 'google-map',
  props: ['name', 'entities'],
  data: function () {
    return {
      mapName: this.name + "-map",
    }
  },
  mounted: function () {
    // console.log('mount', window)
    console.log('start mountd', this.entities, this.name)
    console.log('---here', window.google)
    console.log(this.mapName)
    const element = document.getElementById(this.mapName)
    const options = {
      zoom: 14,
      center: new google.maps.LatLng(51.501527,-0.1921837)
    }
    const map = new google.maps.Map(element, options);
  }
};
</script>

<style scoped>
.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>