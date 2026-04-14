const { HTTP_STATUS, ERROR_CODE } = require("../constants");

class AppError extends Error {
   constructor(
      message,
      statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
      errorCode
   ) {
      super(message);
      this.message = message;
      this.statusCode = statusCode;
      this.errorCode = errorCode;
      Error.captureStackTrace(this, this.constructor);
   }
}

class NotFoundException extends AppError {
   constructor(message = "Failed to find data", errorCode) {
      super(message, HTTP_STATUS.NOT_FOUND, errorCode);
   }
}

class DuplicateException extends AppError {
   constructor(message = "Duplicate Record", errorCode) {
      super(message, HTTP_STATUS.BAD_REQUEST, errorCode);
   }
}

class UnAuthorizedException extends AppError {
   constructor(message = "Unauthorized", errorCode) {
      super(message, HTTP_STATUS.UNAUTHORIZED, errorCode);
   }
}

class BadRequestException extends AppError {
   constructor(message = "Bad Request", errorCode) {
      super(message, HTTP_STATUS.BAD_REQUEST, errorCode);
   }
}

class InternalServerException extends AppError {
   constructor(message = "Internal Server Error", errorCode) {
      super(
         message,
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR
      );
   }
}

class ConflictException extends AppError {
   constructor(message, errorCode) {
      super(message, HTTP_STATUS.CONFLICT, errorCode);
   }
}

class HttpException extends AppError {
   constructor(message = "Http Exception Error", statusCode, errorCode) {
      super(message, statusCode, errorCode);
   }
}

class ForbiddenException extends AppError {
   constructor(message = "Forbidden", errorCode) {
      super(message, HTTP_STATUS.FORBIDDEN, errorCode);
   }
}

module.exports = {
   AppError,
   NotFoundException,
   UnAuthorizedException,
   InternalServerException,
   ConflictException,
   HttpException,
   BadRequestException,
   DuplicateException,
   ForbiddenException,
};
