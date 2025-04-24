import globals from "globals";
import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginJsonc from "eslint-plugin-jsonc";
import jsoncParser from "jsonc-eslint-parser";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
import html from "eslint-plugin-html";

export default [
	{
		files: ["**/*"],
		languageOptions: { globals: globals.browser },
	},
	{
		files: ["**/*.html"],
		plugins: { html },
		settings: {
			"html/indent": "tab", // indentation is one tab at the beginning of the line.
		},
	},
	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		plugins: {
			prettier: pluginPrettier,
		},
		rules: {
			"prettier/prettier": "error",
		},
	},
	// configPrettier,
	// {
	// 	files: ["*.json"],
	// 	plugins: {
	// 		jsonc: pluginJsonc,
	// 	},
	// 	languageOptions: {
	// 		parser: jsoncParser,
	// 	},
	// 	rules: {
	// 		"jsonc/indent": ["error", "tab"],
	// 		"jsonc/comma-dangle": ["error", "never"],
	// 		"jsonc/object-curly-spacing": ["error", "always"],
	// 		"jsonc/array-bracket-spacing": ["error", "never"],
	// 	},
	// },
	{
		rules: {
			"consistent-return": "off",
			semi: ["error", "always"],
			indent: ["error", "tab"],
			eqeqeq: ["error", "always"],
			curly: ["error", "all"],
			"no-unused-vars": "warn",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"arrow-spacing": ["error", { before: true, after: true }],
			"no-undef": "error",
			"no-dupe-keys": "error",
			"no-func-assign": "error",
			"no-use-before-define": "off",
			camelcase: "error",
			"no-duplicate-imports": "error",
			"react/react-in-jsx-scope": "off",
			"no-require-imports": "off",
		},
	},
];
