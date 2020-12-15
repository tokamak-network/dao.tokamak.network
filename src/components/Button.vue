<template>
  <div class="button">
    <button
      :class="{
        secondary: type === 'secondary',
        vote: type === 'vote'
      }"
      :disabled="status === 'disabled'"
      @click="onClicked"
    >
      <!-- <div v-if="status === 'running'" class="loader" /> -->
      <span
        :disabled="status === 'disabled'"
        :class="{
          'secondary-name-disabled': type === 'secondary' && status === 'disabled',
          'secondary-name': type === 'secondary',
          'vote-name-disabled': type === 'vote' && status === 'disabled',
          'vote-name': type === 'vote',
        }"
      >
        {{ name }}
      </span>
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
        ].indexOf(value) !== -1;
      },
    },
  },
  methods: {
    onClicked () {
      this.$emit('on-clicked');
    },
  },
};
</script>

<style scoped>
button {
  min-width: 124px;
  min-height: 32px;

  border-radius: 4px;

	border: none;
	cursor: pointer;
}
.secondary {
  background-color: #257eee;
  outline: none;
}
.secondary:hover {
  background-color: #2a72e5;
}
.secondary:disabled {
  border: solid 1px #dfe4ee;
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

.loader {
  border: 3px solid #bdd8fc;
  border-top: 3px solid #1e6ee8;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
