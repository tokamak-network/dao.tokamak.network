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
            DAO Vault is Foward Fund to 0xabcd… - December 7, 2020
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
import { mapState } from 'vuex';

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
    };
  },
  computed: {
    ...mapState([
      'account',
    ]),
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
