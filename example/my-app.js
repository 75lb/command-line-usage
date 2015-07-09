module.exports = {
    options: {
        title: "my-app",
        description: "Generates something useful",
        forms: [
            "$ cat input.json | my-app [<options>]",
            "$ my-app <files>"
        ],
        groups: {
            main: { 
                title: "Main options",
                description: "This group contains the most important options."
            },
            misc: "Miscellaneous"
        },
        footer: "Project home: https://github.com/me/my-app"
    },
    data: [
        { name: "one", alias: "a", type: String, group: "main",
          description: "The first option"
        },
        { name: "two", type: Number, alias: "b", group: "main",
          description: "The second option"
        },
        { name: "three", alias: "c", type: String, group: "misc",
          description: "The third option"
        },
        { name: "four", type: Number, alias: "d", group: "misc",
          description: "The fourth option"
        }
    ]
};
