import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {CryptoProvider} from "./context/CryptoContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CoinDetail from "./components/CoinDetail";
import CoinList from "./components/CoinList";
  
function App() {
  return (
    <BrowserRouter>
      <CryptoProvider>
        <div className="min-h-screen bg-gray-900">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <CoinList />
                </>
              }
            />
            <Route path="/coins/:id" element={<CoinDetail />} />
          </Routes>
        </div>
      </CryptoProvider>
    </BrowserRouter>
  );
}

export default App;
