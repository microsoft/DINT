import { Reducer} from 'redux';
import { ViewActions } from '../actions/viewsActions';

export type popUpViewType = "SETGOAL" | "GOALPROGRESS" | "PRODUCTFILTERS" | "SETTINGS";

export interface IViews {
	popUpView: popUpViewType,
}

const initialState: IViews = {
	popUpView: "SETGOAL"
};

const popUpView: Reducer<IViews, ViewActions> = (state = initialState, action) => {
	const { payload } = action;
	switch (action.type) {
		case 'CHANGEVIEW':
			return { ...state, popUpView: payload ? payload : 'GOALPROGRESS'} ;
		default:
			return state;
	}
};

export default popUpView;