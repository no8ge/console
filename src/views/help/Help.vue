<template>
  <a-typography>

    <a-typography-title :level=4>介绍</a-typography-title>
    <a-typography-paragraph>
      Automated Testing Open Platform, 自动化测试开放平台。
    </a-typography-paragraph>
    <a-typography-paragraph>
      编写高可用、分布式的测试代码是很困难的, atop将原生提供这种能力
    </a-typography-paragraph>
    <a-typography-paragraph>

      atop 将搭建测试环境，执行测试、收集测试数据、发送告警等活动以模块化的形式自动化独立运行，尽可能的提高测试活动的效率
    </a-typography-paragraph>
    <a-typography-paragraph>

      第三方的测试应用或者框架只需要做一定程度的改造即可接入atop, 测试活动更容易上云平台

    </a-typography-paragraph>
    <a-typography-title :level="4">功能</a-typography-title>
    <a-typography-paragraph>
      我们提供完善的设计原则、最佳实践和设计资源文件（
      <a-typography-text code>Sketch</a-typography-text>
      和
      <a-typography-text code>Axure</a-typography-text>
      ），来帮助业务快速设计出高质量的产品原型。
    </a-typography-paragraph>

    <a-typography-paragraph>
      <ul>
        <li>
          111
        </li>
      </ul>
    </a-typography-paragraph>

    <a-typography-paragraph>
      <blockquote>{{ blockContent }}</blockquote>
      <pre>{{ blockContent }}</pre>
    </a-typography-paragraph>

    <a-typography-paragraph>
      按
      <a-typography-text keyboard>Esc</a-typography-text>
      键退出阅读……
    </a-typography-paragraph>
  </a-typography>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: "HelpMe",
  setup() {
    return {
      blockContent: `blocker `,
    };
  },
});
</script>