process.env.NODE_ENV = 'test';

const Mongoose = require("mongoose");
const Crew = require("../Models/CrewModel");


const chai = require("chai");
const chaiHttp = require("chai-http");
const mocha = require("mocha");
const server = require('../serverV3.js')
const should = chai.should();

chai.use(chaiHttp);

describe('Crews', () =>{
    beforeEach((done)=> {
        Crew.remove({}, (err)=>{
            done();
        });
    });
});

describe('/Get Race', ()=>{
    it('It should get all races', (done)=>{
        chai.request(server)
        .get('/race')
        .end((err, res)=>{
            res.should.have.status(200);
            res.should.be.a('Object');           
        done();
        });
    });
});
describe('/Get event coordinators', ()=>{
    it('It should get all eventcoordinators', (done)=>{
        chai.request(server)
        .get('/eventcoordinator')
        .end((err, res)=>{
            res.should.have.status(200);
            res.should.be.a('Object');           
        done();
        });
    });
});
describe('/Get crew', ()=>{
    it('It should get all crews', (done)=>{
        chai.request(server)
        .get('/crew')
        .end((err, res)=>{
            res.should.have.status(200);
            res.should.be.a('Object');           
        done();
        });
    });
});

describe('/POST Crew', () =>{
    it('it should post a new Crew', (done)=>{
        let crew= {
            fld_CrewName: "UnitTest",
            fld_Captain: "Mocha",
            fld_Email: "Chai@Mocha.dk",
            fld_Password: "MochaChai",
            fld_Position: 0,
            fld_Members: 2,
            fld_Category: "UnitTest"
        }
        chai.request(server)
        .post('/crew')
        .send(crew)
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');           
            done();
        })
    })
})

describe('/Patch Crew', () =>{
    it('it should update a crew with a new crew name', (done)=>{
        let crew= {
            fld_CrewName: "UnitTestUpdate",
            fld_Captain: "Mocha",
            fld_Email: "Chai@Mocha.dk",
            fld_Password: "MochaChai",
            fld_Position: 0,
            fld_Members: 2,
            fld_Category: "UnitTest"
        }
        chai.request(server)
        .patch('/crew/UnitTest')
        .send(crew)
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');          
            done();
        })
    })
})

describe('/Delete Crew', () =>{
    it('it should delete a crew that already exists', (done)=>{

        chai.request(server)
        .del('/crew/UnitTestUpdate')
        .end((err, res)=>{
            res.should.have.status(200);        
            done();
        })
    })
})