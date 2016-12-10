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
var index_1 = require("../index");
var ExtComponent = (function () {
    function ExtComponent() {
        this.someProperty = 'Hello!';
        this.testProp = { prop: 'test prop' };
        this.someDefaultProp = 'some default value';
        this.someObjProp = { someDefault: 'value' };
    }
    ExtComponent.prototype.someFuncProp = function () {
        return;
    };
    ExtComponent.prototype.testMethod = function () {
        return;
    };
    ExtComponent.prototype.ready = function () {
        return;
    };
    ExtComponent.prototype.testPropWatcher = function (newVal, oldVal) {
        newVal = oldVal;
        return;
    };
    ExtComponent.prototype.somePropertyWatcher = function (newVal, oldVal) {
        newVal = oldVal;
        return;
    };
    ExtComponent.prototype.someEvent = function () {
        return;
    };
    ExtComponent.prototype.someEventOnce = function () {
        return;
    };
    return ExtComponent;
}());
__decorate([
    index_1.Prop(),
    __metadata("design:type", String)
], ExtComponent.prototype, "someProp", void 0);
__decorate([
    index_1.Prop({
        type: String
    }),
    __metadata("design:type", String)
], ExtComponent.prototype, "someDefaultProp", void 0);
__decorate([
    index_1.Prop(),
    __metadata("design:type", Object)
], ExtComponent.prototype, "someObjProp", void 0);
__decorate([
    index_1.Prop(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExtComponent.prototype, "someFuncProp", null);
__decorate([
    index_1.Watch('testProp', { deep: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ExtComponent.prototype, "testPropWatcher", null);
__decorate([
    index_1.Watch('someProperty'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ExtComponent.prototype, "somePropertyWatcher", null);
__decorate([
    index_1.On('eventToEmit'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExtComponent.prototype, "someEvent", null);
__decorate([
    index_1.Once('eventToEmitOnce'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExtComponent.prototype, "someEventOnce", null);
ExtComponent = __decorate([
    index_1.Component({ template: '<h1>{{ msg }}</h1>' }),
    __metadata("design:paramtypes", [])
], ExtComponent);
module.exports = ExtComponent;
//# sourceMappingURL=extComponent.js.map