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

You can set attributes, events and inner Html in this simple button. [See Button Component](https://ant.design/components/button/)

```javascript
// app.js
import { Button } from 'antd';
Vue.react('Button', Button);
```

```vue
<!-- App.vue -->
<template>
    <Button type="danger" @click="alert('Button Clicked')">Click Me</Button>
</template>
```

<div id="demo-simple-button"></div>