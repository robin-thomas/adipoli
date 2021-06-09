export default async function fetcher(url, params) {
  try {
    if (params) {
      params.headers = { 'Content-Type': 'application/json' };
      params.body =
        typeof params.body === 'object'
          ? JSON.stringify(params.body)
          : params.body;
    }

    if (process.env.NEXT_PUBLIC_APP_BASE_URL) {
      url = `${process.env.NEXT_PUBLIC_APP_BASE_URL}${url}`;
    }

    const response = await fetch(url, params);

    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error = new Error(response.statusText);
    error.response = response;
    error.data = data;

    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }

    throw error;
  }
}
