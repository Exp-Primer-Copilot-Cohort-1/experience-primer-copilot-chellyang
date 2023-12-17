// 创建Web服务器
const express = require('express');
const router = express.Router();
const pool = require('../pool');

// 1. 添加评论
router.post('/add', (req, res) => {
  // 获取用户输入的评论内容和对应的文章id
  let obj = req.body;
  // 执行SQL命令
  let sql = 'INSERT INTO comments SET ?';
  pool.query(sql, [obj], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send({
        code: 200,
        msg: 'add comment success'
      });
    } else {
      res.send({
        code: 400,
        msg: 'add comment error'
      });
    }
  });
});

// 2. 查询评论
router.get('/list', (req, res) => {
  // 获取用户传递的文章id
  let aid = req.query.aid;
  // 执行SQL命令
  let sql = 'SELECT * FROM comments WHERE aid=?';
  pool.query(sql, [aid], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({
        code: 200,
        msg: 'select comment success',
        data: result
      });
    } else {
      res.send({
        code: 400,
        msg: 'select comment error'
      });
    }
  });
});

// 3. 删除评论
router.get('/delete', (req, res) => {
  // 获取用户传递的评论id
  let id = req.query.id;
  // 执行SQL命令
  let sql = 'DELETE FROM comments WHERE id=?';
  pool.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send({
        code: 200,
        msg: 'delete comment success'
      });
    } else {
      res.send({
        code: 400,
        msg: 'delete comment error'
      });
    }
  });
});

// 导出路由器对象
module.exports = router;