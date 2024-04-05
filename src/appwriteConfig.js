import { Client,Databases,Account } from 'appwrite';
import { envVariables } from './env';

const client = new Client();


client
    .setEndpoint(envVariables.appwriteBaseUrl)
    .setProject(envVariables.appwriteProjectId);

export const databases = new Databases(client);
export const account = new Account(client);
export default client;    