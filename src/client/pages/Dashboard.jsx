import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import createStudent from '@wasp/actions/createStudent';
import getStudents from '@wasp/queries/getStudents';

export function DashboardPage() {
  const { data: students, isLoading, error } = useQuery(getStudents);
  const createStudentFn = useAction(createStudent);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateStudent = () => {
    createStudentFn({ name, age });
    setName('');
    setAge(0);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-2 py-1 border rounded"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
          className="px-2 py-1 ml-2 border rounded"
        />
        <button
          onClick={handleCreateStudent}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Student
        </button>
      </div>
      <div>
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-gray-100 p-4 mb-4 rounded-lg"
          >
            <div>{student.name}</div>
            <div>{student.age}</div>
          </div>
        ))}
      </div>
    </div>
  );
}