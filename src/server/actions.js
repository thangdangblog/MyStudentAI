import HttpError from '@wasp/core/HttpError.js'

export const createStudent = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { name, age } = args;

  const student = await context.entities.Student.create({
    data: {
      name,
      age,
      userId: context.user.id
    }
  });

  return student;
}

export const updateStudent = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const student = await context.entities.Student.findUnique({
    where: { id: args.id, userId: context.user.id }
  })
  if (!student) { throw new HttpError(403) }

  return context.entities.Student.update({
    where: { id: args.id },
    data: { name: args.name, age: args.age }
  })
}