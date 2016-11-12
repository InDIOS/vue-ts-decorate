import { Directive, Filter } from '../index';

@Directive({
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
@Directive({ local: true })
export class TestLocalDirective2 {
	update() {
		return 'update';
	}
}
@Directive({
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
@Directive()
export class TestGlobalDirective2 {
	update() {
		return 'update';
	}
}

@Filter(true)
export class TestLocalFilter1 {
	filter() {
		return 'filter';
	}
}

@Filter(true)
export class TestLocalFilter2 {
	read() {
		return 'read';
	}
	write() {
		return 'write';
	}
}

@Filter()
export class TestGlobalFilter1 {
	filter() {
		return 'filter';
	}
}

@Filter()
export class TestGlobalFilter2 {
	read() {
		return 'read';
	}
	write() {
		return 'write';
	}
}