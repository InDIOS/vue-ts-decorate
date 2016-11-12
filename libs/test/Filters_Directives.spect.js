"use strict";
var Filters_Directives_1 = require('./Filters_Directives');
describe('Directives', function () {
    describe('Global with options', function () {
        it(' should be an object', function () {
            expect(Filters_Directives_1.TestGlobalDirective1).toBeDefined();
            expect(typeof Filters_Directives_1.TestGlobalDirective1).toBe('object');
            expect(Filters_Directives_1.TestGlobalDirective2).toBeDefined();
            expect(typeof Filters_Directives_1.TestGlobalDirective2).toBe('function');
        });
        it(' should have options', function () {
            expect(Filters_Directives_1.TestGlobalDirective1['deep']).toBeDefined();
            expect(Filters_Directives_1.TestGlobalDirective1['deep']).toBeTruthy();
            expect(Filters_Directives_1.TestGlobalDirective1['twoWay']).toBeDefined();
            expect(Filters_Directives_1.TestGlobalDirective1['twoWay']).toBeTruthy();
            expect(Filters_Directives_1.TestGlobalDirective1['terminal']).toBeDefined();
            expect(Filters_Directives_1.TestGlobalDirective1['terminal']).toBeFalsy();
            expect(Filters_Directives_1.TestGlobalDirective1['priority']).toBeDefined();
            expect(Filters_Directives_1.TestGlobalDirective1['priority']).toBe(5000);
        });
        it(' should have bind, update and unbind functions', function () {
            expect(Filters_Directives_1.TestGlobalDirective1['bind']).toBeDefined();
            expect(typeof Filters_Directives_1.TestGlobalDirective1['bind']).toBe('function');
            expect(Filters_Directives_1.TestGlobalDirective1['update']).toBeDefined();
            expect(typeof Filters_Directives_1.TestGlobalDirective1['update']).toBe('function');
            expect(Filters_Directives_1.TestGlobalDirective1['unbind']).toBeDefined();
            expect(typeof Filters_Directives_1.TestGlobalDirective1['unbind']).toBe('function');
        });
    });
    describe('Global as function', function () {
        it(' should be a function', function () {
            expect(Filters_Directives_1.TestGlobalDirective2).toBeDefined();
            expect(typeof Filters_Directives_1.TestGlobalDirective2).toBe('function');
        });
    });
    describe('Local with options', function () {
        it(' should be defined', function () {
            expect(Filters_Directives_1.TestLocalDirective1).toBeDefined();
            expect(typeof Filters_Directives_1.TestLocalDirective1).toBe('object');
            expect(typeof Filters_Directives_1.TestLocalDirective1['test-local-directive1']).toBe('object');
        });
        it(' should have options', function () {
            expect(Filters_Directives_1.TestLocalDirective1['test-local-directive1'].deep).toBeDefined();
            expect(Filters_Directives_1.TestLocalDirective1['test-local-directive1'].deep).toBeTruthy();
            expect(Filters_Directives_1.TestLocalDirective1['test-local-directive1'].twoWay).toBeDefined();
            expect(Filters_Directives_1.TestLocalDirective1['test-local-directive1'].twoWay).toBeTruthy();
            expect(Filters_Directives_1.TestLocalDirective1['test-local-directive1'].terminal).toBeDefined();
            expect(Filters_Directives_1.TestLocalDirective1['test-local-directive1'].terminal).toBeFalsy();
            expect(Filters_Directives_1.TestLocalDirective1['test-local-directive1'].priority).toBeDefined();
            expect(Filters_Directives_1.TestLocalDirective1['test-local-directive1'].priority).toBe(5000);
        });
        it(' should have bind, update and unbind functions', function () {
            expect(Filters_Directives_1.TestLocalDirective1['test-local-directive1'].bind).toBeDefined();
            expect(typeof Filters_Directives_1.TestLocalDirective1['test-local-directive1'].bind).toBe('function');
            expect(Filters_Directives_1.TestLocalDirective1['test-local-directive1'].update).toBeDefined();
            expect(typeof Filters_Directives_1.TestLocalDirective1['test-local-directive1'].update).toBe('function');
            expect(Filters_Directives_1.TestLocalDirective1['test-local-directive1'].unbind).toBeDefined();
            expect(typeof Filters_Directives_1.TestLocalDirective1['test-local-directive1'].unbind).toBe('function');
        });
    });
    describe('Local as function', function () {
        it(' should be a function', function () {
            expect(Filters_Directives_1.TestLocalDirective2).toBeDefined();
            expect(typeof Filters_Directives_1.TestLocalDirective2).toBe('object');
            expect(Filters_Directives_1.TestLocalDirective2).toBeDefined();
            expect(typeof Filters_Directives_1.TestLocalDirective2['test-local-directive2']).toBe('function');
        });
    });
});
describe('Filters', function () {
    describe('Global twoWayBinding', function () {
        it(' should be an object', function () {
            expect(Filters_Directives_1.TestGlobalFilter2).toBeDefined();
            expect(typeof Filters_Directives_1.TestGlobalFilter2).toBe('object');
        });
        it(' should have read and write functions', function () {
            expect(Filters_Directives_1.TestGlobalFilter2['read']).toBeDefined();
            expect(Filters_Directives_1.TestGlobalFilter2['write']).toBeDefined();
            expect(typeof Filters_Directives_1.TestGlobalFilter2['read']).toBe('function');
            expect(typeof Filters_Directives_1.TestGlobalFilter2['write']).toBe('function');
        });
    });
    describe('Global as function', function () {
        it(' should be a function', function () {
            expect(Filters_Directives_1.TestGlobalFilter1).toBeDefined();
            expect(typeof Filters_Directives_1.TestGlobalFilter1).toBe('function');
        });
    });
    describe('Local twoWayBinding', function () {
        it(' should be an object', function () {
            expect(Filters_Directives_1.TestLocalFilter2).toBeDefined();
            expect(typeof Filters_Directives_1.TestLocalFilter2).toBe('object');
            expect(Filters_Directives_1.TestLocalFilter2['testLocalFilter2']).toBeDefined();
            expect(typeof Filters_Directives_1.TestLocalFilter2['testLocalFilter2']).toBe('object');
        });
        it(' should have read and write functions', function () {
            expect(Filters_Directives_1.TestLocalFilter2['testLocalFilter2'].read).toBeDefined();
            expect(Filters_Directives_1.TestLocalFilter2['testLocalFilter2'].write).toBeDefined();
            expect(typeof Filters_Directives_1.TestLocalFilter2['testLocalFilter2'].read).toBe('function');
            expect(typeof Filters_Directives_1.TestLocalFilter2['testLocalFilter2'].write).toBe('function');
        });
    });
    describe('Local as function', function () {
        it(' should be a function', function () {
            expect(Filters_Directives_1.TestLocalFilter1).toBeDefined();
            expect(typeof Filters_Directives_1.TestLocalFilter1).toBe('object');
            expect(Filters_Directives_1.TestLocalFilter1['testLocalFilter1']).toBeDefined();
            expect(typeof Filters_Directives_1.TestLocalFilter1['testLocalFilter1']).toBe('function');
        });
    });
});
//# sourceMappingURL=Filters_Directives.spect.js.map