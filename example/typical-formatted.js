module.exports = {
    options: {
        title: {
            text: "a typical app",
            format: [ "bold", "underline", "magenta" ]
        },
        description: {
            text: "Generates something [white bg-red]{very important}.",
            format: "bold"
        },
        usage: {
            title: { text: "Usage", format: [ "bold", "underline", "magenta" ]},
            forms: [
                "the main form: ",
                "$ cat input.json | my-app [italic]{<options>}",
                "",
                "a simple form:",
                "$ my-app [italic]{<files>}"
            ]
        },
        groups: {
            main: { 
                title: "[red]{Main} options",
                description: "This group contains the [bold]{most important} options."
            },
            _none: "No group"
        },
        footer: "Project home: [underline]{https://github.com/me/my-app}",
        hide: "files"
    },
    data: [
        { name: "help", alias: "h", type: Boolean, description: "Display this usage guide.", group: "main" },
        { name: "files", alias: "f", type: String, multiple: true, defaultOption: true, description: "The input files to process", group: "main" },
        { name: "timeout", alias: "t", type: Number, description: "Timeout value in ms", group: "main" },
        { name: "custom", type: Custom, description: "A [blue italic]{custom} class instance"}
    ]
};

function Custom(){}
