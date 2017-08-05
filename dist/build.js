(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom);
        global.vueReact = mod.exports;
    }
})(this, function (exports, _react, _reactDom) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        install: function install(Vue, options) {
            Vue.react = function (name, Component) {
                var VueComponent = {
                    data: function data() {
                        return {
                            props: {},
                            component: {}
                        };
                    },

                    methods: {
                        refresh: function refresh() {
                            this.component = _reactDom2.default.render(_react2.default.createElement(Component, this.props, null), this.$el);
                        }
                    },
                    render: function render(createElement) {
                        return createElement('div', this.$slots.default);
                    },
                    mounted: function mounted() {
                        var _this = this;

                        // Copy all attributes to props
                        Object.assign(this.props, this.$attrs);

                        // Register Events and Handlers
                        Object.keys(this._events).forEach(function (event) {
                            _this.props[event] = function () {
                                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                                    args[_key] = arguments[_key];
                                }

                                return _this.$emit.apply(_this, [event].concat(args));
                            };
                        });

                        // Render
                        this.refresh();

                        // Watch attrs and refresh
                        Object.keys(this.$attrs).forEach(function (prop) {
                            _this.$watch(function () {
                                return _this.$attrs[prop];
                            }, function (value) {
                                _this.props[prop] = value;
                                _this.refresh();
                            });
                        });
                    }
                };

                Vue.component(name, VueComponent);
            };
        }
    };
});
