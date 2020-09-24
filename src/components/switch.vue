<template>
  <label :style="labelStyle" class="my-switch">
    <input
      :id="id"
      ref="input"
      type="checkbox"
      :disabled="disabled"
      :style="inputStyle"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    />
    <span id="switch"></span>
    <span id="slider"></span>
  </label>
</template>

<script>
export default {
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 50,
    },
    height: {
      type: Number,
      default: 25,
    },
    id: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    labelStyle() {
      return {
        width: this.width + "px",
        height: this.height + "px",
      };
    },
    inputStyle() {
      return {};
    },
  },
};
</script>

<style scoped>
/* 限定label标签属性，也就是checkbox的包装器 */
label {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
  /* margin: 2px 5px;
    border: black 1px solid; */
  border-radius: 38px;
  /* vertical-align: middle; */
}

/* 不显示checkbox本身，通过点击外部的label实现点击input的效果 */
label input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* 未选中，滑条效果 */
#slider {
  position: absolute;
  z-index: 11;
  /* cursor: pointer; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
  border-radius: 38px;
  background-color: rgb(234, 234, 234);
}

/* 未选中，点击时滑条效果 */
input:not(:checked):active ~ #slider {
  background-color: rgb(187, 187, 187);
}

/* 选中时，滑条效果 */
input:checked ~ #slider {
  background-color: #2196f3;
}

#switch {
  position: absolute;
  z-index: 12;
  height: 23px;
  width: 23px;
  left: 1px;
  bottom: 1px;
  background-color: white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 0 rgba(0, 0, 0, 0.08);
  border-radius: 50%;
}

/* 未选中，点击时滑块效果 */
input:active + #switch {
  border-radius: 38px;
  animation-name: widen_to_right;
  animation-duration: 0.4s;
  animation-fill-mode: forwards;
}

/* 已选中，点击时滑块效果 */
input:checked:active + #switch {
  animation-name: widen_to_left;
  animation-duration: 0.4s;
  animation-fill-mode: forwards;
}

/* 滑块点击右移效果 */
input:checked + #switch {
  animation-name: slide_to_right;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

/* 滑块点击左移效果 */
input:not(:checked):not(:active) + #switch {
  left: 1%;
  animation-name: slide_to_left;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

@keyframes slide_to_right {
  0% {
    width: 36px;
  }

  /* 80% { */
  /* border-radius: 10px; */
  /* } */

  100% {
    left: 26px;
  }
}

@keyframes slide_to_left {
  0% {
    width: 36px;
  }

  /* 80% { */
  /* border-radius: 10px; */
  /* } */

  100% {
    left: 1%;
  }
}

@keyframes widen_to_right {
  100% {
    width: 36px;
  }
}

@keyframes widen_to_left {
  0% {
    left: 26px;
  }

  100% {
    left: 13px;
    width: 36px;
  }
}
</style>
