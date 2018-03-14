/* Dependencies */
const canvas = require('canvas-wrapper');

/* Actions */
var actions = [
    // require('./actions/quizzes-delete.js'),
];

class TechOps {
    constructor() {
        this.getHTML = getHTML;
        this.setHTML = setHTML;
        this.getPosition = getPosition;
        this.setPosition = setPosition;
        this.getTitle = getTitle;
        this.setTitle = setTitle;
        this.getID = getID;
        this.logs = [];
        this.delete = false;
        this.type = 'Quiz';
    }

    log(title, details) {
        this.logs.push({ title, details });
    }
}

/* Retrieve all items of the type */
function getItems(course, callback) {
    /* Get all of the quizzes from Canvas */
    canvas.getQuizzes(course.info.canvasOU, (err, items) => {
        if (err) {
            callback(err);
            return;
        }
        /* Give each item the TechOps helper class */
        items.forEach(it => {
            it.techops = new TechOps();
        });

        callback(null, items);
    });
}

/* Build the PUT object for an item */
function buildPutObj(quiz) {
    return {
        'quiz': {
            'title': quiz.title,
            'description': quiz.description,
            'quiz_type': quiz.quiz_type,
            'assignment_group_id': quiz.assignment_group_id,
            'time_limit': quiz.time_limit,
            'show_correct_answers': quiz.show_correct_answers,
            'show_correct_answers_last_attempt': quiz.show_correct_answers_last_attempt,
            'show_correct_answers_at': quiz.show_correct_answers_at,
            'hide_correct_answers_at': quiz.hide_correct_answers_at,
            'allowed_attempts': quiz.allowed_attempts,
            'due_at': quiz.due_at,
            'lock_at': quiz.lock_at,
            'unlock_at': quiz.unlock_at,
            'published': quiz.published,
        }
    };
}

function confirmLogs(course, quiz) {
    quiz.techops.logs.forEach(log => {
        course.log(log.title, log.details);
    });
}

function deleteItem(course, quiz, callback) {
    canvas.delete(`/api/v1/courses/${course.info.canvasOU}/quizzes/${quiz.id}`, (err) => {
        if (err) {
            callback(err);
            return;
        }
        confirmLogs(course, quiz);
        callback(null, null);
    });
}

/* PUT an item back into Canvas with updates */
function putItem(course, quiz, callback) {
    if (quiz.techops.delete === true) {
        deleteItem(course, quiz, callback);
        return;
    }
    var putObj = buildPutObj(quiz);
    canvas.put(`/api/v1/courses/${course.info.canvasOU}/quizzes/${quiz.id}`, putObj, (err, newItem) => {
        if (err) {
            callback(err);
            return;
        }
        confirmLogs(course, quiz);
        callback(null, newItem);
    });
}

function getHTML(item) {
    return item.description;
}

function setHTML(item, newHTML) {
    item.description = newHTML;
}

function getTitle(item) {
    return item.title;
}

function setTitle(item, newTitle) {
    item.title = newTitle;
}

function getPosition(item) {
    return null;
}

function setPosition(item, newPosition) {
    return null;
}

function getID(item) {
    return item.id;
}

module.exports = {
    actions: actions,
    getItems: getItems,
    putItem: putItem,
};