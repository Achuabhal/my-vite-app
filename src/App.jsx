import React from "react";
import "./App.css";
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun } from 'docx';
import { saveAs } from 'file-saver';

const scheduleLabels = [
  'Year 15.a', 'Year 1.b',
  'Year 2.a', 'Year 2.b',
  'Year 3.a', 'Year 3.b',
  '1st MCA', '2nd MCA'
];

const semestersSubjects = [
  // BCA 1st Year Section A
  [
    { name: "Project Lab", teacher: "Teacher1", isLab: true },
    { name: "ML Lab", teacher: "Teacher2", repeat: 1, isLab: true }, // 2
    { name: "Sports", teacher: "Teacher1317", repeat: 3, isEtc: true }, // 3
    { name: "Programming", teacher: "Teacher3", repeat: 4 }, // 4
    { name: "Maths", teacher: "Teacher4", repeat: 4 }, // 4
    { name: "OS", teacher: "Teacher5", repeat: 4 }, // 4
    { name: "DBMS", teacher: "Teacher6", repeat: 4 }, // 4
    { name: "English", teacher: "Teacher15", repeat: 4, isLang: true }, // 4
    { name: "Library", teacher: "Teacher1447", repeat: 3, isEtc: true } // 3
  ],
  // BCA 1st Year Section B
  [
    { name: "Project Lab", teacher: "Teacher8", repeat: 1, isLab: true }, // 2
    { name: "ML Lab", teacher: "Teacher9", repeat: 1, isLab: true }, // 2
    { name: "Sports", teacher: "Teacher1617", repeat: 3, isEtc: true }, // 3
    { name: "Programming", teacher: "Teacher10", repeat: 4 }, // 4
    { name: "Maths", teacher: "Teacher11", repeat: 4 }, // 4
    { name: "OS", teacher: "Teacher12", repeat: 4 }, // 4
    { name: "DBMS", teacher: "Teacher1", repeat: 4 }, // 4
    { name: "English", teacher: "Teacher17", repeat: 4, isLang: true }, // 4
    { name: "Library", teacher: "Teacher1178", repeat: 3, isEtc: true } // 3
  ],
  // BCA 2nd Year Section A
  [
    { name: "Project Lab", teacher: "Teacher3", repeat: 1, isLab: true }, // 2
    { name: "ML Lab", teacher: "Teacher4", repeat: 1, isLab: true }, // 2
    { name: "Sports", teacher: "Teacher1914", repeat: 3, isEtc: true }, // 3
    { name: "Algorithms", teacher: "Teacher5", repeat: 4 }, // 4
    { name: "Data Structures", teacher: "Teacher6", repeat: 4 }, // 4
    { name: "AI", teacher: "Teacher7", repeat: 4 }, // 4
    { name: "Web Dev", teacher: "Teacher8", repeat: 4 }, // 4
    { name: "Technical Writing", teacher: "Teacher20", repeat: 4, isLang: true }, // 4
    { name: "Library", teacher: "Teacher2104", repeat: 3, isEtc: true } // 3
  ],
  // BCA 2nd Year Section B
  [
    { name: "Project Lab", teacher: "Teacher10", repeat: 1, isLab: true }, // 2
    { name: "ML Lab", teacher: "Teacher11", repeat: 1, isLab: true }, // 2
    { name: "Sports", teacher: "Teacher2225", repeat: 3, isEtc: true }, // 3
    { name: "Algorithms", teacher: "Teacher12", repeat: 4 }, // 4
    { name: "Data Structures", teacher: "Teacher1", repeat: 4 }, // 4
    { name: "AI", teacher: "Teacher2", repeat: 4 }, // 4
    { name: "Web Dev", teacher: "Teacher3", repeat: 4 }, // 4
    { name: "Technical Writing", teacher: "Teacher23", repeat: 4, isLang: true }, // 4
    { name: "Library", teacher: "Teacher2485", repeat: 3, isEtc: true } // 3
  ],
  // BCA 3rd Year Section A
  [
    { name: "Project Lab", teacher: "Teacher5", repeat: 1, isLab: true }, // 2
    { name: "ML Lab", teacher: "Teacher6", repeat: 1, isLab: true }, // 2
    { name: "Sports", teacher: "Teacher2525", repeat: 3, isEtc: true }, // 3
    { name: "ML", teacher: "Teacher7", repeat: 4 }, // 4
    { name: "Big Data", teacher: "Teacher8", repeat: 4 }, // 4
    { name: "Cybersecurity", teacher: "Teacher9", repeat: 4 }, // 4
    { name: "IoT", teacher: "Teacher10", repeat: 4 }, // 4
    { name: "Communication Skills", teacher: "Teacher26", repeat: 4, isLang: true }, // 4
    { name: "Library", teacher: "Teacher2727", repeat: 3, isEtc: true } // 3
  ],
  // BCA 3rd Year Section B
  [
    { name: "Project Lab", teacher: "Teacher12", repeat: 1, isLab: true }, // 2
    { name: "ML Lab", teacher: "Teacher1", repeat: 1, isLab: true }, // 2
    { name: "Sports", teacher: "Teacher2847", repeat: 3, isEtc: true }, // 3
    { name: "ML", teacher: "Teacher2", repeat: 4 }, // 4
    { name: "Big Data", teacher: "Teacher3", repeat: 4 }, // 4
    { name: "Cybersecurity", teacher: "Teacher4", repeat: 4 }, // 4
    { name: "IoT", teacher: "Teacher5", repeat: 4 }, // 4
    { name: "Communication Skills", teacher: "Teacher29", repeat: 4, isLang: true }, // 4
    { name: "Library", teacher: "Teacher3028", repeat: 3, isEtc: true } // 3
  ],
  // MCA 1st Year (Single Section)
  [
    { name: "Project Lab", teacher: "Teacher7", repeat: 1, isLab: true }, // 2
    { name: "ML Lab", teacher: "Teacher8", repeat: 1, isLab: true }, // 2
    { name: "Sports", teacher: "Teacher3147", repeat: 3, isEtc: true }, // 3
    { name: "Advanced OS", teacher: "Teacher9", repeat: 4 }, // 4
    { name: "Distributed Systems", teacher: "Teacher10", repeat: 4 }, // 4
    { name: "Cryptography", teacher: "Teacher11", repeat: 4 }, // 4
    { name: "Data Science", teacher: "Teacher12", repeat: 4 }, // 4
    { name: "Technical Writing", teacher: "Teacher32", repeat: 4, isLang: true }, // 4
    { name: "Library", teacher: "Teacher3325", repeat: 3, isEtc: true } // 3
  ],
  // MCA 2nd Year (Single Section)
  [
    { name: "Project Lab", teacher: "Teacher2", repeat: 1, isLab: true }, // 2
    { name: "ML Lab", teacher: "Teacher3", repeat: 1, isLab: true }, // 2
    { name: "Sports", teacher: "Teacher3425", repeat: 3, isEtc: true }, // 3
    { name: "Deep Learning", teacher: "Teacher4", repeat: 4 }, // 4
    { name: "Blockchain", teacher: "Teacher5", repeat: 4 }, // 4
    { name: "Cloud Computing", teacher: "Teacher6", repeat: 4 }, // 4
    { name: "NLP", teacher: "Teacher7", repeat: 4 }, // 4
    { name: "Communication Skills", teacher: "Teacher35", repeat: 4, isLang: true }, // 4
    { name: "Library", teacher: "Teacher3256", repeat: 3, isEtc: true } // 3
  ]
];





// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let globalTeacherConflict = Array.from({ length: 6 }, () => ({}));
    let teacherAssignments = Array.from({ length: 6 }, () => ({}));

  function generateTeacherViewDocument(semesterSchedules) {
    // Collect all unique teachers
    const allTeachers = new Set();
    semestersSubjects.forEach(semester => {
      semester.forEach(subject => allTeachers.add(subject.teacher));
    });
    const teachers = Array.from(allTeachers);

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: "Teacher Workload Schedule",
            heading: "Title",
            alignment: "center",
            spacing: { after: 200 },
          }),
          new Table({
            columnWidths: [2000, ...days.map(() => 1500)],
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Teacher", alignment: "center" })],
                    shading: { fill: "F2F2F2" },
                  }),
                  ...days.map(day => new TableCell({
                    children: [new Paragraph({ text: day, alignment: "center" })],
                    shading: { fill: "F2F2F2" },
                  })),
                ],
              }),
              ...teachers.map(teacher => {
                const teacherSchedule = days.map((_, dayIndex) => {
                  let daySchedule = '';
                  for (let period = 0; period < 5; period++) {
                    let found = false;
                    for (let sem = 0; sem < semesterSchedules.length; sem++) {
                      const subject = semesterSchedules[sem][dayIndex][period];
                      if (subject && subject.teacher === teacher) {
                        daySchedule += `P${period + 1}: Sem ${sem + 1} (${subject.name}${subject.isLab ? " Lab" : ""})\n`;
                        found = true;
                        if (subject.isLab) period++; // Skip next period for labs
                        break;
                      }
                    }
                    if (!found && !daySchedule.includes(`P${period + 1}:`)) {
                      daySchedule += `P${period + 1}: Free\n`;
                    }
                  }
                  return daySchedule.trim();
                });

                return new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: teacher, alignment: "center" })],
                      shading: { fill: "F2F2F2" },
                    }),
                    ...teacherSchedule.map(schedule => new TableCell({
                      children: [new Paragraph({ 
                        text: schedule,
                        alignment: "left",
                        spacing: { line: 240 }
                      })],
                    })),
                  ],
                });
              }),
            ],
          }),
        ],
      }],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "teacher_workload.docx");
    });
  }


  function generateWordDocument(semesterSchedules) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Document title
            new Paragraph({
              text: "College Timetable",
              heading: "Title",
              alignment: "center",
              spacing: { after: 200 },
            }),
            // Semester tables
            ...semesterSchedules.flatMap((schedule, semesterIndex) => [
              new Paragraph({
                text: `Semester ${semesterIndex + 1}`,
                heading: "Heading1",
                alignment: "left",
                spacing: { before: 400, after: 200 },
              }),
              createSemesterTable(schedule, days),
            ]),
          ],
        },
      ],
    });
  
    // Generate the document and prompt download
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "timetable.docx");
    });
  }
  
  function createSemesterTable(schedule, days) {
    const table = new Table({
      columnWidths: [1008, 1669, 1669, 1669, 1669, 1669], // Approx. 0.7 inch for days, 1.16 inch for periods
      borders: {
        top: { style: "single", size: 1, color: "000000" },
        bottom: { style: "single", size: 1, color: "000000" },
        left: { style: "single", size: 1, color: "000000" },
        right: { style: "single", size: 1, color: "000000" },
        insideHorizontal: { style: "single", size: 1, color: "000000" },
        insideVertical: { style: "single", size: 1, color: "000000" },
      },
      rows: [
        // Header row
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ text: "", alignment: "center" })],
              shading: { fill: "F2F2F2" },
            }),
            ...Array.from({ length: 5 }, (_, i) => new TableCell({
              children: [new Paragraph({ text: `Period ${i + 1}`, alignment: "center" })],
              shading: { fill: "F2F2F2" },
            })),
          ],
        }),
        // Day rows
        ...schedule.map((daySchedule, dayIndex) => {
          const dayName = days[dayIndex];
          const cells = [
            new TableCell({
              children: [new Paragraph({ text: dayName, alignment: "center" })],
              shading: { fill: "F2F2F2" },
            }),
          ];
          let period = 0;
          while (period < 5) {
            const subject = daySchedule[period];
            if (subject && subject.isLab && period < 4 && daySchedule[period] === daySchedule[period + 1]) {
              // Lab spanning two periods
              const labText = `${subject.name} - ${subject.teacher} (Lab)`;
              cells.push(new TableCell({
                children: [new Paragraph({ text: labText, alignment: "center" })],
                columnSpan: 2,
              }));
              period += 2;
            } else {
              // Regular subject or free period
              const text = subject ? `${subject.name} - ${subject.teacher}` : "Free";
              cells.push(new TableCell({
                children: [new Paragraph({ text: text, alignment: "center" })],
              }));
              period += 1;
            }
          }
          return new TableRow({ children: cells });
        }),
      ],
    });
    return table;
  }

  function countSubjectOccurrences(schedule, subject) {
    return schedule.filter((s) => s && s.name === subject.name).length;
  }

  // Global tracker: one object per day to count teacher assignments.
  function canAssignTeacher(day, subject, teacherAssignments) {
    const currentCount = teacherAssignments[day][subject.teacher] || 0;
    const assignmentCount = subject.isLab ? 2 : 1;
    return currentCount + assignmentCount <= 4;
  }

  function updateTeacherAssignments(day, subject, teacherAssignments) {
    const assignmentCount = subject.isLab ? 2 : 1;
    teacherAssignments[day][subject.teacher] =
      (teacherAssignments[day][subject.teacher] || 0) + assignmentCount;
  }


  function generateSchedule(semester, globalTeacherConflict, teacherAssignments) {
    // Create a 6-day schedule with 5 periods each.
    let schedule = Array.from({ length: 6 }, () => Array(5).fill(null));
    let subjectsPool = semester.flatMap((subject) =>
      Array(subject.repeat).fill(subject)
    );
    subjectsPool = shuffleArray(subjectsPool);

    const dayOrder = [5, 0, 1, 2, 3, 4];

    // For Saturday, reserve 2 allowed slots for isEtc subjects.
    let reservedEtcSlots = [];
    if (dayOrder.includes(5)) {
      const allowedIndices = [2, 3, 4];
      reservedEtcSlots = shuffleArray(allowedIndices).slice(0, 2);
    }

    let day1 = Math.floor(Math.random() * 5);
    let day2 = Math.floor(Math.random() * 5);
    let day3 = Math.floor(Math.random() * 5);
   
    let g = false;
    let f = 2;

    // Make deep copies of conflicts and assignments
    let copyGlobalTeacherConflict = globalTeacherConflict.map(obj => ({ ...obj }));
    let copyTeacherAssignments = teacherAssignments.map(obj => ({ ...obj }));
   
     for (let d = 0; d < dayOrder.length; d++) {
      const day = dayOrder[d];
      for (let period = 0; period < 5; period++) {
        if (schedule[day][period] !== null) continue;

        subjectsPool.sort((a, b) => {
          const countA = countSubjectOccurrences(schedule[day], a);
          const countB = countSubjectOccurrences(schedule[day], b);
          return countA - countB;
        });

        let attemptCount = 0;
        const MAX_ATTEMPTS = 1000;
        let assignedInThisPeriod = false;

        while (!assignedInThisPeriod && attemptCount < MAX_ATTEMPTS) {
          attemptCount++;
          if (subjectsPool.length === 0) {
            console.warn(`No subjects left to assign for day ${day}, period ${period}.`);
            break;
          }

          let assigned = false;
          subjectsPool = shuffleArray(subjectsPool);

          for (let i = 0; i < subjectsPool.length; i++) {
            const subject = subjectsPool[i];
            let k = 1;

            if (day1 === day && !g) {
              k = 2;
            }

            // Prevent duplicate subject in the same day.
            if (countSubjectOccurrences(schedule[day], subject) >= k) continue;
            if (subject.isEtc && countSubjectOccurrences(schedule[day], subject) >= 1) continue;

            // Check teacher assignment limit.
            if (!canAssignTeacher(day, subject, copyTeacherAssignments)) continue;
            if (period === 0 && subject.isEtc) continue;
            if (day === 5 && subject.isLang) continue;
            if (day === 5 && reservedEtcSlots.includes(period) && !subject.isEtc) continue;
            if (day === 5 && subject.isEtc && !reservedEtcSlots.includes(period)) continue;

            if (subject.isLab) {
              if (day === 5) continue;
              // Only one lab allowed per day.
              const labScheduled = schedule[day].some((s) => s && s.isLab);
              if (labScheduled) continue;

              // Ensure two consecutive periods are available.
              if (
                period < 4 &&
                schedule[day][period + 1] === null &&
                !copyGlobalTeacherConflict[day][period]?.[subject.teacher] &&
                !copyGlobalTeacherConflict[day][period + 1]?.[subject.teacher]
              ) {
                schedule[day][period] = subject;
                schedule[day][period + 1] = subject;

                copyGlobalTeacherConflict[day][period] = {
                  ...(copyGlobalTeacherConflict[day][period] || {}),
                  [subject.teacher]: true
                };
                copyGlobalTeacherConflict[day][period + 1] = {
                  ...(copyGlobalTeacherConflict[day][period + 1] || {}),
                  [subject.teacher]: true
                };

                updateTeacherAssignments(day, subject, copyTeacherAssignments);
                subjectsPool.splice(i, 1);
                assigned = true;
                break;
              }
            } else {
              if (!copyGlobalTeacherConflict[day][period]?.[subject.teacher]) {
                schedule[day][period] = subject;
                copyGlobalTeacherConflict[day][period] = {
                  ...(copyGlobalTeacherConflict[day][period] || {}),
                  [subject.teacher]: true
                };

                updateTeacherAssignments(day, subject, copyTeacherAssignments);
                subjectsPool.splice(i, 1);
                assigned = true;

                if (countSubjectOccurrences(schedule[day], subject) == 1) {
                  g = true;
                }      
                break;
              }
            }
          }

          if (assigned) {
            assignedInThisPeriod = true;
            break;
          } else if (attemptCount >= MAX_ATTEMPTS) {
            console.warn(
              `Could not assign a subject for day ${day}, period ${period} after ${MAX_ATTEMPTS} attempts. Leaving slot free.`
            );
            break;
          }
        }
      }
    }
    
    


    

    
    const hasNull = schedule.some(row => row.includes(null));
    const currentAttempt = arguments[3] || 0; // Get attempt count from arguments or default to 0

    // Check if the schedule has nulls AND the attempt count is less than 100
    if (hasNull && currentAttempt < 10000) {
      console.log(`Retrying schedule generation for a semester (attempt ${currentAttempt + 1}) due to null slots.`);
      // Recursively call, incrementing the attempt count.
      // Pass the *original* globalTeacherConflict and teacherAssignments received by this call.
      
      copyTeacherAssignments = [];
      copyGlobalTeacherConflict = [];
      copyGlobalTeacherConflict = globalTeacherConflict.map(obj => ({ ...obj }));
      copyTeacherAssignments = teacherAssignments.map(obj => ({ ...obj }));
      schedule = Array.from({ length: 6 }, () => Array(5).fill(null));
      subjectsPool = semester.flatMap((subject) =>
        Array(subject.repeat).fill(subject)
      );
      subjectsPool = shuffleArray(subjectsPool);
      return generateSchedule(semester, globalTeacherConflict, teacherAssignments, currentAttempt + 1);
    }
    // If hasNull is false OR attemptCount limit (100) is reached,
    // the function will proceed to the final return statement below this block,
    // returning the current schedule (potentially incomplete if attempts were exhausted).
    console.log(`Final schedule for semester:`, schedule);
    console.log(`Teacher assignments:`, copyTeacherAssignments);
    console.log(`Global teacher conflicts:`, copyGlobalTeacherConflict);
    return {
      schedule: schedule,
      copyGlobalTeacherConflict,
      copyTeacherAssignments,
    };
  
  }


  // Attempt to generate schedules up to 10000 times until no free period is present.
  let attempt = 0;
  let semesterSchedules = [];
  let completeSchedule = false;
  let result = [];

  while (attempt < 1000 && !completeSchedule) {
    attempt++;
    console.log(`Attempt ${attempt}`);
    // Reinitialize global conflict trackers for each new attempt.
     globalTeacherConflict = Array.from({ length: 6 }, () => ({}));
     teacherAssignments = Array.from({ length: 6 }, () => ({}));

    // Generate a schedule for each semester.
    semesterSchedules = semestersSubjects.map((semester) => {
    result = generateSchedule(semester, globalTeacherConflict, teacherAssignments);
      
      // Replace the data in globalTeacherConflict and teacherAssignments with the returned copies
      globalTeacherConflict = result.copyGlobalTeacherConflict;
      teacherAssignments = result.copyTeacherAssignments;
      
      // Return the schedule to be stored in semesterSchedules
      return result.schedule;
    });

    // Check if every period in every day of every schedule is filled.
    completeSchedule = semesterSchedules.every((schedule) =>
      schedule.every((daySchedule) => daySchedule.every((subject) => subject !== null))
    );
  }

  if (!completeSchedule) {
    console.warn("Could not generate a complete schedule without free periods after 10000 attempts.");
  }

  // --- Aggregate teacher summary for all semesters ---
 

  return (
    <div>
      <button
        className="download-button"
        onClick={() => generateWordDocument(semesterSchedules)}
      >
        Download Timetable as Word
      </button>
      <button
          className="download-button teacher-view-button"
          onClick={() => generateTeacherViewDocument(semesterSchedules)}
        >
          Teacher View
        </button>
        <div className="schedule-container">
      {semesterSchedules.map((schedule, index) => (
        <div key={index} className="semester-block">
          <h2 className="semester-title">
            {scheduleLabels[index]} {completeSchedule ? "" : `(Attempt ${attempt})`}
          </h2>
          <div className="days-grid">
            {schedule.map((daySchedule, dayIndex) => (
              <div key={dayIndex} className="day-card">
                <h3 className="day-title">{days[dayIndex]}</h3>
                <ul className="periods-list">
                  {daySchedule.map((subject, periodIndex) => (
                    <li
                      key={periodIndex}
                      className={`period-item ${subject?.isLab ? "lab-period" : ""} ${!subject ? "free-period" : ""}`}
                    >
                      <span className="period-number">Period {periodIndex + 1}:</span>
                      <span className="subject-info">
                        {subject
                          ? `${subject.name} - ${subject.teacher}${subject.isLab ? " (Lab)" : ""}`
                          : "Free"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    </div>
  );
}

export default App;
