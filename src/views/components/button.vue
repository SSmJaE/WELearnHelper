<template>
  <div
    v-ripple
    class="my-button"
    @click="$emit('click', $event)"
    :title="title"
  >
    {{ label }}
  </div>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    label: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.my-button {
  display: inline-block;
  margin: 2px 0px;
  padding: 5px 12px;
  /* height: 20px; */
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  background-color: white;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  font-family: "华文新魏", "新宋体";
  border-radius: 4px;
  line-height: normal;
}

.my-button:hover {
  /* color: rgb(29, 161, 242); */
  background-color: rgb(229, 229, 229);
}
</style>