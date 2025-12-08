import { atom } from "recoil";


export const productDataState1=atom({
    key:"productlist1",
    default:[]
})


export const orderInCartState=atom({
    key:"cartproduct",
    default:[]
})

export const totalAmountState = atom({
  key: 'totalamountsate',
  default: 0,
});

export const currentProduct = atom({
  key: 'currentproduct',
  default: 0,
});

export const orderSuccessModal = atom({
  key: 'ordersuccessmodel',
  default: false,
});
