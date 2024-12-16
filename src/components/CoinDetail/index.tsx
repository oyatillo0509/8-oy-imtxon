import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCrypto } from "../../context/CryptoContext";
import CoinChart from "../CoinChart";
import { fetchCoinDetails } from "../../utils/api";
import { formatCurrency, formatCompactCurrency } from "../../utils/formatters";

const CoinDetail = () => {
  const { id } = useParams(); // URL orqali kelgan idsini olish
  const { currency } = useCrypto(); //  hozirgi coinni olish
  const [coinData, setCoinData] = useState<any>(null); // coin malumotini saqlashga  state
  const [loading, setLoading] = useState(true); // Loader
  const [error, setError] = useState<string | null>(null); // Xatolik uchun state

  useEffect(() => {
    const loadCoinData = async () => {
      if (!id) return; 
      setLoading(true); 
      setError(null); 
// Tepadagi code kelayotgan malumot uchun validatsiya 
      const data = await fetchCoinDetails(id); // jo'natilgan coin malumotlarini olish
      if (!data) {
        setError("Failed to load coin data. Please try again later."); // Agar malumot kelmasa, xatolik haqida xabar
      } else {
        setCoinData(data); // APIdan kelgan malumotni coinDataga berilyabdi
      }
      setLoading(false); // lodder
    };

    loadCoinData();
  }, [id, currency]); // id yoki currency o'zgarsa qayta ishlash uchun 

  if (loading) {
    // Foydalanuvchiga ko'rsatiladigan loader
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !coinData) {
    // Foydalanuvchiga ko'rsatiladigan xatolik
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
        <div className="text-red-400">
          {error || "Failed to load coin data"} 
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg">
            <div className="items-center justify-items-center grid gap-4 mb-6">
              <img
                src={coinData.image.large} // coin rasmi
                className="w-[200px] h-[200px]"
                alt=""
              />
              <p className="font-bold text-5xl">{coinData.name}</p>{" "}
              <div>
                <p
                  className="text-sm text-gray-300"
                  dangerouslySetInnerHTML={{
                    __html: coinData.description.en.split(". ")[0] + ".", // coin tarifini kerakli joyini olishi uchun
                  }}
                ></p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <p className="text-white text-2xl font-bold">Rank:</p>
                <p className="text-2xl">{coinData.market_cap_rank}</p>
                {/* o'rni(ranki) */}
              </div>

              <div className="flex items-center gap-3">
                <p className="text-white text-2xl font-bold">Current Price:</p>
                <p className="text-2xl">
                  {formatCurrency(
                    coinData.market_data.current_price[currency.toLowerCase()], // Joriy narx malumot xarxil kelmasligi uchun faqat kichik harflarda chiqadi
                    currency
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <p className="text-white text-2xl font-bold">Market Cap:</p>
                <p className="text-2xl">
                  {formatCompactCurrency(
                    coinData.market_data.market_cap[currency.toLowerCase()],
                    currency
                  )}
                </p>
              </div>
            </div>
          </div>

          {/*   CoinChart componetdan ayni usha coinni id si orqali diagrammasini yaratyabdi */}
          <div className="lg:col-span-2">
            <CoinChart coinId={id} /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
