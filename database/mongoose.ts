
import mongoose from 'mongoose';

console.log("🧩 Mongoose file loaded");

const MONGODB_URI = process.env.MONGODB_URI;
console.log("ENV MONGODB_URI 1:", process.env.MONGODB_URI);

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}

let cached = global.mongooseCache;

if(!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}
console.log("ENV MONGODB_URI 2:", process.env.MONGODB_URI);

export const connectToDatabase = async () => {
    console.log("ENV MONGODB_URI 3:", process.env.MONGODB_URI);
    if(!MONGODB_URI) throw new Error('MONGODB_URI must be set within .env');
    if(cached.conn) return cached.conn;

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
        console.log("✅ Connected to MongoDB");
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        throw err;
    }

    console.log(`Connected to database ${process.env.NODE_ENV} - ${MONGODB_URI}`);

    return cached.conn;
}