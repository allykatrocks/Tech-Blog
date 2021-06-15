const {Comment} = require('../models/index');

const comments = [{'comment_text': 'Great idea!', 'user_id': 1, 'post_id': 1}]

function seedComments() {
    return Comment.bulkCreate(comments)
}

module.exports = seedComments;