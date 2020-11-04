<template>
  <div id="container-setting-base">
    <div v-for="(section, index) in sections" :key="index" class="section">
      <hr v-if="index !== 0" />
      <div class="title" @click="section.display = !section.display">
        {{ section.title }}
        <svg
          class="arrow-down"
          :class="section.display ? 'opened' : ''"
          width="24"
          height="24"
        >
          <path
            d="M12 13L8.285 9.218a.758.758 0 0 0-1.064 0 .738.738 0 0 0 0 1.052l4.249 4.512a.758.758 0 0 0 1.064 0l4.246-4.512a.738.738 0 0 0 0-1.052.757.757 0 0 0-1.063 0L12.002 13z"
            fill-rule="evenodd"
          />
        </svg>
      </div>
      <transition name="toggle-slide">
        <div v-show="section.display" class="body">
          <div
            v-for="setting in section.settings"
            :key="setting.id"
            class="record"
          >
            <label class="record-left" :for="setting.id">{{
              setting.name
            }}</label>
            <div class="record-middle">
              <template v-if="setting.type === 'readonly'">
                <div class="readonly">
                  {{ Global.USER_SETTINGS[setting.id] }}
                </div>
              </template>
              <template v-else-if="setting.type === 'switch'">
                <my-switch
                  :id="setting.id"
                  v-model="Global.USER_SETTINGS[setting.id]"
                ></my-switch>
              </template>
              <template v-else>
                <input
                  :id="setting.id"
                  class="input"
                  :value="Global.USER_SETTINGS[setting.id]"
                  @input="
                    Global.USER_SETTINGS[setting.id] = $event.target.value
                  "
                />
              </template>
            </div>
            <div class="record-right">
              {{ setting.description }}
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="container-setting-footer">
      <button @click="saveChange">保存 & 刷新</button>
      <button @click="setDefault">还原默认值</button>
    </div>
  </div>
</template>

<script>
/* global GM_setValue */

import Switch from "./components/switch";

import { Global, VERSION } from "../global";
import { controlCenter, returnDefaultValues } from "../settings";
import { Requests } from "@plugins/index";

export default {
  components: {
    "my-switch": Switch,
  },
  data() {
    return {
      Global: Global,
      version: VERSION,
      sections: controlCenter,
    };
  },
  created() {
    Requests.initial();
    Requests.updatePoints();
  },
  methods: {
    saveChange() {
      GM_setValue("USER_SETTINGS", JSON.stringify(Global.USER_SETTINGS));
      location.reload(true);
    },
    setDefault() {
      returnDefaultValues();
    },
  },
};
</script>

<style scoped>
#container-setting-base {
  display: none;
  position: fixed;

  top: 20%;
  left: 50%;
  width: 700px;
  margin: 20px;
  z-index: 101;

  font-size: 16px;
  line-height: 100%;

  background: rgba(255, 255, 255, 0.95);
  border: black 2px solid;
  border-radius: 20px;

  transform: translate(-50%, 0%);
  animation: slide_in 0.8s;
  animation-timing-function: ease-out;
}

@keyframes slide_in {
  from {
    left: 0%;
    opacity: 0;
  }

  80% {
    left: 53%;
  }

  to {
    left: 50%;
    opacity: 1;
  }
}

div.section {
  margin: 0 10px;
}

div.title {
  text-align: center;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 5px;
}

div.body {
  overflow: hidden;
}

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
/* -------------------- */

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
/* -------------------- */

div.record {
  display: table-row;
  text-align: center;
  margin: 5px 0px;
  padding: 5px;
}

.record-left {
  display: table-cell;
  cursor: pointer;
  width: 80px;
}

/* 中间部分居中对齐的实现 */
.record-middle {
  display: table-cell;
  text-align: center;
  min-width: 100px;
  max-width: 100px;
  min-height: 25px;
  margin: 2px 5px;
  padding: 0px;
}

.record-middle .input {
  width: 80px;
  height: 21px;
  text-align: center;
  font-size: 16px;
}

.record-middle .my-switch {
  vertical-align: middle;
  margin: 2px 5px;
}

.record-middle .readonly {
  min-height: 25px;
  margin-top: 5px;
}
/* -------------------- */

.record-right {
  display: table-cell;
  text-align: left;
}

hr {
  margin: 5px;
}

.container-setting-footer {
  display: flex;
  justify-content: center;
  /* justify-content: flex-end; */
  margin: 5px 0;
}
.container-setting-footer button {
  margin: 0 5px;
}

/* #container-setting-save {
  position: relative;
  margin: 5px;
  left: 50%;
  transform: translate(-55%, 5%);
} */
</style>
