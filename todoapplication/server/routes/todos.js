var express =  require('express');
var router = express.Router();

var itemList = [];

router.get("/", (req, res, next) => {
    res.send('Index');
});

router.get("/api/todos", (req, res, next) => {
    res.json(itemList);
});

router.post("/api/todos/add", (req, res, next) => {
    itemList.push(req.body);
    res.json(itemList);
});

router.delete("/api/todos/delete/:item", (req, res, next) => {
    itemList = itemList.filter( todoItem => todoItem.item.trim() !== req.params.item.trim());
    res.json(itemList);
});

router.put("/api/todos/update/:item", (req, res, next) => {
    itemList.map(todoItem => {
        if(todoItem.item.trim() === req.params.item.trim() ){
            todoItem.item = req.body.item;
        }
    });
    res.json(itemList);
});

module.exports = router;
