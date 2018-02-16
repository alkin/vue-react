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

<div style="border: 1px dashed #DDD; padding: 2em; text-align: center; margin-bottom: 1em;">
    <div id="demo-button"></div>
</div>

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

<!-- Assets -->
<link rel="stylesheet" type="text/css" href="css/app.e824d115.css">

<script type="text/javascript">
(function(r){var n=window["webpackJsonp"];window["webpackJsonp"]=function(e,u,c){for(var i,f,p,l=0,a=[];l<e.length;l++)f=e[l],t[f]&&a.push(t[f][0]),t[f]=0;for(i in u)Object.prototype.hasOwnProperty.call(u,i)&&(r[i]=u[i]);n&&n(e,u,c);while(a.length)a.shift()();if(c)for(l=0;l<c.length;l++)p=o(o.s=c[l]);return p};var e={},t={2:0};function o(n){if(e[n])return e[n].exports;var t=e[n]={i:n,l:!1,exports:{}};return r[n].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=r,o.c=e,o.d=function(r,n,e){o.o(r,n)||Object.defineProperty(r,n,{configurable:!1,enumerable:!0,get:e})},o.n=function(r){var n=r&&r.__esModule?function(){return r["default"]}:function(){return r};return o.d(n,"a",n),n},o.o=function(r,n){return Object.prototype.hasOwnProperty.call(r,n)},o.p="/",o.oe=function(r){throw console.error(r),r}})([]);
//# sourceMappingURL=/js/manifest.ce28c628.js.map
</script>
<script src="js/vendor.0db71b5b.js" type="text/javascript"></script>
<script src="js/app.21d54ec6.js" type="text/javascript"></script>