conexApi.patch(`usuario}`).then((res) => {
    console.log(res)
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
