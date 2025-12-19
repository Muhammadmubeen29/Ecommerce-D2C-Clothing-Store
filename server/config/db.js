import mongoose from 'mongoose';

const connectDB = async (opts = { retryIntervalMs: 5000 }) => {
  const { retryIntervalMs } = opts;

  const tryConnect = async (attempt = 1) => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        // keep default options; mongoose will warn if deprecated
      });
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`❌ MongoDB Connection Error (attempt ${attempt}): ${error.message}`);
      console.error(`Retrying to connect in ${retryIntervalMs / 1000} seconds...`);
      setTimeout(() => tryConnect(attempt + 1), retryIntervalMs);
    }
  };

  // Start first attempt without blocking the caller
  tryConnect();
};

export default connectDB;

