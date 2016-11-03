"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var utilities_1 = require('../utils/utilities');
var index_1 = require('../index');
function getProps(target) {
    var instance = utilities_1.Construct(target);
    console.log(instance.$mixin$);
}
function FakeMixin(options) {
    return function (target) {
        console.log(target.prototype);
    };
}
var ParentAncestor = (function () {
    function ParentAncestor() {
        this.someParentAncestorProperty = 'ParentAncestor Property';
    }
    ParentAncestor.prototype.data = function () {
        return;
    };
    ParentAncestor.prototype.someParentAncestorMethod = function () {
        return 'ParentAncestor Method';
    };
    __decorate([
        index_1.Watch('someParentAncestorProperty'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', String)
    ], ParentAncestor.prototype, "someParentAncestorMethod", null);
    ParentAncestor = __decorate([
        index_1.Mixin(), 
        __metadata('design:paramtypes', [])
    ], ParentAncestor);
    return ParentAncestor;
}());
var Ancestor = (function (_super) {
    __extends(Ancestor, _super);
    function Ancestor() {
        _super.apply(this, arguments);
    }
    Ancestor.prototype.someAncestorMethod = function () {
        return 'Ancestor Method';
    };
    Ancestor.prototype.someAncestorEvent = function () {
        return 'Ancestor Method';
    };
    __decorate([
        index_1.Getter('module.prop'), 
        __metadata('design:type', String)
    ], Ancestor.prototype, "someAncestorProperty", void 0);
    __decorate([
        index_1.Filter, 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], Ancestor.prototype, "someAncestorMethod", null);
    __decorate([
        index_1.On('someEvent'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], Ancestor.prototype, "someAncestorEvent", null);
    Ancestor = __decorate([
        index_1.Mixin({
            template: 'Ancestor Template'
        }), 
        __metadata('design:paramtypes', [])
    ], Ancestor);
    return Ancestor;
}(ParentAncestor));
function someAction() { }
var Parent = (function () {
    function Parent() {
        this.someParentProperty = function () { return 'Parent property'; };
    }
    Object.defineProperty(Parent.prototype, "someGetProperty", {
        get: function () {
            return;
        },
        enumerable: true,
        configurable: true
    });
    Parent.prototype.someAncestorMethod = function () {
        return 'Ancestor Method overrided';
    };
    Parent.prototype.ready = function () {
        return 'Ready Mixin Method';
    };
    __decorate([
        index_1.Prop(), 
        __metadata('design:type', Object)
    ], Parent.prototype, "someParentProperty", void 0);
    __decorate([
        index_1.Action(someAction), 
        __metadata('design:type', Function)
    ], Parent.prototype, "someParentAction", void 0);
    Parent = __decorate([
        index_1.Mixin(), 
        __metadata('design:paramtypes', [])
    ], Parent);
    return Parent;
}());
var DemoDirective = (function (_super) {
    __extends(DemoDirective, _super);
    function DemoDirective() {
        _super.apply(this, arguments);
    }
    DemoDirective.prototype.update = function () { };
    DemoDirective.prototype.unbind = function () { };
    DemoDirective = __decorate([
        index_1.Directive({ local: true }), 
        __metadata('design:paramtypes', [])
    ], DemoDirective);
    return DemoDirective;
}(index_1.VueDirective));
var Child = (function (_super) {
    __extends(Child, _super);
    function Child() {
        _super.apply(this, arguments);
        this.someChildProperty = 'Child Property';
    }
    Child.prototype.someChildMethod = function () {
        return 'Child Method';
    };
    Child = __decorate([
        index_1.Component({ mixins: [ParentAncestor], directives: { DemoDirective: DemoDirective } }), 
        __metadata('design:paramtypes', [])
    ], Child);
    return Child;
}(Parent));
console.log(Child);
//# sourceMappingURL=test.js.map