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
  import { mapState, mapActions } from 'vuex'
  import GoogleMap from './Map'

console.log('google-map',GoogleMap)
  export default {
    name: 'Table',
    data: function() {
      return {
        contacts: [],
        items: [],
      }
    },
    computed: {
      // ...mapState({
      //   user: state => state.login.user,
      // })
    },
    methods: {
      ...mapActions([
        'analyze',
        'analyzeAndLookup',
      ])
      // fillTable: function() {
      //   console.log(this.user)
      //   this.contacts.push({firstName: 'Eron', lastName: 'Castro', email: 'eroncastro@test.com'});
      //   this.contacts.push({firstName: 'Eron2', lastName: 'Castro', email: 'eroncastro2@test.com'});
      //   this.contacts.push({firstName: 'Eron3', lastName: 'Castro', email: 'eroncastro3@test.com'});
      //   console.log(contacts);
      // },
      // clearTable: function() {
      //   this.contacts.splice(0, this.contacts.length);
      // }
    },
    components: { GoogleMap },
    mounted: function() {
      this.analyzeAndLookup('http://www.cnn.com/2017/12/20/us/mckayla-maroney-lawsuit/index.html').then(r => {
        this.items = r
        console.log('mount table', JSON.stringify(r.results.bindings, null, ' '))
      })
    }
  }
</script>

<style>

</style>


<!--
<template>
  <div>
    <google-map
      name="example"
    ></google-map>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  // import Map from './Map'

  // console.log(Map)

  export default {
    name: 'google-map',
    props: ['name'],
    data: function () {
      return {
        mapName: this.name + "-map",
      }
    },
    mounted: function () {
      const element = document.getElementById(this.mapName)
      const options = {
        zoom: 14,
        center: new google.maps.LatLng(51.501527,-0.1921837)
      }
      const map = new google.maps.Map(element, options);
    }
  };
</script>

<style>

</style>
-->