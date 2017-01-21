import Vue = require('vue/dist/vue.common');
import {
	TestGlobalDirective1, TestGlobalDirective2,
	TestLocalDirective1, TestLocalDirective2,
	TestGlobalFilter1, TestGlobalFilter2, 
	TestLocalFilter1, TestLocalFilter2
} from './Filters_Directives';
const isVersion2 = (<any>Vue).version.indexOf('2.') === 0;

describe('Directives', () => {
	describe('Global with options', () => {
		it(' should be an object', () => {
			expect(TestGlobalDirective1).toBeDefined();
			expect(typeof TestGlobalDirective1).toBe('object');
			expect(TestGlobalDirective2).toBeDefined();
			expect(typeof TestGlobalDirective2).toBe(isVersion2 ? 'object' : 'function');
		});

		it(' should have options', () => {
			expect(TestGlobalDirective1['deep']).toBeDefined();
			expect(TestGlobalDirective1['deep']).toBeTruthy();
			expect(TestGlobalDirective1['twoWay']).toBeDefined();
			expect(TestGlobalDirective1['twoWay']).toBeTruthy();
			expect(TestGlobalDirective1['terminal']).toBeDefined();
			expect(TestGlobalDirective1['terminal']).toBeFalsy();
			expect(TestGlobalDirective1['priority']).toBeDefined();
			expect(TestGlobalDirective1['priority']).toBe(5000);
		});

		it(' should have bind, update and unbind functions', () => {
			expect(TestGlobalDirective1['bind']).toBeDefined();
			expect(typeof TestGlobalDirective1['bind']).toBe('function');
			expect(TestGlobalDirective1['update']).toBeDefined();
			expect(typeof TestGlobalDirective1['update']).toBe('function');
			expect(TestGlobalDirective1['unbind']).toBeDefined();
			expect(typeof TestGlobalDirective1['unbind']).toBe('function');
		});
	});

	describe('Local with options', () => {
		it(' should be defined', () => {
			expect(TestLocalDirective1).toBeDefined();
			expect(typeof TestLocalDirective1).toBe('object');
			expect(typeof TestLocalDirective1['test-local-directive1']).toBe('object');
		});

		it(' should have options', () => {
			expect(TestLocalDirective1['test-local-directive1'].deep).toBeDefined();
			expect(TestLocalDirective1['test-local-directive1'].deep).toBeTruthy();
			expect(TestLocalDirective1['test-local-directive1'].twoWay).toBeDefined();
			expect(TestLocalDirective1['test-local-directive1'].twoWay).toBeTruthy();
			expect(TestLocalDirective1['test-local-directive1'].terminal).toBeDefined();
			expect(TestLocalDirective1['test-local-directive1'].terminal).toBeFalsy();
			expect(TestLocalDirective1['test-local-directive1'].priority).toBeDefined();
			expect(TestLocalDirective1['test-local-directive1'].priority).toBe(5000);
		});

		it(' should have bind, update and unbind functions', () => {
			expect(TestLocalDirective1['test-local-directive1'].bind).toBeDefined();
			expect(typeof TestLocalDirective1['test-local-directive1'].bind).toBe('function');
			expect(TestLocalDirective1['test-local-directive1'].update).toBeDefined();
			expect(typeof TestLocalDirective1['test-local-directive1'].update).toBe('function');
			expect(TestLocalDirective1['test-local-directive1'].unbind).toBeDefined();
			expect(typeof TestLocalDirective1['test-local-directive1'].unbind).toBe('function');
		});
	});

	describe('Local as function', () => {
		it(' should be a function', () => {
			expect(TestLocalDirective2).toBeDefined();
			expect(typeof TestLocalDirective2).toBe('object');
			expect(TestLocalDirective2).toBeDefined();
			expect(typeof TestLocalDirective2['test-local-directive2']).toBe('function');
		});
	});
});

describe('Filters', () => {
	describe('Global twoWayBinding', () => {
		it(' should be an object', () => {
			expect(TestGlobalFilter2).toBeDefined();
			expect(typeof TestGlobalFilter2).toBe('object');
		});
		it(' should have read and write functions', () => {
			expect(TestGlobalFilter2['read']).toBeDefined();
			expect(TestGlobalFilter2['write']).toBeDefined();
			expect(typeof TestGlobalFilter2['read']).toBe('function');
			expect(typeof TestGlobalFilter2['write']).toBe('function');
		});
	});

	describe('Global as function', () => {
		it(' should be a function', () => {
			expect(TestGlobalFilter1).toBeDefined();
			expect(typeof TestGlobalFilter1).toBe('function');
		});
	});

	describe('Local twoWayBinding', () => {
		it(' should be an object', () => {
			expect(TestLocalFilter2).toBeDefined();
			expect(typeof TestLocalFilter2).toBe('object');
			expect(TestLocalFilter2['testLocalFilter2']).toBeDefined();
			expect(typeof TestLocalFilter2['testLocalFilter2']).toBe('object');
		});
		it(' should have read and write functions', () => {
			expect(TestLocalFilter2['testLocalFilter2'].read).toBeDefined();
			expect(TestLocalFilter2['testLocalFilter2'].write).toBeDefined();
			expect(typeof TestLocalFilter2['testLocalFilter2'].read).toBe('function');
			expect(typeof TestLocalFilter2['testLocalFilter2'].write).toBe('function');
		});
	});

	describe('Local as function', () => {
		it(' should be a function', () => {
			expect(TestLocalFilter1).toBeDefined();
			expect(typeof TestLocalFilter1).toBe('object');
			expect(TestLocalFilter1['testLocalFilter1']).toBeDefined();
			expect(typeof TestLocalFilter1['testLocalFilter1']).toBe('function');
		});
	});
});