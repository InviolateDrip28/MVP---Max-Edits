"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("./db/prismaClient")); // Adjust path if necessary
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Testing Prisma connection...');
            // Log all queries to debug
            prismaClient_1.default.$on('query', (event) => {
                console.log(`Query: ${event.query}`);
                console.log(`Params: ${event.params}`);
                console.log(`Duration: ${event.duration}ms`);
            });
            // Insert a new user
            // const newUser = await prisma.user.create({
            //   data: {
            //     emailAddress: 'test@example.com',
            //     country: 'Test Country',
            //     city: 'Test City',
            //     age: 30,
            //     gender: 'Other',
            //     occupation: 'Developer',
            //     nationality: 'Test Nationality',
            //     deviceUsed: 'Laptop',
            //     internetAccess: true,
            //     mobilePenetration: 0.85,
            //     accountCreationDate: new Date(),
            //   },
            // });
            // console.log('Inserted new user:', newUser);
            // // Insert a new transaction associated with the new user
            // const newTransaction = await prisma.transaction.create({
            //   data: {
            //     userId: newUser.id,
            //     amount: 250.0,
            //     currency: 'USD',
            //     exchangeRate: 1.0,
            //     fees: 5.0,
            //     processingTime: 120,
            //     transferMethod: 'Bank Transfer',
            //     purposeOfTransfer: 'Payment for services',
            //     status: 'Completed',
            //     timestamp: new Date(),
            //   },
            // });
            // console.log('Inserted new transaction:', newTransaction);
            // Attempt to fetch records with id: 1
            const transaction = yield prismaClient_1.default.transaction.findUnique({
                where: { id: 1 },
            });
            console.log('Fetched transaction with id 1:', transaction);
            // Check the count of transactions with id: 1
            const count = yield prismaClient_1.default.transaction.count({
                where: { id: 1 },
            });
            console.log(`Count of transactions with id 1: ${count}`);
            // Fetch all transactions with a positive limit
            const allTransactions = yield prismaClient_1.default.transaction.findMany({
                take: 10,
            });
            console.log('All transactions:', allTransactions);
        }
        catch (error) {
            console.error('Test connection error:', error);
        }
        finally {
            yield prismaClient_1.default.$disconnect();
        }
    });
}
// Execute the test function
testConnection();
