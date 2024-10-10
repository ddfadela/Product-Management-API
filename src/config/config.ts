export const config = () => ({
  mongodbUri: process.env.MONGODB_URI,
  dbName: process.env.DB_NAME || "testdb",
  jwtSecret: process.env.JWT_SECRET,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
});
