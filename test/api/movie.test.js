const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

chai.use(chaiHttp);

let token, movie_id;

describe('/api/movies test', ()=>{
    before((done)=>{
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'test', password: '123456' })
            .end((err, res)=>{
                token = res.body.token;
                //console.log(token);
                done();
            });
    });

    describe('/GET movies', ()=>{
        it('it should Get all the movies', (done)=>{
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST movies', ()=>{  
        it('it should POST a movie', (done)=>{
            const movie = {
                director_id: '5ccc40dad1efdb253c5f9554',
                title: 'Test Title',
                imdb: '9',
                category: 'Test Category',
                country: 'Test Country',
                year: '2019',
            }

            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('imdb');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    movie_id = res.body._id;
                    done();
                })
        });
    });

    describe('/GET/:movie_id movie', ()=>{
        it('it should GET a movie by the given id', (done)=>{
            chai.request(server)
                .get('/api/movies/'+ movie_id)
                .set('x-access-token', token)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('imdb');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('_id').eql(movie_id);
                    done();
                })
        })
    })

    describe('/PUT/:movie_id movie', ()=>{
        it('it should UPDATE a movie given by id', (done)=>{
            const movie = {
                director_id: '5ccc40dad1efdb253c5f9554',
                title: 'Test2 Title',
                imdb: '9',
                category: 'Test2 Category',
                country: 'Test2 Country',
                year: '2019',
            }

            chai.request(server)
                .put('/api/movies/'+ movie_id)
                .send(movie)
                .set('x-access-token', token)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('director_id').eql(movie.director_id);
                    res.body.should.have.property('imdb').eql(parseInt(movie.imdb));
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(parseInt(movie.year));
                    done();
                })
        });
    })

    describe('/DELETE/:movie_id movie', ()=>{
        it('it should DELETE a movie given by id', (done)=>{
            chai.request(server)
                .delete('/api/movies/'+ movie_id)
                .set('x-access-token', token)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                })
        })
    })
});