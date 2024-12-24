export const addDecimal = (num) => num.toFixed(2);

export const updateCart = (state) => {
  // Filtering Out The OutOfStock Items
  const cartItems = state.cartItems.filter((item) => item.countInStock > 0);

  state.cartLenght = cartItems.length;

  // Calculate items price
  state.itemsPrice = addDecimal(
    cartItems.reduce(
      (acc, currVal) => acc + currVal.price * currVal.quantity,
      0
    )
  );


  // Calculate Shipping Price
  state.shippingPrice = addDecimal(+state.itemsPrice > 5000 ? 0 : 500);

  // Calculate Tax Price
  state.taxPrice = addDecimal(0.18 * +state.itemsPrice);

  // Calculating Total Price
  state.totalPrice = addDecimal(
    +state.itemsPrice +
    +state.shippingPrice +
    +state.taxPrice
  );

  localStorage.setItem('cart', JSON.stringify(state));

  return state;

}