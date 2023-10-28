"use client";
import Navbar from "../../components/Navbar";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import WeaveDB from "weavedb-sdk";
import Link from "next/link";

export default function Home({ params: { formId } }) {
  // const temp = () => {
  //   document.getElementById("my_modal_2").showModal();
  //   document.getElementById("my_modal_1").close();
  // };

  const [form, setForm] = useState();

  const [loadingFormData, setLoadingFormData] = useState(true);

  const [db, setDB] = useState();

  const initDB = async () => {
    const db = new WeaveDB({
      contractTxId: "oj9GzEHQDlK_VQfvGBKFXvyq_zDHdr5m8N0PAU8GysM",
    });
    setLoadingFormData(true);
    await db.init();
    setDB(db);
    setForm((await db.get("forms", ["id", "==", formId]))[0]);
    console.log((await db.get("forms", ["id", "==", formId]))[0]);
    setLoadingFormData(false);
  };

  useEffect(() => {
    initDB();
  }, []);

  const saveForm = async () => {
    // console.log(await db.update(form, "forms"));
    console.log(
      await db.getIds(await db.get("forms", ["id"], ["id", "==", formId]))[0]
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-between tabs mt-3 sticky top-0 z-50 bg-white">
        <div>
          <a className="tab tab-lg tab-lifted tab-active">Editor</a>
          <a className="tab tab-lg tab-lifted Responses (11)">Responses (11)</a>
        </div>
        <Link
          className="cursor-pointer underline text-blue-500"
          href={`/forms/${formId}`}
          target="_blank"
        >
          https://intelliform.io/forms/{formId}
        </Link>
        <button className="mr-10 btn btn-primary" onClick={saveForm}>
          Save
        </button>
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
                          disabled
                          className="w-full max-w-4xl textarea textarea-bordered"
                          placeholder={field?.title}
                        ></textarea>
                      ) : field?.type === "payment" ? (
                        <button className="btn btn-primary">
                          Pay 0.0000 MATIC
                        </button>
                      ) : (
                        <input
                          disabled
                          className="w-full max-w-4xl input input-bordered"
                          type={field?.type}
                          placeholder={field?.title}
                        />
                      )}
                      <button
                        className="btn btn-sm h-[45px] w-[45px] btn-square btn-outline"
                        onClick={() => {
                          //remove field from form
                          form.fields.splice(index, 1);
                          setForm({ ...form });
                        }}
                      >
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
