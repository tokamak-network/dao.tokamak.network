<template>
  <div class="button">
    <button :class="{
              primary: type === 'primary',
              secondary: type === 'secondary',
              vote: type === 'vote',
              hide: type === 'hide',

              running: status === 'running'
            }"
            :disabled="status === 'disabled'"
            @click="onClicked"
    >
      <span v-show="status !== 'running'"
            :disabled="status === 'disabled'"
            :class="{
              'primary-name-disabled': type === 'primary' && status === 'disabled',
              'primary-name': type === 'primary',
              'secondary-name-disabled': type === 'secondary' && status === 'disabled',
              'secondary-name': type === 'secondary',
              'vote-name-disabled': type === 'vote' && status === 'disabled',
              'vote-name': type === 'vote',
              'hide-name': type === 'hide',
            }"
      >
        {{ name }}
      </span>
      <div v-if="status === 'running'"
           class="loader" :class="{ 'loader-secondary': type === 'secondary' }"
      />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
    status: {
      type: String,
      default: '',
      validator: (value) => {
        return [
          '',
          'running',
          'disabled',
        ].indexOf(value) !== -1;
      },
    },
    type: {
      type: String,
      default: '',
      validator: (value) => {
        return [
          'primary',
          'secondary',
          'vote',
          'hide',
        ].indexOf(value) !== -1;
      },
    },
  },
  methods: {
    onClicked () {
      if (this.status !== 'running')
        this.$emit('on-clicked');
    },
  },
};
</script>

<style scoped>
button {
  width: 110px;
  height: 32px;

  border-radius: 4px;
  cursor: pointer;

  outline: none;
}
.button {
  width: 110px;
  position: relative;
}

.primary {
  background: #257eee;
  border: none;
  background-image: linear-gradient(to bottom, #1f8efa, #2a72e5);
}
.primary:hover {
  background-color: #2a72e5;
  box-shadow: 0 1px 4px 0 rgba(49, 127, 203, 0.25);
}
.primary:disabled {
  background: #e9edf1;
  cursor: not-allowed;
}
.primary:disabled:hover {
  background-color: #e9edf1;
  box-shadow: none;
}

.secondary {
  background-color: #257eee;
  border: none;
}
.secondary:hover {
  background-color: #2a72e5;
}
.secondary:disabled {
  background-color: #e9edf1;
  cursor: not-allowed;
}
.secondary:disabled:hover {
  background-color: #e9edf1;
}

.vote {
  border: solid 1px #2a72e5;
  background-color: #ffffff;
}
.vote:hover {
  background-color: #f1f6fd;
}
.vote:disabled {
  border: solid 1px #dfe4ee;
  background-color: #ffffff;

  cursor: not-allowed;
}
.vote:disabled:hover {
  border: solid 1px #dfe4ee;
  background-color: #ffffff;
}
.hide {
  border: solid 1px #dfe4ee;
  background-color: #ffffff;
}
.hide:hover {
  border: solid 1px #3e495c;
  background-color: #ffffff;
}

span {
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;

  white-space: nowrap;
}
.primary-name {
  color: #ffffff;
}
.primary-name-disabled {
  color: #86929d;
}
.secondary-name {
  color: #ffffff;
}
.secondary-name-disabled {
  color: #86929d;
}
.vote-name {
  color: #2a72e5;
}
.vote-name-disabled {
  color: #86929d;
}
.hide-name {
  color: #3e495c;
}

.running {
  cursor: not-allowed;
}

.loader {
  border: 2px solid #bdd8fc;
  border-top: 2px solid #1e6ee8;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 2s linear infinite;

  position: absolute;
  top: 0; bottom: 0; right: 0; left: 0;
  margin: auto;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader-secondary {
  border: 2px solid #86b3f1;
  border-top: 2px solid #ffffff;
}
</style>
