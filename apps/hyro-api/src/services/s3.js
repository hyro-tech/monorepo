import * as AWS from 'aws-sdk';

import configs from '../configs';

AWS.config.update({
  accessKeyId: configs.services.s3.keyId,
  secretAccessKey: configs.services.s3.keySecret,
});

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint(configs.services.s3.host),
});

function S3Upload(file, documentKey) {
  return new Promise((resolve, reject) => {
    s3.upload({
      Bucket: configs.services.s3.bucketName,
      Key: documentKey,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentLength: file.size,
    })
      .promise()
      .then(resolve, reject);
  });
}

function S3GetPath(documentId, expires = 900) {
  return s3.getSignedUrl('getObject', {
    Bucket: configs.services.s3.bucketName,
    Key: documentId,
    Expires: expires,
  });
}

function S3Remove(documentKey) {
  return new Promise((resolve, reject) => {
    s3.deleteObject({
      Bucket: configs.services.s3.bucketName,
      Key: documentKey,
    })
      .promise()
      .then(resolve, reject);
  });
}

export const S3Service = {
  S3Upload,
  S3GetPath,
  S3Remove,
};

export default S3Service;
