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
var Vue = require('vue');
var index_1 = require('../index');
describe('Basic Component', function () {
    var TestComponent = (function () {
        function TestComponent() {
            this.testProp = 'test prop';
        }
        TestComponent.prototype.testMethod = function () {
            return;
        };
        TestComponent = __decorate([
            index_1.Component({ el: '#test' }), 
            __metadata('design:paramtypes', [])
        ], TestComponent);
        return TestComponent;
    }());
    it('should be defined', function () {
        expect(TestComponent).toBeDefined();
    });
    it('should be a Vue instance', function () {
        expect(TestComponent instanceof Vue).toBeTruthy();
    });
    describe('and `$options.data`', function () {
        it('should be defined', function () {
            expect(TestComponent.$options.data).toBeDefined();
        });
        it('should be a function', function () {
            expect(typeof TestComponent.$options.data).toBe('function');
        });
        describe('and `$options.data()`', function () {
            it('should return an object', function () {
                expect(typeof TestComponent.$options.data()).toBe('object');
            });
            it('should have one property', function () {
                expect(Object.keys(TestComponent.$options.data()).length).toBe(1);
            });
            it('and should be string', function () {
                expect(typeof TestComponent.$options.data().testProp).toBe('string');
            });
        });
    });
    describe('and `$options.methods`', function () {
        it('should be defined', function () {
            expect(TestComponent.$options.methods).toBeDefined();
        });
        it('should be a object', function () {
            expect(typeof TestComponent.$options.methods).toBe('object');
        });
        describe('and `$options.methods`', function () {
            it('should have one property', function () {
                expect(Object.keys(TestComponent.$options.methods).length).toBe(1);
            });
            it('and should be a function', function () {
                expect(typeof TestComponent.$options.methods.testMethod).toBe('function');
            });
        });
    });
});
//# sourceMappingURL=basicComponent.spect.js.map