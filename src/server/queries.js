import HttpError from '@wasp/core/HttpError.js'

export const getStudents = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Student.findMany({
    where: {
      user: { id: context.user.id }
    }
  });
}

export const getStudent = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const student = await context.entities.Student.findUnique({
    where: { id: args.studentId },
    include: { user: true }
  });

  if (!student) { throw new HttpError(404, `Student with id ${args.studentId} not found`); }

  if (student.user.id !== context.user.id) { throw new HttpError(400, `Student with id ${args.studentId} does not belong to the authenticated user`); }

  return student;
}