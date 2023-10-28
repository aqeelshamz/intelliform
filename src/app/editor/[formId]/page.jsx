"use client";
import Navbar from "../../components/Navbar";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaRegFile } from "react-icons/fa";
import { TbPhone } from "react-icons/tb";
import { BsTextareaResize, BsCalendar2Date } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { BiSelectMultiple } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineShortText, MdOutlineNumbers, MdAttachMoney } from "react-icons/md";
import { useEffect, useState } from "react";
import WeaveDB from "weavedb-sdk";
import Link from "next/link";

export default function Home({ params: { formId } }) {
	const temp = () => {
		document.getElementById("my_modal_2").showModal();
		document.getElementById("my_modal_1").close();
	};

	const [form, setForm] = useState();
	const [allForms, setAllForms] = useState();

	const [loadingFormData, setLoadingFormData] = useState(true);

	const [db, setDB] = useState();

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
		const allForms = await db.cget("forms");
		setAllForms(allForms);
	};

	useEffect(() => {
		initDB();
	}, []);

	const saveForm = async () => {
		// console.log(await db.update(form, "forms"));
		var docId = "";
		for (const form of allForms) {
			if (form?.data?.id === formId) {
				console.log(formId);
				console.log(form?.id);
				docId = form?.id;
			}
		}

		console.log(await db.update(form, "forms", docId));
		toast.success("Form saved successfully!");
	};

	const deleteForm = async () => {
		var docId = "";
		for (const form of allForms) {
			if (form?.data?.id === formId) {
				console.log(formId);
				console.log(form?.id);
				docId = form?.id;
			}
		}

		console.log(await db.delete("forms", docId));
		toast.success("Form deleted successfully!");

		setTimeout(() => {
			window.location.href = "/home";
		}, 1500);
	};

	return (
		<>
			<Navbar />
			<div className="flex justify-between tabs mt-3 sticky top-0 z-50 bg-white">
				<div>
					<a className="tab tab-lg tab-lifted tab-active">Editor</a>
					<a className="tab tab-lg tab-lifted Responses (11)">Responses (11)</a>
				</div>
				<p
					className="cursor-pointer underline text-blue-500"
					onClick={() => window.open("http://localhost:3000/forms/" + formId)}
				>
					https://intelliform.io/forms/{formId}
				</p>
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
							<button
								onClick={deleteForm}
								className="btn  text-red-500 hover:bg-red-500 hover:border-white border-red-500 btn-outline"
							>
								<FiTrash2 className="h-6 w-6 " />
							</button>
						</div>
						<div className="row1 title">
							<div className="flex items-center gap-3">
								<span className="text-3xl font-bold ">{form?.title}</span> <FiEdit />
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
											<label className="text-xl font-semibold">{field?.title}</label>
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
												<button className="btn btn-primary">Pay {field?.amount} MATIC</button>
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

						<button
							className="btn mt-10 mb-5 btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-black hover:bg-gray-700  text-white w-96 lg:w-[896px]"
							onClick={() => document.getElementById("my_modal_1").showModal()}
						>
							Add Content
						</button>
					</div>
				)}
			</main>
			{/* Modals */}
			{/* modal 1 */}
			<dialog id="my_modal_1" className="modal">
				<div className="modal-box max-w-[950px] max-h-[450px]">
					<h3 className="font-bold text-2xl">Choose form input</h3>
					<div className="flex flex-wrap mt-6 gap-5 text-2xl max-w-full overflow-hidden">
						<button className="flex btn btn-outline  w-[271px] h-[69px] " onClick={temp}>
							<MdOutlineShortText size={28} />
							Text
						</button>
						<button className="flex btn btn-outline  w-[271px] h-[69px] " onClick={temp}>
							<BsTextareaResize size={28} />
							Long text
						</button>
						<button className="flex btn btn-outline  w-[271px] h-[69px] " onClick={temp}>
							<HiOutlineMail size={28} />
							Email
						</button>
						<button className="flex btn btn-outline  w-[271px] h-[69px] " onClick={temp}>
							<BiSelectMultiple size={28} />
							Multiple Choice
						</button>
						<button className="flex btn btn-outline  w-[271px] h-[69px] " onClick={temp}>
							<MdOutlineNumbers size={28} />
							Number
						</button>
						<button className="flex btn btn-outline  w-[271px] h-[69px] " onClick={temp}>
							<BsCalendar2Date size={25} />
							Date
						</button>
						<button className="flex btn btn-outline  w-[271px] h-[69px] " onClick={temp}>
							<FaRegFile size={25} />
							File
						</button>
						<button className="flex btn btn-outline  w-[271px] h-[69px] " onClick={temp}>
							<TbPhone size={24} />
							Phone
						</button>
						<button className="flex btn btn-outline  w-[271px] h-[69px] " onClick={temp}>
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
			<ToastContainer />
		</>
	);
}
