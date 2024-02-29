const addToCart = (id) => {
  fetch(
    `http://localhost:8080/api/carts/65ceaf6f66bd9b7a57dc7719/product/${id}`,
    {
      method: "POST",
      body: JSON.stringify({
        quantity: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(() => {
      alert("Producto agregado");
    })
    .catch((err) => console.log(err));
};
