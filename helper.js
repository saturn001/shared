// These are the helper functions for the api respose
/* eslint-disable linebreak-style */
/* eslint-disable prettier/prettier */
const sw = require('swagger-node-express');
const _ = require('lodash');
const moment = require('moment-timezone');

// eslint-disable-next-line prettier/prettier
module.exports = {
  writeResponse(res, response, status) {
    sw.setHeaders(res);
    res.status(status || 200).send(JSON.stringify(response));
  },
  sendSuccess(data, res, status, message) {
    const response = {
      status: true,
      message: 'success',
      result: {
        code: status,
        message,
        data,
      },
      responseCode: 200,
    };
    const errorCode = 200;
    res.status(errorCode || 200).json(response);
  },

  sendCustomError(data, res, status, message) {
    // let resp = { ...data, "message": message}
    const response = {
      status: false,
      message: 'failure',
      result: {
        code: status,
        message,
        // data: resp
      },
      responseCode: 200,
    };
    const errorCode = 200;
    res.status(errorCode || 200).json(response);
  },

  sendPasswordMismatch(data, res, status, message) {
    const response = {
      status: false,
      message: 'failure',
      result: {
        code: status,
        message,
        data,
      },
      responseCode: 401,
    };
    const errorCode = 200;
    res.status(errorCode || 401).json(response);
  },

  sendNoDataSuccess(data, res, status, message) {
    const response = {
      status: false,
      message: 'success',
      result: {
        code: status,
        message,
        data,
      },
      responseCode: 204,
    };
    const errorCode = 200;
    res.status(errorCode || 200).json(response);
  },

  sendInvalidTokenError(data, res, status, message) {
    const response = {
      status: false,
      message: 'failure',
      result: {
        code: status,
        message,
        data,
      },
      responseCode: 402,
    };
    const errorCode = 401;
    res.status(errorCode || 401).json(response);
  },

  writeError(res, error, status) {
    sw.setHeaders(res);
    res.status(error.status || status || 400).send(JSON.stringify(_.omit(error, ['status'])));
  },

  toTimeZone(time, zone = 'Asia/Kolkata') {
    const format = 'YYYY-MM-DD HH:mm:ss';
    return moment(time, format).tz(zone).format(format);
  },
};
