var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/eventlist', function(req, res) {
    var db = req.db;
    var collection = db.get('eventlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/addevent', function(req, res) {
    console.log('this ran')
    var db = req.db;
    var collection = db.get('eventlist');
    
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteevent/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('eventlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;
