"use strict";
var Vue = require("vue");
var TestComponent = require("./rootComponent");
describe('Root Component', function () {
    beforeEach(function () {
        this.options = TestComponent.$options;
    });
    it(' should be defined', function () {
        expect(TestComponent).toBeDefined();
    });
    it(' should be a Vue instance', function () {
        expect(TestComponent instanceof Vue).toBeTruthy();
    });
    describe('.$options', function () {
        describe('.data', function () {
            it(' should be defined', function () {
                expect(this.options.data).toBeDefined();
            });
            it(' should be a function', function () {
                expect(typeof this.options.data).toBe('function');
            });
        });
        describe('.data()', function () {
            it(' should return an object', function () {
                expect(typeof this.options.data()).toBe('object');
            });
            it(' should have two property', function () {
                expect(Object.keys(this.options.data()).length).toBe(2);
            });
            it(' someProperty should be string', function () {
                expect(typeof this.options.data().someProperty).toBe('string');
            });
        });
        describe('.methods', function () {
            it(' should be defined', function () {
                expect(this.options.methods).toBeDefined();
            });
            it(' should be an object', function () {
                expect(typeof this.options.methods).toBe('object');
            });
            it(' should have one property', function () {
                expect(Object.keys(this.options.methods).length).toBe(1);
            });
            it(' property should be a function', function () {
                expect(typeof this.options.methods.testMethod).toBe('function');
            });
        });
        describe('.props', function () {
            it(' should be defined', function () {
                expect(this.options.props).toBeDefined();
            });
            it(' should be an object', function () {
                expect(typeof this.options.props).toBe('object');
            });
            it(' should have 4 properties', function () {
                expect(Object.keys(this.options.props).length).toBe(4);
            });
            describe('property 1', function () {
                it(' should be Null', function () {
                    expect(this.options.props.someProp).toBeNull();
                });
            });
            describe('property 2', function () {
                it(' should be an object', function () {
                    expect(typeof this.options.props.someDefaultProp).toBe('object');
                });
                it(' should have 2 properties', function () {
                    expect(Object.keys(this.options.props.someDefaultProp).length).toBe(2);
                });
                it(' `default` should be a string', function () {
                    expect(typeof this.options.props.someDefaultProp.default).toBe('string');
                });
            });
            describe('property 3', function () {
                it(' should be an object', function () {
                    expect(typeof this.options.props.someObjProp).toBe('object');
                });
                it(' should have a property `default`', function () {
                    expect(Object.keys(this.options.props.someObjProp).length).toBe(1);
                });
                it(' `default` should be a function', function () {
                    expect(typeof this.options.props.someObjProp.default).toBe('function');
                });
            });
            describe('property 4', function () {
                it(' should be an object', function () {
                    expect(typeof this.options.props.someFuncProp).toBe('object');
                });
                it(' should have 2 properties', function () {
                    expect(Object.keys(this.options.props.someFuncProp).length).toBe(2);
                });
                it(' `default` should be a function', function () {
                    expect(typeof this.options.props.someFuncProp.default).toBe('function');
                });
            });
        });
        describe('.ready', function () {
            it(' should be defined', function () {
                expect(this.options.ready).toBeDefined();
            });
            it(' should be an Array', function () {
                expect(Array.isArray(this.options.ready)).toBeTruthy();
            });
            it(' should have one function', function () {
                expect(this.options.ready.length).toBe(1);
                expect(typeof this.options.ready[0]).toBe('function');
            });
        });
        describe('.watch', function () {
            it(' should be defined', function () {
                expect(TestComponent._watchers).toBeDefined();
            });
            it(' should be an object', function () {
                expect(Array.isArray(TestComponent._watchers)).toBeTruthy();
            });
            it(' should have two properties', function () {
                expect(TestComponent._watchers.length).toBe(2);
            });
            it(' must be defined', function () {
                for (var key in TestComponent._watchers) {
                    expect(typeof TestComponent._watchers[key]).toBe('object');
                }
                expect(TestComponent._watchers[0].expression).toBe('testProp');
                expect(TestComponent._watchers[0].deep).toBeTruthy();
                expect(TestComponent._watchers[1].expression).toBe('someProperty');
                expect(TestComponent._watchers[1].deep).toBeUndefined();
            });
        });
        describe('.events', function () {
            it(' should be defined', function () {
                expect(this.options.events).toBeDefined();
            });
            it(' should be an object', function () {
                expect(typeof this.options.events).toBe('object');
            });
            it(' should have two properties', function () {
                expect(Object.keys(this.options.events).length).toBe(2);
            });
            it(' must be functions', function () {
                for (var key in this.options.events) {
                    expect(typeof this.options.events[key]).toBe('function');
                }
            });
        });
    });
});
//# sourceMappingURL=rootComponent.spect.js.map