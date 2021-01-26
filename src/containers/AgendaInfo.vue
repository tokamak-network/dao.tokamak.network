<template>
  <div class="agenda-info">
    <!-- TODO: how to edit? -->
    <markdown-viewer :content="agendaContents(agendaId)" />
    <button-comp v-if="account === getAgendaByID(agendaId).operator"
                 :name="'Agenda Edit'"
                 :type="'primary'"
                 :width="'110px'"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Button from '@/components/Button.vue';
import MarkdownViewer from '@/components/MarkdownViewer.vue';

export default {
  components: {
    'button-comp': Button,
    'markdown-viewer': MarkdownViewer,
  },
  data () {
    return {
      agendaId: -1,
    };
  },
  computed: {
    ...mapState([
      'account',
    ]),
    ...mapGetters([
      'getAgendaByID',
      'agendaContents',
    ]),
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

<style scoped>
.agenda-info {
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #dfe4ee;

  margin-top: 10px;
  margin-bottom: 25px;
}
.resource {
  width: 100%;

  /* display: flex; */
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;

  white-space: pre-wrap;
}
.resource > div:first-child {
  /* width: 100%; */
  font-size: 16px;
  margin-bottom: 5px;
}
.resource > div:nth-child(2) {
  flex: 1;

  /* display: flex; */
  justify-content: flex-end;
  align-items: center;
}
.resource > div:nth-child(2) > img {
  margin-right: 7px;
}
.resource > div:nth-child(2) > span {
  color: #86929d;

  white-space: pre-wrap;
}
.resource > div:nth-child(2) > .black {
  color: #3e495c;
}
.resource > div:nth-child(2) > span > .blue {
  color: #2a72e5;
}
.button {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

