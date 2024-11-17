module.exports = {
  singleQuote: true,
  arrowParens: 'avoid',
  semi: false,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'all',
  printWidth: 100,
  bracketSameLine: true,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  insertPragma: false,
  jsxSingleQuote: false,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  endOfLine: 'lf',
  importOrderTypeScriptVersion: '5.0.0',
  importOrder: ['<BUILTIN_MODULES>', '', '<THIRD_PARTY_MODULES>', '', '^@lib/(.*)$', '', '^[.]'],
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-organize-imports',
    'prettier-plugin-packagejson',
  ],
}