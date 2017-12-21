<template>
<form novalidate @submit.stop.prevent="submit">
  <md-input-container>
    <label>Enter a Url</label>
    <md-input v-model="url"></md-input>
  </md-input-container>
</form>  
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
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>
.md-input {
      border-bottom: gray solid 1px;
}
</style>
