import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getStudent from '@wasp/queries/getStudent';
import updateStudent from '@wasp/actions/updateStudent';

export function StudentDetails() {
  const { studentId } = useParams();
  const { data: student, isLoading, error } = useQuery(getStudent, { studentId });
  const updateStudentFn = useAction(updateStudent);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateStudent = () => {
    updateStudentFn({
      id: student.id,
      name: 'Updated Name',
      age: student.age + 1
    });
  };

  return (
    <div className='p-4'>
      <div>Student Name: {student.name}</div>
      <div>Student Age: {student.age}</div>
      <button
        onClick={handleUpdateStudent}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
      >
        Update Student
      </button>
    </div>
  );
}