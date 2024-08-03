/* jshint node:true */
function config(name) {
    return require("./grunt_tasks/" + name + ".js");
}

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: require("./grunt_tasks/jshint.js"),
        karma: require("./grunt_tasks/karma.js")
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-karma");

    grunt.registerTask("default", ["jshint", "karma:dev"]);
    grunt.registerTask("travis", ["jshint", "karma:travis"]);
};
