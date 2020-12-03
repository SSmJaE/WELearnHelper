<template>
  <div v-show="Global.collapse" id="container-panel">
    <div
      id="container-setting-button"
      class="iconfont icon-setting"
      @click="showSetting()"
    ></div>
    <div id="container-control">
      <my-button
        v-if="Global.showExamQueryButton"
        id="container-check"
        label="查询"
        @click="retrieveAllQuestions()"
        title="查询班级测试的答案，不一定有答案，如果没有答案，会返回每个选项的被其它同学选择的次数"
      >
      </my-button>
      <my-button
        v-if="Global.showExamUploadButton"
        label="上传"
        @click="upload()"
        title="尝试收录任务页面的所有任务的答案，1小时仅能上传一次，建议做完一个测试之后上传一次"
      >
      </my-button>
      <my-button
        label="Github"
        onclick="window.open('https://github.com/SSmJaE/WELearnHelper','_blank')"
        title="本项目的仓库"
      ></my-button>
      <my-button
        id="container-comment"
        label="留言"
        @click="showComment()"
      ></my-button>
      <!-- <my-button label="test" @click="test"></my-button> -->
      <my-button label="折叠" @click="collapsePanel()"></my-button>
      <my-button
        label="交流群"
        onclick="window.open('https://jq.qq.com/?_wv=1027&k=5AyCT4l','_blank')"
      ></my-button>
    </div>
    <div id="container-messages">
      <div
        v-for="(message, index) in Global.messages"
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

<script >
/* global GM_setClipboard */
import Swal from "sweetalert2";

import { Global } from "../global";
import { retrieveAllQuestions, Requests } from "@plugins/index";

import Button from "./components/button";

export default {
  components: { "my-button": Button },
  data: function () {
    return {
      Global: Global,
    };
  },
  computed: {
    points() {
      return this.Global.points;
    },
  },
  methods: {
    retrieveAllQuestions() {
      console.log(111);
      retrieveAllQuestions();
      console.log(222);
    },
    autoCopy: function (text) {
      if (Global.USER_SETTINGS.autoCopy)
        GM_setClipboard(text.replace(/^.*、/, ""), "text");
    },
    async showComment() {
      const { value: text } = await Swal.fire({
        title: "留言",
        input: "textarea",
        inputPlaceholder:
          "期待大家的反馈，如果有任何问题，都可以给我留言，我会定期查看。最好留下联系方式，方便后续交流。",
        confirmButtonText: "发送",
        width: 600,
      });

      if (text) Requests.sendComment(text);
    },
    showSetting() {
      const settingBase = document.querySelector("#container-setting-base");
      settingBase.style.display =
        settingBase.style.display == "table" ? "none" : "table";
    },
    test() {
      [
        {
          info: "We will do everything to ___________ peace.",
          type: "normal",
        },
        { info: "preserve", type: "normal" },
        { info: "新增收录", type: "normal" },
        { info: "新增收录", type: "hr" },
      ].forEach((e) => this.Global.messages.push(e));
    },
    collapsePanel() {
      this.Global.collapse = false;
    },
    upload() {
      Requests.upload();
    },
  },
};
</script>

<style>
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
}

#welearn-helper:not(:hover) {
  filter: brightness(98%);
}

#container-title {
  cursor: grab;
  user-select: none;

  font-size: 28px;
  text-align: center;

  background: rgba(0, 0, 0, 0);
}

#container-setting-button {
  position: absolute;
  top: 3px;
  left: 3px;

  font-size: 23px;

  cursor: pointer;
}

#container-setting-button:hover {
  color: rgb(0, 230, 227);
}

#container-control button {
  font-size: 16px;
}

#container-messages {
  /* margin: 0 10px; */
  border: black 1px solid;
  max-height: 400px;
  overflow-y: auto;
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
}
.container-message:hover:not(hr) {
  padding-bottom: 1px;
  border-bottom: 2px solid black;
  cursor: copy;
}

#container-messages .error {
  color: red;
}

#container-messages .success {
  color: green;
}

#container-messages .info {
  color: #2196f3;
}

#container-messages hr {
  margin: 5px 0px;
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
