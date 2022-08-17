module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    sourceType: "module",
    ecmaVersion: 2020
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    "eslint:recommended",
    "prettier"
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "always",
      },
    ],
    "max-len": ["warn", 170, 2,
      {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: false,
          ignoreTemplateLiterals: false,
      }
    ]
  },
}
