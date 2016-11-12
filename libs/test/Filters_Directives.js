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
var TestLocalDirective1 = (function () {
    function TestLocalDirective1() {
    }
    TestLocalDirective1.prototype.bind = function () {
        return 'bind';
    };
    TestLocalDirective1.prototype.update = function () {
        return 'update';
    };
    TestLocalDirective1.prototype.unbind = function () {
        return 'unbind';
    };
    TestLocalDirective1 = __decorate([
        index_1.Directive({
            local: true,
            twoWay: true, deep: true,
            priority: 5000, terminal: false
        }), 
        __metadata('design:paramtypes', [])
    ], TestLocalDirective1);
    return TestLocalDirective1;
}());
exports.TestLocalDirective1 = TestLocalDirective1;
var TestLocalDirective2 = (function () {
    function TestLocalDirective2() {
    }
    TestLocalDirective2.prototype.update = function () {
        return 'update';
    };
    TestLocalDirective2 = __decorate([
        index_1.Directive({ local: true }), 
        __metadata('design:paramtypes', [])
    ], TestLocalDirective2);
    return TestLocalDirective2;
}());
exports.TestLocalDirective2 = TestLocalDirective2;
var TestGlobalDirective1 = (function () {
    function TestGlobalDirective1() {
    }
    TestGlobalDirective1.prototype.bind = function () {
        return 'bind';
    };
    TestGlobalDirective1.prototype.update = function () {
        return 'update';
    };
    TestGlobalDirective1.prototype.unbind = function () {
        return 'unbind';
    };
    TestGlobalDirective1 = __decorate([
        index_1.Directive({
            twoWay: true, deep: true,
            priority: 5000, terminal: false
        }), 
        __metadata('design:paramtypes', [])
    ], TestGlobalDirective1);
    return TestGlobalDirective1;
}());
exports.TestGlobalDirective1 = TestGlobalDirective1;
var TestGlobalDirective2 = (function () {
    function TestGlobalDirective2() {
    }
    TestGlobalDirective2.prototype.update = function () {
        return 'update';
    };
    TestGlobalDirective2 = __decorate([
        index_1.Directive(), 
        __metadata('design:paramtypes', [])
    ], TestGlobalDirective2);
    return TestGlobalDirective2;
}());
exports.TestGlobalDirective2 = TestGlobalDirective2;
var TestLocalFilter1 = (function () {
    function TestLocalFilter1() {
    }
    TestLocalFilter1.prototype.filter = function () {
        return 'filter';
    };
    TestLocalFilter1 = __decorate([
        index_1.Filter(true), 
        __metadata('design:paramtypes', [])
    ], TestLocalFilter1);
    return TestLocalFilter1;
}());
exports.TestLocalFilter1 = TestLocalFilter1;
var TestLocalFilter2 = (function () {
    function TestLocalFilter2() {
    }
    TestLocalFilter2.prototype.read = function () {
        return 'read';
    };
    TestLocalFilter2.prototype.write = function () {
        return 'write';
    };
    TestLocalFilter2 = __decorate([
        index_1.Filter(true), 
        __metadata('design:paramtypes', [])
    ], TestLocalFilter2);
    return TestLocalFilter2;
}());
exports.TestLocalFilter2 = TestLocalFilter2;
var TestGlobalFilter1 = (function () {
    function TestGlobalFilter1() {
    }
    TestGlobalFilter1.prototype.filter = function () {
        return 'filter';
    };
    TestGlobalFilter1 = __decorate([
        index_1.Filter(), 
        __metadata('design:paramtypes', [])
    ], TestGlobalFilter1);
    return TestGlobalFilter1;
}());
exports.TestGlobalFilter1 = TestGlobalFilter1;
var TestGlobalFilter2 = (function () {
    function TestGlobalFilter2() {
    }
    TestGlobalFilter2.prototype.read = function () {
        return 'read';
    };
    TestGlobalFilter2.prototype.write = function () {
        return 'write';
    };
    TestGlobalFilter2 = __decorate([
        index_1.Filter(), 
        __metadata('design:paramtypes', [])
    ], TestGlobalFilter2);
    return TestGlobalFilter2;
}());
exports.TestGlobalFilter2 = TestGlobalFilter2;
//# sourceMappingURL=Filters_Directives.js.map