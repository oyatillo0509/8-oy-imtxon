import Carousel from "./Carousel";

const Hero = () => {
  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          CRYPTOFOLIO WATCH LIST
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Get All The Info Regarding Your Favorite Crypto Currency
        </p>
        <Carousel />
      </div>
    </div>
  );
};
// Odatiy styledan iborat faqat Carousel chaqirilgan
export default Hero;
