import React from "react"

const semestersSubjects = [
  [
    { name: "Math", teacher: "Teacher1", repeat: 8 },
    { name: "Physics", teacher: "Teacher2", repeat: 4 },
    { name: "Chemistry", teacher: "Teacher3", repeat: 6 },
    { name: "Biology", teacher: "Teacher4", repeat: 8 },
    { name: "History", teacher: "Teacher5", repeat: 8 },
    { name: "Python Lab", teacher: "Teacher6", repeat: 1, isLab: true },
  ],
  [
    { name: "Algebra", teacher: "Teacher7", repeat: 7 },
    { name: "Mechanics", teacher: "Teacher1", repeat: 7 },
    { name: "Organic Chemistry", teacher: "Teacher2", repeat: 7 },
    { name: "Zoology", teacher: "Teacher3", repeat: 6 },
    { name: "World History", teacher: "Teacher4", repeat: 7 },
    { name: "Java Lab", teacher: "Teacher5", repeat: 1, isLab: true },
  ],
  [
    { name: "Calculus", teacher: "Teacher6", repeat: 7 },
    { name: "Thermodynamics", teacher: "Teacher7", repeat: 7 },
    { name: "Inorganic Chemistry", teacher: "Teacher1", repeat: 7 },
    { name: "Botany", teacher: "Teacher2", repeat: 6 },
    { name: "Ancient Civilizations", teacher: "Teacher3", repeat: 7 },
    { name: "binet Lab", teacher: "Teacher4", repeat: 1, isLab: true },
  ],
  [
    { name: "Linear Algebra", teacher: "Teacher5", repeat: 7 },
    { name: "Fluid Mechanics", teacher: "Teacher6", repeat: 7 },
    { name: "Biochemistry", teacher: "Teacher7", repeat: 7 },
    { name: "Microbiology", teacher: "Teacher1", repeat: 6 },
    { name: "Modern History", teacher: "Teacher2", repeat: 7 },
    { name: "Data Structures Lab", teacher: "Teacher3", repeat: 1, isLab: true },
  ],
  [
    { name: "Differential Equations", teacher: "Teacher4", repeat: 7 },
    { name: "Quantum Mechanics", teacher: "Teacher5", repeat: 7 },
    { name: "Physical Chemistry", teacher: "Teacher6", repeat: 7 },
    { name: "Genetics", teacher: "Teacher7", repeat: 6 },
    { name: "Medieval History", teacher: "Teacher1", repeat: 7 },
    { name: "Machine Learning Lab", teacher: "Teacher2", repeat: 1, isLab: true },
  ],
  [
    { name: "Statistics", teacher: "Teacher3", repeat: 7 },
    { name: "Electrodynamics", teacher: "Teacher4", repeat: 7 },
    { name: "Analytical Chemistry", teacher: "Teacher5", repeat: 7 },
    { name: "Ecology", teacher: "Teacher6", repeat: 6 },
    { name: "Contemporary History", teacher: "Teacher7", repeat: 7 },
    { name: "Web Development Lab", teacher: "Teacher1", repeat: 1, isLab: true },
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
          if (countSubjectOccurrences(schedule[day], subject) >= 2) {
            continue
          }

          if (subject.isLab) {
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
        }
      }
    }

    return schedule
  }

  const globalTeacherConflict = Array.from({ length: 6 }, () => ({}))
  const semesterSchedules = semestersSubjects.map((semester) => generateSchedule(semester, globalTeacherConflict))

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
