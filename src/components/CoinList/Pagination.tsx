interface PaginationProps {
  page: number;
  onPrevious: () => void; // Oldingi sahifaga o'tish uchun -1 
  onNext: () => void; // Keyingi sahifaga o'tish uchun +1  funksiyalar
}

const Pagination = ({ page, onPrevious, onNext }: PaginationProps) => (
  <div className="flex justify-center gap-2 mt-6">
    {/* -1 o'tish butn */}
    <button
      onClick={onPrevious} 
      disabled={page === 1} // Agar sahifa birinchi bo'lsa btn noactiv
      className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
    >
      Previous
    </button>

    {/* Hozirgi sahifa raqami */}
    <span className="px-4 py-2 text-white">Page {page}</span>

    {/* +1  o'tish btn */}
    <button
      onClick={onNext} 
      className="px-4 py-2 bg-gray-800 text-white rounded"
    >
      Next
    </button>
  </div>
);

export default Pagination;
