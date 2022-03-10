// // import { Response, Request , NextFunction } from "express";

// // import { checkSchema, vallidationResult } from 'express-validator'
// // import HttpException from "../utils/error.util";

// // export const errorMiddleware = (err,req,res,next) => {
// //     let tranceMeta;
// //     if(err.meta) {
// //         tranceMeta = { ...err.meta, ...{ traceId: req.id } };
// //     }else {
// //         tranceMeta = { traceId: req.id}
// //     }
// // }
// //import { Request, Response, NextFunction } from 'express';
// const { Request, Response, NextFunction } = require('express')
// //import { checkSchema, Schema, validationResult } from 'express-validator';
// const { checkSchema, Schema, validationResult } = require('express-validator')
// //import HttpException from '../utils/error.utils';
// const HttpException = require('../../utils/error.util.js')

//  const errorMiddleware = (err, req, res, next) => {
//   try {
//     // set meta data
//     let tranceMeta;
//     if (err.meta) {
//       tranceMeta = { ...err.meta, ...{ traceId: req.id } };
//     } else {
//       tranceMeta = { traceId: req.id };
//     }

//     // Logging Error logic
//     if (err && err.originalError) {
//       req.log.error(`${err.originalError} >> ${err.message}`);
//     } else if (err && err.errorCode) {
//       req.log.trace(`${err.errorCode} >> ${err.message} >> ${JSON.stringify(tranceMeta, null, 2)}`);
//     } else {
//       req.log.error(err);
//     }

//     // returning response to api
//     if (err && err.statusCode) {
//       res.status(err.statusCode).send({
//         error: err.errorCode,
//         message: err.message,
//         meta: tranceMeta,
//       });
//     } else {
//       res.status(500).send({
//         error: 'INTERNAL_SERVER_ERROR',
//         message: 'An unexpected error occurred.',
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// };
// async function validateRequestMiddleware(schema) {
//   return async (req, res, next) => {
//     await checkSchema(schema).run(req);
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       next(
//         new HttpException(400, 'Middleware validation fail', 'MIDDLWARE_VALIDATION_ERROR', '', {
//           ...errors,
//         }),
//       );
//     }
//     next();
//   };
// }
// module.exports = {
//     validateRequestMiddleware:validateRequestMiddleware
// }