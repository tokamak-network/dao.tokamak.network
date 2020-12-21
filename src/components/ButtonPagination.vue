<template>
  <div class="button-pagination">
    <div class="left-btn"
         @click="prev"
    >
      <img src="@/assets/arrow-pagination-left.png" alt=""
           width="9" height="9"
      >
    </div>
    <div v-for="(page, index) in pages" :key="index"
         class="page" :class="{ 'page-selected': page === currentPage }"
         @click="select(page)"
    >
      {{ page+1 }}
    </div>
    <div class="right-btn"
         @click="next"
    >
      <img src="@/assets/arrow-pagination-right.png" alt=""
           width="9" height="9"
      >
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
      currentPage: 0,
      pageSize: 0,
      pageMax: 0,
      pages: [],
    };
  },
  created () {
    this.pageSize = 4;
    this.pageMax = parseInt(((this.datas.length) - 1) / 4 + 1);

    const num = this.pageMax > 4 ? this.pageSize : this.pageMax;
    this.pages = Array.from(Array(num).keys());
  },
  methods: {
    prev () {
      if (this.currentPage === 0) {
        return;
      }
      if (this.currentPage % this.pageSize === 0) {
        this.pages = [];
        const page = this.currentPage - 4;
        for (let i = 0; i < 4; i++) {
          this.pages.push(page + i);
        }
      }
      this.currentPage--;
    },
    next () {
      if (this.currentPage === this.pageMax - 1) {
        return;
      }
      if (this.currentPage % this.pageSize === this.pageSize - 1) {
        this.pages = [];
        for (let page = this.currentPage + 1; page < this.pageMax && this.pages.length < this.pageSize; page++) {
          this.pages.push(page);
        }
      }
      this.currentPage++;
    },
    select (page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
.button-pagination {
  display: flex;
}

.left-btn {
  width: 24px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: solid 1px #e6eaee;

  margin-right: 10px;
}
.left-btn:hover {
  border: solid 1px #3e495c;
  cursor: pointer;
}
.left-btn:hover img {
  filter: brightness(50%);
}

.right-btn {
  width: 24px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: solid 1px #e6eaee;

  margin-left: 10px;
}
.right-btn:hover {
  border: solid 1px #3e495c;
  cursor: pointer;
}
.right-btn:hover img {
  filter: brightness(50%);
}

.page {
  width: 24px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: normal;
  text-align: center;
  color: #c9d1d8;

  margin-top: 1px;
}
.page:hover {
  color: #3e495c;
  cursor: pointer;
}
.page-selected {
  color: #3e495c;
}
</style>
