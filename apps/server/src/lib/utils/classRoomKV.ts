import { createClient } from './redis';

export async function setClassRoomKV(
  key: string,
  value: string,
  expires: number | 86400 // 1 day
): Promise<string | Error> {
  const client = createClient();
  const result = await client.set(`studentEmail:${key}`, value, 'EX', expires);
  return result;
}

export async function getClassRoomKV(key: string): Promise<string | null> {
  const client = createClient();
  const result = await client.get(`studentEmail:${key}`);

  return result;
}

export async function setRequestKV(key: string): Promise<string | Error> {
  const client = createClient();
  const value = JSON.stringify({
    status: 'pending',
    time: new Date().toISOString(),
  });
  const result = await client.set(`request:${key}`, value, 'EX', 43200);
  return result;
}

export async function getRequestKV(key: string): Promise<string | null> {
  const client = createClient();
  const result = await client.get(`request:${key}`);
  return result;
}