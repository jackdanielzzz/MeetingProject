export const fetchData = (url) => {
  const promise = new Promise((resolve, reject) => {

      resolve(fetch(url, {
        method: 'GET',
      })
        .then((response) => response.json()));

  });

  return promise;
};

export function patchData(url, data) {
  const promise = new Promise((resolve, reject) => {

      resolve(fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
        .then((response) => response.json()));

  });

  return promise;
};


