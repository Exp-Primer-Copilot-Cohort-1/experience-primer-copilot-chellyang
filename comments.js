// 创建Web服务器
const express = require('express');
const router = express.Router();
const pool = require('../pool');

// 1.添加评论
router.post('/add',(req,res)=>{
    let obj = req.body;
    let sql = 'INSERT INTO comment SET ?';
    pool.query(sql,[obj],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:'添加成功'});
        }else{
            res.send({code:400,msg:'添加失败'});
        }
    });
});

// 2.获取评论列表
router.get('/list',(req,res)=>{
    let pno = req.query.pno;
    let pageSize = req.query.pageSize;
    let sql = 'SELECT * FROM comment LIMIT ?,?';
    let offset = (pno-1)*pageSize;
    pageSize = parseInt(pageSize);
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;
        res.send({code:200,msg:'查询成功',data:result});
    });
});

// 3.删除评论
router.get('/delete',(req,res)=>{
    let id = req.query.id;
    let sql = 'DELETE FROM comment WHERE id=?';
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:'删除成功'});
        }else{
            res.send({code:400,msg:'删除失败'});
        }
    });
});

// 4.修改评论
router.post('/update',(req,res)=>{
    let obj = req.body;
    let sql = 'UPDATE comment SET ? WHERE id=?';
    pool.query(sql,[obj,obj.id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:'修改成功'});
        }else{
            res.send({code:400,msg:'修改失败'});
        }
    });
});

// 5.根据id查询评论
router.get('/detail',(req,res)=>{
    let id = req.query.id;
    let sql = 'SELECT * FROM comment WHERE id=?';
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send({code:200,msg:'查询成功',data:result[0]});
    });
});

module.exports = router;