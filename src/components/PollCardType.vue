<template>
  <div class="poll-card-type">
    <div class="subject">
      Type
    </div>
    <div class="colon">
      :
    </div>
    <div class="content">
      {{ type }}
    </div>
    <div class="colon">
      |
    </div>
    <div class="subject">
      Status
    </div>
    <div class="colon">
      :
    </div>
    <div class="content">
      {{ status }}
    </div>
    <div class="colon">
      |
    </div>
    <div class="subject">
      Type
    </div>
    <div class="colon">
      :
    </div>
    <div class="content">
      {{ candidate }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
    candidate: {
      type: String,
      default: '',
    },
  },
};
</script>

<style>
.poll-card-type {
  width: 249px;
  height: 11px;
  margin: 25px 477px 6px 0;
  font-family: Roboto;
  font-size: 9px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.89;
  letter-spacing: normal;
  text-align: left;
  color: #3e495c;
}

.poll-card-type .subject {
  color: #2a72e5;
  display: inline-block;
  margin-right: 2px;
}
.poll-card-type .colon {
  color: #cfd7db;
  display: inline-block;
  margin-right: 2px;
}
.poll-card-type .content {
  color: #3e495c;
  display: inline-block;
  margin-right: 2px;
}

.Technology---Mar-23 .text-style-2 {
  color: #cfd7db;
}
</style>
