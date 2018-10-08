module.exports = {
    "extends": "airbnb",
    "parserOptions": {
        "ecmaVersion": 6,
    },
    "parser": "babel-eslint",
    "env": {
        "es6": true,
        "browser": true,
        "node": true,
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    }
};