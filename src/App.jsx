import "./styles/main.scss";
import { Provider } from 'react-redux';
import AppRouter from "./routers/AppRouter";
import store from "./redux/store/store";
import { useEffect } from "react";
import Arweave from "arweave";

function App() {

  async function intializedWallet() {
    let addressTemp = "";
    if (localStorage.getItem("wallet")) {
      const wallet = JSON.parse(localStorage.getItem("wallet"));
      addressTemp = localStorage.getItem("address");
      // setWallet(wallet);
      window.arweaveWallet = wallet;

      console.log("Wallet found in local storage", addressTemp);
    } else {
      const arweave = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
      });

      const key = await arweave.wallets.generate();
      const addressGenerated = await arweave.wallets.jwkToAddress(key);

      console.log(key);
      console.log(addressGenerated);

      addressTemp = addressGenerated;

      // setWallet(key);
      // setAddress(addressGenerated);
      localStorage.setItem("wallet", JSON.stringify(key));
      localStorage.setItem("address", addressGenerated);
      window.arweaveWallet = key;

      console.log(
        "Wallet generated! This is new user or new browser",
        addressGenerated
      );
    }
  }

  useEffect(() =>{
    intializedWallet();
  }, []);

  return (
    <div className="App">
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    </div>
  )
}

export default App
