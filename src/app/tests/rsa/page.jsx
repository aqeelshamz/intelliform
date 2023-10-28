"use client";
import EncryptRsa from 'encrypt-rsa';

export default function Test() {
  const encrypt = () => {
    const encryptRsa = new EncryptRsa();
    const sss = encryptRsa.createPrivateAndPublicKeys(1);
    console.log(sss);
  }

  return (
    <div className="m-5">
      <h1>RSA</h1>
      <button className='btn btn-primary' onClick={encrypt}>Encrypt</button>
    </div>
  );
}