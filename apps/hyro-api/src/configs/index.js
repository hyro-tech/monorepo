const configs = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3001/',
  authorizedUrls: process.env.AUTHORIZED_URLS || 'http://localhost:3002,http://localhost:3004',
  port: process.env.PORT || 3001,
  environment: process.env.ENVIRONMENT || 'local',
  services: {
    bcrypt: {
      salt_rounds: process.env.SALT_ROUNDS || 10,
    },
    jwt: {
      secret: process.env.JWT_TOKEN_SECRET || 'secret',
      duration: process.env.JWT_TOKEN_DURATION || '15d',
    },
    mongodb: {
      uri:
        process.env.MONGODB_ADDON_URI ||
        'mongodb://uvjdnyrhyus7vria2ags:j7qFypaC9V9ssktas2F@bq3dmnzqujqvbkilecvz-mongodb.services.clever-cloud.com:2172/bq3dmnzqujqvbkilecvz' ||
        'mongodb://root:password@localhost:27017/local-api?authSource=admin',
    },
    s3: {
      host:
        process.env.CELLAR_ADDON_HOST ||
        'cellar-c2.services.clever-cloud.com' ||
        'http://0.0.0.0:4569',
      keyId: process.env.CELLAR_ADDON_KEY_ID || 'SD0XSUOPCO0UHM49QABX' || 'S3RVER',
      keySecret:
        process.env.CELLAR_ADDON_KEY_SECRET ||
        'AsKZ7AOt2V8siRpfMqhE7L73pRNScTxZaBTwhtcd' ||
        'S3RVER',
      bucketName: process.env.CELLAR_ADDON_BUCKET_NAME || 'prod-hyro-items' || 'TEST_BUCKET',
    },
  },
};

export default configs;
