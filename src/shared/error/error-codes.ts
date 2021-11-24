import { HttpStatus } from '@nestjs/common';

interface ErrorDetails {
  message: string;
  key: string;
  code: string;
}

enum ERROR_CODE {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  PARAM_INVALID = 'PARAM_INVALID',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_OTP = 'INVALID_OTP',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_OR_PHONE_EXISTS = 'EMAIL_OR_PHONE_EXISTS',
  HTTP_CALL_ERROR = 'HTTP_CALL_ERROR',
  REFERENCE_ERROR = 'REFERENCE_ERROR',
  ROLE_NOT_FOUND = 'ROLE_NOT_FOUND',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  USER_EXISTED = 'USER_EXISTED',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  PRODUCT_NOT_EXIST = 'PRODUCT_NOT_EXIST',
  CATEGORY_NOT_EXIST = 'CATEGORY_NOT_EXIST',
  CART_NOT_FOUND = 'CART_NOT_FOUND',
  CART_ITEM_NOT_EXIST = 'CART_ITEM_NOT_EXIST',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  CUSTOMER_NOT_EXIST = 'CUSTOMER_NOT_EXIST',
  SHIPPING_ADDRESS_NOT_EXIST = 'SHIPPING_ADDRESS_NOT_EXIST',
  SUPPLIER_NOT_EXIST = 'SUPPLIER_NOT_EXIST',
  SUPPLIER_NOT_FOUND = 'SUPPLIER_NOT_FOUND',
  DUPLICATE_PRODUCT_CODE = 'DUPLICATE_PRODUCT_CODE',
  ORDER_NOT_FOUND = 'ORDER_NOT_FOUND',
  ORDER_NOT_EXIST = 'ORDER_NOT_EXIST',
  INVALID_ORDER_STATUS = 'INVALID_ORDER_STATUS',
  ORDER_NOT_COMPLETED = 'ORDER_NOT_COMPLETED',
  ALREADY_REVIEWED = 'ALREADY_REVIEWED',
  REVIEW_NOT_EXIST = 'REVIEW_NOT_EXIST',
  COMMENT_PARENT_NOT_EXIST = 'COMMENT_PARENT_NOT_EXIST',
  INVALID_CITY = 'INVALID_CITY',
  INVALID_DATE = 'INVALID_DATE',
  PROMOTION_NOT_FOUND = 'PROMOTION_NOT_FOUND',
  TICKET_NOT_EXIST = 'TICKET_NOT_EXIST',
  PAYMENT_METHOD_NOT_EXIST = 'PAYMENT_METHOD_NOT_EXIST',
  SHIPPING_METHOD_NOT_EXIST = 'SHIPPING_METHOD_NOT_EXIST',
  NOT_ACCESS_CMS_PAGE = 'NOT_ACCESS_CMS_PAGE',
  REASON_REQUIRED = 'REASON_REQUIRED',
  ORDER_REQUESTING_CANCEL = 'ORDER_REQUESTING_CANCEL',
  INVALID_ORDER_REQUEST_STATUS = 'INVALID_ORDER_REQUEST_STATUS',
  ORDER_REQUEST_NOT_FOUND = 'ORDER_REQUEST_NOT_FOUND',
  GENERAL_ERROR = 'GENERAL_ERROR',
}

const ErrorList = {
  [ERROR_CODE.INTERNAL_SERVER_ERROR]: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  },
  [ERROR_CODE.USER_EXISTED]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: "User is existed",
  },
  [ERROR_CODE.USER_NOT_FOUND]: {
    statusCode: HttpStatus.NOT_FOUND,
    message: "Not found user",
  }
};
export { ErrorDetails, ERROR_CODE, ErrorList };
