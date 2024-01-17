import { fetcher, icAuth } from '../lib/utils';
import { ClassResponse } from '@/lib/types';
import prisma from '../../../shared/prisma';

async function syncRoster() {
  try {
    const token = await icAuth();

    const data = await fetcher<ClassResponse>(`${process.env.IC_CLASS_QUERY}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-XSRF-TOKEN': process.env.XSRF_TOKEN as string,
        Authorization: `Bearer ${token}` as string,
      },
    });
    console.log(data);
    const filteredClasses = data.classes.filter((cls) =>
      cls.title.includes('STEAM-A')
    );

    const classTitles = filteredClasses.map((cls) => {
      return {
        id: cls.sourcedId,
        teacher: cls.classCode,
        roomNumber: cls.location || 'unknown',
      };
    });

    const classroomsToCreate = [];
    let count = 0;

    for (const room of classTitles) {
      classroomsToCreate.push({
        id: room.id,
        roomNumber: room.roomNumber,
        teacherName: room.teacher,
      });
      count++;
      console.log(count);
    }

    await prisma.classrooms.createMany({
      data: classroomsToCreate,
      skipDuplicates: true,
    });
    console.log('Completed');
  } catch (error) {
    console.error(error);
  }
}

syncRoster();
