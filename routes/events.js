var express = require('express');
var mongoose = require('mongoose')
var Event = mongoose.model('Event');

var router = express.Router();

/*
 * GET userlist.
 */
router.get('/eventlist', function(req, res) {
    console.log('getting events')
    Event.find({}, function(err, events) {
        if(err) {
            res.send( {msg: 'Error finding events'} )
        } else {
            res.json(events);
        }
    })
    // var db = req.db;
    // var collection = db.get('eventlist');
    // collection.find({},{},function(e,docs){
    //     res.json(docs);
    // });
});

/*
 * POST to adduser.
 */
router.post('/addevent', function(req, res) {
    var new_event = new Event(req.body)
    new_event.save(function (err) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    })
    // var db = req.db;
    // var collection = db.get('eventlist');
    // console.log(collection)
    // collection.insert(req.body, function(err, result){
    //     res.send(
    //         (err === null) ? { msg: '' } : { msg: err }
    //     );
    // });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteevent/:id', function(req, res) {
    var eventToDelete = req.params.id
    Event.find({_id: eventToDelete}).remove(function (err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    })
    // var db = req.db;
    // var collection = db.get('eventlist');
    // var userToDelete = req.params.id;
    // collection.remove({ '_id' : userToDelete }, function(err) {
    //     res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    // });
});


module.exports = router;
