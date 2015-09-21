module.exports = {
    definitions: [
        { name: "help", alias: "h", type: Boolean, group: "main", 
          description: "Display this usage guide." },
        { name: "files", alias: "f", type: String, multiple: true, defaultOption: true, group: "main", 
          description: "The input files to process", hide: true },
        { name: "timeout", alias: "t", type: Number, group: "main", 
          description: "Timeout value in ms", typeLabel: "<ms>" },
        { name: "custom", type: Custom, description: "A [blue italic]{custom} class instance" }
    ],
    options: {
        nameStyles: "bold",
        text: [
            "[bold underline]{a typical app}",
            "Generates something [white bg-red]{very important}.",
            null,
            "[bold underline]{Usage}",
            "the main form: ",
            "$ cat input.json | my-app [italic]{<options>}",
            null,
            "a simple form:",
            "$ my-app [italic]{<files>}",
            null,
            "This group contains the [bold]{main} options.",
            "{{optionList.main}}",
            null,
            "These options have no group.",
            "{{optionList._none}}",
            null,
            "Project home: [underline]{https://github.com/me/my-app}"
        ]
    }
};

function Custom(){}
