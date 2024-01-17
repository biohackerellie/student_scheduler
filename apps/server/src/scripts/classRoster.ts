/**
 * Retrieve rosters for each class and insert into database
 */

import prisma from '../../../shared/prisma';
import { fetcher } from '@/lib/utils';
import { RosterResponse } from '@/lib/types';
import { icAuth } from '@/lib/utils';

export async function RosterSync() {
  try {
    const token = await icAuth();
    const classes = await prisma.classrooms.findMany();
    const rosterData = [];

    let count = 0;
    for (const c of classes) {
      const id = c.id;
      const data = await fetcher<RosterResponse>(
        `${process.env.IC_BASE_QUERY}/classes/${id}/students?limit=100&ext_basic=true`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'X-XSRF-TOKEN': process.env.XSRF_TOKEN as string,
            Authorization: `Bearer ${token}` as string,
          },
        }
      );
      const mappedStudents = data.users.map((s) => {
        return {
          studentEmail: s.email,
          classroomId: id,
        };
      });
      for (const s of mappedStudents) {
        rosterData.push(s);
        count++;
      }
    }
    await prisma.classRosters.createMany({
      data: rosterData,
      skipDuplicates: true,
    });
    console.log(`Completed. ${count} students added to roster.`);
  } catch (error: any) {
    throw new Error(error);
  }
}

RosterSync();
