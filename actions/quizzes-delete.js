module.exports = (course, quiz, callback) => {

    /* If the item is marked for deletion, do nothing */
    if (quiz.techops.delete == true) {
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

};