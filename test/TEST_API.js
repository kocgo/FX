const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const _ = require('lodash');
const jsonData = require('../jsonData');
let app = require('../app.js');


chai.use(chaiHttp);

describe('fx api', () => {
    // ALL JSON DATA
    it('It Should Get All Json Data', (done) => {
        chai.request(app)
            .get('/allPairs')
            .end((err, res) => {
                res.status.should.be.equal(200);
                res.body.should.be.a('array');
                _.isEqual(
                    [ 
                        { pair: 'USD CHF', buy: 0.99143, sell: 0.99043 },
                        { pair: 'GBP USD', buy: 1.28495, sell: 1.2836 },
                        { pair: 'GBP CHF', buy: 1.27378, sell: 1.27147 },
                        { pair: 'EUR SEK', buy: 9.632, sell: 9.6055 },
                        { pair: 'USD JPY', buy: 110.467, sell: 110.417 },
                        { pair: 'EUR JPY', buy: 120.589, sell: 120.491 } 
                    ]
                , res.body).should.be.true;
            done();
            });
    });

    // SPECIFIC DATA
    it('It Should get the specified pairs', (done) => {
        chai.request(app)
        .post('/specificPairs/')
        .set('content-type', 'application/json')
            .send(["USD CHF", "GBP USD"])
            .end(function(error, res) {
                res.status.should.be.equal(200);
                res.body.should.be.a('array');
                _.isEqual(
                    [ 
                        { pair: 'USD CHF', buy: 0.99143, sell: 0.99043 },
                        { pair: 'GBP USD', buy: 1.28495, sell: 1.2836 }
                    ]
                , res.body).should.be.true;
                done();    
            });
    })

    it('It Should Give 404', (done) => {
        chai.request(app)
        .get('/specificPairsss/')
            .end(function(error, res) {
                res.status.should.be.equal(404);
                done();    
            });

        
    })

    it('It Should Give 500', (done) => {
        chai.request(app)
        .post('/specificPairs/')
        .set('content-type', 'application/json')
            .send(45679095467)
            .end(function(error, res) {
                res.status.should.be.equal(500);
                done();    
            });
    })

    it('It Should Return Values +-10%', (done) => {
        let testJson = ["USD CHF", "GBP USD"]
        let buysellValues = [...jsonData].filter( (f) => {
            return testJson.includes(f["pair"])
        })
        chai.request(app)
        .post('/specificPairsWithRandom/')
        .set('content-type', 'application/json')
            .send(testJson)
            .end(function(error, res) {

                res.status.should.be.equal(200);
                res.body.every( (e,index) => {
                    return (
                        // buy minimum and maximum
                        // sell minimum and maximum
                        e["buy"] >= buysellValues[index]["buy"] * (0.9) &&
                        e["buy"] <= buysellValues[index]["buy"] * (1.1) &&
                        e["sell"] >= buysellValues[index]["sell"] * (0.9) &&
                        e["sell"] <= buysellValues[index]["sell"] * (1.1)
                    )
                }).should.be.true
                done(); 

            });
    })
})