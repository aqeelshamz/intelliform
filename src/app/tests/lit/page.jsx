"use client";

export default function Test() {
  const encrypt = async () => {
    const res = await LitJsSdk.encryptString("This test is working! Omg!");
    console.log(res);
  };

  return (
    <div className="m-5">
      <h1>RSA</h1>
      <button className="btn btn-primary" onClick={encrypt}>
        Encrypt
      </button>
    </div>
  );
}
