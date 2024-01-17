import type { Prisma, PrismaClient } from '@prisma/client';

type ModelNames = Prisma.ModelName;

export type PrismaModels = {
  [M in ModelNames]: Exclude<
    Awaited<ReturnType<PrismaClient[Uncapitalize<M>]['findUnique']>>,
    null
  >;
};

export type PrismaModelNames = keyof PrismaModels;

export type User = PrismaModels['User'];
export type Account = PrismaModels['Account'];
export type UserRole = ['admin', 'student', 'teacher', 'secretary'];
export type classrooms = PrismaModels['classrooms'];
export type classRosters = PrismaModels['classRosters'];
