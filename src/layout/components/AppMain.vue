<template>
  <section class="app-main">
    <header class="page-heading">
      <breadcrumb />
      <h1>{{ pageTitle }}</h1>
    </header>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'AppMain',
  components: { Breadcrumb },
  computed: {
    key() {
      return this.$route.path
    },
    pageTitle() {
      return this.$route.meta.title || ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.app-main {
  min-height: calc(100vh - 64px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background: $pageBg;
  color: $textPrimary;
}

.page-heading {
  padding: 12px 24px 16px;
  background: $surfaceBg;
  border-bottom: 1px solid $borderColor;

  h1 {
    margin: 4px 0 0;
    color: $textPrimary;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
  }
}

.fixed-header+.app-main {
  padding-top: 64px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
