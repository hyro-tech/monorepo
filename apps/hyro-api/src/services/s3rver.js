import S3rver from 's3rver';

import configs from '../configs';

export function initS3rver() {
  return new S3rver({
    port: 4569,
    address: '0.0.0.0',
    silent: false,
    directory: __dirname + '/s3rver_test_directory',
    configureBuckets: [
      {
        name: configs.services.s3.bucketName,
      },
    ],
  }).run((err, { address, port } = {}) => {
    if (err) {
      console.error(err);
    } else {
      console.log('fake s3 now listening at address %s and port %d', address, port);
    }
  });
}
