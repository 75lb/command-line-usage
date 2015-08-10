module.exports = {
    options: {
        title: "a typical app",
        description: "Generates something very important.",
        forms: [
            "$ cat input.json | my-app [<options>]",
            "$ my-app <files>"
        ],
        footer: "Project home: [underline]{https://github.com/me/my-app}"
    },
    data: [
        { name: "help", alias: "h", type: Boolean, description: "Display this usage guide." },
        { name: "src", type: String, multiple: true, defaultOption: true, description: "The input files to process", typeLabel: "<files>" },
        { name: "timeout", alias: "t", type: Number, description: "Timeout value in ms", typeLabel: "<ms>" }
    ]
};
