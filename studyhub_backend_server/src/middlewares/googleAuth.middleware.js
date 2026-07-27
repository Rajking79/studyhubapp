const extractClientMetadata = (req, res, next) => {
  req.clientMetadata = {
    deviceId: req.headers["x-device-id"] || "device_unknown",
    deviceName: req.headers["x-device-name"] || req.headers["user-agent"] || "Android Mobile",
    androidVersion: req.headers["x-android-version"] || "Android 14",
    appVersion: req.headers["x-app-version"] || "1.0.0",
    ipAddress: req.ip || req.headers["x-forwarded-for"] || "127.0.0.1",
    country: req.headers["x-country"] || "India",
    city: req.headers["x-city"] || "New Delhi"
  };

  next();
};

module.exports = {
  extractClientMetadata
};
