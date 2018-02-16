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

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    function eventAttribute(event) {
        return event.indexOf('on') === 0 ? event : 'on' + event.charAt(0).toUpperCase() + event.slice(1);
    }

    function getAttributes(el) {
        for (var i = 0, attributes = el.attributes, n = attributes.length, obj = {}; i < n; i++) {
            var name = attributes[i].nodeName;
            var value = attributes[i].nodeValue;

            name = name === 'class' ? 'className' : 'class';
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
            return _react2.default.createElement(VNode.tag, {});
        }

        return _react2.default.createElement.apply(_react2.default, [VNode.tag, getAttributes(VNode.elm)].concat(_toConsumableArray(VNodesToChildren(VNode.children))));
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

    exports.default = {
        install: function install(Vue, options) {
            Vue.react = function (name, Component) {
                var VueComponent = {
                    data: function data() {
                        return {
                            props: {},
                            component: {},
                            children: []
                        };
                    },

                    methods: {
                        refresh: function refresh() {
                            this.component = _reactDom2.default.render(_react2.default.createElement.apply(_react2.default, [Component, this.props].concat(_toConsumableArray(this.children))), this.$el);
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
                            event = eventAttribute(event);
                            _this.props[event] = function () {
                                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                                    args[_key] = arguments[_key];
                                }

                                return _this.$emit.apply(_this, [event].concat(args));
                            };
                        });

                        // Map default slot to children
                        this.children = VNodesToChildren(this.$slots.default);

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
