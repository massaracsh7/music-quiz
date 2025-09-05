import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import angular from 'angular-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import unicorn from 'eslint-plugin-unicorn';

export default [
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
      },
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      '@angular-eslint': angular.tsPlugin,
      prettier: eslintPluginPrettier,
      unicorn: unicorn,
    },
    processor: angular.processInlineTemplates,
    rules: {
      ...js.configs.recommended.rules,
      ...tsEslint.configs.recommended.rules,
      ...tsEslint.configs.stylistic.rules,
      ...angular.configs.tsRecommended.rules,
      ...unicorn.configs.recommended.rules,
      // General
      'prettier/prettier': 'error',
      'no-inline-comments': 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-unused-vars': 'off',
      'no-undef': 'off',
      //Typescript-eslint
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'off' } },
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      // Angular
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      // Unicorn
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/no-null': 'off',
      'unicorn/consistent-function-scoping': 'off',
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angular.templateParser,
    },
    plugins: {
      '@angular-eslint/template': angular.templatePlugin,
    },
    rules: {
      ...angular.configs.templateRecommended.rules,
      ...angular.configs.templateAccessibility.rules,
    },
  },
];
