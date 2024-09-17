const AWS = require('aws-sdk');

module.exports = {
    IAM_USER_KEY: 'arn:aws:iam::183295428710:user/Barberdev',
    IAM_USER_SECRET: 'uV6Z1iH5WmjAtYdwd8Nwu3wu5FSvt61A46HDltao',
    BUCKET_NAME: 'trimtimedev ',
    AWS_REGION: 'us-east-1',
    
    uploadToS3: function (file, filename, acl = 'public-read') {
        return new Promise((resolve, reject) => {
            let IAM_USER_KEY = this.IAM_USER_KEY;
            let IAM_USER_SECRET = this.IAM_USER_SECRET;
            let BUCKET_NAME = this.BUCKET_NAME;

            let s3bucket = new AWS.S3({
                accessKeyId: IAM_USER_KEY,
                secretAccessKey: IAM_USER_SECRET,
                region: this.AWS_REGION,
            });

            var params = {
                Bucket: BUCKET_NAME,
                Key: filename,
                Body: file.data,
                ACL: acl,
            };

            s3bucket.upload(params, function (err, data) {
                if (err) {
                    console.log(err);
                    return resolve({ error: true, message: err });
                }
                console.log(data);
                return resolve({ error: false, message: data });
            });
        });
    },

    deleteFileS3: function (key) {
        return new Promise((resolve, reject) => {
            let IAM_USER_KEY = this.IAM_USER_KEY;
            let IAM_USER_SECRET = this.IAM_USER_SECRET;
            let BUCKET_NAME = this.BUCKET_NAME;

            let s3bucket = new AWS.S3({
                accessKeyId: IAM_USER_KEY,
                secretAccessKey: IAM_USER_SECRET,
                region: this.AWS_REGION,
            });

            var params = {
                Bucket: BUCKET_NAME,
                Key: key,
            };

            s3bucket.deleteObject(params, function (err, data) {
                if (err) {
                    console.log(err);
                    return resolve({ error: true, message: err });
                }
                console.log(data);
                return resolve({ error: false, message: data });
            });
        });
    },
};
      
    

  
