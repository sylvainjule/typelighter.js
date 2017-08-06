# typeLighter.js

This small plugin creates a highlighting and typing effect for any text element you'd like.

![screenshot-typelighter](https://user-images.githubusercontent.com/14079751/29002264-d4c2ad04-7a9e-11e7-96ad-059e41522cba.gif)

## Installation
Include the latest minified file in your markup :

```html
<script src="path/to/typelighter.min.js"></script>
```

## Basic usage


```js
$(document).ready(function(){
	$('[your-selector]').typeLighter();
});
```

By default, your element should have a `data-wordlist` attributes, with comma separated strings to loop into :

```html
<span data-wordlist="string 1, string 2, string 3">string 1</span>
```

The plugin will automatically create an array from here, find the index of the current content and start from the next string (only if the content figures within, that's **not mandatory**, otherwise it'll start with the first array element).

You also can set a single string as your `data-wordlist`.

The highlighted characters will be wrapped inside a `span` tag with the class `typelighted`, so that it can be easily styled. You can also add custom classes, see below.

## Avanced usage

You have access to a couple of options, whose defaults are :

```js
$(document).ready(function(){
    $('[your-selector]').typeLighter({
		highlightSpeed: 25,
		typeSpeed: 100,
		clearDelay: 350,
		typeDelay: 200,
		attribute: 'data-wordlist',
		class: null,
		interval: 2500,
		initialDelay: 0,
	});
});
```

Let's have a quick look at each one of those :


| Name      | Description | Default           |                                                                                                                                                                                                                                                                                                                  
|-----------|----------|------------------------------------------|
| highlightSpeed | The interval of time (in `ms`) before highlighting an additional character | 25 |
| typeSpeed | The interval of time (in `ms`) before typing an additional character | 100 |
| clearDelay | The interval of time (in `ms`) between the completion of the highlighting and the removal of the highlighted text | 350 |
| typeDelay | The interval of time (in `ms`) before typing the new text in | 200 |
| attribute | The HTML attribute where the strings are to be found | `'data-wordlist'` |
| class | The class(es) to be added to the default `'typelighted'` class | null |
| interval | The interval of time (in `ms`) between two "typelighting" | 2500 |
| initialDelay | The time (in `ms`) to be added to the first interval, before starting the loop | 0 |

## License

MIT