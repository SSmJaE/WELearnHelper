<template>
  <div v-show="!store.collapse" id="container-panel">
    <div
      id="container-setting-button"
      class="iconfont icon-setting"
      @click="showSetting()"
    ></div>
    <div id="container-control">
      <Button label="折叠" @click="collapsePanel()"></Button>

      <Button
        label="Github"
        onclick="window.open('https://github.com/SSmJaE/WELearnHelper','_blank')"
        title="本项目的仓库"
      ></Button>

      <Button
        label="交流群"
        onclick="window.open('https://jq.qq.com/?_wv=1027&k=5AyCT4l','_blank')"
      ></Button>

      <Button
        v-if="store.showExamQueryButton"
        id="container-check"
        label="查询"
        @click="getAnswers()"
        title="查询班级测试的答案，不一定有答案，如果没有答案，会返回每个选项的被其它同学选择的次数"
      >
      </Button>

      <Button
        v-if="store.showExamUploadButton"
        label="上传"
        @click="upload()"
        title="尝试收录任务页面的所有任务的答案，建议做完一个测试之后上传一次"
      >
      </Button>

      <!-- <Button
        label="Test"
        @click="test()"
        title="尝试收录任务页面的所有任务的答案，建议做完一个测试之后上传一次"
      >
      </Button> -->

      <!-- <Button
        id="container-comment"
        label="留言"
        @click="showComment()"
      ></Button> -->
      <!-- <Button label="test" @click="test"></Button> -->
    </div>
    <div id="container-messages">
      <div
        v-for="(message, index) in store.messages"
        :key="index"
        class="container-message"
        :class="message.type"
        @click="autoCopy(message.info)"
        v-html="message.type == 'hr' ? '<hr>' : message.info"
      >
        <!-- {{ message.info }} -->
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";

import { store } from "@src/store";
import { copyToClipboard } from "@utils/common";

import Button from "./components/Button.vue";

import { Requests } from "@src/utils/requests";
import { getAnswers } from "@src/plugins";
import { addMessage } from "@src/store/actions";

@Component({
  components: {
    Button,
  },
})
export default class Panel extends Vue {
  store = store;

  collapse = false;

  autoCopy(text: string) {
    if (store.USER_SETTINGS.autoCopy) copyToClipboard(text);
  }

  showSetting() {
    const setting = document.querySelector("#helper-setting") as HTMLElement;
    setting.style.display = setting.style.display == "" ? "none" : "";
  }

  collapsePanel() {
    this.store.collapse = false;
  }

  getAnswers() {
    getAnswers();
  }

  upload() {
    Requests.upload(true);
  }

  test() {
    addMessage([
      {
        info: "We will do everything to ___________ peace.",
        type: "normal",
      },
      { info: "preserve", type: "normal" },
      { info: "新增收录", type: "normal" },
      { info: "新增收录", type: "hr" },
    ]);

    addMessage(
      [
        "扩展已是最新版本",
        '如果本项目帮助到了你，可以为本项目点一个<a href="https://github.com/SSmJaE/WELearnHelper" target="_blank"><u>star</u></a>',
        "可以前往交流群获取使用支持",
      ],
      "info"
    );
  }
}
</script>

<style lang="postcss">
#welearn-helper {
  top: 100px;
  left: 100px;
  z-index: 99;
  position: fixed;

  min-width: 300px;
  max-width: 500px;

  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);

  font-family: Georgia, "Times New Roman", Times, serif;
  line-height: normal;

  &:not(:hover) {
    filter: brightness(98%);
  }
}

#container-title {
  cursor: grab;
  user-select: none;

  font-size: 28px;
  text-align: center;

  background: rgba(0, 0, 0, 0);
}
</style>

<style scoped lang="postcss">
#container-setting-button {
  position: absolute;
  top: 3px;
  left: 3px;

  font-size: 23px;

  cursor: pointer;

  &:hover {
    color: rgb(0, 230, 227);
  }
}

#container-control button {
  font-size: 16px;
}

#container-messages {
  /* margin: 0 10px; */
  border: black 1px solid;
  max-height: 400px;
  overflow-y: auto;

  & .error {
    color: red;
  }

  & .success {
    color: green;
  }

  & .info {
    color: #2196f3;
  }

  & hr {
    margin: 5px 0px;
  }
}

.container-message {
  font-size: 18px;
  /* white-space: pre-wrap; */
  position: relative;
  animation: content_slide_in 0.5s;
  animation-timing-function: ease-out;

  margin: 5px 10px;
  padding: 0px;
  padding-bottom: 3px;
  line-height: 120%;

  &:hover:not(hr) {
    padding-bottom: 1px;
    border-bottom: 2px solid black;
    cursor: copy;
  }
}

@keyframes content_slide_in {
  from {
    left: -50%;
    opacity: 0;
  }

  to {
    left: 0%;
    opacity: 1;
  }
}
</style>












