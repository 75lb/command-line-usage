module.exports = {
    options: {
        title: "%bold{a typical app}",
        description: "Generates something %yellow bg-black{wild and crazy}",
        forms: [
            "$ cat input.json | my-app [<options>]",
            "$ my-app <files>"
        ],
        groups: {
            main: { 
                title: "Main options",
                description: "This group contains the most important options."
            },
            _none: "No group"
        },
        footer: "Project home: https://github.com/me/my-app",
        hide: [ "files" ]
    },
    data: [
        { name: "help", alias: "h", type: Boolean, description: "Display this usage guide.", group: "main" },
        { name: "files", alias: "f", type: String, multiple: true, defaultOption: true, description: "The input files to process", group: "main" },
        { name: "timeout", alias: "t", type: Number, description: "Timeout value in ms", group: "main" },
        { name: "custom", type: Custom, description: "A custom class instance"}
    ]
};

function Custom(){}
