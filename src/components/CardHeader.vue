<template>
  <div class="card-header">
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
      Elected
    </div>
    <div class="colon">
      :
    </div>
    <div class="content">
      <a
        class="link"
        target="_blank"
        rel="noopener noreferrer"
        :href="href(elected)"
      >{{ shortAddress(elected) }}</a>
    </div>
    <div class="colon">
      |
    </div>
    <div class="subject">
      # of Votes
    </div>
    <div class="colon">
      :
    </div>
    <div class="content">
      {{ votes }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: '',
    },
    elected: {
      type: String,
      default: '',
    },
    votes: {
      type: String,
      default: '',
    },
  },
  methods: {
    href (address) {
      return 'https://etherscan.io/address/' + address;
    },
    shortAddress (account) {
      return `${account.slice(0, 7)}...`;
    },
  },
};
</script>

<style>
.card-header {
  /* width: 249px; */
  height: 11px;
  margin: 0 0 12px 0;
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
.card-header .subject {
  color: #2a72e5;
  display: inline-block;
  margin-right: 2px;
}
.card-header .colon {
  color: #cfd7db;
  display: inline-block;
  margin-right: 2px;
}
.card-header .content {
  color: #3e495c;
  display: inline-block;
  margin-right: 2px;
}
.card-header .content .link {
  text-decoration: underline;
  color: #3e495c;
}
</style>
