import { Reducer} from 'redux';
import { ProductActions } from '../actions/productActions';

export interface Product {
	name: string,
	cost: number,
	category?: string[],
	site?: string,
	sustInfo?: string,
	description?: string,
	imgSrc?: string,
	datePurchased?: Date,
}

export interface RProduct {
	current: Product | null,
	history: Product[]
}

const initialState: RProduct = {
	current: null,
	history: [],
};

const product: Reducer<RProduct, ProductActions> = (state = initialState, action) => {
	const { payload } = action;
	switch (action.type) {
		case 'ADDTOHISTORY':
			return { ...state, 
				history: payload ? state.history.slice().concat(payload) : state.history.slice() };

		case 'NEWPRODUCT':
			return { ...state, 
				current: payload ? payload : null};
		default:
			return state;
	}
};

export default product;