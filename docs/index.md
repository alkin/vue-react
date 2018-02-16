<script src="app.efe5698b.js"></script>

**This is a Work in Progress**

To demonstrate how to use React components inside your Vue application we will be using some components from the <a href="https://ant.design/" target="_blank">Ant Design UI Framework</a>.

# Install the plugin

First of all, import and install the plugin:

```javascript
import VueReact from 'vue-react';
Vue.use(VueReact);

require('../node_modules/antd/dist/antd.min.css');
```

# Button

You can set attributes, events and the inner HTML in this simple button. <a href="https://ant.design/components/button/" target="_blank">See Button Component</a>

<div id="demo-button"></div>

```javascript
// app.js
import { Button } from 'antd';
Vue.react('Button', Button);
```

```vue
<!-- App.vue -->
<template>
    <!-- ... -->
    <Button type="danger" size="large" @click="buttonClicked">I am a React Button</Button>
    <!-- ... -->
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

*PRO Tip: All events names will be changed to React pattern (onEvent). Both `@click` and `@onClick` will be registered as `onClick`.*