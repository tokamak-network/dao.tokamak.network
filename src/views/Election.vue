<template>
  <div class="election">
    <div class="filters">
      Filters
    </div>
    <div class="polls">
      <poll-card></poll-card>
    </div>
  </div>
</template>

<script>
import PollCard from '@/components/PollCard.vue';
export default {
  components:{
    'poll-card': PollCard,
  },
};
</script>

<style scoped>
.election {
  /* all the `views` have to has this attribue  */
  flex: 1;
  /* width: 846px;
  height: 865px;
  opacity: 0.5; */
}
</style>
