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
              <div class="md-subhead sub-head-wrapper">
                <div class="left">{{entity.entity.type}}</div>
                <div class="right">{{topEmotion[entity.entity.text][0].emotion}} ({{topEmotion[entity.entity.text][0].value}})</div>
              </div>
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
  props: [
    'entities'
  ],
  computed: {
    cards() {
      const hasDescription = e => e.db_pedia.description
      return this.entities.filter(hasDescription)
    },
    topEmotion() {
      const byScore = (a, b) => a.value < b.value
      return this.entities.reduce((o, e) => {
        const { emotion, text } = e.entity;
        const a = Object
          .keys(emotion)
          .map(k => ({ value: emotion[k], emotion: k }))
          .sort(byScore)
        o[text] = a
        return o
      }, {})
    }
  },
  methods: {
    styleImage(i) {
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
  .sub-head-wrapper{position:relative;}
  .right,.left{width:50%; position:absolute;}
  .right{right:0; text-align: right;}
  .left{left:0;}
</style>