import { Action } from 'redux';
import { Product } from '../reducers/product';

export type ProductActionTypes = 'NEWPRODUCT' | 'ADDTOHISTORY' | 'INCREMENTGOAL';
export type ProductPayload = Product | null;

export type ProductActions = Action<ProductActionTypes, ProductPayload>


export function newProduct(payload: Product) {
    return ({
        type: 'NEWPRODUCT',
        payload: payload as ProductPayload
    })
}

export function addToPurchaseHistory(payload: Product) {
    return ({
        type: 'ADDTOHISTORY',
        payload: payload as ProductPayload
    })
}