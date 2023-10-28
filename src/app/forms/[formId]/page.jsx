"use client";
import WeaveDB from "weavedb-sdk";
import { useEffect, useState, useContext } from "react";
<<<<<<< HEAD
import { EthersContext } from "../../../Context/EthersContext.js";
=======
import { EthersContext } from "../../../Context/EthersContext";
>>>>>>> c540c4a3f773adadf21bac43fc4c5d74a432d198

export default function Home({ params: { formId } }) {
  const [form, setForm] = useState();
  const [db, setDB] = useState();
  const [loadingFormData, setLoadingFormData] = useState(true);
  const { pay } = useContext(EthersContext);

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

  return (
    <main className="container mx-auto relative mt-6 ">
      {loadingFormData ? (
        <div>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="border-black w-full border-2 h-auto rounded-xl p-3 pl-8 mb-20 pb-20">
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
                    <label className="text-xl font-semibold">
                      {field?.title}
                    </label>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    {field?.type === "multiplechoice" ? (
                      <select className="w-full max-w-4xl select select-bordered">
                        {field?.choices?.map((option, id) => {
                          return <option key={id}>{option}</option>;
                        })}
                      </select>
                    ) : field?.type === "longtext" ? (
                      <textarea
                        className="w-full max-w-4xl textarea textarea-bordered"
                        placeholder={field?.title}
                      ></textarea>
                    ) : field?.type === "payment" ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          console.log(field?.amount);
                          pay(field?.amount);
                        }}
                      >
                        Register
                      </button>
                    ) : (
                      <input
                        className="w-full max-w-4xl input input-bordered"
                        type={field?.type}
                        placeholder={field?.title}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
