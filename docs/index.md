# vue-react

vue-react is a plugin for Vue.js that allows you to use React components just like if they were Vue components.

Demo (soon)

### Installation

#### npm

```
npm install vue-react --save
```

#### yarn

```
yarn add vue-react
```

If you dont have already, install react and react-dom packages. Install the babel plugin also.

```
npm install react react-dom babel-plugin-transform-react-jsx --save
```

Add the plugin in your `.babelrc` file:

```json
{
    "plugins": ["transform-react-jsx"]
}
```

### Usage

First of all, import and install the plugin:

```javascript
import VueReact from 'vue-react';

Vue.use(VueReact);
```

After that, import and register your React components using the new `react` method:

```javascript
import ResizableReact from 'react-resizable-box';

Vue.react('Resizable', ResizableReact);
```

Use your registered component inside your App as usual Vue component.

```vue
<Resizable className="resizable-item" :width="width" :height="height" @onResizeStop="onStop"></Resizable>
```

### How it works ?

The `react` method creates a new Vue component that maps props and events to the React component. Once mounted, the vue component creates and renders the React component.

This way the registered component works exactly as a Vue component.

### Further improvements

- Support for slots.