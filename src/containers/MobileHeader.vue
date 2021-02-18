<template>
  <div class="mobile-header"
       :style="[
         !isSub() ? { background: '#0062c2' } : { background: '#fafbfc' },
       ]"
  >
    <modal v-if="showModalClaim"
           :width="'90%'"
           :mobile="true"
    >
      <template #body>
        <modal-claim @on-closed="showModalClaim=false" />
      </template>
    </modal>
    <div v-if="$mq === 'mobile' && isOpen" class="menu-container">
      <img class="close-btn" src="@/assets/burger-close-icon.svg" alt="" @click="isOpen = false;">
      <div class="menu-btn" @click="route('/'); isOpen = false;">Home</div>
      <div class="menu-btn" @click="route('/election'); isOpen = false;">Election</div>
      <div class="menu-btn" @click="route('/propose'); isOpen = false;">Propose</div>
      <div class="menu-btn" @click="route('/agenda'); isOpen = false;">Agenda</div>
      <div v-if="account !== '' && isCandidate"
           class="claim-btn"
           @click="showModalClaim=true;"
      >
        Claim
      </div>
    </div>
    <div class="logo">
      <img v-if="!isSub()"
           src="@/assets/mobile-logo.png" alt=""
           width="105" height="30"
           @click="route('/');"
      >
      <img v-else
           src="@/assets/mobile-logo-colored.svg" alt=""
           width="105" height="30"
           @click="route('/');"
      >
    </div>
    <div class="menu">
      <connect-wallet :is-sub="isSub()" />
      <img v-if="!isSub()"
           class="menu-icon"
           src="@/assets/mobile-menu.png" alt=""
           width="30" height="30"
           @click="isOpen = true;"
      >
      <img v-else
           class="menu-icon"
           src="@/assets/mobile-menu-colored.svg" alt=""
           width="30" height="30"
           @click="isOpen = true;"
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Connect from '@/components/Connect.vue';
import Modal from '@/components/Modal.vue';
import ModalClaim from '@/containers/ModalClaim.vue';

export default {
  components: {
    'modal': Modal,
    'modal-claim': ModalClaim,
    'connect-wallet': Connect,
  },
  data () {
    return {
      isOpen: false,
      showModal: false,
      showModalClaim: false,
    };
  },
  computed: {
    ...mapState([
      'account',
    ]),
    ...mapGetters([
      'isCandidate',
    ]),
  },
  methods: {
    route (path) {
      if (this.$route.path === path) {
        return;
      }
      this.$router.push({ path });
    },
    isSub () {
      return this.$route.path !== '/';
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile-header {
  display: flex;
  justify-content: space-between;

  height: 84px;
  padding-left: 20px;
  padding-right: 10px;
}

.logo {
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
}

.menu {
  display: flex;
  align-items: center;
}

img {
  margin-left: 10px;
  margin-right: 10px;
}

.menu-icon {
  cursor: pointer;
}

.menu-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;

  z-index: 999;

  min-height: 100vh;
  max-height: 100vh;

  background: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  .menu-btn {
    font-family: Roboto;
    font-size: 36px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.50;
    letter-spacing: normal;
    text-align: center;
    color: #000000;

    &:hover {
      cursor: pointer;
    }
  }

  .claim-btn {
    display: flex;
    justify-content: center;
    align-items: center;

  width: 200px;
    height: 50px;
    margin: 0 7px 10px;
    padding: 12px 74px;
    border-radius: 25px;
    background-color: #257eee;

    font-family: Roboto;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.3;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;

    position: absolute;
    bottom: 20px;

    &:hover {
      cursor: pointer;
    }
  }

  .close-btn {
    position: absolute;
    top: 28px;
    right: 10px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
