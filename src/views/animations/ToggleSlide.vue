<template>
  <transition name="toggle-slide">
    <slot></slot>
  </transition>
</template>

<script>
export default {};
</script>

<style scoped>
/* 抽屉 */
.toggle-slide-leave-active,
.toggle-slide-enter-active {
  transition: all 0.6s;
}

.toggle-slide-enter,
.toggle-slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.toggle-slide-enter-to,
.toggle-slide-leave {
  max-height: 300px;
}
</style>