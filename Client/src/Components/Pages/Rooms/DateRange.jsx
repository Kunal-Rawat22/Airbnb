/* eslint-disable react/prop-types */
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
// import { useState } from "react";
// import { addDays } from "date-fns";
export default function DatePicker({ selection, setSelection, setEndDate, setStartDate, startDate}) {

  const handleSelect = (ranges) => {
      setSelection([ranges.selection]);
      console.log(ranges);
      setStartDate(ranges.selection.startDate.toDateString());
      setEndDate(ranges.selection.endDate.toDateString());
  };

  return (
    <DateRangePicker
      className="border-r"
      onChange={handleSelect}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      startDate={startDate}
      months={2}
      minDate={new Date()}
      ranges={selection}
      direction="horizontal"
      staticRanges={[]}
      inputRanges={[]}
      showStaticRanges={false}
    />
  );
}
