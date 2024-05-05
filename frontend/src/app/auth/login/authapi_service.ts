const apiService = {
  post: async function (url: string, data: any): Promise<any> {
    console.log('post', url, data);
    return new Promise((resolve, reject) => {
      // fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      fetch(`${url}`, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log('response', json);
          resolve(json);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
}
export default apiService;