<template>
  <div class="agenda-info">
    <div v-if="edit===false">
      <markdown-viewer :content="agendaContents(agendaId)" />
      <div>
        <button-comp v-if="account.toLowerCase() === getAgendaByID(agendaId).creator"
                     :name="'Agenda Edit'"
                     :type="'primary'"
                     :width="'110px'"
                     @on-clicked="editButton()"
        />
      </div>
    </div>
    <div v-if="edit===true" class="edit">
      <div>
        <textarea v-model="desc" cols="30" rows="10" />
      </div>
      <div>
        <button-comp
          :name="'Edit'"
          :type="'primary'"
          :width="'110px'"
          class="left"
          @on-clicked="update()"
        />
        <button-comp
          :name="'Cancel'"
          :type="'hide'"
          :width="'110px'"
          @on-clicked="edit=false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Button from '@/components/Button.vue';
import MarkdownViewer from '@/components/MarkdownViewer.vue';
import {
  getRandomKey,
  updateAgendaContents,
} from '@/api';
import BigNumber from 'bignumber.js';

export default {
  components: {
    'button-comp': Button,
    'markdown-viewer': MarkdownViewer,
  },
  data () {
    return {
      agendaId: -1,
      edit: false,
      desc: '',
    };
  },
  computed: {
    ...mapState([
      'account',
      'web3',
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
  methods: {
    async editButton () {
      this.desc = this.agendaContents(this.agendaId);
      this.edit = true;
    },
    async update () {
      const txHash = this.getAgendaByID(this.agendaId).transactionHash;
      const sig = await this.generateSig(txHash, this.account.toLowerCase());
      await updateAgendaContents(this.account.toLowerCase(), txHash, this.desc, sig);

      this.edit = false;
      await this.$store.dispatch('launch');
    },
    async generateSig (txHash, from) {
      const randomvalue = await getRandomKey(from);
      if (randomvalue != null) {
        const randomBn = new BigNumber(randomvalue).toFixed(0);
        const soliditySha3 = await this.web3.utils.soliditySha3(
          { type: 'string', value: from },
          { type: 'uint256', value: randomBn },
          { type: 'string', value: txHash },
        );

        const sig = await this.web3.eth.personal.sign(soliditySha3, from, '');

        return sig;
      } else {
        return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.agenda-info {
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
.agenda-info > div:first-child > div:nth-child(2) {
  display: flex;
  justify-content: center;
  margin-top: 20px;
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

textarea {
    width: 100%;

    border: solid 1px #dfe4ee;
    border-radius: 4px;

    outline: none;

    padding: 8px 16px;

    font-family: Roboto;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: 0.22px;
    color: #3e495c;

    resize: none;

    &::placeholder {
      color: #86929d;
    }

    &:hover {
      border: 1px solid #c9d1d8;
    }

    &:focus {
      border: 1px solid #2a72e5;
    }
  }
.edit > div:nth-child(2) {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.left {
  margin-right: 15px;
}
</style>
