<template>
  <div class="header" :class="{ 'header-sub': isSub }">
    <modal v-if="showModal"
           :width="390"
           @on-closed="showModal=false"
    >
      <template #body>
        <modal-claim @on-closed="showModal=false" />
      </template>
    </modal>
    <div class="logo" @click="$route.path !== '/' ? $router.push({ path: '/' }) : ''">
      <img v-if="isSub" src="@/assets/logo-sub.png" alt="">
      <img v-else src="@/assets/logo.png" alt="">
    </div>
    <div class="menu">
      <router-link :to="'/election'"
                   class="menu-item" :class="{ 'menu-item-sub': isSub, selected: $route.path.includes('election') }"
      >
        Election
      </router-link>
      <router-link :to="'/propose'"
                   class="menu-item" :class="{ 'menu-item-sub': isSub, selected: $route.path.includes('propose') }"
      >
        Propose
      </router-link>
      <router-link :to="'/agenda'"
                   class="menu-item" :class="{ 'menu-item-sub': isSub, selected: $route.path.includes('agenda') }"
      >
        Agenda
      </router-link>
      <connect-wallet :is-sub="isSub" />
      <div v-if="account!=='' && checkRoute === true">
        <button
          class="claim"
          @click="showModal=true"
        >
          Claim
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Connect from '@/components/Connect.vue';
import Modal from '@/components/Modal.vue';
import ModalClaim from '@/containers/ModalClaim.vue';
import { mapState } from 'vuex';

export default {
  components: {
    'connect-wallet': Connect,
    'modal': Modal,
    'modal-claim': ModalClaim,
  },
  data () {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapState([
      'account',
    ]),
    isSub () {
      return this.$route.path !== '/';
    },
    checkRoute () {
      if (this.$route.path === '/') {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;

  height: 84px;
  background: #0062c2;
  padding-left: 40px;
  padding-right: 40px;
}

.header-sub {
  background: #fafbfc;
}

.logo {
  display: flex;
  align-items: center;

  z-index: 1;

  &:hover {
    cursor: pointer;
  }
}

button {
  width: 76px;
  height: 35px;
  padding: 8px 20px;
  margin-left: 15px;
  border-radius: 19px;
  border: solid 1px #6c9ed0;
  background: #0062c2;
  outline: none;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #a6c8e9
}
button:hover {
  cursor: pointer;
}

.logo img {
  width: 306px;
  height: 30px;
}

.menu {
  display: flex;
  align-items: center;

  z-index: 1;
}

.menu-item {
  /* font styles */
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;

  margin-right: 76px;
  text-decoration: none;
}

.menu-item-sub {
  color: #3e495c;
}

.menu-item-sub:hover {
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #2a72e5;
}

.selected {
  color: #2a72e5;
}

@media all and (max-width: 360px) {
}

@media all and (min-width: 361px) and (max-width: 1024px) {
  .header {
    padding-left: 25px;
    padding-right: 25px;
  }

  .menu-item {
    margin-right: 50px;
  }
}
</style>
