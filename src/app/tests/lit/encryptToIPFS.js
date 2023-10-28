const encryptToIPFS = () => {
	const encrypt = async () => {
		const ipfsCid = await LitJsSdk.encryptToIpfs({
			authSig,
			accessControlConditions,
			chain,
			string: "Encrypt & store on IPFS seamlessly with Lit",
			//   file, // If you want to encrypt a file instead of a string
			litNodeClient: this.litNodeClient,
			infuraId: "7daccb90ab594777abdeff7f25a293e6",
			infuraSecretKey: "16d44f221f924980a5154dd03f14f593",
		});
	};

	const decrypt = async (ipfsCid) => {
		const decryptedString = await LitJsSdk.decryptFromIpfs({
			authSig,
			ipfsCid, // This is returned from the above encryption
			litNodeClient: this.litNodeClient,
		});
	};
	return <div>encryptToIPFS</div>;
};

export default encryptToIPFS;

// How to encrypt & decrypt a file instead?
// For encryption use the same function params as above with the string param replaced with a file.
// For decryption nothing changes. The returned value in that case will be a Uint8Array instead of a string since it's a decrypted file.
