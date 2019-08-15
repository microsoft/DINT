import { Action } from 'redux';
import { Product } from '../reducers/product';

export type FilterActionTypes = 'FILTER_PRODUCT' | 'UNFILTER_PRODUCT';

export interface FilterPayload {
    product: Product,
}

export type FilterAction = Action<FilterActionTypes, FilterPayload>;

export const filterProduct = (product: Product) => ({
    type: 'FILTER_PRODUCT',
    payload: {
        product,
    },
});

export const unfilterProduct = (product: Product) => ({
    type: 'UNFILTER_PRODUCT',
    payload: {
        product,
    },
});
