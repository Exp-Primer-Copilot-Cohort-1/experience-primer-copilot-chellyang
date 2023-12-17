// 创建Web服务器
const express = require('express');
const router = express.Router();
const comment = require('../controllers/comment');
// 挂载路由
// 发布评论
router.post('/post', comment.postComment);
// 获取评论
router.get('/list', comment.getCommentList);
// 导出路由
module.exports = router;
