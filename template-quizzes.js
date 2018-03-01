/* Dependencies */
const canvas = require('canvas-wrapper');

/* Actions */
var actions = [
    require('./actions/quizzes-delete.js'),
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
        this.delete = false;
        this.type = 'Quiz';
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
            'shuffle_answers': quiz.shuffle_answers,
            'hide_results': quiz.hide_results,
            'show_correct_answers': quiz.show_correct_answers,
            'show_correct_answers_last_attempt': quiz.show_correct_answers_last_attempt,
            'show_correct_answers_at': quiz.show_correct_answers_at,
            'hide_correct_answers_at': quiz.hide_correct_answers_at,
            'allowed_attempts': quiz.allowed_attempts,
            'scoring_policy': quiz.scoring_policy,
            'one_question_at_a_time': quiz.one_question_at_a_time,
            'cant_go_back': quiz.cant_go_back,
            'access_code': quiz.access_code,
            'ip_filter': quiz.ip_filter,
            'due_at': quiz.due_at,
            'lock_at': quiz.lock_at,
            'unlock_at': quiz.unlock_at,
            'published': quiz.published,
            'one_time_results': quiz.one_time_results,
            'only_visible_to_overrides': quiz.only_visible_to_overrides,
            'notify_of_update': quiz.notify_of_update,
        }
    };
}

function deleteItem(course, quiz, callback) {
    canvas.delete(`/api/v1/courses/${course.info.canvasOU}/quizzes/${quiz.id}`, (err) => {
        if (err) {
            callback(err);
            return;
        }
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
        callback(null, newItem);
    });
}

function getHTML(item) {
    return null;
}

function setHTML(item, newHTML) {
    return null;
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