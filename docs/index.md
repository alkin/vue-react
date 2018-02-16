<!-- Load Assets here ? -->

**This is a Work in Progress**

To demonstrate how to use React components inside your Vue application we will be using some components from the [Ant Design UI Framework](https://ant.design/).

# Install the plugin

First of all, import and install the plugin:

```javascript
import VueReact from 'vue-react';

Vue.use(VueReact);
```

# Button

You can set attributes, events and the inner HTML in this simple button. [See Button Component](https://ant.design/components/button/).

<div id="demo-button"></div>

```javascript
// app.js
import { Button } from 'antd';
Vue.react('Button', Button);
```

```vue
<!-- App.vue -->
<template>
    ...
    <Button type="danger" @click="buttonClicked">I am a React Button</Button>
    ...
</template>

<template>
  <div id="app">
      <Button type="danger" @onClick="buttonClicked">I am a React Button</Button>
  </div>
</template>

<script>
export default {
    methods: {
        buttonClicked() {
            alert("Button Clicked");
        }
    }
};
</script>
```

*PRO Tip: You can use both @click (Vue mode) or @onClick (React mode) event names.*