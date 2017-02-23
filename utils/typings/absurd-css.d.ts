declare namespace absurdCss {
	interface Rules {
		[key: string]: string | Rules;
	}

	interface CompileOptions {
		minify?: boolean;
		keepCamelCase?: boolean;
		combineSelectors?: boolean;
	}
	
	type callBack = (api: Absurd) => Absurd;
	type callBackPlugin = (api: Absurd, value: string) => void;
	type callBackCompile = (error: Error, value: string) => void;
	type callBackHook = (rules: Rules, stylesheet: string) => boolean | void;
	
	class Absurd {
		flush(): Absurd;
		unmorph(): Absurd;
		add(rules: Rules): Absurd;
		raw(value: string): Absurd;
		morph(type: string): Absurd;
		scope(value: string): Absurd;
		importCSS(cssValue: string): Absurd;
		define(key: string, value?: any): Absurd;
		storage(key: string, value?: any): Absurd;
		import(imports: any | Array<any>): Absurd;
		darken(color: string, percents: number): Rules;
		lighten(color: string, percents: number): Rules;
		rawImport(imports: string | Array<string>): Absurd;
		register(method: string, callback: Function): Absurd;
		hook(method: string, callback: callBackHook): Absurd;
		plugin(propertyName: string, callback: callBackPlugin): Absurd;
		compile(): string;
		compile(options: CompileOptions): string;
		compile(callback: callBackCompile): string;
		compile(callback: callBackCompile, options: CompileOptions): string;
	}

	function AbsurdStatic(arg?: string | callBack): Absurd;
}

declare module 'absurd-css' {
	export = absurdCss.AbsurdStatic;
}