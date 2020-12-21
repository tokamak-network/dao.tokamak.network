<template>
  <div id="app">
    <mobile-header-container v-if="$mq === 'mobile'" />
    <header-container v-else />
    <vote-poll :pct="10" :remain="true"></vote-poll>
    <vote-poll :pct="30"></vote-poll>

    <div style="display: flex; margin-top: 60px;">
      <dropdown :items="['Abstain', 'Yes', 'No']" :hint="'Your choice'" style="margin-left: 60px;" :button-type="'a'" :selector-type="'a'" @on-selected="select" />
      <dropdown :items="['Abstain', 'Yes', 'No']" :hint="'Your choice'" style="margin-left: 60px;" :button-type="'a'" :selector-type="'b'" @on-selected="select" />
      <dropdown :items="['Abstain', 'Yes', 'No']" :hint="'Your choice'" style="margin-left: 60px;" :type="'a'" :disabled="true" @on-selected="select" />
    </div>
    <div>
      <dropdown :items="['Abstain', 'Yes', 'No']" :hint="'Your choice'" style="margin-top: 120px; margin-left: 60px;" :button-type="'b'" :selector-type="'a'" @on-selected="select" />
      <dropdown :items="['Abstain', 'Yes', 'No']" :hint="'Your choice'" style="margin-top: 120px; margin-left: 60px;" :button-type="'b'" :selector-type="'b'" @on-selected="select" />
      <dropdown :items="['Abstain', 'Yes', 'No']" :hint="'Your choice'" style="margin-top: 120px; margin-left: 60px;" :type="'b'" :disabled="true" @on-selected="select" />
    </div>
    <button-comp-step :name="'PREV NAME'" :status="''" :type="'prev'" style="margin-top: 120px; margin-left: 16px;"></button-comp-step>
    <button-comp-step :name="'NEXT NAME'" :status="''" :type="'next'" style="margin-top: 16px; margin-left: 16px;"></button-comp-step>
    <button-comp :name="'primary'" :status="''" :type="'primary'" style="margin-top: 16px; margin-left: 16px;"></button-comp>
    <button-comp :name="'primary'" :status="'running'" :type="'primary'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <button-comp :name="'primary disabled'" :status="'disabled'" :type="'primary'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <button-comp :name="'secondary'" :status="''" :type="'secondary'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <button-comp :name="'secondary'" :status="'running'" :type="'secondary'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <button-comp :name="'secondary disabled'" :status="'disabled'" :type="'secondary'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <button-comp :name="'vote'" :status="''" :type="'vote'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <button-comp :name="'vote'" :status="'running'" :type="'vote'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <button-comp :name="'vote disabled'" :status="'disabled'" :type="'vote'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <button-comp :name="'hide'" :type="'hide'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <router-view />
    <mobile-footer-container v-if="$mq === 'mobile'" />
    <footer-container v-else />
  </div>
</template>

<script>
import Header from '@/containers/Header.vue';
import Footer from '@/containers/Footer.vue';
import MobileHeader from '@/containers/MobileHeader.vue';
import MobileFooter from '@/containers/MobileFooter.vue';
import Dropdown from '@/components/Dropdown.vue';
import Button from '@/components/Button.vue';
import ButtonStep from '@/components/ButtonStep.vue';
import VotePoll from '@/components/VotePoll.vue';

export default {
  name: 'App',
  components: {
    'header-container': Header,
    'footer-container': Footer,
    'mobile-header-container': MobileHeader,
    'mobile-footer-container': MobileFooter,
    'dropdown': Dropdown,
    'button-comp': Button,
    'button-comp-step': ButtonStep,
    'vote-poll': VotePoll,
  },
  methods: {
    select (item) {
      alert(item);
    },
  },
};
</script>

<style>
body { margin: 0 !important; }

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
