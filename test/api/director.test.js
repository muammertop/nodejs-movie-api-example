const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

chai.use(chaiHttp);

let token, director_id;

describe('/api/directors test', ()=>{
    before((done)=>{
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'test', password: '123456'})
            .end((err,res)=>{
                token = res.body.token;
                done();
            })
    })

    describe('/GET directors', ()=>{
        it('it should GET all the directors', (done)=>{
            chai.request(server)
                .get('/api/directors')
                .set('x-access-token', token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        })
    })

    describe('/POST director', ()=>{
        it('it should POST a director', (done)=>{
            const director = {
                name: 'Test Name',
                surname: 'Test Surname',
                bio: 'Test Bio'
            }

            chai.request(server)
                .post('/api/directors')
                .set('x-access-token', token)
                .send(director)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('surname');
                    res.body.should.have.property('bio');
                    director_id = res.body._id;
                    done();
                })
        })
    })

    describe('/GET/:director_id director', ()=>{
        it('it should GET a director by the given id ', (done)=>{
            chai.request(server)
                .get('/api/directors/' + director_id)
                .set('x-access-token', token)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })
    })

    describe('/PUT/:director_id director', ()=>{
        it('it should UPDATE a director given by id', (done)=>{
            const director = {
                name: 'Test 2 Name',
                surname: 'Test 2 Surname',
                bio: 'Test 2 Bio'
            }

            chai.request(server)
                .put('/api/directors/' + director_id)
                .set('x-access-token', token)
                .send(director)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        })
    })

    describe('/DELETE/:director_id director', ()=>{
        it('it should DELETE a director given by id', (done)=>{
            chai.request(server)
                .delete('/api/directors/' + director_id)
                .set('x-access-token', token)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                })
        })
    })
})


