<template>
<div>
  <form novalidate @submit.stop.prevent="submit">
    <md-input-container>
      <label>Enter the url of a news article</label>
      <md-input v-model="url"></md-input>
    </md-input-container>
  </form>
</div>  
</template>

<script>
export default {
  name: 'query-box',
  props: [
    'value',
  ],
  data() {
    return {
      url: '' 
    }
  },
  methods: {
    submit(event) {
      this.$emit('input', this.url)
    }
  }
}
</script>

<style scoped>
.md-input {
  border-bottom: gray solid 1px;
}
</style>
