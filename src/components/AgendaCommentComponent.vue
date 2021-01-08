<template>
  <div class="agenda-comment">
    <div class="date">
      DEC 21, 2020, 22:04 UTC
    </div>
    <div class="vote-status">
      <span>
        <span class="blue">
          {{ shortAddress }}
        </span> voted
        <span class="blue">
          {{ contents.vote }}
        </span>
      </span>
    </div>
    <div class="comment">
      {{ contents.comment }}
    </div>
    <div class="divider" />
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    shortAddress () {
      return `${this.contents.account.slice(0, 7)}...${this.contents.account.slice(-4)}`;
    },
  },
};
</script>

<style scoped>
.agenda-comment {

}
.agenda-comment > div {
  font-family: Roboto;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
}
.agenda-comment > .date {
  color: #3e495c;
  font-size: 10px;
  margin-bottom: 5px;
}
.agenda-comment > .comment {
  margin: 10px 0 20px 0;
  color: #818992;
  font-size: 14px;
}
.agenda-comment > .vote-status {
  font-size: 14px;
}
.vote-status {
  display: flex;
}
.vote-status > div:nth-child(2) {
  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.vote-status > div:nth-child(2) > span {
  font-size: 14px;
  color: #86929d;

  white-space: pre-wrap;
}
.vote-status > div:nth-child(2) > .black {
  color: #3e495c;
}
.vote-status .blue {
  color: #2a72e5;
}
.divider {
  width: 100%;
  height: 1px;
  background-color: #dfe4ee;

  margin-top: 10px;
  margin-bottom: 25px;
}
</style>
