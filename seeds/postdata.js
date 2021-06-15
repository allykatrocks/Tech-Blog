const {Post} = require('../models/index');

const posts = [{'title': 'Cool Fullstack Project Ideas', 'content': 'Here are some cool project ideas.', 'user_id': 1}]

function seedPosts() {
    return Post.bulkCreate(posts)
}

module.exports = seedPosts;