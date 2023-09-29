import DatePicker from "./DateRange";
export default function RoomDate({address, startDate,endDate, selection, setEndDate, setSelection,setStartDate}) {
  return (
    <div className="Date-Picker mt-8">
      <h2 className="text-2xl font-medium mb-2">
        30 Nights in {address}
      </h2>
      <span className="font-light text-sm text-gray-500">
        {startDate} - {endDate}
      </span>
      <div className=" pb-10">
        <DatePicker
          selection={selection}
          setSelection={setSelection}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
        />
        <hr className="relative w-5/6 top-3 left-16" />
      </div>
    </div>
  );
}
