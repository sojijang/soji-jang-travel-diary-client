import React, { useState, useCallback } from "react";
import { Calendar } from "@natscale/react-calendar";
import "@natscale/react-calendar/dist/main.css";
import "./CalendarFeature.scss";

export default function FullCalendar() {
  const [value, setValue] = useState();

  const onChange = useCallback(
    (value) => {
      setValue(value);
    },
    [setValue]
  );

  //   const isDisabled = useCallback((date) => {
  //     // disable wednesdays and any date that is divisible by 5
  //     if (date.getDay() === 3 || date.getDate() % 5 === 0) {
  //       return true;
  //     }
  //   }, []);

  const isHighlight = useCallback((date) => {
    // highlight any data that is divisible by 5
    if (date.getDate() % 5 === 0) {
      return true;
    }
  }, []);

  return (
    <main>
      <h1 className="calendar__title">Calendar</h1>
      <div className="calendar__wrapper">
        <Calendar
          className="nat-calendar"
          size={420}
          fontSize={18}
          value={value}
          onChange={onChange}
          isMultiSelector={true}
          isRangeSelector={true}
          //   isDisabled={isDisabled}
          isHighlight={isHighlight}
          //   useDarkMode={true}
          //   lockView={true}
        />
      </div>
    </main>
  );
}
