<!-- Load Assets here ? -->

**This is a Work in Progress**

# Install the plugin

First of all, import and install the plugin:

```javascript
import VueReact from 'vue-react';

Vue.use(VueReact);
```

# Simple Button

You can set attributes, events and inner Html in this simple button.

```javascript
// app.js
import { Button } from 'antd';

Vue.react('Button', Button);
```

```vue
// App.vue
<template>
    <Button type="danger" @click="alert('Button Clicked')">Click Me</Button>
</template>
```

<div id="demo-simple-button"></div>