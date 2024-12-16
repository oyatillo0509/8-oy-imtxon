import {useCrypto} from "../context/CryptoContext";
import {Heart} from "lucide-react";
import {useState} from "react";
import Watchlist from "./Watchlist";

const Header = () => {
  const {currency, setCurrency} = useCrypto();
  const [showWatchList, setShowWatchList] = useState(false);

  return (
    <>
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-400">CRYPTOFOLIO</h1>
          <div className="flex items-center gap-4">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-gray-800 text-white px-3 py-1 rounded"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
            <button
              onClick={() => setShowWatchList(true)}
              className="bg-cyan-400 text-black px-4 py-1 rounded flex items-center gap-2"
            >
              <Heart size={16} />
              WATCHLIST
            </button>
          </div>
        </div>
      </header>
      {
        <Watchlist
          setShow={() => setShowWatchList(false)}
          show={showWatchList}
        />
      }
    </>
  );
};
// WatchList ochilishi uchun funksiya bor
export default Header;
