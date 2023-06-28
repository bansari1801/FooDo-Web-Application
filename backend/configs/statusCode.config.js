// ==========================================
//  Author: Bansari Shah
// ==========================================

module.exports = {
  statusCode: {
    OK: { code: 200, desc: 'OK' },
    CREATED: { code: 201, desc: 'Created' },
    BAD_REQUEST: { code: 400, desc: 'Bad Request' },
    UNAUTHORIZED: { code: 401, desc: 'Unauthorized' },
    FORBIDDEN: { code: 403, desc: 'Forbidden' },
    NOT_FOUND: { code: 404, desc: 'Not Found' },
    INTERNAL_SERVER_ERROR: { code: 500, desc: 'Internal Server Error' },
  },
};
