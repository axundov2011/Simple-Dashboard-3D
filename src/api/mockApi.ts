type ApiResult<T> = { data: T };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function mockRequest<T>(fn: () => T, ms = 200): Promise<ApiResult<T>> {
  await sleep(ms);
  return { data: fn() };
}