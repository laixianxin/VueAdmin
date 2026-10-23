<template>
  <div class="dashboard-container">
    <div class="welcome-card">
      <i class="el-icon-success" />
      <span>午安！</span>
    </div>
    <footer class="dashboard-footer">© {{ year }} ShadowLink</footer>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.dashboard-container {
  padding: 24px;
}

.welcome-card {
  display: flex;
  align-items: center;
  min-height: 94px;
  padding: 24px 32px;
  border: 1px solid $borderColor;
  border-radius: 4px;
  background: $surfaceBg;
  color: $textPrimary;
  font-size: 18px;
  font-weight: 600;

  i {
    margin-right: 12px;
    color: $accentText;
    font-size: 20px;
  }
}

.dashboard-footer {
  padding-top: 8px;
  color: $textSecondary;
  font-size: 16px;
  text-align: center;
}
</style>
