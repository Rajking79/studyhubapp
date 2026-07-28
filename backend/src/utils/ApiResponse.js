class ApiResponse {
  constructor(statusCode, data = {}, message = "Success", meta = {}, errors = []) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    if (data && typeof data === "object" && data.token) {
      this.token = data.token;
    }
    this.data = data;
    this.meta = meta;
    this.errors = errors;
  }
}

module.exports = ApiResponse;
