<template>
<div>
  <form novalidate @submit.stop.prevent="submit">
    <md-input-container>
      <label>Enter the url of a news article</label>
      <md-input :disabled="disabled" v-model="url"></md-input>
    </md-input-container>
  </form>
</div>  
</template>

<script>
const defaultUrl = 'https://en.wikipedia.org/wiki/Nobel_Prize'
export default {
  name: 'query-box',
  props: [
    'value',
    'submitOnMount',
    'disabled',
  ],
  data() {
    return {
      url: defaultUrl,
    }
  },
  methods: {
    submit(event) {
      this.$emit('input', this.url || defaultUrl)
    }
  },
  mounted() {
    if (this.submitOnMount) {
      this.submit()
    }
  },
}
</script>

<style scoped>
.md-input {
  border-bottom: gray solid 1px;
}
.md-input-container.md-input-focused input, .md-input-container.md-input-focused textarea, .md-input-container.md-has-value input, .md-input-container.md-has-value textarea {
  font-size: 12px;
}
.md-input-container.md-input-focused label, .md-input-container.md-has-value label {
  font-size: 10px;
}
.md-input-container {
    width: 100%;
    min-height: 28px;
    margin: 4px 0 14px;
    padding-top: 16px;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    position: relative;
}
</style>
