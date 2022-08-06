# eslint-plugin-zlint

实现一个eslint 插件 

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-zlint`:

```sh
npm install eslint-plugin-zlint --save-dev
```

## Usage

Add `zlint` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "zlint"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "zlint/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


