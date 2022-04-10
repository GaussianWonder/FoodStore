export interface ResponseError {
  name: string;
  message: string;
  response: Response;
  text: string;
  json: Record<string, any> | null;
}

export const maybeJson = (text: string): Record<string, any> | null => {
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}

export const expectText = async (response: Response) => {
  const text = await response.text();
  return text;
}

export const expectJson = async (response: Response) => {
  if (!response.ok) {
    const text = await expectText(response);
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

export const errorMessages = (body: ResponseError["json"]): string | null => {
  if (!body) return null;
  return Object.values(body).map(value => value.toString()).join("\n");
}
