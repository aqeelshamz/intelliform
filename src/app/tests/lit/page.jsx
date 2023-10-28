"use client";
import { useEffect, useState } from "react";
import Lit from "./lit";

import * as LitJsSdk from "@lit-protocol/lit-node-client";

const client = new LitJsSdk.LitNodeClient();
const chain = "polygonMumbai";

export default function Test() {
	const [message, setMessage] = useState("");
	const [encString, setEncString] = useState("");
	const [encSymmetricKey, setEncSymmetricKey] = useState("");

	const encrypt = async (message) => {
		if (!this.litNodeClient) {
			await this.connect();
		}

		const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
		const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(message);

		const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
			accessControlConditions,
			symmetricKey,
			authSig,
			chain,
		});

		return {
			encryptedString,
			encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16"),
		};
	};

	const decrypt = async (encryptedString, encryptedSymmetricKey) => {
		if (!this.litNodeClient) {
			await this.connect();
		}

		const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
		const symmetricKey = await this.litNodeClient.getEncryptionKey({
			accessControlConditions,
			toDecrypt: encryptedSymmetricKey,
			chain,
			authSig,
		});

		const decryptedString = await LitJsSdk.decryptString(encryptedString, symmetricKey);

		return { decryptedString };
	};

	useEffect(() => {
		document.addEventListener(
			"lit-ready",
			function (e) {
				console.log("LIT network is ready");
				setNetworkLoading(false); // replace this line with your own code that tells your app the network is ready
			},
			false
		);
	}, []);

	const accessControlConditions = [
		{
			contractAddress: "",
			standardContractType: "",
			chain: "polygonMumbai",
			method: "eth_getBalance",
			parameters: [":userAddress", "latest"],
			returnValueTest: {
				comparator: ">=",
				value: "1000000000000", // 0.000001 ETH
			},
		},
	];

	const handleDecryptClick = () => {
		const decryptedString = decrypt(encString, encSymmetricKey);
		console.log(`encryptedString: ${encryptedString}  encryptedSymmetricKey: ${encryptedSymmetricKey}`);
	};

	return (
		<div className="m-5">
			<h1>Lit</h1>
			<div>
				<input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
				<button className="btn btn-primary" onClick={handleEncryptClick}>
					Encrypt
				</button>
			</div>
			<div>
				<input type="text" value={message} onChange={(e) => setEncString(e.target.value)} />
				<input type="text" value={message} onChange={(e) => setEncSymmetricKey(e.target.value)} />

				<button className="btn btn-primary" onClick={handleDecryptClick}>
					Decrypt
				</button>
			</div>
		</div>
	);
}
