const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Model
const Director = require('../model/Director');

// All Directors
router.get('/', (req, res)=>{
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies',
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $group: {
                _id:{
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio', 
                },
                movies:{
                    $push: '$movies'
                }
            }
        }
    ]);

    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    })
});

// Director Details
router.get('/:director_id', (req, res)=>{
    const promise = Director.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies',
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $group: {
                _id:{
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio', 
                },
                movies:{
                    $push: '$movies'
                }
            }
        }
    ]);

    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    })
});

router.put('/:director_id', (req, res, next)=>{
    const promise = Director.findByIdAndUpdate(
        req.params.director_id,
        req.body,{
            new: true
        }
    );
    promise.then((data)=>{
        if(!data)
            next({ message: 'The director was not found' });
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    })
})

// Find By Id And Remove Director
router.delete('/:director_id', (req, res, next)=>{
    const promise = Director.findByIdAndDelete( req.params.director_id );
    promise.then((director)=>{
        if(!director)
            next({'message': 'The director was not found.'});
        res.json({'status': '1'})
    }).catch((err)=>{
        res.json(err);
    })
})

// Create New Director
router.post('/', (req, res, next) => {
    const director = new Director(req.body);
    const promise = director.save();
    promise.then((data)=>{
    	res.send(data);
    }).catch((err)=>{
    	res.send(err);
    })
});

module.exports = router;
