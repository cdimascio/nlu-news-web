<template>
	<div class="demo">
  <!-- <div class="google-map" :id="mapName"></div> -->
  <div>{{ markers }}</div>


  <gmap-map
    ref="map"
    class="map"
    :center="center"
    :zoom="7"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>

<!-- 
  <googlemaps-map
    ref="map"
    class="map"
    :center.sync="center"
    :zoom.sync="zoom"
    @idle="onIdle"
    @click="onMapClick">

  <googlemaps-user-position
    @update:position="setUserPosition"
  />

   <googlemaps-marker v-for="marker of markers"
        :key="marker.db_pedia.uri"
        title="marker.entity.text"
        :label="marker.entity.text"
        :position="{ lat: marker.db_pedia.lat, lng: marker.db_pedia.long }" 
  /> 
</googlemaps-map> -->

<!-- <div v-for="marker of markers">{{marker.db_pedia.uri}}</div> -->
  </div>
</template>

<script>
// import VueGoogleMaps from 'vue-googlemaps'
export default {
  name: 'google-map',
  props: {
    entities: {
      default: []
    }
  },
  watch: {
    markers(value) {
      console.log('changed markers')
      this.fitToBounds()
    }
  },
  computed: {
    markers() {
      // console.log('computing markers')
      let m = []
      if (this.entities.length === 0) {
      m = [{
        entity: {
          text: 'Paris'
        },
        db_pedia: {
          uri: 'http://hi',
          lat: 48.8735,
          long: 2.2951
        }
      }]
      } else {
        m = this.entities
      }
      return m.map(e => ({
        position: {
          lat: e.db_pedia.lat,
          lng: e.db_pedia.long,
        },
        title: e.entity.text,
      }))
    }
  },
	data () {
		return {
			center: {
				lat: 48.853,
				lng: 2.298,
			},
			userPosition: null,
			zoom: 12,
    };
  },
  methods: {
    fitToBounds() {
      if (this.markers.length === 1 ) {
        const pos = this.markers[0].position;
        this.center = pos
        const c = new google.maps.LatLng(pos.lat, pos.lng);
        this.$refs.map.setCenter(c);
        return
      } else if (this.markers.length > 1) {
        const b = new google.maps.LatLngBounds();
        this.markers.forEach(m => {
          b.extend(new google.maps.LatLng(m.position.lat, m.position.lng))
        });

        this.$refs.map.fitBounds(b);
        this.$refs.map.panToBounds(b);
        console.log(this.$refs.map.getBounds().getCenter())
      } else {
          // do nothing?
      }
    },
    onIdle() {
      
    },
    onClick() {

    },
  },
  mounted: function () {
    console.log('mount map')
  //   console.log('start mountd', this.entities, this.name)
  //   console.log('---here', window.google)
  //   console.log(this.mapName)
  //   const element = document.getElementById(this.mapName)
  //   const options = {
  //     zoom: 14,
  //     center: new google.maps.LatLng(51.501527,-0.1921837)
  //   }
  //   const map = new google.maps.Map(element, options);
  },
}
</script>

<style scoped>
.map {
	flex: 100% 1 1;
}
.demo {
	height: 100%;
	display: flex;
	flex-direction: column;
}
.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>