import "dotenv/config";
import mongoose from "mongoose";

export const dbConnect = async () => {
    const database: string = process.env.DATABASE_STAGING || "";
    const databasePassword: string = process.env.DATABASE_PASSWORD || "";
    const environment: string = process.env.NODE_ENV || "";

    const DB = database.replace(
        '<PASSWORD>',
        databasePassword
    );

    await mongoose
        .connect(DB, {})
        .then(() => console.log(`DB connection successful. Environment: ${environment}, DB: ${database}`))
        .catch(() => console.log(`DB NOT CONNECTING. PLEASE CHECK NETWORK. Environment: ${environment}, DB: ${database} `));
}
