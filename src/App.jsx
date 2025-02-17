import React from "react"

const semestersSubjects = [
  [
    { "name": "Project Lab", "teacher": "Teacher1", "repeat": 4, },
    { "name": "Sports", "teacher": "Teacher2", "repeat": 3 },
    { "name": "Mob", "teacher": "Teacher3", "repeat": 4 },
    { "name": "Industrial Specialization", "teacher": "Teacher4", "repeat": 3 },
    { "name": "ST", "teacher": "Teacher5", "repeat": 4 },
    { "name": "ML Lab", "teacher": "Teacher6", "repeat": 1, "isLab": true },
    { "name": "EC", "teacher": "Teacher7", "repeat": 3 },
    { "name": "ML", "teacher": "Teacher8", "repeat": 3 },
    { "name": "Library", "teacher": "Teacher9", "repeat": 2 },
    { "name": "Mob Lab", "teacher": "Teacher10", "repeat": 1, "isLab": true },
  ],
[
    { "name": "Project Lab", "teacher": "Teacher1", "repeat": 2, "isLab": true },
    { "name": "Sports", "teacher": "Teacher2", "repeat": 3 },
    { "name": "Mob", "teacher": "Teacher3", "repeat": 4 },
    { "name": "Industrial Specialization", "teacher": "Teacher4", "repeat": 3 },
    { "name": "ST", "teacher": "Teacher5", "repeat": 4 },
    { "name": "ML Lab", "teacher": "Teacher6", "repeat": 1, "isLab": true },
    { "name": "EC", "teacher": "Teacher7", "repeat": 3 },
    { "name": "ML", "teacher": "Teacher8", "repeat": 3 },
    { "name": "Library", "teacher": "Teacher9", "repeat": 2 },
    { "name": "Mob Lab", "teacher": "Teacher10", "repeat": 1, "isLab": true },
      ],
[
    { "name": "Project Lab", "teacher": "Teacher1", "repeat": 2, "isLab": true },
    { "name": "Sports", "teacher": "Teacher2", "repeat": 3 },
    { "name": "Mob", "teacher": "Teacher3", "repeat": 4 },
    { "name": "Industrial Specialization", "teacher": "Teacher4", "repeat": 3 },
    { "name": "ST", "teacher": "Teacher5", "repeat": 4 },
    { "name": "ML Lab", "teacher": "Teacher6", "repeat": 1, "isLab": true },
    { "name": "EC", "teacher": "Teacher7", "repeat": 3 },
    { "name": "ML", "teacher": "Teacher8", "repeat": 3 },
    { "name": "Library", "teacher": "Teacher9", "repeat": 2 },
    { "name": "Mob Lab", "teacher": "Teacher10", "repeat": 1, "isLab": true },
  ],
[
    { "name": "Project Lab", "teacher": "Teacher1", "repeat": 2, "isLab": true },
    { "name": "Sports", "teacher": "Teacher2", "repeat": 3 },
    { "name": "Mob", "teacher": "Teacher3", "repeat": 4 },
    { "name": "Industrial Specialization", "teacher": "Teacher4", "repeat": 3 },
    { "name": "ST", "teacher": "Teacher5", "repeat": 4 },
    { "name": "ML Lab", "teacher": "Teacher6", "repeat": 1, "isLab": true },
    { "name": "EC", "teacher": "Teacher7", "repeat": 3 },
    { "name": "ML", "teacher": "Teacher8", "repeat": 3 },
    { "name": "Library", "teacher": "Teacher9", "repeat": 2 },
    { "name": "Mob Lab", "teacher": "Teacher10", "repeat": 1, "isLab": true },
],
[

    { "name": "Project Lab", "teacher": "Teacher1", "repeat": 2, "isLab": true },
    { "name": "Sports", "teacher": "Teacher2", "repeat": 3 },
    { "name": "Mob", "teacher": "Teacher3", "repeat": 4 },
    { "name": "Industrial Specialization", "teacher": "Teacher4", "repeat": 3 },
    { "name": "ST", "teacher": "Teacher5", "repeat": 4 },
    { "name": "ML Lab", "teacher": "Teacher6", "repeat": 1, "isLab": true },
    { "name": "EC", "teacher": "Teacher7", "repeat": 3 },
    { "name": "ML", "teacher": "Teacher8", "repeat": 3 },
    { "name": "Library", "teacher": "Teacher9", "repeat": 2 },
    { "name": "Mob Lab", "teacher": "Teacher10", "repeat": 1, "isLab": true },

    { "name": "Project Lab", "teacher": "Teacher1", "repeat": 2, "isLab": true },
    { "name": "Sports", "teacher": "Teacher2", "repeat": 3 },
    { "name": "Mob", "teacher": "Teacher3", "repeat": 4 },
    { "name": "Industrial Specialization", "teacher": "Teacher4", "repeat": 3 },
    { "name": "ST", "teacher": "Teacher5", "repeat": 4 },
    { "name": "ML Lab", "teacher": "Teacher6", "repeat": 1, "isLab": true },
    { "name": "EC", "teacher": "Teacher7", "repeat": 3 },
    { "name": "ML", "teacher": "Teacher8", "repeat": 3 },
    { "name": "Library", "teacher": "Teacher9", "repeat": 2 },
    { "name": "Mob Lab", "teacher": "Teacher10", "repeat": 1, "isLab": true }
],

];

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function App() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  function countSubjectOccurrences(schedule, subject) {
    return schedule.filter((s) => s && s.name === subject.name).length
  }

  function generateSchedule(semester, globalTeacherConflict) {
    const schedule = Array.from({ length: 6 }, () => Array(5).fill(null))
    let subjectsPool = semester.flatMap((subject) => Array(subject.repeat).fill(subject))
    subjectsPool = shuffleArray(subjectsPool)

    for (let day = 0; day < 6; day++) {
      for (let period = 0; period < 5; period++) {
        if (schedule[day][period] !== null) continue

        let assigned = false
        subjectsPool.sort((a, b) => {
          const countA = countSubjectOccurrences(schedule[day], a)
          const countB = countSubjectOccurrences(schedule[day], b)
        

          return countA - countB
        })

        for (let i = 0; i < subjectsPool.length; i++) {
          const subject = subjectsPool[i]
          if (countSubjectOccurrences(schedule[day], subject) >= 1) {     /// not more than 2 doble subject at the smae time 
            continue 
          }

          if (subject.isLab) {
             const labScheduled = schedule[day].some((s) => s && s.isLab);
  if (labScheduled) {
    continue;
   } // Skip assigning another lab if one is already set for the day
   
            if (
              period < 4 &&
              schedule[day][period + 1] === null &&
              !globalTeacherConflict[day][period]?.[subject.teacher] &&
              !globalTeacherConflict[day][period + 1]?.[subject.teacher]
            ) {
              schedule[day][period] = subject
              schedule[day][period + 1] = subject

              if (!globalTeacherConflict[day][period]) {
                globalTeacherConflict[day][period] = {}
              }
              if (!globalTeacherConflict[day][period + 1]) {
                globalTeacherConflict[day][period + 1] = {}
              }
              globalTeacherConflict[day][period][subject.teacher] = true
              globalTeacherConflict[day][period + 1][subject.teacher] = true

              subjectsPool.splice(i, 1)
              assigned = true
              break
            }
          } else {
            if (!globalTeacherConflict[day][period]?.[subject.teacher]) {
              schedule[day][period] = subject

              if (!globalTeacherConflict[day][period]) {
                globalTeacherConflict[day][period] = {}
              }
              globalTeacherConflict[day][period][subject.teacher] = true

              subjectsPool = subjectsPool.filter((_, index) => index !== i)
              assigned = true
              break
            }
          }
        }

        // Removed "period--" to prevent infinite loop
        if (!assigned) {
          subjectsPool = semester.flatMap((subject) => Array(subject.repeat).fill(subject))
          subjectsPool = shuffleArray(subjectsPool)
          period--
        }
      }
    }

    return schedule
  }

  const globalTeacherConflict = Array.from({ length: 6 }, () => ({}))
  const semesterSchedules = semestersSubjects.map((semester) => generateSchedule(semester, globalTeacherConflict)) ///oro subkect itill idd koduthidaan ithlie kode varune elam store cheyum

  return (
    <div className="p-4">
      {semesterSchedules.map((schedule, semesterIndex) => (
        <div key={semesterIndex} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Semester {semesterIndex + 1}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schedule.map((daySchedule, dayIndex) => (
              <div key={dayIndex} className="bg-white shadow rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">{days[dayIndex]}</h3>
                <ul className="space-y-2">
                  {daySchedule.map((subject, periodIndex) => (
                    <li key={periodIndex} className="flex justify-between items-center">
                      <span className="font-medium">Period {periodIndex + 1}:</span>
                      <span className="text-gray-600">
                        {subject ? (
                          <>
                            {subject.name} - {subject.teacher}
                            {subject.isLab && " (Lab)"}
                          </>
                        ) : (
                          "Free"
                        )}
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
  )
}

export default App