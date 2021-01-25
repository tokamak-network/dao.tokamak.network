<template>
  <div class="markdown-viewer">
    <div class="markdown" v-html="markdown"></div> <!-- eslint-disable-line --> <!-- use dompurify library to prevent XSS attack -->
  </div>
</template>

<script>
import marked from 'marked';
import DOMPurify from 'dompurify';

export default {
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  computed: {
    markdown () {
      return DOMPurify.sanitize(marked(this.content));
    },
  },
};
</script>

<style lang="scss" scoped>
.markdown-viewer {

  .markdown {
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
  }
}
</style>
