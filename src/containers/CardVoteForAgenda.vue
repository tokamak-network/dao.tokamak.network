<template>
  <div class="card-vote-for-agenda">
    <modal v-if="showModal"
           :width="$mq === 'mobile' ? '90%': '786px'"
           @on-closed="showModal = false"
    >
      <template #body>
        <modal-vote :id="Number(agendaId)" @on-closed="showModal = false" />
      </template>
    </modal>
    <card-container :title="'Your Vote'">
      <template #body>
        <div class="vote-for-agenda" style="padding: 15px;">
          <div class="title" style="margin: 7px 0 22px 0;">
            {{ agendaTitle(agendaId) }}
          </div>
          <button-comp :name="'Vote for this Agenda'"
                       :type="'voteV2'"
                       :status="status"
                       :width="'100%'"
                       @on-clicked="showModal = true;"
          />
        </div>
      </template>
    </card-container>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';
import Modal from '@/components/Modal.vue';
import ModalVote from '@/containers/ModalVote.vue';
import { mapState, mapGetters } from 'vuex';
import { getContractABIFromAddress } from '@/utils/contracts';

export default {
  components: {
    'card-container': Card,
    'button-comp': Button,
    'modal': Modal,
    'modal-vote': ModalVote,
  },
  data () {
    return {
      agendaId: -1,
      showModal: false,
    };
  },
  computed: {
    ...mapState([
      'account',
      'web3',
      'members',
    ]),
    ...mapGetters([
      'getAgendaByID',
      'agendaOnChainEffects',
      'agendaTitle',
      'canVoteForAgenda',
    ]),
    status () {
      if (!this.account) {
        return 'disabled';
      }

      const agenda = this.agenda;
      if (!agenda) {
        return 'disabled';
      }
      return this.canVoteForAgenda(agenda) ? '' : 'disabled';
    },
    target () {
      const onChainEffects = this.agendaOnChainEffects(this.agenda.agendaid);
      if (!onChainEffects || onChainEffects.length === 0) return '';

      return onChainEffects[0].target;
    },
    title () {
      const abi = getContractABIFromAddress(this.target);
      if (!abi || abi.length === 0) return '';
      return abi[0].title;
    },
    agenda () {
      return this.getAgendaByID(this.agendaId);
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
.vote-for-agenda {
  font-family: Roboto;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
}
</style>
