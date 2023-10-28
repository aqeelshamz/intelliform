"use client";
import Navbar from "../../components/Navbar";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import WeaveDB from "weavedb-sdk";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";


export default function Home({ params: { formId } }) {
  const temp = () => {
    document.getElementById("my_modal_2").showModal();
    document.getElementById("my_modal_1").close();
  };

  const [db, setDB] = useState();
  const [form, setForm] = useState();

  const [loadingFormData, setLoadingFormData] = useState(true);

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
    <>
      <Navbar />
      <div className="tabs mt-3 sticky top-0 z-50 bg-white">
        <a className="tab tab-lg tab-lifted tab-active">Editor</a>
        <a className="tab tab-lg tab-lifted Responses (11)">Responses (11)</a>
        <Link className="link" href={`/forms/${formId}`}>Go to form <BiLinkExternal className="inline-block" /></Link>
      </div>
      <main className="container mx-auto relative mt-6 ">
        {loadingFormData ? (
          <div>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="border-black w-full border-2 h-auto rounded-xl p-3 pl-8 mb-20 pb-20">
            <div className="row0 flex justify-end">
              <button className="btn  text-red-500 hover:bg-red-500 hover:border-white border-red-500 btn-outline">
                <FiTrash2 className="h-6 w-6 " />
              </button>
            </div>
            <div className="row1 title">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold ">{form?.title}</span>{" "}
                <FiEdit />
              </div>

              <div className="flex items-center gap-3 mt-3">
                <span className="text-xl">{form?.description}</span> <FiEdit />
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
                      <FiEdit />
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
                      ) : (
                        <input
                          className="w-full max-w-4xl input input-bordered"
                          type={field?.type}
                          placeholder={field?.title}
                        />
                      )}
                      <button className="btn btn-sm h-[45px] w-[45px] btn-square btn-outline">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
