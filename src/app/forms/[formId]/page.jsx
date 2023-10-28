"use client";
import WeaveDB from "weavedb-sdk";
import { useEffect, useState, useContext } from "react";
import { ethers, Contract } from "ethers";
import Payable_abi from "../../../utils/abi.json";
import { storeFiles } from "../../../utils/ipfsUpload";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Form({ params: { formId } }) {
  const [form, setForm] = useState();
  const [db, setDB] = useState();
  const [loadingFormData, setLoadingFormData] = useState(true);
  const [uploadedURL, setUploadedURL] = useState(null);

  const { address } = useAccount();

  const initDB = async () => {
    setLoadingFormData(true);
    const db = new WeaveDB({
      contractTxId: "oj9GzEHQDlK_VQfvGBKFXvyq_zDHdr5m8N0PAU8GysM",
    });
    await db.init();
    setForm((await db.get("forms", ["id", "==", formId]))[0]);
    console.log((await db.get("forms", ["id", "==", formId]))[0]);
    setDB(db);
    setLoadingFormData(false);
  };

  useEffect(() => {
    initDB();
  }, []);

  //Payment
  const [contract, setContract] = useState();

  const updateContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract("0xB28cbafcb69d18ad60Efe4E6183f02800C2e33FB", Payable_abi, signer);
    setContract(contract);
    console.log("Contract loaded: ", contract);
  };

  useEffect(() => {
    if (address) {
      updateContract();
    }
  }, [])

  const pay = async (amount, fieldId) => {
    if (!address) {
      updateContract();
      return;
    }

    const options = { value: ethers.parseEther(amount?.toString()) };
    contract.register(form?.author, options).then((res) => {
      console.log(res);
      answers[fieldId] = amount;
      setAnswers({ ...answers });
      toast.success("Payment successful!");
    });
  };

  const handleFileUpload = async (event) => {
    try {
      const files = event.target.files;
      var fileURL;
      if (files.length > 0) {
        fileURL = await storeFiles(files);
        setUploadedURL(fileURL);
      } else {
        console.error("No files selected.");
      }

      toast.success("File uploaded successfully!");
      return fileURL;
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const [answers, setAnswers] = useState({});

  useEffect(() => {
    console.log(answers)
  }, [answers])

  return (
    <main className="container mx-auto relative mt-6 ">
      {loadingFormData ? (
        <div>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="border-black w-full border-2 h-auto rounded-xl p-3 pl-8 mb-20 pb-10">
          <div className="row1 title">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold ">{form?.title}</span>{" "}
            </div>
          </div>
          <div className="inputs">
            {form?.fields?.map((field, index) => {
              return (
                <div className="inputrow" key={index}>
                  <div className="flex items-center gap-3 mt-5">
                    <label className="text-xl font-semibold">{field?.title}</label>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    {field?.type === "multiplechoice" ? (
                      <select className="w-full max-w-4xl select select-bordered" onChange={(e) => {
                        answers[field?.id] = e.target.value;
                        setAnswers({ ...answers });
                      }}>
                        {field?.choices?.map((option, id) => {
                          return <option key={id} value={option}>{option}</option>;
                        })}
                      </select>
                    ) : field?.type === "longtext" ? (
                      <textarea
                        className="w-full max-w-4xl textarea textarea-bordered"
                        placeholder={field?.title}
                        onChange={(e) => {
                          answers[field?.id] = e.target.value;
                          setAnswers({ ...answers });
                        }}
                      ></textarea>
                    ) : field?.type === "payment" ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          console.log(field?.amount);
                          pay(field?.amount, field?.id);
                        }}
                      >
                        Pay {field?.amount} MATIC
                      </button>
                    ) : field?.type === "file" ? (
                      <input type="file" multiple onChange={async (event) => {
                        const url = await handleFileUpload(event);
                        console.log("URL: ", url);
                        answers[field?.id] = url;
                        setAnswers({ ...answers });
                      }} />
                    ) : (
                      <input
                        className="w-full max-w-4xl input input-bordered"
                        type={field?.type}
                        placeholder={field?.title}
                        onChange={(e) => {
                          answers[field?.id] = e.target.value;
                          setAnswers({ ...answers });
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
            <hr className="my-5" />
            {address ? <button className="btn btn-primary">Submit form</button> : <div className="flex flex-col">
              <p className="mb-5 font-semibold">Connect wallet to submit form</p>
              <ConnectButton /></div>}
          </div>
        </div>
      )}
      <ToastContainer />
    </main>
  );
}
