"use client";
import Navbar from "../../components/Navbar";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaRegFilePdf } from "react-icons/fa";

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

  const temp = () => {};

  const initDB = async () => {
    setLoadingFormData(true);
    const db = new WeaveDB({
      contractTxId: "oj9GzEHQDlK_VQfvGBKFXvyq_zDHdr5m8N0PAU8GysM",
    });
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
          <a className="tab tab-lg tab-lifted tab-active">Responses</a>

          <a className="tab tab-lg tab-lifted ">Editor</a>
        </div>
        <p
          className="cursor-pointer underline text-blue-500"
          onClick={() => window.open("http://localhost:3000/forms/" + formId)}
        >
          https://intelliform.io/forms/{formId}
        </p>
        <button
          className="mr-10 btn btn-primary"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Export
        </button>
      </div>

      <>
        <main className="container mx-auto relative mt-6 ">
          {loadingFormData ? (
            <div>
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              <div className="border-black w-full border-b h-auto  p-3 pl-8 mb-10 pb-10">
                <div className="row1 title">
                  <div className="">
                    <span className="text-3xl font-bold ">{form?.title}</span>{" "}
                  </div>

                  <div className=" mt-3">
                    <span className="text-xl">{form?.description}</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="table table-lg table-pin-rows table-pin-cols">
                  <thead>
                    <tr>
                      <th>{/* field names */}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{/* table data */}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>{/* field names */}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </>
          )}
        </main>
      </>

      {/* modal 1 */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-xl">
          <h3 className="font-bold text-2xl">Create form</h3>
          <div className="flex mt-6 max-w-fulloverflow-hidden">
            <button
              className="flex flex-col btn min-h-[200px] w-[48%]  text-green-500 hover:bg-green-500 hover:border-white border-green-500 btn-outline"
              onClick={temp}
            >
              <PiMicrosoftExcelLogoFill className="h-20 w-20" />
              Excel
            </button>
            <div className="w-[4%]"></div>
            <button
              className="flex flex-col btn min-h-[200px] w-[48%]  text-red-500 hover:bg-red-500 hover:border-white border-red-500 btn-outline"
              onClick={() => {
                document.getElementById("my_modal_3").showModal();
              }}
            >
              <FaRegFilePdf className="h-20 w-20" />
              PDF
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
