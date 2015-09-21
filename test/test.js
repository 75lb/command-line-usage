var test = require("tape");
var usage = require("../");
var cliOptions = require("../example/simple");

test("basic", function(t){
    var result = usage(cliOptions.definitions, cliOptions.options);
    t.ok(/a typical app/.test(result));
    t.end();
});
