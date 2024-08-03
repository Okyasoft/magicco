/* jshint node:true */
function config(name) {
    return require("./grunt_tasks/" + name + ".js");
}

/**
 * This function is used to initialize grunt tasks and register new tasks.
 * @param {Object} grunt - Grunt is a task-based command-line build tool for JavaScript projects.
 * There are no explicit returns, but it has an implicit return of `undefined` if the function completes without early return.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: config("jshint"),
        karma: config("karma")
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-karma");

    grunt.registerTask("default", ["jshint", "karma:dev"]);
    grunt.registerTask("travis", ["jshint", "karma:travis"]);
};