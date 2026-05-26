import stylelintOrder from 'stylelint-order';

export default {
	extends: ['stylelint-config-standard'],
	plugins: [stylelintOrder],
	ignoreFiles: ['src/styles/reset.css'],
	rules: {
		'order/properties-alphabetical-order': true,
		'selector-class-pattern': null,
		'custom-property-pattern': null,
		'at-rule-empty-line-before': null,
		'rule-empty-line-before': null,
		'media-feature-range-notation': 'prefix',
		'value-keyword-case': null
	}
};
