var wales = require("/Users/lloyd/Documents/75lb/command-line-usage/example/wales");

module.exports = {
    options: {
        title: "a typical app",
        description: "Generates something very important.",
        forms: [
            "$ example [[bold]{--timeout} [underline]{ms}] [bold]{--src} [underline]{file} ...",
            "$ example [bold]{--help}"
        ],
        examples: [
            { desc: "1. A concise example. ", example: "$ example -t 100 lib/*.js" },
            { desc: "2. A long example. ", example: "$ example --timeout 100 --src lib/*.js" },
            { desc: "3. This example will scan space for unknown things. Take cure when scanning space, it could take some time. ", example: "$ example --src galaxy1.facts galaxy1.facts galaxy2.facts galaxy3.facts galaxy4.facts galaxy5.facts" }
        ],
        footer: "Project home: [underline]{https://github.com/me/example}"
    },
    definitions: [
        { name: "help", alias: "h", type: Boolean, description: "Display this usage guide." },
        { name: "src", type: String, multiple: true, defaultOption: true, description: "The input files to process", typeLabel: "[underline]{file} ..." },
        { name: "timeout", alias: "t", type: Number, description: "Timeout value in ms", typeLabel: "[underline]{ms}" }
    ]
};
