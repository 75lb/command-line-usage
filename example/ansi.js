var fs = require("fs");
var wales = require("/Users/lloyd/Documents/75lb/command-line-usage/example/wales");

module.exports = {
    options: {
        title: "a typical app",
        description: "Generates something very important.",
        synopsis: [
            "$ example [[bold]{--timeout} [underline]{ms}] [bold]{--src} [underline]{file} ...",
            "$ example [bold]{--help}"
        ],
        footer: [
            "[italic]{This app was tested by dragons in Wales.}",
            null
        ].concat(wales.split("\n"))
    },
    definitions: [
        { name: "help", alias: "h", type: Boolean, description: "Display this usage guide." },
        { name: "src", type: String, multiple: true, defaultOption: true, description: "The input files to process", typeLabel: "[underline]{file} ..." },
        { name: "timeout", alias: "t", type: Number, description: "Timeout value in ms", typeLabel: "[underline]{ms}" }
    ]
};
