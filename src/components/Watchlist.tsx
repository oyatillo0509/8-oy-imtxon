import { useCrypto } from "../context/CryptoContext";
import { Star, XIcon } from "lucide-react";

type WatchlistProps = {
  show: boolean; 
  setShow: (b: boolean) => void; // Oynani ko'rsatish uchun funksiya
};

export default function Watchlist({ setShow, show }: WatchlistProps) {
  const { watchlist, removeFromWatchlist } = useCrypto(); // watchlist va removeFromWatchlist funksiyalarini contextdan olish

  return (
    <>
      {show && ( // Agar show true bo'lsat oyna ko'rsatiladi
        <div className="bg-[#515151] text-white p-4 rounded-lg w-[511px] fixed right-0 top-0 h-screen">
          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-yellow-500 mr-2" />{" "}
            {/* Yulduzcha ikon */}
            <h2 className="text-xl font-semibold">Watchlist</h2>{" "}
            <button className="ml-auto" onClick={() => setShow(false)}>
              <XIcon className="h-6 w-6" /> {/*yopish uchun */}
            </button>
          </div>

          {watchlist.length === 0 ? ( // Agar watchlist bo'sh bo'lsa No coins in watchlist ko'rsatish
            <p className="text-gray-500 text-4xl text-center">
              No coins in watchlist{" "}
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-6">           
              {watchlist.map((coin) => {
                return (
                  <div
                    key={coin.id}
                    className="px-4 py-4 bg-[#14161A] rounded-lg flex flex-col items-center"
                  >
                    <img
                      width={100}
                      height={100}
                      src={coin.image}
                      alt={coin.name}
                      className="mb-4" // Coin rasmi
                    />
                    <p className="mb-2">{coin.name}</p>{" "}
                    
                    <button
                      className="bg-[#FF0000] py-1 px-4 rounded"
                      onClick={() => removeFromWatchlist(coin.id)} // Coinnni watchlistdan o'chirish 
                    >
                      REMOVE 
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
