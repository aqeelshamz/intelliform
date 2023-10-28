"use client";

import { useState } from "react";
import { nftValidate } from "../../../utils/nftValidate.js";

function Nftpage() {
  const isContractIdValid = (contractId) => {
    // Check if the contract ID is not empty
    if (!contractId || contractId.trim() === "") {
      return false;
    }

    const ethereumAddressRegExp = /^(0x)?[0-9a-fA-F]{40}$/;
    return ethereumAddressRegExp.test(contractId);
  };

  const [formData, setFormData] = useState({
    contractId: "",
    chain: "",
  });

  return (
    <div className="bg-white rounded-lg p-5 w-full h-full flex justify-center items-center">
      <form
        className="input-group-md flex flex-col gap-y-2 w-1/2"
        onSubmit={() => {
          e.preventDefault();
          if (!isContractIdValid(formData.contractId)) {
            alert("Invalid Contract Id");
            return;
          } else {
            const isValid = nftValidate()
            console.log(isValid);
            alert("You have successfully submitted the form!");
            return;
          }
        }}
      >
        <label>Enter the NFT contract id</label>
        <input
          className="w-full input input-bordered"
          placeholder="NFT Contract Id"
          onChange={(e) => {
            setFormData((prev) => {
              return { ...prev, contractId: e.target.value };
            });
          }}
          required
        ></input>
        <label>Select the Chain</label>
        <select
          className="select w-full input-bordered"
          onChange={(e) => {
            setFormData((prev) => {
              return { ...prev, chain: e.target.value };
            });
          }}
          required
        >
          <option value="polygon">Polygon</option>
          <option value="ethereum">Ethereum</option>
          <option value="sepolia">Sepolia</option>
        </select>
        <button type="submit" className="btn btn-primary w-full ">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Nftpage;
