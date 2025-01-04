import cartTypes from './types';

const cartActions = {
  saveCart: cart => ({
    type: cartTypes.SAVE_CART,
    payload: cart,
  }),
};

export default cartActions;
