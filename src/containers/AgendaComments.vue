<template>
  <div class="angenda-comments">
    <div class="title">
      <div class="comment-sec">
        Comments ({{ numComments }})
      </div>
      <!-- <dropdown :items="['latest', 'No', 'Abstain']"
                :hint="'Sort by latest'"
                :button-type="'a'"
                :selector-type="'a'"
                style="width: 150px;"
                class="dropdown"
      /> -->
    </div>
    <div class="divider" />
    <agenda-comment v-for="(comment, index) in comments" :key="index" :contents="comment" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AgendaComment from '@/components/AgendaCommentComponent.vue';
// import Dropdown from '@/components/Dropdown.vue';

export default {
  components: {
    'agenda-comment': AgendaComment,
    // 'dropdown': Dropdown,
  },
  data () {
    return {
      comments : [],
    };
  },
  computed: {
    ...mapState([
      'voteCasted',
    ]),
    numComments () {
      return this.comments.length;
    },
    classify () {
      return () => {
        this.voteCasted.forEach(async casted => casted.data.id === this.$route.params.id ? this.comments.push(casted.data) : 0);
      };
    },
  },
  created () {
    this.classify();
  },
};
</script>

<style scoped>
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
