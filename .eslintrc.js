module.exports = {
    "env": {
      "browser": true,
      "es2021": true,
    },
    "extends": ["prettier", "eslint:recommended", "airbnb-base"],
    "parserOptions": {
      "ecmaVersion": 12,
      "sourceType":"module",
    },
    "plugins": ["prettier"],
    "rules": {
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "trailingComma": "es5",
      "prettier/prettier": [
        "error",
        { "singleQuote": true, "trailingComma": "es5" }
      ]
    }
  
};
