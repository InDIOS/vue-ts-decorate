import { Directive, Filter } from '../index';

@Directive({
	name: 'TestLocalDirective1',
	local: true,
	twoWay: true, deep: true,
	priority: 5000, terminal: false
})
export class TestLocalDirective1 {
	bind() {
		return 'bind';
	}
	update() {
		return 'update';
	}
	unbind() {
		return 'unbind';
	}
}
@Directive({ name: 'TestLocalDirective2', local: true })
export class TestLocalDirective2 {
	update() {
		return 'update';
	}
}
@Directive({
	name: 'TestGlobalDirective1',
	twoWay: true, deep: true,
	priority: 5000, terminal: false
})
export class TestGlobalDirective1 {
	bind() {
		return 'bind';
	}
	update() {
		return 'update';
	}
	unbind() {
		return 'unbind';
	}
}
@Directive('TestGlobalDirective2')
export class TestGlobalDirective2 {
	update() {
		return 'update';
	}
}

@Filter('testLocalFilter1', true)
export class TestLocalFilter1 {
	filter() {
		return 'filter';
	}
}

@Filter('testLocalFilter2', true)
export class TestLocalFilter2 {
	read() {
		return 'read';
	}
	write() {
		return 'write';
	}
}

@Filter('TestGlobalFilter1')
export class TestGlobalFilter1 {
	filter() {
		return 'filter';
	}
}

@Filter('TestGlobalFilter2')
export class TestGlobalFilter2 {
	read() {
		return 'read';
	}
	write() {
		return 'write';
	}
}