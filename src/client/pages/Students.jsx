import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getStudents from '@wasp/queries/getStudents';

export function Students() {
  const { data: students, isLoading, error } = useQuery(getStudents);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className=''>
      {students.map((student) => (
        <div key={student.id} className='py-2'>
          <Link to={`/students/${student.id}`} className='text-blue-500 hover:underline'>
            <p>{student.name}, {student.age}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}