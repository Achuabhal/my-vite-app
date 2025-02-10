
import React from 'react';

const Timetable = ({ timetable, semesterName }) => (
  <div style={{ margin: "10px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
    <h3>{semesterName}</h3>
    {["A", "B"].map((section) => (
      <div key={section} style={{ marginBottom: "10px" }}>
        <h4>Section {section}</h4>
        {Object.keys(timetable[section]).map((day) => (
          <div key={day}>
            <strong>{day}:</strong>
            {timetable[section][day].map(({ period, subject, teacher }) => (
              <div key={period}>
                Period {period}: {subject} ({teacher})
              </div>
            ))}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default Timetable;