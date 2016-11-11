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
var TagComponent = (function () {
    function TagComponent() {
        this.someProperty = 'Hello!';
        this.testProp = { prop: 'test prop' };
        this.someDefaultProp = 'some default value';
        this.someObjProp = { someDefault: 'value' };
    }
    TagComponent.prototype.someFuncProp = function () {
        return;
    };
    TagComponent.prototype.testMethod = function () {
        return;
    };
    TagComponent.prototype.ready = function () {
        return;
    };
    TagComponent.prototype.testPropWatcher = function (newVal, oldVal) {
        return;
    };
    TagComponent.prototype.somePropertyWatcher = function (newVal, oldVal) {
        return;
    };
    TagComponent.prototype.someEvent = function () {
        return;
    };
    TagComponent.prototype.someEventOnce = function () {
        return;
    };
    __decorate([
        index_1.Prop(), 
        __metadata('design:type', String)
    ], TagComponent.prototype, "someProp", void 0);
    __decorate([
        index_1.Prop({
            type: String
        }), 
        __metadata('design:type', String)
    ], TagComponent.prototype, "someDefaultProp", void 0);
    __decorate([
        index_1.Prop(), 
        __metadata('design:type', Object)
    ], TagComponent.prototype, "someObjProp", void 0);
    __decorate([
        index_1.Prop(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TagComponent.prototype, "someFuncProp", null);
    __decorate([
        index_1.Watch('testProp', { deep: true }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object]), 
        __metadata('design:returntype', void 0)
    ], TagComponent.prototype, "testPropWatcher", null);
    __decorate([
        index_1.Watch('someProperty'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object]), 
        __metadata('design:returntype', void 0)
    ], TagComponent.prototype, "somePropertyWatcher", null);
    __decorate([
        index_1.On('eventToEmit'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TagComponent.prototype, "someEvent", null);
    __decorate([
        index_1.Once('eventToEmitOnce'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TagComponent.prototype, "someEventOnce", null);
    TagComponent = __decorate([
        index_1.Component({ tagName: 'TestComp', template: '<h1>{{ msg }}</h1>' }), 
        __metadata('design:paramtypes', [])
    ], TagComponent);
    return TagComponent;
}());
module.exports = TagComponent;
//# sourceMappingURL=tagComponent.js.map