// Import LitJsSdk as needed
import LitJsSdk from "lit-js-sdk";

const client = new LitJsSdk.LitNodeClient();

class Lit {
	constructor() {
		this.litNodeClient = null;
	}

	async connect() {
		await client.connect();
		this.litNodeClient = client;
	}
}
const litInstance = new Lit();

export default litInstance;
