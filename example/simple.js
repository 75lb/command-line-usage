module.exports = {
    options: {
        title: "a typical app",
        description: "Generates something very important.",
        footer: "Project home: [underline]{https://github.com/me/example}"
    },
    definitions: [
        { name: "help", alias: "h", type: Boolean, description: "Display this usage guide." },
        { name: "src", type: String, multiple: true, defaultOption: true, description: "The input files to process" },
        { name: "timeout", alias: "t", type: Number, description: "Timeout value in ms" }
    ]
};
