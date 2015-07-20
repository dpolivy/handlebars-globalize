var moment = require('moment');
var utils = require('./utils');

// Store the 'templates' for formatter options
var formatOptions = {};

module.exports = {
	/**
	 * registerWith(handlebars)
	 *
	 * Registers the i18n helpers with the passed in Handlebars instance
	 */
	registerWith: function(handlebars) {
		var helpers = {
			formatCurrency: formatCurrency,
			formatDate: formatDate,
			formatTime: formatDate,
			formatMessage: formatMessage,
			formatNumber: formatNumber,
			formatRelativeTime: formatRelativeTime
		 };

		for (var name in helpers) {
			if (helpers.hasOwnProperty(name)) {
				handlebars.registerHelper(name, helpers[name]);
			}
		}

		function formatCurrency(num, format, options) {
			if (!options) {
				options = format;
				format = null;
			}

			var formatterOptions = getFormatterOptions(format, options);

			if (num !== undefined) return options.data.intl.currencyFormatter(options.hash.currency, formatterOptions)(num);
		}

		function formatDate(date, format, options) {
			date = moment(date).toDate();

			if (!options) {
				options = format;
				format = null;
			}

			var formatterOptions = getFormatterOptions(format, options);

			return options.data.intl.dateFormatter(formatterOptions)(date);
		}

		function formatMessage(path) {
			// Extract the arguments for the message
			var args = Array.prototype.slice.call(arguments, 1),
				options = args.pop();

			return options.data.intl.messageFormatter(path)(args);
		}

		function formatNumber(num, format, options) {
			if (!options) {
				options = format;
				format = null;
			}

			var formatterOptions = getFormatterOptions(format, options);

			if (num !== undefined) return options.data.intl.numberFormatter(formatterOptions)(num);
		}

		function formatRelativeTime(timestamp, format, options) {
			if (!options) {
				options = format;
				format = null;
			}

			var formatterOptions = getFormatterOptions(format, options);

			return options.data.intl.relativeTimeFormatter(options.hash.unit, formatterOptions)(timestamp);
		}

		function getFormatterOptions(format, options) {
			// Remove some items from the hash that are named parameters to the formatters
			var hash = utils.omit(options.hash, 'currency', 'unit');

			if (format) {
				return utils.extend({}, formatOptions[format], hash);
			}
			else {
				// Only return a valid formatter if it has keys
				return Object.keys(hash).length > 0 ? hash : undefined;
			}
		}
	},

	/**
	 * registerFormatOptions(options)
	 *
	 * Register `options` objects for the various formatters using friendly names,
	 * which can then be used from within the Handlebars helper as formatting
	 * options for the formatter.
	 */
	registerFormatOptions: function(options) {
		utils.extend(formatOptions, options);
	}
};