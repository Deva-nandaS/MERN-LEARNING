const Sel = ({ label, input }) => {
  return (
    <div className="flex gap-3 items-center">
           <input type="checkbox" className="w-5 h-5"></input>
        <label htmlFor={label}>{label}</label>
   
    </div>
  );
};

export const SelectStream = () => {
  return (
    <div className="flex flex-col w-full p-2 gap-4">
      <div>
        <p className="font-bold text-2xl">Select Data Streams</p>
        <p className=" text-gray-600 mt-1 text-sm">Choose the Facebook Marketing data streams you want to sync and manage.</p>
      </div>
      <div className="flex flex-col gap-4">
        <Sel label="Campaigns" />
        <Sel label="Ad Sets" />
        <Sel label="Ads" />
        <Sel label="Ad Insights" />
        <Sel label="Ad Creatives" />
      </div>
    </div>
  );
};
