import React from 'react';
import ReactDOM from 'react-dom';

function getAttributes(el) {
    for (var i = 0, attributes = el.attributes, n = attributes.length, obj = {}; i < n; i++){
        var name = attributes[i].nodeName;
        var value = attributes[i].nodeValue;

        name = (name === 'class') ? 'className' : 'class';
        obj[name] = value;
    }
    return obj;
};

function VNodeToReact(VNode) {
    if (typeof VNode.tag === 'undefined') {
        // Trim
        return VNode.text.replace(/^\s+|\s+$/g, '');
    }

    if (VNode.tag.indexOf('vue-') === 0) {
        return;
    }

    // Attributes

    // children
    if (typeof VNode.children === 'undefined') {
        return React.createElement(VNode.tag, {});
    }

    return React.createElement(VNode.tag, getAttributes(VNode.elm), ...VNodesToChildren(VNode.children));
};

function VNodesToChildren(VNodes) {
    VNodes = VNodes || [];
    var children = [];
    Object.keys(VNodes).forEach(function (i) {
        var VNode = VNodes[i];
        var child = VNodeToReact(VNode);
        if (child) {
            children.push(child);
        }
    });
    return children;
};

export default {
    install(Vue, options) {
        Vue.react = function(name, Component) {
            const VueComponent = {
                data() {
                    return {
                        props: {},
                        component: {},
                        children: [],
                    };
                },
                methods: {
                    refresh() {
                        this.component = ReactDOM.render(React.createElement(Component, this.props, ...this.children), this.$el);
                    },
                },
                render(createElement) {
                    return createElement('div', this.$slots.default);
                },
                mounted() {
                    // Copy all attributes to props
                    Object.assign(this.props, this.$attrs);

                    // Register Events and Handlers
                    Object.keys(this._events).forEach((event) => {
                        this.props[event] = (...args) => this.$emit(event, ...args);
                    });

                    // Map default slot to children
                    this.children = VNodesToChildren(this.$slots.default);

                    // Render
                    this.refresh();

                    // Watch attrs and refresh
                    Object.keys(this.$attrs).forEach((prop) => {
                        this.$watch(() => this.$attrs[prop], (value) => {
                            this.props[prop] = value;
                            this.refresh();
                        });
                    });
                },
            };

            Vue.component(name, VueComponent);
        }
    }
}
