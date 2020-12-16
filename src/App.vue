<template>
  <div id="app">
    <header-container />
    <dropdown :items="['Abstain', 'Yes', 'No']" :hint="'Your choice'" style="margin-left: 60px;" @on-selected="select" />
    <button-comp :name="'primary'" :status="''" :type="'primary'" style="margin-top:120px; margin-left: 16px;"></button-comp>
    <button-comp :name="'primary'" :status="'running'" :type="'primary'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <button-comp :name="'primary disabled'" :status="'disabled'" :type="'primary'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <button-comp :name="'secondary'" :status="''" :type="'secondary'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <button-comp :name="'secondary'" :status="'running'" :type="'secondary'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <button-comp :name="'secondary disabled'" :status="'disabled'" :type="'secondary'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <button-comp :name="'vote'" :status="''" :type="'vote'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <button-comp :name="'vote'" :status="'running'" :type="'vote'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <button-comp :name="'vote disabled'" :status="'disabled'" :type="'vote'" style="margin-top:16px; margin-left: 16px;"></button-comp>
    <router-view></router-view>
    <footer-container />
  </div>
</template>

<script>
import Header from '@/containers/Header.vue';
import Footer from '@/containers/Footer.vue';
import Dropdown from '@/components/Dropdown.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'App',
  components: {
    'header-container': Header,
    'footer-container': Footer,
    'dropdown': Dropdown,
    'button-comp': Button,
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
