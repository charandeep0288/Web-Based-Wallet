import { mnemonicToSeedSync } from "bip39";
import React, { useState, useEffect } from "react";
import { Wallet, HDNodeWallet } from "ethers";

const EtheriumWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    setCurrentIndex(0);
    setAddresses([]);
  }, [mnemonic]);

  const createNewETHWallet = () => {
    const seed = mnemonicToSeedSync(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    console.log('wallet', wallet);
    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, wallet.address]);
  };

  return (
    <div>
      <button onClick={createNewETHWallet} disabled={!mnemonic}>Add ETH Wallet</button>
      {addresses.map((address) => (
        <div>{address}</div>
      ))}
    </div>
  );
};

export default EtheriumWallet;
