<template>
  <div class="card-resource">
    <card-container :title="'Resources'">
      <template #body>
        <div class="resource">
          <img src="@/assets/resources-icon.svg" alt=""
               width="14" height="14"
          >
          <a class="link"
             target="_blank" rel="noopener noreferrer"
             href="https://docs.google.com/presentation/d/1d1YrughbLXeQafNmWrjjz2dl9IjREe_bNIckQIMFLo8/edit?usp=sharing"
          >
            DAO User Guide
          </a>
        </div>
        <div class="resource">
          <img src="@/assets/resources-icon.svg" alt=""
               width="14" height="14"
          >
          <a class="link"
             target="_blank" rel="noopener noreferrer"
             href="https://discord.gg/SZw2WSR"
          >
            DAO Discussion (Discrod)
          </a>
        </div>
        <div class="resource">
          <img src="@/assets/resources-icon.svg" alt=""
               width="14" height="14"
          >
          <a class="link"
             target="_blank" rel="noopener noreferrer"
             href="https://tokamak.network"
          >
            Tokamak Network
          </a>
        </div>
        <div class="resource">
          <img src="@/assets/resources-icon.svg" alt=""
               width="14" height="14"
          >
          <a class="link"
             target="_blank" rel="noopener noreferrer"
             href="https://docs.tokamak.network/docs/en/guides/getting-started/how-to-set-candidate"
          >
            Candidate Registration
          </a>
        </div>
        <div class="resource">
          <img src="@/assets/resources-icon.svg" alt=""
               width="14" height="14"
          >
          <a class="link"
             target="_blank" rel="noopener noreferrer"
             href="https://www.notion.so/onther/FAQ-27a7fcfaed5047b895169930b5912cab"
          >
            Governance FAQs
          </a>
        </div>
      </template>
    </card-container>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  components: {
    'card-container': Card,
  },
};
</script>

<style lang="scss" scoped>
.card-resource {
  width: 100%;
}

.resource {
  display: flex;
  align-items: center;

  margin-left: 16px;
}
.resource a {
  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #2a72e5;

  margin-top: 1.5px;
  margin-left: 8px;

  text-decoration: none;
}
.resource a:hover {
  color: #0062C2
}
.resource:first-child {
  padding-top: 16px;
}
.resource:nth-child(2) {
  margin-top: 16px;
  margin-bottom: 16px;
}
.resource:nth-child(3) {
  margin-top: 16px;
  margin-bottom: 16px;
}
.resource:nth-child(4) {
  margin-top: 16px;
  margin-bottom: 16px;
}
.resource:last-child {
  padding-bottom: 16px;
}
</style>
