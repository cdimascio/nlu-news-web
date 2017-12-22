<template>
	<div class="demo">
  <div class="google-map" :id="mapId"></div>
  </div>
</template>

<script>
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
    markers(values, old) {
      this.updateMarkers()
    }
  },
  computed: {
    markers() {
      return this.entities
    }
  },
  methods: {
    updateMarkers() {
      this.clearMarkers()
      console.log('markers cleared')
      this.addMarkersForEntities(this.entities)
      console.log('markers added')
      this.fitToBounds()
      console.log('bounds fit')
    },
    addMarkersForEntities(entities) {
      console.log('=-=-=-', entities)
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
      console.log('FIT BOUNDS', this.markers)
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
      mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'custom_style']
      },
    } 

    this.map = new google.maps.Map(element, options);
    this.updateMarkers()

    var featureOpts = [{
        stylers: [
            { hue: '#CD5C5C' },
            { gamma: 0.5 },
            { weight: 0.5 }
        ]
    },{
        featureType: 'water',
        stylers: [
            { color: '#272b30' }
        ]
    }];

    var styledMapOptions = {
        name: 'Custom Style'
    };

    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

    this.map.mapTypes.set('custom_style', customMapType);
    this.map.setMapTypeId('custom_style');
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