const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/checkAuth');  // Adjust path as necessary

jest.mock('jsonwebtoken');

describe('checkAuth middleware', () => {
  let mockRequest;
  let mockResponse;
  let nextFunction;

  beforeEach(() => {
    // Create mock req and res objects before each test
    mockRequest = {
      headers: {
        authtoken: 'fakeToken',
      },
    };
    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  it('should call next when token is valid', () => {
    jwt.verify.mockImplementation((token, secret, cb) => {
      cb(null, { username: 'testUser' });
    });

    checkAuth(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toHaveBeenCalledTimes(1);
    expect(mockRequest.username).toEqual('testUser');
  });

  it('should return error when token is not provided', () => {
    mockRequest.headers.authtoken = null;
    
    checkAuth(mockRequest, mockResponse, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No authentication token' });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should return error when token is invalid', () => {
    jwt.verify.mockImplementation((token, secret, cb) => {
      cb({ message: 'Error' }, null);
    });

    checkAuth(mockRequest, mockResponse, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Failed to authenticate token' });
    expect(nextFunction).not.toHaveBeenCalled();
  });
});
