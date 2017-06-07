# vue-ts-decorate

A set of [TypeScript](http://www.typescriptlang.org/) decorators for make the work with [Vue.js](http://vuejs.org) easiest.

> **Note:** This project take some ideas and examples of the projects [av-ts](https://github.com/HerringtonDarkholme/av-ts), [vue-ts](https://github.com/weichx/vue-ts) and [vue-typescript](https://github.com/itsFrank/vue-typescript).

## The Why?
The projects mentioned in the note above are very good but, for some reasons not include some decorators that i believe are important too,
further are incompatible with Vue 2.x.x.

## Features

* Compatibility with Vue version 1.x.x and 2.x.x.
* **@Component:** Create a Vue component: `Vue.extend` and `Vue.component`.
  * **@Prop:** Create a component property.
  * **@On:** Create a component `on` event listener. **--> Work only with Vue 1.x.x**
  * **@Once:** Create a component `once` event listener. --> **Work only with Vue 1.x.x**
  * **@Watch:** Create a component watcher.
  * **@Getter:** Create a component getter from state property. **--> Work only with Vuex >=0.6.3 <0.7.0**
  * **@Action:** Create a component action. **--> Work only with Vuex >=0.6.3 <0.7.0**
* **@Directive:** Create a Vue directive, local or global.
* **@Filter:** Create a Vue filter, local or global.
* **@Mixin:** Create a mixin object.

## Use with VueRouter and Vuex 2.x.x
* VueRouter methods `beforeRouteEnter` and `beforeRouteLeave` are supported as class methods (without decoration).
* With Vuex, for better usability and performance, use `map*` (* means `State`, `Getters`, `Actions` and `Mutations`) Vuex module methods in component options with the object spread operator. 

# Configuration
Follow the Vue configuration for Webpack and Browserify related in [Vue Doc](https://vuejs.org/v2/guide/installation.html)

## See all the examples below:

## Usage

```
// class only
@Component() 
  or
@Component(options)
```

### Basic Component declaration

```javascript
import * as Vue from 'vue';
import { Component } from 'vue-ts-decorate';
// or use
// import Component from 'vue-ts-decorate/component';

@Component()
class MyComponent extends Vue {
  // No annotated properties are added to `data` property.
  someData: string = '';

  // methods named as instance hooks are added like hooks
  mounted() {
    this.someData = 'Hello!, MyComponent.';
  }

  // No annotated methods ara added to `methods` property.
  someMethod() {
    // ...
  }
}

new MyComponent().$mount('#app');
```
The code above it is the same that:

>NOTE: All Vue Router hooks are also supported as classes methods, except the `activate` hook because it has the same name as the Vue components hook in the version 1.x.x. In version 2.x.x only `beforeRouteEnter` and `beforeRouteLeave` are added as hooks.

```javascript
let MyComponent = Vue.extend({
  data: {
    someData: ''
  },
  mounted() {
    this.someData = 'Hello!, MyComponent.';
  },
  methods: {
    someMethod() {
      // ...
    }
  }
});

new MyComponent().$mount('#app')
```
The **@Component** decorator receives an object as an optional parameter with the same properties of a Vue component, to these properties is added the `componentTag` property which is a string to specify the name of the tag will have the component. If it is present, the component will be a global, otherwise will be local. `el` property are deprecate. To do a mounted component see below:

### Example

```javascript
// Mounted Component
@Component()
class MountedComp extends Vue {
  // ...
}
new MountedComp().$mount('#app');

// Global Component
@Component({ componentTag: 'globalComp' })
class GlobalComp {
  // ...
}

// local Component
@Component()
class LocalComp {
  // ...
}
```

The example above it is the same that:

```javascript
// Mounted Component
let MountedComp = Vue.extend({
  // ...
});
new MountedComp().$mount('#app');

// Global Component
Vue.component('global-comp', {
  // ...
});

// local Component
Vue.extend({
  name: 'LocalComp'
  // ...
});
```
Yes, in the `componentTag` you can use the camelCase style.

Components can take other components too, in the options of **@Component**

```javascript
// Child Component
@Component()
class ChildComp {
  // ...
}

// Parent Component
@Component({ 
  components: { ChildComp }
})
class ParentComp {
  // ...
}
```

## Props, Events and Watchers

```
// properties or methods only
@Prop()
  or
@Prop(options)
```
```
// methods only
@On(eventName)
@Once(eventName)
```
```
// methods only
@Watch(propertyName)
  or
@Watch(propertyName, options)
```

```javascript
import * as Vue from 'vue';
import { Component, Prop, Watch, On, Once } from 'vue-ts-decorate';

@Component()
class MyComponent extends Vue { // the class extends of Vue just to get intellitSense inside the methods
  someVar: string = 'Hello!';

  @Prop({
    // all property options
  })
  someProp:string;

  @Prop({
    type: String
  })
  someDefaultProp:string = 'some default value'; 

  // vue-ts-decorate makes sure to deep clone default values for array and object types
  @Prop()
  someObjProp: { some_default: string } = { some_default: 'value' };

  // defined functions decorated with prop are treated as the default value
  @Prop()
  someFuncProp() { 
    // ...
  }

  someMethod() {
    // ...
  }

  // Watch accept a string who would be the property name
  // and an options object as second parameter
  @Watch('someVar')
  someVarWatcher(newVal, oldVal) {
    // ...
  }

  @On('eventToEmit') // if param is omited then, the function name is used as a event name
  someEvent() {
    // ...
  }

  @Once('eventToEmitOnce') // if param is omited then, the function name is used as a event name
  someEventOnce() {
    // ...
  }
}
```

It is equivalent to

```javascript
Vue.extend({
  name: 'MyComponent',
  data() {
    return {
      someVar: 'Hello!'
    };
  },
  props: {
    someProp: null,
    someDefaultProp: {
      type: String,
      default: 'some default value'
    },
    someObjProp: {
      default() {
        return { 
          some_default: 'value' 
        };
      }
    },
    someFuncProp: {
      type: Function,
      default() {
        // ...
      }
    }
  },
  methods: {
    someMethod() {
      // ...
    }
  },
  watchs: {
    someVar(newVal, oldVal) {
      // ...
    }
  },
  events: {
    eventToEmit() {
      // ...
    },
    eventToEmitOnce() {
      // ...
    }
  }
});
```

## Support for Vuex 1.x.x

> NOTE: In version 2.x.x this decorators fail silent. Please see the Vuex 2 documentation for how to use the `maps` methods.
```javascript
import { someAction } from '../actions';
import { Component, Getter, Action } from 'vue-ts-decorate';

@Component()
class MyComponent {
  // Getter accept a string with the properties of the state
  // in the format: 'foo.bar.baz'.
  // NOTE: Omit the `state` in the string because it is added internaly.
  @Getter('app.counter')
  counter:string;

  // or just put the function as a parameter of the Getter.
  @Getter((state) => state.app.hello + ' World')
  someProp:string; 

  // Action accept a function as parameter.
  // NOTE: I use a property with type `(params) => void` to tell the compiler that
  // the property is a function and get intellitSense;
  @Action(someAction)
  someFuncProp: (someParam) => void;

  // ...
}
```
The equivalent in javascript is

```javascript
Vue.extend({
  name: 'MyComponent',
  vuex: {
    getters: {
      someProp(state) {
        return state.app.counter;
      }
    },
    actions: {
      someFuncProp: someAction
    }
  }
  // ...
});
```

## Directive

```javascript
import { Component, Directive, VueDirective } from 'vue-ts-decorate';

// The property `name` in directive's option is required to make a safe uglification.
// This is a global directive.
// The methods `bind` and `unbind` are optionals
// just the `update` method is required.
// NOTE: To get intellitSense and fix possible errors inside the methods,
// the directive class must be extends of `VueDirective` abstract class
@Directive({ name: 'myGlobalDirective', /* other directive options */ })
class MyGlobalDirective extends VueDirective {
  bind() {
    // ...
  }

  update() {
    // ...
  }

  unbind() {
    // ...
  }
}

// With the `local` boolean property
// you can declare a local directive.
// NOTE: Directives classes just with `update` method
// are converted to functions, otherwise will be an object.
@Directive({ name: 'myLocalDirective', local: true, /* other directive options */ })
class MyLocalDirective extends VueDirective {
  update() {
    // ...
  }
}

// and in the component
@Component({ 
  /* other options */,
  // the name of the directives 
  // is converte in kebab-case internaly as well
  directives: { MyLocalDirective }
})
class MyComponent {
  // ...
}
```

The equivalent in javascript

```javascript
Vue.directive('my-global-directive', {
  // options go here
  bind: function() {
    // ...
  },
  update: function() {
    // ...
  },
  unbind: function() {
    // ...
  }
});

Vue.extend({
  // options go here
  directives: {
    'my-local-directive': function() {
      // ...
    }
  }
});


```

## Filters

### @Filter decorator receives two parameters: 

The first is required and is the name of the filter, and the second is a boolean that indicate if the filter is global or not.

```javascript
import { Component, Filter } from 'vue-ts-decorate';

// This is a global filter.
// The filter class just need a method called `filter`
@Filter('myGlobalFilter')
class MyGlobalFilter {
  filter(value: any, ...params: any[]) {
    // ...
  }
}

// This is a local filter.
@Filter('myLocalFilter', true)
class MyLocalFilter {
  filter(value: any, ...params: any[]) {
    // ...
  }
}

// and in the component
@Component({ 
  /* other options */
  filters: { MyLocalFilter }
})
class MyComponent {
  // ...
}

// This is a tow way binding filter.
@Filter('myTowWayFilter')
class MyTowWayFilter {
  read(value: any) {
    // ...
  }

  write(value: any, ...params: any[]) {
    // ...
  }
}
```

and in javascript

```javascript
Vue.filter('myGlobalFilter', function(value, params) {
  // ...
});

Vue.extend({
	name: 'MyComponent',
  filters: {
    myLocalFilter: function(value, params){
      // ...
    }
  }
  // and other options...
});

Vue.filter('myTowWayFilter', {
  read: function(value) {
		// ...
	},
  write: function(value, params) {
		// ...
	}
});
```

## Mixins

```javascript
import { Component, Mixin } from 'vue-ts-decorate';

// Global Mixins are availables with the the
// `global` property set to true, otherwise 
// (can be omited) mixin is local.
@Mixin({ global: true })
class GlobalMixin {
  someGlobalProp: string = 'some value';

  someGlobalMethod() {
    // ...
  }
}

// Mixins are classes with the same behavior
// of components but are not converted in one.
@Mixin()
class ParentMixin {
  someProp: string = 'some value';

  someMethod() {
    // ...
  }
}

// All decorators and options are the same as components.
@Mixin({ /* options go here */ })
class ChildMixin extends ParentMixin { // Mixins can extends of other Mixins.
  someChildProp: string = 'some value';

  someChildMethod() {
    // ...
  }
}

@Mixin()
class BrotherMixin extends ParentMixin {
  someBrotherProp: string = 'some value';

  someBrotherMethod() {
    // ...
  }
}

// To simulate the multiple inheritance,
// we can do like describe the TypeScript Mixins Docs,
// to get intellitSense and fix possible errors.
// https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Mixins.md
@Component({ mixins: [BrotherMixin] })
class MyComponent extends ChildMixin implements BrotherMixin {

  someBrotherProp: string;
  someBrotherMethod: () => void;
  // ...

}
```

in javascript

```javascript
Vue.mixin({
  data: function() {
    return { 
      someGlobalProp: 'some value' 
    };
  },
  methods: {
    someGlobalMethod: function() {
      // ...
    }
  }
});

var ChildMixin = {
  data: {
    someProp:'some value',
    someChildProp: 'some value'
  },
  methods: {
    someMethod: function() {
      // ...
    },
    someChildMethod: function() {
      // ...
    }
  }
}

var BrotherMixin = {
  data: {
    someProp:'some value',
    someBrotherProp: 'some value'
  },
  methods: {
    someMethod: function() {
      // ...
    },
    someBrotherMethod: function() {
      // ...
    }
  }
}

Vue.extend({ 
  // ...
  mixins: [ChildMixin, BrotherMixin] 
});
```
> Note on using new with component classes:

You can call a class with the `new` operator only if `componentTag` property is not set or present in the @Component decorator options. 

# TO-DO
- Add examples.
- Make more tests.
- Document how use style property for scoped style and how it works.

# Contributions

Any contribution are accepted if going in the good way and, of course, feel free to  report an issues too, if something going bad.

# License

[MIT](http://opensource.org/licenses/MIT)