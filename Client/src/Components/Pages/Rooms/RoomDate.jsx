import DatePicker from "./DateRange";
export default function RoomDate({
  address,
  startDate,
  endDate,
  selection,
  setEndDate,
  setSelection,
  setStartDate,
  setNoOfDays,
  noOfDays,
  setFlag2
}) {
  const big = ["Jan", "Mar", "May", "Jul", "Aug", "Oct", "Dec"];
  const small = ["Apr", "Jun", "Sep", "Nov"];
  const date1 = +endDate.split(" ")[2];
  const date2 = +startDate.split(" ")[2];
  const month1 = endDate.split(" ")[1];
  const month2 = startDate.split(" ")[1];
  let days;
  if (month1 === month2) {
    days = date1 - date2 + 1;
    setNoOfDays(days);
  } else {
    if (big.includes(month2)) days = 31 - date2 + date1 + 1;
    else if (small.includes(month2)) days = 30 - date2 + date1 + 1;
    else days = 28 - date2 + date1 + 1;
    setNoOfDays(days);
  }
  if (days === 1) setFlag2(false);
  else setFlag2(true)
    
  console.log(noOfDays);
  return (
    <div className="Date-Picker mt-8 pr-16">
      <h2 className="text-2xl font-medium mb-2">{noOfDays} Nights in {address}</h2>
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
        <hr className="relative w-12/12 top-3 left-2" />
      </div>
    </div>
  );
}
