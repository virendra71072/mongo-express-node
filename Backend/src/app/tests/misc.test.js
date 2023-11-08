const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../index');
// const CONSTANTS = require('./../../config/constants');
const constant  = require(__basePath + '/app/config/constant');

chai.config.includeStack = true;

describe('## Misc', () => {
  describe('# GET /api/v1/monitor/ping', () => {
    it('should return OK', (done) => {
      request(app)
        .get('/api/v1/monitor/ping')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.text).to.equal('OK');
          done();
        })
        .catch(done);
    });
  });

//   describe('# GET /api/404', () => {
//     it('should return 404 status', (done) => {
//       request(app)
//         .get('/api/404')
//         .expect(httpStatus.NOT_FOUND)
//         .then((res) => {
//           expect(res.body.error.message).to.equal('API not found');
//           expect(res.body.error.name).to.equal(CONSTANTS.ERROR_TYPES.API_NOT_FOUND);
//           done();
//         })
//         .catch(done);
//     });
//   });

//   describe('# Error Handling', () => {
//     it('should handle  CastError - Cast to ObjectId failed', (done) => {
//       request(app)
//         .get('/api/users/56z787zzz67fc')
//         .expect(httpStatus.INTERNAL_SERVER_ERROR)
//         .then((res) => {
//           expect(res.body.error.message).to.equal('Internal Server Error');
//           done();
//         })
//         .catch(done);
//     });

//     it('should handle express validation error - username is required', (done) => {
//       request(app)
//         .post('/api/users')
//         .send({
//           mobileNumber: '1234567890'
//         })
//         .expect(httpStatus.BAD_REQUEST)
//         .then((res) => {
//           expect(res.body.error.name).to.equal(CONSTANTS.ERROR_TYPES.INVALID_INPUT);
//           expect(res.body.error.message).to.be.an('array');
//           done();
//         })
//         .catch(done);
//     });
//   });
});
