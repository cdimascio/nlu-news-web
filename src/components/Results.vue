<template>
  <div class="full-height">
    <query-box v-model="url" v-on:input="updateUrl"></query-box>
    <div v-if="marker">
      <cards :entities="entities" :geo-entities="markers"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import GoogleMap from './Map'
import QueryBox from './QueryBox'
import Cards from './Cards'

export default {
  name: 'Results',
  data: function() {
    return {
      entities: [],
      url: '',
    };
  },
  computed: {
    markers() {
      const hasGeo = e => e.db_pedia.lat && e.db_pedia.long
      return this.entities.filter(hasGeo)
    },
    marker() {
      const hasThumb = e => e.db_pedia.thumb
      const m = this.entities.filter(hasThumb)
      return m.length > 0 ? m[0] : null
    }
  },
  methods: {
    ...mapActions(['analyzeAndLookup']),
    updateUrl() {
      this.analyzeAndLookup(this.url).then(r => {
        this.entities = r;
      });
    },
  },
  components: { 
    GoogleMap,
    QueryBox,
    Cards
  },
};
</script>

<style scoped>
.full-height {
	height: 100%;
	display: flex;
	flex-direction: column;
  min-height: 400px;
}
</style>

