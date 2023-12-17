// 创建Web服务器
const express = require('express');
const router = express.Router();
const pool = require('../pool');

// 1.添加评论
router.post('/add', (req, res) => {
    let obj = req.body;
    console.log(obj);
    if (!obj.uname) {
        res.send({ code: 401, msg: 'uname required' });
        return;
    }
    if (!obj.content) {
        res.send({ code: 402, msg: 'content required' });
        return;
    }
    if (!obj.cid) {
        res.send({ code: 403, msg: 'cid required' });
        return;
    }
    let sql = 'INSERT INTO comments SET ?';
    pool.query(sql, obj, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ code: 200, msg: 'add success' });
        } else {
            res.send({ code: 301, msg: 'add error' });
        }
    });
});

// 2.查询评论
router.get('/list', (req, res) => {
    let cid = req.query.cid;
    let sql = 'SELECT * FROM comments WHERE cid=? ORDER BY ctime DESC';
    pool.query(sql, [cid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 200, msg: 'list success', data: result });
        } else {
            res.send({ code: 301, msg: 'list error' });
        }
    });
});

// 3.删除评论
router.get('/delete', (req, res) => {
    let cid = req.query.cid;
    let sql = 'DELETE FROM comments WHERE cid=?';
    pool.query(sql, [cid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ code: 200, msg: 'delete success' });
        } else {
            res.send({ code: 301, msg: 'delete error' });
        }
    });
});

// 4.查询所有评论
router.get('/all', (req, res) => {
    let sql = 'SELECT * FROM comments ORDER BY ctime DESC';
    pool.query(sql,