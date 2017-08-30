module.exports = {
    entry: "./scripts/calendar.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    node: {
        fs: "empty"
    }

};
