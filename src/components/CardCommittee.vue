<template>
  <div class="card-committee">
    <slot name="committee-body" />
  </div>
</template>

<script>
export default {
};
</script>

<style>
.card-committee {
  width: 786px;
  padding: 25px 0 25px 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 1px 0 rgba(96, 97, 112, 0.16);
  background-color: #ffffff;
}
</style>
