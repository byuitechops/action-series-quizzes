/* Dependencies */
const tap = require('tap');
const canvas = require('canvas-wrapper');
const asyncLib = require('async');

module.exports = (course, callback) => {
    tap.test('action-series-quizzes', (tapTest) => {
        function quizzes_delete(deleteCallback) {
            deleteCallback(null);
            return;
        }

        /* An array of functions for each associated action in action-series-quizzes */
        var myFunctions = [
            quizzes_delete,
        ];

        /* Run each universal grandchilds' test in its own function, one at a time */
        asyncLib.series(myFunctions, (seriesErr) => {
            if (seriesErr) {
                course.error(seriesErr);
            }
            tapTest.end();
        });
    });

    callback(null, course);
};