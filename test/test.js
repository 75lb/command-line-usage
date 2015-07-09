var test = require("tape");
var usage = require("../");
var cliOptions = require("../example/my-app");

test("basic", function(t){
    var result = usage(cliOptions);
    t.ok(/my-app/.test(result));
    t.end();
});
