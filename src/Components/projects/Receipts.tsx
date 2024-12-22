const Receipts = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <p className="text-xl">The most complex and fun project I've built</p>
      <a
        href="https://www.getreceipts.app"
        className="bg-[#6a69ab] text-white hover:text-white px-6 py-3 rounded-full 
                 shadow-lg hover:cursor-pointer hover:scale-110
                 active:bg-[#5a598b] active:scale-95 
                 transition-all duration-150"
      >
        Check it out here!
      </a>
    </div>
  );
};

export default Receipts;
