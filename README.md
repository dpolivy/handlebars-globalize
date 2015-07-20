# handlebars-globalize #

[Handlebars](http://handlebarsjs.com/) components that provide internationalization features via [Globalize](https://github.com/jquery/globalize). With a little initialization, you get instantly internationalized values in your application.

## Prerequisites ##

When rendering templates, the `options` parameter passed to `Handlebars.compile` must contain
a `data.intl` property, which is an instance of the `Globalize` object. This also
assumes that you have properly installed Globalize and all associated CLDR data.

For server-side rendering with `express`, you should use [express-globalize](https://github.com/dpolivy/express-globalize)
and [hbs](https://github.com/donpark/hbs) to make this super-easy.

## Install ##

```
npm install handlebars-globalize --save
```

## Use ##

Using *handlebars-globalize* is easiest with [hbs](https://github.com/donpark/hbs)
and [express-globalize](https://github.com/dpolivy/express-globalize). Together,
these components attach a `Globalize` object to `res.locals.intl`, and then
expose that object to Handlebars templates via the `data.intl` property.

Please see the [express-globalize](https://github.com/dpolivy/express-globalize)
documentation for installation instructions.

```javascript
var hbs = require('hbs');
var handlebars_globalize = require('handlebars-globalize'),

// Register the helpers with Handlebars/hbs
handlebars_globalize.registerWith(hbs);

// Enable locals to be accessed as template data
hbs.localsAsTemplateData(app);
```

## API ##

### registerWith ###

```javascript
handlebars_globalize.registerWith(handlebars);
```

Registers the i18n helpers with the passed in Handlebars instance. You can pass
in either the `Handlebars` or `hbs` instance, as both expose the needed
`registerHelper` method.

### registerFormatOptions ###

```javascript
handlebars_globalize.registerFormatOptions({
	'whole': { maximumFractionDigits: 0 },
	'score': { maximumFractionDigits: 1 },
	'twodecimals': { minimumFractionDigits: 2, maximumFractionDigits: 2 },
	'maxtwodecimals': { maximumFractionDigits: 2 },
	'percent': { style: 'percent' },
	'short': { date: 'short' },
	'long': { date: 'long' },
	'short-dt': { datetime: 'short' }
});
```

`registerFormatOptions` allows you to pre-define options objects that can be used
with each formatter. Then, when calling the formatter from the template, you can
pass the "friendly name" of the desired options. This reduces complexity and
duplication within the templates.

Subsequent calls to `registerFormatOptions` are additive, although any options
with the same name will be overwritten. The valid values for the options objects
are any properties described in the [Globalize](https://github.com/jquery/globalize#api)
documentation.

## Helpers ##

The following helpers are registered by this module, and available for use within
templates.

### {{formatCurrency}} ###

`{{formatCurrency num [format|options...] [currency='ZZZ']}}`

Parameters:
- `num`: The Number value to format (required)
- `format`: If specified, the name of the format passed to `registerFormatOptions` to use (optional)
- `currency`: The ISO4217 currency code to use when formatting the number (optional, if a default `currencyCode` is passed to [express-globalize.setSupportedLocales](https://github.com/dpolivy/express-globalize))
- Other valid formatter options can be passed in `key=value` pairs to the helper

Examples:
```javascript
{{formatCurrency 1.55}} // => $1.55
{{formatCurrency 1.55 currency='USD'}} // => $1.55
{{formatCurrency 1.55 'whole'}} // => $2
{{formatCurrency 1.55 currency='USD' maximumFractionDigits=0}} // => $2
```

For specific details on available options, see the [currencyFormatter](https://github.com/jquery/globalize/blob/master/doc/api/currency/currency-formatter.md) documentation.

### {{formatDate}} ###

`{{formatDate date [format|options...]}}`

Parameters:
- `date`: The Date value to format (required)
- `format`: If specified, the name of the format passed to `registerFormatOptions` to use (optional)
- Other valid formatter options can be passed in `key=value` pairs to the helper

Examples:
```javascript
{{formatDate '2015-03-01'}} // => 3/1/2015
{{formatDate '2015-03-01' date='long'}} // => March 1, 2015
{{formatDate '2015-03-01' 'long'}} // => March 1, 2015
```

For specific details on available options, see the [dateFormatter](https://github.com/jquery/globalize/blob/master/doc/api/date/date-formatter.md) documentation.

### {{formatTime}} ###

This is just an alias for `{{formatDate}}`. It is included to simplify readability when simply rendering times.

### {{formatMessage}} ###

`{{formatMessage path [args]}}`

Parameters:
- `path`: The path/name of the message to display (required)
- `args`: Parameters that will be passed to the message to tailor how it is displayed (optional)

The args are passed as individual values, *not* `key=value` pairs.

Examples:
```javascript
{{formatMessage 'task' 1000}} // => You have 1,000 tasks remaining
{{formatMessage 'like' 3}} // => You and 2 others liked this
```

For specific details on available options, see the [messageFormatter](https://github.com/jquery/globalize/blob/master/doc/api/message/message-formatter.md) documentation.

### {{formatNumber}} ###

`{{formatNumber num [format|options...]}}`

Parameters:
- `num`: The Number value to format (required)
- `format`: If specified, the name of the format passed to `registerFormatOptions` to use (optional)
- Other valid formatter options can be passed in `key=value` pairs to the helper

Examples:
```javascript
{{formatNumber 10000}} // => 10,000.00
{{formatNumber 3.14159 'twodecimals'}} // => 3.14
{{formatNumber .42 style='percent'}} // => 42%
```

For specific details on available options, see the [numberFormatter](https://github.com/jquery/globalize/blob/master/doc/api/number/number-formatter.md) documentation.

### {{formatRelativeTime}} ###

`{{formatRelativeTime num [format|options...] unit='day'}}`

Parameters:
- `num`: The Number value to format (required)
- `unit`: The unit to use for relative formatting, e.g. `unit='day'`
- `format`: If specified, the name of the format passed to `registerFormatOptions` to use (optional)
- Other valid formatter options can be passed in `key=value` pairs to the helper

Examples:
```javascript
{{formatRelativeTime 1 unit='day'}} // => tomorrow
{{formatRelativeTime -1 unit='month'}} // => last month
```

For specific details on available options, see the [relativeTimeFormatter](https://github.com/jquery/globalize/blob/master/doc/api/relative-time/relative-time-formatter.md) documentation.

## History ##

**v0.1.0**
- Initial release

## License ##
This project is distributed under the MIT license.