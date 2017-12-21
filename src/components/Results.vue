<template>
  <div>
    <h1>hi</h1>
<!-- <md-card>
      <md-card-header>
        <div class="md-title">
          Material Design With Vue.js Demo
        </div>

        <div class="md-subhead">
          :D
        </div>
      </md-card-header>

</md-card> -->
  <query-box v-model="url" v-on:input="updateUrl"></query-box>

    <google-map
  name="example"
  v-bind:entities="items"
></google-map>
    <!-- <md-card>
      <md-card-header>
        <div class="md-title">
          Material Design With Vue.js Demo
        </div>

        <div class="md-subhead">
          :D
        </div>
      </md-card-header>

      <md-card-content>
        <md-button class="md-raised md-primary" v-on:click.native="fillTable()">Fill Table</md-button>
        <md-button class="md-raised md-primary" v-on:click.native="clearTable()">Clear Table</md-button>
      </md-card-content>

      <md-table>
        <md-table-header>
          <md-table-row>
            <md-table-head>First name {{user.username}}</md-table-head>
            <md-table-head>Last name</md-table-head>
            <md-table-head>Email</md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="contact in contacts" v-bind:key="contact.firstName">
            <md-table-cell>{{ contact.firstName }}</md-table-cell>
            <md-table-cell>{{ contact.lastName }}</md-table-cell>
            <md-table-cell>{{ contact.email }}</md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </md-card> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import GoogleMap from './Map';
import QueryBox from './QueryBox';

console.log('google-map', GoogleMap);
export default {
  name: 'Results',
  data: function() {
    return {
      contacts: [],
      items: [],
      url: '',
    };
  },
  computed: {
    // ...mapState({
    //   user: state => state.login.user,
    // })
  },
  methods: {
    ...mapActions(['analyze', 'analyzeAndLookup']),
    updateUrl() {
      console.log('update url')
      this.analyzeAndLookup(
        this.url, //'http://www.cnn.com/2017/12/20/us/mckayla-maroney-lawsuit/index.html'
      ).then(r => {
        this.items = r;
        console.log('mount table', JSON.stringify(r.results.bindings, null, ' '));
      });
    },
  },
  components: { GoogleMap, QueryBox },
  mounted: function() {
  },
};
</script>

<style>

</style>

