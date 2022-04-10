export interface ResponseError {
  name: string;
  message: string;
  response: Response;
  text: string;
  json: Record<string, any> | null;
}

// eslint-disable-next-line no-unused-vars
export type ResponseResolver<T> = (response: Response) => Promise<T>;
export type AnyResponseResolver = ResponseResolver<any>;

export const maybeJson = (text: string): Record<string, any> | null => {
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}

export const maybeText = async (response: Response) => {
  const text = await response.text();
  return text;
}

export const expectJson = async (response: Response) => {
  if (!response.ok) {
    const text = await maybeText(response);
    throw {
      name: 'Response error!',
      message: 'Response did not end with status ok!',
      response: response,
      text: text,
      json: maybeJson(text),
    } as ResponseError;
  }
  return response.json();
}

export const expectObject = async <T> (response: Response) => {
  return expectJson(response) as Promise<T>;
}

export const errorMessages = (body: ResponseError["json"]): string | null => {
  if (!body) return null;
  return Object.values(body).map(value => value.toString()).join("\n");
}
