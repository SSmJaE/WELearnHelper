<template>
  <svg
    class="arrow-down"
    :class="opened ? 'opened' : ''"
    width="24"
    height="24"
  >
    <path
      d="M12 13L8.285 9.218a.758.758 0 0 0-1.064 0 .738.738 0 0 0 0 1.052l4.249 4.512a.758.758 0 0 0 1.064 0l4.246-4.512a.738.738 0 0 0 0-1.052.757.757 0 0 0-1.063 0L12.002 13z"
      fill-rule="evenodd"
    />
  </svg>
</template>

<script>
export default {
  props: {
    opened: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
/* 旋转箭头 */
svg.arrow-down {
  position: relative;
  top: 5px;
  left: 0px;
  transition-duration: 0.6s;
}

svg.arrow-down.opened {
  transform: rotate(180deg);
}
</style>