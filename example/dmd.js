module.exports = {
    options: {
        title: "dmd",
        header: "Generate markdown API documentation",
        forms: [
            "$ cat jsdoc-parse-output.json | dmd [<options>]"
        ],
        footer: "Project home: https://github.com/jsdoc2md/dmd"
    },
    data: [
        { name: "template", alias: "t", type: String,
          description: "A custom handlebars template file to insert documentation into. The default template is `{{>main}}`."
        },
        { name: "heading-depth", type: Number, alias: "d",
          description: "root heading depth, defaults to 2 (`##`)."
        },
        { name: "plugin", type: Array,
          description: "Use an installed package containing helper and/or partial overrides"
        },
        { name: "helper", type: Array,
          description: "handlebars helper files to override or extend the default set"
        },
        { name: "partial", type: Array,
          description: "handlebars partial files to override or extend the default set"
        },
        { name: "example-lang", type: String, alias: "l",
          description: "Specifies the default language used in @example blocks (for syntax-highlighting purposes). In gfm mode, each @example is wrapped in a fenced-code block. Example usage: `--example-lang js`. Use the special value `none` for no specific language. While using this option, you can override the supplied language for any @example by specifying the `@lang` subtag, e.g `@example @lang hbs`. Specifying `@example @lang off` will disable code blocks for that example."
        },
        { name: "name-format", type: Boolean,
          description: "Format identifier names as code"
        },
        { name: "no-gfm", type: Boolean,
          description: "By default, dmd generates github-flavoured markdown. Not all markdown parsers render gfm correctly. If your generated docs look incorrect on sites other than Github (e.g. npmjs.org) try enabling this option to disable Github-specific syntax. "
        },
        { name: "separators", type: Boolean,
          description: "Put <hr> breaks between identifiers. Improves readability on bulky docs. "
        },
        { name: "module-index-format", type: String, alias: "m",
          description: "none, grouped, table, dl"
        },
        { name: "global-index-format", type: String, alias: "g",
          description: "none, grouped, table, dl"
        },
        { name: "param-list-format", type: String, alias: "p",
          description: "Two options to render parameter lists: 'list' or 'table' (default). Table format works well in most cases but switch to list if things begin to look crowded / squashed. "
        },
        { name: "property-list-format", type: String, alias: "r",
          description: "list, table"
        },
        { name: "member-index-format", type: String, alias: "c",
          description: "grouped, list"
        },
        { name: "group-by", type: Array,
          description: "a list of fields to group member indexes by"
        }
    ]
};
