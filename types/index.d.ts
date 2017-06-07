declare module 'vue-ts-decorate' {
	export type Constructor = {
		new (...args: any[]): any;
	};
	export interface PropOption {
		type?: Constructor | Constructor[] | null;
		required?: boolean;
		default?: any;
		twoWay?: boolean;
		validator?(value: any): boolean;
		coerce?(value: any): any;
	}
	interface StyleObject {
		rules?: StyleRuleObject;
		props?: { [key: string]: (...value) => StyleRules };
	}
	export interface WatchOption {
		deep?: boolean;
		immidiate?: boolean;
	}
	export interface ComponentOptions {
		name?: string;
		parent?: Object;
		template?: string;
		functional?: boolean;
		componentTag?: string;
		mixins?: Array<Object>;
		delimiters?: Array<string>;
		extends?: Object | Function;
		provide?: Object | (() => Object);
		filters?: { [key: string]: Object; };
		style?: StyleRuleObject | StyleObject;
		directives?: { [key: string]: Object; };
		components?: { [key: string]: Object; };
		model?: { prop?: string; event?: string };
		inject?: Array<string> | { [key: string]: string };
		[key: string]: any;
	}
	export interface MixinOptions extends ComponentOptions {
		global?: boolean;
	}
	export interface DirectiveOptions {
		name: string;
		deep?: boolean;
		local?: boolean;
		twoWay?: boolean;
		params?: string[];
		priority?: number;
		terminal?: boolean;
		paramWatchers?: Object;
		acceptStatement?: boolean;
	}
	export interface BindOptions {
		value: any;
		arg: string;
		name: string;
		oldValue: any;
		expression: string;
		modifiers: {
			[key: string]: boolean;
		};
	}
	export abstract class Vue1Directive {
		arg: string;
		name: string;
		vm: Object;
		el: HTMLElement;
		descriptor: any;
		expression: string;
		modifiers: {
			[key: string]: boolean;
		};
		abstract update(): void;
	}
	export abstract class Vue2Directive {
		abstract update(el?: HTMLElement, binding?: BindOptions, vnode?, oldVnode?): void;
	}
	export function Mixin(options?: MixinOptions): (target: any) => any;
	export function Watch(name: string): (target: any, key: string) => void;
	export function On(eventName?: string): (target: any, key: string) => void;
	export function Component(options?: ComponentOptions): (target: any) => any;
	export function Once(eventName?: string): (target: any, key: string) => void;
	export function Action(action: Function): (target: any, key: string) => void;
	export function Prop(options?: PropOption): (target: any, key: string) => void;
	export function Filter(filterName: string, local?: boolean): (target: any) => any;
	export function Directive(options: DirectiveOptions | string): (target: any) => any;
	export function Getter(getter: string | Function): (target: any, key: string) => void;
	export function Watch(name: string, options: WatchOption): (target: any, key: string) => void;
	export interface Plugins {
		[name: string]: (value: any, prefix?: string | boolean) => StyleRules;
	}
	export interface Options {
		minify?: boolean;
		indent?: string[];
		keepCamelCase?: boolean;
		combineSelectors?: boolean;
		preventCombining?: string[];
	}
	export interface StyleResult {
		className: string;
		styleText: string;
	}
	export interface RawStyle {
		____raw_: {
			____raw_: string
		}
	}
	export interface KeyFramesRule {
		name: string;
		frames: {
			to: StyleRules;
			from: StyleRules;
			[porp: string]: StyleRules;
		}
	}
	type LineStyle = 'dashed' | 'dotted' | 'double' | 'groove' | 'hidden' | 'inset' | 'none' | 'outset' | 'ridge' | 'solid';
	type GlobalValues = 'inherit' | 'initial' | 'unset';
	type NamedColors = 'aliceblue' | 'antiquewhite' | 'aqua' | 'aquamarine' | 'azure' | 'beige' | 'bisque' | 'black' | 'blanchedalmond' | 'blue' | 'blueviolet' | 'brown' | 'burlywood' | 'cadetblue' | 'chartreuse' | 'chocolate' | 'coral' | 'cornflowerblue' | 'cornsilk' | 'crimson' | 'cyan' | 'darkblue' | 'darkcyan' | 'darkgoldenrod' | 'darkgray' | 'darkgreen' | 'darkgrey' | 'darkkhaki' | 'darkmagenta' | 'darkolivegreen' | 'darkorange' | 'darkorchid' | 'darkred' | 'darksalmon' | 'darkseagreen' | 'darkslateblue' | 'darkslategray' | 'darkslategrey' | 'darkturquoise' | 'darkviolet' | 'deeppink' | 'deepskyblue' | 'dimgray' | 'dimgrey' | 'dodgerblue' | 'firebrick' | 'floralwhite' | 'forestgreen' | 'fuchsia' | 'gainsboro' | 'ghostwhite' | 'gold' | 'goldenrod' | 'gray' | 'green' | 'greenyellow' | 'grey' | 'honeydew' | 'hotpink' | 'indianred' | 'indigo' | 'ivory' | 'khaki' | 'lavender' | 'lavenderblush' | 'lawngreen' | 'lemonchiffon' | 'lightblue' | 'lightcoral' | 'lightcyan' | 'lightgoldenrodyellow' | 'lightgray' | 'lightgreen' | 'lightgrey' | 'lightpink' | 'lightsalmon' | 'lightseagreen' | 'lightskyblue' | 'lightslategray' | 'lightslategrey' | 'lightsteelblue' | 'lightyellow' | 'lime' | 'limegreen' | 'linen' | 'magenta' | 'maroon' | 'mediumaquamarine' | 'mediumblue' | 'mediumorchid' | 'mediumpurple' | 'mediumseagreen' | 'mediumslateblue' | 'mediumspringgreen' | 'mediumturquoise' | 'mediumvioletred' | 'midnightblue' | 'mintcream' | 'mistyrose' | 'moccasin' | 'navajowhite' | 'navy' | 'oldlace' | 'olive' | 'olivedrab' | 'orange' | 'orangered' | 'orchid' | 'palegoldenrod' | 'palegreen' | 'paleturquoise' | 'palevioletred' | 'papayawhip' | 'peachpuff' | 'peru' | 'pink' | 'plum' | 'powderblue' | 'purple' | 'rebeccapurple' | 'red' | 'rosybrown' | 'royalblue' | 'saddlebrown' | 'salmon' | 'sandybrown' | 'seagreen' | 'seashell' | 'sienna' | 'silver' | 'skyblue' | 'slateblue' | 'slategray' | 'slategrey' | 'snow' | 'springgreen' | 'steelblue' | 'tan' | 'teal' | 'thistle' | 'tomato' | 'turquoise' | 'violet' | 'wheat' | 'white' | 'whitesmoke' | 'yellow' | 'yellowgreen';
	type DefaultValue = {} | GlobalValues;
	export interface StyleRules {
		keyframes?: KeyFramesRule;
		alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch' | DefaultValue;
		alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | GlobalValues;
		alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | GlobalValues;
		all?: 'revert' | GlobalValues;
		animation?: 'alternate' | 'alternate-reverse' | 'backwards' | 'both' | 'forwards' | 'infinite' | 'none' | 'normal' | 'reverse' | DefaultValue;
		animationDelay?: DefaultValue;
		animationDirection?: {} | 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | GlobalValues;
		animationDuration?: string;
		animationFillMode?: DefaultValue | 'none' | 'forwards' | 'backwards' | 'both';
		animationIterationCount?: {} | number | 'infinite';
		animationName?: 'none' | {};
		animationPlayState?: 'running' | 'paused' | DefaultValue;
		animationTimingFunction?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'step-start' | 'step-end' | DefaultValue;
		backfaceVisibility?: 'visible' | 'hidden';
		background?: 'none' | {};
		backgroundAttachment?: 'scroll' | 'fixed' | 'local';
		backgroundClip?: 'border-box' | 'padding-box' | 'content-box' | GlobalValues;
		backgroundColor?: {} | NamedColors | 'transparent';
		backgroundImage?: 'none' | DefaultValue;
		backgroundOrigin?: 'border-box' | 'padding-box' | 'content-box' | GlobalValues;
		backgroundPosition?: 'top' | 'right' | 'bottom' | 'left' | 'center' | DefaultValue;
		backgroundPositionX?: 'center' | 'left' | 'right' | DefaultValue;
		backgroundPositionY?: 'bottom' | 'center' | 'top' | DefaultValue;
		backgroundRepeat?: 'repeat-x' | 'repeat-y' | 'repeat' | 'space' | 'round' | 'no-repeat' | GlobalValues;
		backgroundSize?: 'cover' | 'contain' | DefaultValue;
		scrollBehavior?: 'auto' | 'smooth' | GlobalValues;
		blockSize?: 'auto' | 'max-content' | 'min-content' | 'fit-content' | 'available' | DefaultValue
		border?: DefaultValue;
		borderBlockEnd?: NamedColors | DefaultValue;
		borderBlockStart?: NamedColors | DefaultValue;
		borderBlockEndColor?: NamedColors | DefaultValue;
		borderBlockStartColor?: NamedColors | DefaultValue;
		borderBlockEndStyle?: LineStyle | GlobalValues;
		borderBlockStartStyle?: LineStyle | DefaultValue;
		borderBlockEndWidth?: DefaultValue;
		borderBlockStartWidth?: DefaultValue;
		borderBottom?: DefaultValue;
		borderBottomColor?: NamedColors | DefaultValue;
		borderBottomLeftRadius?: DefaultValue;
		borderBottomRightRadius?: DefaultValue;
		borderBottomStyle?: LineStyle | GlobalValues;
		borderBottomWidth?: 'thin' | 'medium' | 'thick' | DefaultValue;
		borderCollapse?: 'collapse' | 'separate' | DefaultValue;
		borderColor?: NamedColors | DefaultValue;
		borderImage?: string;
		borderImageOutset?: string | number;
		borderImageRepeat?: 'stretch' | 'repeat' | 'round' | 'space' | DefaultValue;
		borderImageSlice?: DefaultValue;
		borderImageSource?: 'none' | DefaultValue;
		borderImageWidth?: DefaultValue;
		borderLeft?: DefaultValue;
		borderLeftColor?: NamedColors | DefaultValue;
		borderLeftStyle?: 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
		borderLeftWidth?: {} | 'thin' | 'medium' | 'thick' | 'inherit';
		borderRadius?: {} | 'inherit';
		borderRight?: string | number;
		borderRightColor?: string | number;
		borderRightStyle?: string | number;
		borderRightWidth?: string | number;
		borderSpacing?: string | number;
		borderStyle?: string | number;
		borderTop?: string | number;
		borderTopColor?: string | number;
		borderTopLeftRadius?: string | number;
		borderTopRightRadius?: string | number;
		borderTopStyle?: string | number;
		borderTopWidth?: string | number;
		borderWidth?: string | number;
		bottom?: string | number;
		boxShadow?: string | number;
		boxSizing?: string | number;
		captionSide?: string | number;
		clear?: string | number;
		clip?: string | number;
		color?: NamedColors | DefaultValue;
		columnCount?: string | number;
		columnFill?: string | number;
		columnGap?: string | number;
		columnRule?: string | number;
		columnRuleColor?: string | number;
		columnRuleStyle?: string | number;
		columnRuleWidth?: string | number;
		columnSpan?: string | number;
		columnWidth?: string | number;
		columns?: string | number;
		content?: string;
		counterIncrement?: string | number;
		counterReset?: string | number;
		cursor?: string;
		direction?: string | number;
		display?: string;
		emptyCells?: string | number;
		flex?: string | number;
		flexBasis?: string | number;
		flexDirection?: string | number;
		flexFlow?: string | number;
		flexWrap?: string | number;
		flexGrow?: string | number;
		flexShrink?: string | number;
		float?: string | number;
		font?: string | number;
		fontFamily?: string | number;
		fontSize?: string | number;
		fontSizeAdjust?: string | number;
		fontStretch?: string | number;
		fontStyle?: string | number;
		fontVariant?: string | number;
		fontWeight?: string | number;
		height?: string | number;
		justifyContent?: string | number;
		left?: string | number;
		letterSpacing?: string | number;
		lineHeight?: string | number;
		listStyle?: string | number;
		listStyleImage?: string | number;
		listStylePosition?: string | number;
		listStyleType?: string | number;
		margin?: string | number;
		marginBottom?: string | number;
		marginLeft?: string | number;
		marginRight?: string | number;
		marginTop?: string | number;
		maxHeight?: string | number;
		maxWidth?: string | number;
		minHeight?: string | number;
		minWidth?: string | number;
		opacity?: number;
		order?: string | number;
		outline?: string | number;
		outlineColor?: string | number;
		outlineOffset?: string | number;
		outlineStyle?: string | number;
		outlineWidth?: string | number;
		overflow?: string | number;
		overflowX?: string | number;
		overflowY?: string | number;
		padding?: string | number;
		paddingBottom?: string | number;
		paddingLeft?: string | number;
		paddingRight?: string | number;
		paddingTop?: string | number;
		pageBreakAfter?: string | number;
		pageBreakBefore?: string | number;
		pageBreakInside?: string | number;
		perspective?: string | number;
		perspectiveOrigin?: string | number;
		position?: string | number;
		quotes?: string | number;
		resize?: string | number;
		right?: string | number;
		tabSize?: string | number;
		tableLayout?: string | number;
		textAlign?: string | number;
		textAlignLast?: string | number;
		textDecoration?: string | number;
		textDecorationColor?: string | number;
		textDecorationLine?: string | number;
		textDecorationStyle?: string | number;
		textIndent?: string | number;
		textJustify?: string | number;
		textOverflow?: string | number;
		textShadow?: string | number;
		textTransform?: string | number;
		top?: {};
		transform?: string | number;
		transformOrigin?: string | number;
		transformStyle?: string | number;
		transition?: string | number;
		transitionDelay?: string | number;
		transitionDuration?: string | number;
		transitionProperty?: string | number;
		transitionTimingFunction?: string | number;
		verticalAlign?: string | number;
		visibility?: string | number;
		whiteSpace?: string | number;
		width?: string | number;
		wordBreak?: string | number;
		wordSpacing?: string | number;
		wordWrap?: string | number;
		zIndex?: 'auto' | number | GlobalValues;
		[property: string]: string | number | StyleRules | KeyFramesRule;
	}
	interface StyleRuleObject {
		[selector: string]: StyleRules
	}
	export interface CSSGenerator {
		(rules: StyleRuleObject): StyleResult;
		raw(rules: StyleRuleObject, options?: Options): RawStyle;
		process(rules: StyleRuleObject, options?: Options): string;
		prop(name: string, action: (value: any) => StyleRules): this;
	}
}