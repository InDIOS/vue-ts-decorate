import * as Vue from 'vue';
import { Component } from '../index';

describe('Basic Component', () => {

	@Component({ el: '#test' })
	class TestComponent {
		testProp: string = 'test prop';

		testMethod() {
			return;
		}
	}

	it('should be defined', () => {
		expect(TestComponent).toBeDefined();
	});

	it('should be a Vue instance', () => {
		expect(TestComponent instanceof Vue).toBeTruthy();
	});

	describe('and `$options.data`', () => {
		it('should be defined', () => {
			expect((<any>TestComponent).$options.data).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof (<any>TestComponent).$options.data).toBe('function');
		});

		describe('and `$options.data()`', () => { 
			it('should return an object', () => {
				expect(typeof (<any>TestComponent).$options.data()).toBe('object');
			});

			it('should have one property', () => {
				expect(Object.keys((<any>TestComponent).$options.data()).length).toBe(1);
			});

			it('and should be string', () => {
				expect(typeof (<any>TestComponent).$options.data().testProp).toBe('string');
			});
		});
	});

	describe('and `$options.methods`', () => {
		it('should be defined', () => {
			expect((<any>TestComponent).$options.methods).toBeDefined();
		});

		it('should be a object', () => {
			expect(typeof (<any>TestComponent).$options.methods).toBe('object');
		});

		describe('and `$options.methods`', () => { 
			it('should have one property', () => {
				expect(Object.keys((<any>TestComponent).$options.methods).length).toBe(1);
			})

			it('and should be a function', () => {
				expect(typeof (<any>TestComponent).$options.methods.testMethod).toBe('function');
			})
		});
	});

});