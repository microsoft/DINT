import { Reducer } from 'redux';
import { FilterAction } from '../actions/filterActions';
import { Product } from './product';

export interface IFilter {
    filtered: Product[],
}

const initialState: IFilter = {
    filtered: [],
};

const withRemoved = (products: Product[], unique: Product) =>
    products.filter(product => product.name !== unique.name);

const filter: Reducer<IFilter, FilterAction> = (state = initialState, action) => {
    const { payload } = action;

    if (!payload)
        return state;

    switch (action.type) {
        case 'FILTER_PRODUCT':
            return {
                ...state,
                filtered: [...withRemoved(state.filtered, payload.product), payload.product],
            };
        case 'UNFILTER_PRODUCT':
            return {
                ...state,
                filtered: withRemoved(state.filtered, payload.product),
            }
        default:
            return state;
    }
};

export default filter;
