import { useState } from "react";
import { generateMnemonic } from "bip39";
import "./App.css";
import SolanaWallet from "./../components/SolanaWallet/index";
import EtheriumWallet from "./../components/EtheriumWallet/index";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  const createSeedPhrase = () => {
    const localMnemonic = generateMnemonic();
    setMnemonic(localMnemonic);
  };

  return (
    <>
      <h1>Web Based Wallet</h1>
      <button onClick={createSeedPhrase}>Create Seed Phrase</button>
      <input value={mnemonic}></input>

      <SolanaWallet mnemonic={mnemonic} />
      <EtheriumWallet mnemonic={mnemonic} />
    </>
  );
}

export default App;
