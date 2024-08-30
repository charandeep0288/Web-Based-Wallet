import nacl from "tweetnacl";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import React, { useState, useEffect } from "react";

const SolanaWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  useEffect(() => {
    setCurrentIndex(0);
    setPublicKeys([]);
  }, [mnemonic]);

  const createNewSOLWallet = () => {
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivationPath = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivationPath).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);

    setPublicKeys([...publicKeys, keypair.publicKey]);
  };

  return (
    <>
      <button onClick={createNewSOLWallet} disabled={!mnemonic}>
        Add SOL wallet
      </button>

      {publicKeys.map((publicKey) => (
        <div>{publicKey.toBase58()}</div>
      ))}
    </>
  );
};

export default SolanaWallet;
