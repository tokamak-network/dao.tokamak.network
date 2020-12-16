<template>
  <div class="dropdown">
    <div class="dropdown-btn-container" @mousedown="dropdown">
      <button class="dropdown-btn"
              :class="{
                'dropdown-btn-hint': selectedItem === hint,
                'dropdown-btn-unfolded': unfolded,
              }"
      >
        {{ selectedItem }}
      </button>
      <img v-if="unfolded"
           class="dropdown-icon"
           src="@/assets/arrow-unfolded.png" alt=""
           width="9" height="8"
      >
      <img v-else
           class="dropdown-icon"
           src="@/assets/arrow-folded.png" alt=""
           width="9" height="8"
      >
    </div>
    <div class="dropdown-content"
         :class="{ 'dropdown-content-unfolded': unfolded }"
    >
      <button v-for="(item, index) in items"
              :key="index" class="dropdown-item"
              @click="select(item)"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
    hint: {
      type: String,
      default: '',
      required: true,
    },
  },
  data () {
    return {
      selectedItem: '',
      unfolded: false,
    };
  },
  created () {
    this.selectedItem = this.hint;
  },
  mounted () {
    document.addEventListener('click', this.fold);
    document.getElementsByClassName('dropdown')[0].addEventListener('click', function (event) {
      event.stopPropagation();
    });
  },
  beforeDestroy () {
    document.removeEventListener('click', this.fold);
    document.getElementsByClassName('dropdown')[0].removeEventListener('click', function (event) {
      event.stopPropagation();
    });
  },
  methods: {
    dropdown () {
      this.unfolded = !this.unfolded;
    },
    unfold () {
      this.unfolded = true;
    },
    fold () {
      this.unfolded = false;
    },
    select (item) {
      this.selectedItem = item;
      this.fold();

      this.$emit('on-selected', item);
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;

  width: 200px;
}
.dropdown:hover .dropdown-btn {
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  cursor: pointer;
}
.dropdown:hover .dropdown-btn-container {
  cursor: pointer;
}

.dropdown-btn {
  width: 100%;
  height: 32px;

  /* text wtyles */
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: 0.2px;
  text-align: left;
  color: #86929d;

  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(96, 97, 112, 0.14);
  background: #ffffff;

  border: none;
  outline: none;

  padding-left: 16px;
}
.dropdown-btn:active {
  color: #3e495c;
}
.dropdown-btn-hint {
  color: #86929d;
}
.dropdown-btn-unfolded {
  color: #3e495c;
}

.dropdown-icon {
  position: absolute;
  top: 38%;
  right: 0;

  margin-right: 13px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background: #ffffff;

  width: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(96, 97, 112, 0.14);

  margin-top:5px;
}

.dropdown-item {
  height: 32px;

  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: 0.2px;
  text-align: left;
  color: #3e495c;

  background: #ffffff;
  border: none;
  outline: none;

  padding-left: 15px;

  border-radius: 4px;
}

.dropdown-content-unfolded {
  display: flex;
  flex-direction: column;
}

.dropdown-item:hover {
  color: #2A72E5;
  cursor: pointer;
}
</style>
