class ApiResponse {
  constructor(statusCode, data = {}, message = "Success", meta = {}, errors = []) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.meta = meta;
    this.errors = errors;
  }
}

module.exports = ApiResponse;
