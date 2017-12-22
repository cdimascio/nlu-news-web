<template>
  <div class="demo">
    <query-box v-model="url" v-on:input="updateUrl"></query-box>
    <md-layout md-gutter v-if="marker">
      <md-layout md-column md-gutter>
        <md-layout md-flex="50">
          <cards :entities="entities"/>
        </md-layout>
        <md-layout class="demo" >
          <google-map name="example" :entities="markers"></google-map>
        </md-layout>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
      return this.entities
        .filter(e => e.db_pedia.lat && e.db_pedia.long)
    },
    marker() {
      const m = this.entities.filter(e => e.db_pedia.thumb)
      console.log('----',m)
      return m.length > 0 ? m[0] : null
    }
  },
  methods: {
    ...mapActions(['analyzeAndLookup']),
    updateUrl() {
      console.log('update url', this.url)
      this.analyzeAndLookup(
        this.url,
      ).then(r => {
        this.entities = r;
      });
    },
  },
  components: { GoogleMap, QueryBox, Cards },
};
</script>

<style scoped>
.entity-card {
  height: 50%;
  width: 50%;
}
.demo {
	height: 100%;
	display: flex;
	flex-direction: column;
}
</style>

