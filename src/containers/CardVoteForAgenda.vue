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
            DAO Vault is Foward Fund to 0xabcd… - {{ deployDate(agenda) }}
          </div>
          <button-comp :name="'Vote for this Agenda'"
                       :type="'secondary'"
                       :width="'100%'"
                       @on-clicked="showModal=true"
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
      id: Number(this.$route.params.address),
      monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    };
  },
  computed: {
    ...mapState([
      'account',
    ]),
    ...mapGetters([
      'getAgendaByID',
    ]),
    agenda () {
      return this.getAgendaByID(this.$route.params.address);
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
  },
};
</script>

<style scoped>

</style>
