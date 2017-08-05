import React from 'react';
import ReactDOM from 'react-dom';

export default {
    install(Vue, options) {
        Vue.react = function(name, Component) {
            const VueComponent = {
                data() {
                    return {
                        props: {},
                        component: {},
                    };
                },
                methods: {
                    refresh() {
                        this.component = ReactDOM.render(React.createElement(Component, this.props, null), this.$el);
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
