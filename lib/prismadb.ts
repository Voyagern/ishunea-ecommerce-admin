import {PrismaClient} from "@prisma/client";

declare global{
    let prsma:PrismaClient|undefined
};
const prismadb= globalThis.prisma || new PrismaClient();
if(process.env.NODE_ENW !== "production") globalThis.prisma= prismadb;

export default prismadb;