import { newEnv } from "@alextheman/utility";
import { createPrismaClient } from "@neurosongs/prisma-client"
import dotenv from "dotenv"
import path from "path";

const nodeEnv = newEnv(process.env.NODE_ENV)

dotenv.config({ path: path.join(__dirname, '../../', `.env.${nodeEnv}`) });

const database = createPrismaClient()
export default database

