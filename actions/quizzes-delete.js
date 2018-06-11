/******************************************************************************
 * Quizzes Delete
 * Description: Create an array of quiz titles and set their delete 
 * attribute on the TechOps class to true. If the delete attribute is set to 
 * true, the quiz will be deleted in action-series-master main.js 
 ******************************************************************************/
module.exports = (course, quiz, callback) => {
    try {




        /* If the item is marked for deletion, do nothing */
        if (quiz.techops.delete === true) {
            callback(null, course, quiz);
            return;
        }

        /* Quizzes to be deleted, in LOWER case */
        var doomedItems = [
            // some regex here to catch the quiz titles to be deleted
        ];

        /* The test returns TRUE or FALSE - action() is called if true */
        var found = doomedItems.find(item => item.test(quiz.title));

        /* This is the action that happens if the test is passed */
        function action() {
            quiz.techops.delete = true;
            quiz.techops.log('Quizzes Deleted', {
                'Title': quiz.title,
                'ID': quiz.id
            });
            callback(null, course, quiz);
        }

        if (found != undefined) {
            action();
        } else {
            callback(null, course, quiz);
        }
    } catch (e) {
        course.error(new Error(e));
        callback(null, course, quiz);
    }
};

module.exports.details = {
    title: 'quizzes-delete'
}