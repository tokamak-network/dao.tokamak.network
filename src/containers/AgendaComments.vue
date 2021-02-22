<template>
  <div class="angenda-comments">
    <div class="title">
      <div class="comment-sec">
        Comments ({{ numComments }})
      </div>
    </div>
    <div class="divider" />
    <agenda-comment v-for="comment in comments(agendaId)" :key="comment.transactionHash"
                    :voted-at="comment.blockNumber"
                    :vote="String(comment.vote)"
                    :voter="comment.voter"
                    :comment="comment.comment"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import AgendaComment from '@/components/AgendaCommentComponent.vue';
// import Web3 = require('web3');

export default {
  components: {
    'agenda-comment': AgendaComment,
  },
  data () {
    return {
      agendaId: -1,
    };
  },
  computed: {
    ...mapState([
      'web3',
    ]),
    ...mapGetters([
      'comments',
    ]),
    numComments () {
      return this.comments(this.agendaId) ? this.comments(this.agendaId).length : 0;
    },
  },
  watch: {
    '$route.params.id': {
      handler: async function () {
        this.agendaId = this.$route.params.id;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.divider {
  width: 100%;
  height: 1px;
  background-color: #dfe4ee;

  margin-top: 10px;
  margin-bottom: 25px;
}
.title {
  display: flex;
  /* height: 30px; */
}
.title > div:first-child {
  display: flex;
  justify-content: space-between;
}
.title .dropdown {
  /* width:150px; */
  /* display: flex; */
  /* align-self: flex-end; */
  margin-bottom: 10px;
}
</style>
