// 创建Web服务器
const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controller/commentsCtrl');

// 评论列表
router.get('/comments',commentsCtrl.commentsList);
// 添加评论
router.post('/comments',commentsCtrl.commentsAdd);
// 删除评论
router.delete('/comments/:id',commentsCtrl.commentsDel);
// 评论状态
router.put('/comments/:id',commentsCtrl.commentsStatus);
// 评论详情
router.get('/comments/:id',commentsCtrl.commentsDetail);
// 评论修改
router.put('/comments',commentsCtrl.commentsEdit);

module.exports = router;
