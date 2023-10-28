"use client";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaRegFile } from "react-icons/fa";
import { TbPhone } from "react-icons/tb";
import { BsTextareaResize, BsCalendar2Date } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { BiSelectMultiple } from "react-icons/bi";

import {
  MdOutlineShortText,
  MdOutlineNumbers,
  MdAttachMoney,
} from "react-icons/md";
import Navbar from "../components/Navbar";

import { PiMagicWandFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import OpenAI from "openai";
import { formGenerationPrompt } from "../../utils/util";
import { v4 as uuidv4 } from "uuid";
import WeaveDB from "weavedb-sdk";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from "wagmi";

export default function Home() {
  const [prompt, setPrompt] = useState("");

  const temp = () => {
    document.getElementById("my_modal_2").showModal();
    document.getElementById("my_modal_1").close();
  };

  const [generatingForm, setGeneratingForm] = useState(false);

  const [forms, setForms] = useState([]);

  const [db, setDB] = useState();

  const [loadingForms, setLoadingForms] = useState(true);

  const { address } = useAccount();

  const initDB = async () => {
    setLoadingForms(true);
    const db = new WeaveDB({
      contractTxId: "oj9GzEHQDlK_VQfvGBKFXvyq_zDHdr5m8N0PAU8GysM",
    });
    await db.init();
    console.log("Address is: " + address);

    setForms(
      await db.cget(
        "forms",
        ["author"],
        ["author", "==", "0x7adef31621de305ce78c3b10a1402aff960bdbff"]
      )
    );
    setDB(db);
    setLoadingForms(false);
  };

  const generateForm = async () => {
    setGeneratingForm(true);
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: formGenerationPrompt },
        { role: "user", content: prompt },
      ],
    });

    console.log("completion: ", completion);

    var data = JSON.parse(completion.choices[0].message.content);

    if (data) {
      //Save form to database
      const formId = uuidv4();
      const formData = {
        id: formId,
        author: db.signer(),
        title: data?.title,
        description: data?.description,
        fields: data?.fields,
        responses: 0,
      };

      const tx = await db.add(formData, "forms");
      console.log(tx);
      console.log(await db.getIds(tx));
      // await db.update({ id: docId }, "forms", docId);

      console.log("Saved to DB");

      document.getElementById("my_modal_1").close();

      setTimeout(() => {
        window.location.href = "/editor/" + formId;
      }, 5000);
    } else {
      console.log("Error generating form");
    }

    setGeneratingForm(false);
  };

  useEffect(() => {
    initDB();
  }, []);

  useEffect(() => {
    console.log(forms);
  }, [forms]);

  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        <button
          className="btn mt-4 mb-5 btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:bg-black hover:text-white"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          + New Form
        </button>
        {loadingForms ? (
          <div>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            <p className="text-xl my-4 font-semibold">
              My forms ({forms.length})
            </p>
            <div className="overflow-x-auto">
              <table className="table table-zebra border">
                {/* head */}
                <thead>
                  <tr className="text-[1.2rem]">
                    <th></th>
                    <th>Name</th>
                    <th>Responses</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {forms?.map((form, index) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td className="font-semibold text-[1rem]">
                          {form?.data?.title}
                        </td>
                        <td>0</td>
                        <td>
                          <button
                            className="btn btn-square btn-outline"
                            onClick={() =>
                              (window.location.href =
                                "/editor/" + form?.data?.id)
                            }
                          >
                            <FiEdit className="h-6 w-6" />
                          </button>
                        </td>
                        <td>
                          <button className="btn text-red-500 hover:bg-red-500 hover:border-white border-red-500 btn-outline">
                            <FiTrash2 className="h-6 w-6" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
      {/* Modals */}
      {/* modal 1 */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-xl">
          <h3 className="font-bold text-2xl">Create form</h3>
          <div className="flex mt-6 max-w-fulloverflow-hidden">
            <button
              className="flex flex-col btn min-h-[200px] w-[48%]"
              onClick={temp}
            >
              <PiMagicWandFill className="h-20 w-20" />
              using AI{" "}
            </button>
            <div className="w-[4%]"></div>
            <button
              className="flex flex-col btn min-h-[200px] w-[48%]"
              onClick={() => {
                document.getElementById("my_modal_3").showModal();
              }}
            >
              <FiEdit className="h-20 w-20" />
              from scratch
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* modal 1 end */}
      {/* modal 2  */}

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl">Create form using AI</h3>
          <textarea
            onChange={(x) => setPrompt(x.target.value)}
            placeholder="Tell us about your form..."
            className="my-5 textarea textarea-bordered textarea-lg min-h-[250px] w-full max-w-3xl"
          ></textarea>
          <div className="modal-action mt-2 flex justify-center ">
            <button
              className={
                "btn btn-primary w-full " + (generatingForm ? "opacity-5" : "")
              }
              onClick={() => {
                if (generatingForm) {
                  return;
                } else {
                  generateForm();
                }
              }}
            >
              <PiMagicWandFill />
              Generate form
            </button>
          </div>
        </div>
      </dialog>
      {/* modal 2 end  */}
      {/* modal 3 */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-[950px] max-h-[450px]">
          <h3 className="font-bold text-2xl">Choose form input</h3>
          <div className="flex flex-wrap mt-6 gap-5 text-2xl max-w-full overflow-hidden">
            <button
              className="flex btn btn-outline  w-[271px] h-[69px] "
              onClick={temp}
            >
              <MdOutlineShortText size={28} />
              Text
            </button>
            <button
              className="flex btn btn-outline  w-[271px] h-[69px] "
              onClick={temp}
            >
              <BsTextareaResize size={28} />
              Long text
            </button>
            <button
              className="flex btn btn-outline  w-[271px] h-[69px] "
              onClick={temp}
            >
              <HiOutlineMail size={28} />
              Email
            </button>
            <button
              className="flex btn btn-outline  w-[271px] h-[69px] "
              onClick={temp}
            >
              <BiSelectMultiple size={28} />
              Multiple Choice
            </button>
            <button
              className="flex btn btn-outline  w-[271px] h-[69px] "
              onClick={temp}
            >
              <MdOutlineNumbers size={28} />
              Number
            </button>
            <button
              className="flex btn btn-outline  w-[271px] h-[69px] "
              onClick={temp}
            >
              <BsCalendar2Date size={25} />
              Date
            </button>
            <button
              className="flex btn btn-outline  w-[271px] h-[69px] "
              onClick={temp}
            >
              <FaRegFile size={25} />
              File
            </button>
            <button
              className="flex btn btn-outline  w-[271px] h-[69px] "
              onClick={temp}
            >
              <TbPhone size={24} />
              Phone
            </button>
            <button
              className="flex btn btn-outline  w-[271px] h-[69px] "
              onClick={temp}
            >
              <MdAttachMoney size={27} className="-mt-1" />
              Cash
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
