# 1.1.0
- Changed Absurd.JS for and more minimalist implementation for style preprocessing.
- Removed `el` property for inconsistency with hot module reload api package. Use the normal way of doing a root component or use the instance method $mount(...).
- Moved decorators to a separated file for allow importing one by one.
- Event name in `On` and `Once` decorators are now optional.
- Included a type definition file.

# 1.0.1
- Support for Vue version 1.x.x and 2.x.x.
- Added some utilities typings.

# 1.0.0
- Support for Vue 1.x.x.
- Experimental support for Vue 2.x.x.
- Use Absurd.JS for preprocessing style.