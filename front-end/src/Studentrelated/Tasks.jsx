// import React from 'react'

// export default function Tasks() {
//   return (
//     <div>Tasks Section</div>
//   )
// }



import React, { useEffect, useState } from 'react';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    // Fetch tasks data from an API or another source
    // This is just a placeholder; replace it with your actual data fetching logic
    fetchTasksData();
  }, []);

  const fetchTasksData = async () => {
    // Simulated API call
    const fetchedTasks = await fetch('/api/tasks').then(res => res.json());
    setTasks(fetchedTasks);
  };

  return (
    <div>
      {tasks.length > 0 ? (
        // Render tasks
        <div>
          <h2>Tasks Section</h2>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>{task.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        // Render image from public folder if no tasks
        <div style={{ textAlign: 'center' ,margin:'20px'}}>
          <img
             src="https://img.freepik.com/free-vector/businessman-character-relaxed-office_1012-330.jpg?w=740&t=st=1714386447~exp=1714387047~hmac=f0dc0007b9c932cdcb2805c966da3463f74d569a03bd17de8ff3e0ccc84d6354"
             alt="No tasks available "
            style={{ maxWidth: '300px', height: '300px' }}
          />
          <p>No tasks available today!</p>
        </div>
      )}
    </div>
  );
}
