export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  db: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DB,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  aws: {
    S3_Bucket_Name: process.env.S3_BUCKET_NAME,
    Access_Key_Id: process.env.AWS_ACCESS_KEY_ID,
    Secret_Key: process.env.AWS_SECRET_KEY,
    Region: process.env.AWS_REGION,
  },
});
