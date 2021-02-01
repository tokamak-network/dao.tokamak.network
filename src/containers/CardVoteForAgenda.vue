<template>
  <div class="card-vote-for-agenda">
    <modal v-if="showModal"
           :width="786"
           @on-closed="showModal=false"
    >
      <template #body>
        <modal-vote :id="id" @on-closed="showModal=false" />
      </template>
    </modal>
    <card-container :title="'Your Vote'">
      <template #body>
        <div style="padding: 15px;">
          <div class="title" style="margin: 7px 0 22px 0;">
            {{ title }} - {{ deployDate(agenda) }}
          </div>
          <button-comp :name="'Vote for this Agenda'"
                       :type="'secondary'"
                       :width="'100%'"
                       @on-clicked="openModel()"
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
import { getContractABIFromAddress, isVotableStatusOfAgenda } from '@/utils/contracts';

export default {
  components: {
    'card-container': Card,
    'button-comp': Button,
    'modal': Modal,
    'modal-vote': ModalVote,
  },
  data () {
    return {
      showModal: false,
      id: Number(this.$route.params.id),
      monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    };
  },
  computed: {
    ...mapState([
      'account',
      'web3',
    ]),
    ...mapGetters([
      'getAgendaByID',
      'agendaOnChainEffects',
    ]),
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
      return this.getAgendaByID(this.$route.params.id);
    },
    deployDate () {
      return (agenda) => {
        const date = new Date(agenda.tCreationDate * 1000);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        return this.monthNames[parseInt(month)] + ' ' + day + ', ' + year;
      };
    },
  },
  methods: {
    vote (index, address) {
      this.$router.push({
        path: `/agenda/${index}/${address}`,
      });
    },
    async openModel (){
      if(this.web3==null) {
        alert('Check Connect Wallet!');
        return;
      }
      const isVotableStatus = await isVotableStatusOfAgenda( this.id, this.web3);
      if(isVotableStatus) this.showModal=true;
      else alert('This Agenda is not in a state to vote.');
    },
  },
};
</script>

<style scoped>

</style>
