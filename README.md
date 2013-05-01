# ui-d3 directive [![Build Status](https://travis-ci.org/douglasduteil/ui-d3.png)](https://travis-ci.org/douglasduteil/ui-d3)

This directive allows you to add simple [D3 (Data-Driven Documents)](http://d3js.org/) elements.

# Requirements

- AngularJS
- [D3 ~3.1.6](https://github.com/mbostock/d3)

# Testing

We use karma (the new testacular) and jshint to ensure the quality of the code.  The easiest way to run these checks is to use grunt:

```sh
npm install -g grunt-cli
npm install
bower install
grunt
```

The karma task will try to open Firefox as a browser in which to run the tests.  Make sure this is available or change the configuration in `test\karma.conf.js`
