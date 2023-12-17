// 创建Web服务器
var express = require('express');
var router = express.Router();
var pool = require('../pool');

// 1.发表评论
router.post('/add', function (req, res) {
    var obj = req.body;
    var sql = 'INSERT INTO comment SET ?';
    pool.query(sql, [obj], function (err, result) {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: 200,
                msg: '评论发表成功'
            });
        } else {
            res.send({
                code: 301,
                msg: '评论发表失败'
            });
        }
    });
});

// 2.查询评论
router.get('/list', function (req, res) {
    var obj = req.query;
    var pno = obj.pno;
    var size = obj.size;
    if (!pno) {
        pno = 1;
    }
    if (!size) {
        size = 5;
    }
    pno = parseInt(pno);
    size = parseInt(size);
    var start = (pno - 1) * size;
    var sql = 'SELECT cid,ctime,content,uname,avatar FROM comment,user WHERE comment.user_id=user.uid ORDER BY cid DESC LIMIT ?,?';
    pool.query(sql, [start, size], function (err, result) {
        if (err) throw err;
        res.send({
            code: 200,
            msg: '查询成功',
            data: result
        });
    });
});

// 3.删除评论
router.get('/delete', function (req, res) {
    var obj = req.query;
    var cid = obj.cid;
    var sql = 'DELETE FROM comment WHERE cid=?';
    pool.query(sql, [cid], function (err, result) {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: 200,
                msg: '删除成功'
            });
        } else {
            res.send({
                code: 301,
                msg: '删除失败'
            });
        }
    });
});

module.exports = router;
