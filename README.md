<!-- <h1 style="color: red;">0.8.0版本更新内容较多，未经完整测试，如果遇到问题，可以暂时使用0.7.8版本</h1> -->

<h1 align="center"> WELearn网课助手</h1>

<p align="center">
显示WE Learn随行课堂题目答案；支持班级测试；自动答题；刷时长；开放自定义参数
</p>

<p align="center">
<a href="https://github.com/SSmJaE/WELearnHelper">Github</a> · 
<a href="docs/DEVELOPMENT.md">参与开发</a> ·
<a href="https://github.com/SSmJaE/WELearnHelper/issues">问题反馈</a> ·
<a href="https://github.com/SSmJaE/WELearnHelper/issues">功能请求</a> ·
<a href="https://t.me/joinchat/NCvpthynViq6NeYkbHW0DA">电报群</a> · 
<a href="https://jq.qq.com/?_wv=1027&k=5AyCT4l">求助</a>
</p>

![](https://img.shields.io/badge/外教社数字课程系列-支持-brightgreen.svg)
![](https://img.shields.io/badge/新世纪英语专业（修订版）泛读教程（第2版）-支持-brightgreen.svg)
![](https://img.shields.io/badge/全新版大学英语《视听说教程》-支持-brightgreen.svg)
![](https://img.shields.io/badge/全新版大学进阶英语：综合教程-支持-brightgreen.svg)
![](https://img.shields.io/badge/全新版大学进阶英语：视听说教程-支持-brightgreen.svg)
![](https://img.shields.io/badge/新世纪大学英语（第二版）综合教程-支持-brightgreen.svg)
![](https://img.shields.io/badge/新世纪大学英语（第二版）视听说教程-支持-brightgreen.svg)
![](https://img.shields.io/badge/新目标大学英语视听说教程-支持-brightgreen.svg)
![](https://img.shields.io/badge/新目标大学英语《综合教程》-支持-brightgreen.svg)
![](https://img.shields.io/badge/新标准高职公共英语系列教材：实用综合教程（精编版）-支持-brightgreen.svg)
![](https://img.shields.io/badge/新标准高职公共英语系列教材：实用听说教程（第二版）第三册-支持-brightgreen.svg)

## 声明
- 本脚本基于GPL-3.0
- 本脚本仅供学习交流使用，对于使用本脚本造成的任何后果，均由使用者本人承担
- 任何脚本都有风险，不做任何保证

## 使用
- 安装最新版本的Chrome
- 安装最新版本的Tamper Monkey
- 安装最新版本的本脚本
- 点击***左上角齿轮***进行功能设定
- 练习
  - 进入练习页面，如果是支持的课程，会自动显示答案，默认会显示听力、口语参考文本
  - 答案按照类型分隔(填空题都在一起、选择题都在一起)，不一定和实际题目顺序相同，但是同一类型的题目的顺序是稳定的
  - 自动答题只支持<b>部分课程</b>的部分题目，默认关闭
- 考试
  - 进入考试页面，点击查询按钮查询题目
  - 如果是解析(答案)页面，点击查询会自动收录答案
  - 先点击查询按钮，之后听力可以无限听，如果先播放了，会失效
- 时长
  - 默认关闭
  - 可能可以后台挂机，未测试
  - 开启循环，可以循环刷课，自动跳过封锁章节及课程说明

## 辅助功能
- 点击悬浮窗中的答案会自动复制到粘贴板
- 点击折叠按钮折叠悬浮窗
- 双击"WELearn Helper"展开悬浮窗
- 在练习页面，右侧的齿轮按钮也可以打开设置菜单

## 已知问题
- 开启自动答题时，如果在答题完成前切换页面(切换页面过快)，会导致bug，返回主菜单，刷新重新进入即可
- [ ] 全新视听说的填空题答案填写有问题，手动选择一下
- [ ] 连线题需要手动再连一下(涉及到angular事件的触发，无力解决，求路过大佬指点迷津)
- [ ] 视听说的下拉选择题不支持自动答题
- [ ] 新目标大学英语自动答题慎用
- [ ] 考试自动答题(选择题)

## 常见问题
- 为什么脚本没有反应？
  - 是we learn吗？不支持U校园
  - 用的是最新版的Chrome浏览器吗？
  - 用的是最新版的tamper monkey吗？
  - 重启浏览器试试
  - 重装脚本试试
  - 是上方列举的支持的课程吗？如果不是，可以单独[写一个parser](docs/DEVELOPMENT.md)，作为插件加入脚本
  - 还是无法使用，点击最上方求助
- 为什么进入课程就显示一个二维码？
  - 部分题目只能通过手机app作答(显示一个二维码)，无解
- 悬浮窗一直跟随鼠标怎么办？
  - 可以按Esc键强制退出跟随状态
- 为什么考试(班级测试)的很多题都没有答案？
  - 答案收集自大家的上传，如果没人上传，自然没有答案
- 怎么上传题目？
  - 进入已完成的任务/测试，点击查询按钮；前几个学期的也可以
  - [众筹答案](http://47.97.90.127/welearn/)，这里出现的题目，都是welearn的原题中没有收录到答案的那些，在这个页面中做过的题，每个选项的选择次数都会被统计，当查询这些题目时，会返回供参考
  - 上传答案会累计积分(虽然并没有什么用)，记得在设置里自己设定一下账号
- 为什么班级测试不支持自动答题？
  - 因为没有足够的账号用来测试，所以脚本的功能并不能保证
  - 如果希望脚本进一步完善，可以提供给我有班级测试的账号

## 其它
- 用爱发电，佛系更新，接受[捐赠](docs/alipay.png)以维护服务器
- 感谢[askar882](https://greasyfork.org/zh-CN/users/291023-askar882)，[Demcorazy](https://greasyfork.org/zh-CN/scripts/397203)，[Avenshy](https://greasyfork.org/zh-CN/users/581199-avenshy)
- [更新日志](docs/CHANGELOG.md)
- 基于TypeScript + Vue构建，所有功能插件化，有兴趣的同学可以一起来[开发](docs/DEVELOPMENT.md)
