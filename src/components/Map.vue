<template>
	<div class="demo">
  <div class="google-map" :id="mapId"></div>
  <div>{{ markers }}</div>

<!-- 
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
  </gmap-map> -->

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
    mapId: {
      default: 'map-view',
    },
    entities: {
      default: []
    }
  },
	data() {
		return {
      map: null,
      allMarkers: [],
			center: {
				lat: 48.853,
				lng: 2.298,
			},
			zoom: 5,
    };
  },
  watch: {
    markers(values) {
      this.clearMarkers()
      this.addMarkersForEntities(values)
      this.fitToBounds()
    }
  },
  computed: {
    markers() {
      return this.entities
    }
  },
  methods: {
    addMarkersForEntities(entities) {
      entities.forEach(e => {
        this.addMarker({
          position: {
            lat: e.db_pedia.lat,
            lng: e.db_pedia.long,
          },
          title: e.entity.text
        })
      })
    },

    addMarker({ position, title }) {
      this.allMarkers.push(
        new google.maps.Marker({
          position,
          title,
          map: this.map
        }))
    },

    clearMarkers() {
      this.setMapOnAll(null)
      this.allMarkers = []
    },

    setMapOnAll(map) {
      this.allMarkers.forEach(m => m.setMap(map))
    },
    
    fitToBounds() {
      if (this.markers.length === 1 ) {
        const { lat, long: lng} = this.markers[0].db_pedia;
        this.center = { lat, lng }
        this.map.setCenter(new google.maps.LatLng(lat, lng));
      } else if (this.markers.length > 1) {
        const b = new google.maps.LatLngBounds();
        this.markers.forEach(m => {
          b.extend(new google.maps.LatLng(
            m.db_pedia.lat, 
            m.db_pedia.long,
          ))
        });

        this.map.fitBounds(b);
        this.map.panToBounds(b);
      }
    },
    onIdle() {
      
    },
    onClick() {

    },
  },
  mounted: function () {
    console.log('mount map', this.mapId)
    const element = document.getElementById(this.mapId)
    const center = new google.maps.LatLng(this.center.lat, this.center.lng)
    const options = {
      center,
      zoom: this.zoom,
    } 
    this.map = new google.maps.Map(element, options);
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
  flex: 100% 1 1;
}
</style>