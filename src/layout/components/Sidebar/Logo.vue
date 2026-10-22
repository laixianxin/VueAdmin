<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <span class="brand-mark">T</span>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <span class="brand-mark">T</span>
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Transocks'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: $sideBarLogoHeight;
  line-height: $sideBarLogoHeight;
  background: $menuBg;
  text-align: left;
  overflow: hidden;
  padding: 0 18px;

  & .sidebar-logo-link {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;

    & .brand-mark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 36px;
      height: 36px;
      margin-right: 14px;
      border-radius: 10px;
      color: #062239;
      background: linear-gradient(135deg, #20d4a2, #1689ff);
      font-size: 22px;
      font-weight: 800;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: $textPrimary;
      font-weight: 600;
      line-height: $sideBarLogoHeight;
      font-size: 20px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    padding: 0 9px;

    .brand-mark {
      margin-right: 0;
    }
  }
}
</style>
