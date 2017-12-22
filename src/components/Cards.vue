<template>
  <div>
    <md-layout md-gutter>
      <md-layout md-flex-xsmall="100" md-flex-medium="50" md-flex-large="33" v-for="(entity,index) in cards" :key="entity.db_pedia.uri">
        <md-card class="card">
          <md-card-area>
            <md-card-media>
              <div
                class="image-container"
                :style="styleImage(index)"
              ></div>
            </md-card-media>

            <md-card-header>
              <div class="md-title">{{entity.entity.text}}</div>
              <!-- <div class="md-subhead">Subtitle here</div> -->
            </md-card-header>

            <md-card-content class="content-container">
              {{entity.db_pedia.description}}
            </md-card-content>
          </md-card-area>

        </md-card>
      </md-layout>
    </md-layout>  
  </div>
</template>

<script>
export default {
  name: 'Cards',
  props: ['entities'],
  data: function () {
    return {
    }
  },
  computed: {
    cards() {
      return this.entities.filter(e => e.db_pedia.description)
    },
  },
  methods: {
    styleImage(i) {
      console.log('index',i,this.cards, this.cards[i].db_pedia.thumb)
      return {
        height: '300px',
        'background-image': `url(${this.cards[i].db_pedia.thumb})`,
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'background-position-x': 'center',
      }
    }
  },
}
</script>

<style scoped>
  .card {
    background-color: #d35c5b;
    color: rgb(240, 232, 232);
  }
  .content-container {
    max-height: 300px;
  }
</style>