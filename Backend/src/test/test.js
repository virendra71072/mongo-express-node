var chai      = require('chai'),
    expect      = chai.expect,
    supertest   = require('supertest'),
    api         = supertest('http://localhost:8088/api/v1/');




describe('Server Ping', function () {
    it('Should return a 200 response', function (done) {
        //use this.timeout(6000); to set timeout in miliseconds, default value for the timeout is 2000 miliseconds
        api.get('monitor/ping')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200, done);
    });
});

describe('Login test', function () {
    it('Should return a 201 response', function (done) {
        //use this.timeout(6000); to set timeout in miliseconds, default value for the timeout is 2000 miliseconds
        api.post('user/login')
                .send({
                        "email":"vi2r881@gmail.com",
                        "password":"1234567"
                    })
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(201)
                .then((response) => {
                    expect(Array.isArray(response.body.response))
                    expect(response.body.response).ownProperty("token")

                    // // Check the response data
                    // expect(response.body[0]._id).toBe(post.id)
                    // expect(response.body[0].title).toBe(post.title)
                    // expect(response.body[0].content).toBe(post.content)
                    done();
                })
                .catch(done);;

    });
    it('Should return a 500 response with wrong credentials', function (done) {
        //use this.timeout(6000); to set timeout in miliseconds, default value for the timeout is 2000 miliseconds
        api.post('user/login')
                .send({
                        "email":"vi2r881@gmail.com",
                        "password":"12345678"
                    })
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(500, done);
    });
});
