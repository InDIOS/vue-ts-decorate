"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var index_1 = require('../index');
var testElement = document.createElement('div');
testElement.id = 'test';
document.body.insertBefore(testElement, document.body.firstChild);
var TestComponent = (function () {
    function TestComponent() {
        this.someProperty = 'Hello!';
        this.testProp = { prop: 'test prop' };
        this.someDefaultProp = 'some default value';
        this.someObjProp = { someDefault: 'value' };
    }
    TestComponent.prototype.someFuncProp = function () {
        return;
    };
    TestComponent.prototype.testMethod = function () {
        return;
    };
    TestComponent.prototype.ready = function () {
        return;
    };
    TestComponent.prototype.testPropWatcher = function (newVal, oldVal) {
        return;
    };
    TestComponent.prototype.somePropertyWatcher = function (newVal, oldVal) {
        return;
    };
    TestComponent.prototype.someEvent = function () {
        return;
    };
    TestComponent.prototype.someEventOnce = function () {
        return;
    };
    __decorate([
        index_1.Prop(), 
        __metadata('design:type', String)
    ], TestComponent.prototype, "someProp", void 0);
    __decorate([
        index_1.Prop({
            type: String
        }), 
        __metadata('design:type', String)
    ], TestComponent.prototype, "someDefaultProp", void 0);
    __decorate([
        index_1.Prop(), 
        __metadata('design:type', Object)
    ], TestComponent.prototype, "someObjProp", void 0);
    __decorate([
        index_1.Prop(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TestComponent.prototype, "someFuncProp", null);
    __decorate([
        index_1.Watch('testProp', { deep: true }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object]), 
        __metadata('design:returntype', void 0)
    ], TestComponent.prototype, "testPropWatcher", null);
    __decorate([
        index_1.Watch('someProperty'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object]), 
        __metadata('design:returntype', void 0)
    ], TestComponent.prototype, "somePropertyWatcher", null);
    __decorate([
        index_1.On('eventToEmit'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TestComponent.prototype, "someEvent", null);
    __decorate([
        index_1.Once('eventToEmitOnce'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TestComponent.prototype, "someEventOnce", null);
    TestComponent = __decorate([
        index_1.Component({ el: '#test' }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
}());
module.exports = TestComponent;
//# sourceMappingURL=rootComponent.js.map