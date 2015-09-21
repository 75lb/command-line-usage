module.exports = {
    options: {
        title: "a typical app",
        description: "Generates something [italic]{very} important.",
        groups: {
            main: "Main options",
            _none: { 
                title: "Misc",
                description: "Miscelaneous ungrouped options."
            }
        }
    },
    definitions: [
        { name: "help", alias: "h", type: Boolean, description: "Display this usage guide.", group: "main" },
        { name: "src", type: String, multiple: true, defaultOption: true, description: "The input files to process", typeLabel: "[underline]{file} ...", group: "main" },
        { name: "timeout", alias: "t", type: Number, description: "Timeout value in ms", typeLabel: "[underline]{ms}", group: "main" },
        { name: "plugin", type: String, description: "A plugin path" }
    ]
};
