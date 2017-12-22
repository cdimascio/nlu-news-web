<template>
<div>
<form novalidate @submit.stop.prevent="submit">
  <md-input-container>
    <label>Enter a Url</label>
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
      console.log(this.url, event.target)
      console.log('EMIT', event.target.value)
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
