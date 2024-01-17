import { NotFoundError } from 'elysia';
import prisma from '../../../../shared/prisma';

export async function getRosters() {
  try {
    return await prisma.classRosters.findMany();
  } catch (e) {
    throw new NotFoundError('No rosters found');
  }
}

export async function getRostersById(id: string) {
  try {
    return await prisma.classRosters.findMany({
      where: {
        classroomId: id,
      },
      include: {
        classroom: true,
      },
    });
  } catch (e) {
    throw new NotFoundError('No roster found with that ID');
  }
}

export async function getStudentRoster(email: string) {
  try {
    return await prisma.classRosters.findFirst({
      where: {
        studentEmail: email,
      },
    });
  } catch (e) {
    throw new NotFoundError('No roster found with that email');
  }
}
