


import React, { useState } from "react";

function Assignsubject() {
  // Dummy data for classes and subjects
  const dummyClasses = [
    { ClassID: 1, ClassName: "Class A" },
    { ClassID: 2, ClassName: "Class B" },
    { ClassID: 3, ClassName: "Class C" },
  ];

  const dummySubjects = [
    { SubjectID: 1, SubjectName: "Subject 1" },
    { SubjectID: 2, SubjectName: "Subject 2" },
    { SubjectID: 3, SubjectName: "Subject 3" },
  ];

  // State variables to store the selected class and subjects
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Display the assigned class and subjects for demonstration purposes
    console.log("Assigned Class ID:", selectedClass);
    console.log("Assigned Subjects:", selectedSubjects);

    // For demonstration, show an alert with the information
    alert(
      `Assigned Class ID: ${selectedClass}\nAssigned Subjects: ${selectedSubjects.join(
        ", "
      )}`
    );
  };

  // Handle change events for the class dropdown and subject checkboxes
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSubjectChange = (event) => {
    const subjectId = event.target.value;
    if (event.target.checked) {
      // Add the subject to the list of selected subjects
      setSelectedSubjects([...selectedSubjects, subjectId]);
    } else {
      // Remove the subject from the list of selected subjects
      setSelectedSubjects(selectedSubjects.filter((id) => id !== subjectId));
    }
  };

  return (
    <div>
      <h1>Assign Class to Subjects</h1>
      <form onSubmit={handleSubmit}>
        {/* Class dropdown */}
        <div>
          <label htmlFor="class">Select Class:</label>
          <select
            id="class"
            value={selectedClass}
            onChange={handleClassChange}
            required
          >
            <option value="">--Select a Class--</option>
            {dummyClasses.map((c) => (
              <option key={c.ClassID} value={c.ClassID}>
                {c.ClassName}
              </option>
            ))}
          </select>
        </div>

        {/* Subject checkboxes */}
        <div>
          <label htmlFor="subjects">Select Subjects:</label>
          <div id="subjects">
            {dummySubjects.map((subject) => (
              <div key={subject.SubjectID}>
                <input
                  type="checkbox"
                  id={`subject${subject.SubjectID}`}
                  name="subjects"
                  value={subject.SubjectID}
                  onChange={handleSubjectChange}
                />
                <label htmlFor={`subject${subject.SubjectID}`}>
                  {subject.SubjectName}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <button type="submit">Assign Class to Subjects</button>
      </form>
    </div>
  );
}

export default Assignsubject;

