import { Reducer} from 'redux';
import { GoalActions } from '../actions/goalActions';

export interface Goal {
	goalAmount: number,
	goalProgress: number,
	name?: string,
	date?: Date,
	description?: string
}

export interface IGoal {
	current?: Goal,
	history: Goal[]
}

const initialState: IGoal = {
	current: {goalAmount: 42, goalProgress: 32},
	history: [],
};

const goal: Reducer<IGoal, GoalActions> = (state = initialState, action) => {
	const { payload } = action;
	//alert('goal reduce '+ action.type + JSON.stringify(payload) + JSON.stringify(state));
	if (!state) return initialState;
	if (!payload) return state;
	switch (action.type) {
		case 'TESTGOAL':
			return {
				current: {
					goalAmount: 100,
					goalProgress: 17,
					name: "Save $100 for my next vacation",
				},
				history: []
			}
		case 'NEWGOAL':
			return { ...state, 
				current:  payload.goal};
		case 'ADDTOHISTORY':
			return { ...state,
				current: state.current,
				history: payload.goal ? state.history.slice().concat(payload.goal) : state.history.slice() };
		case 'INCREMENTGOAL':
				return {
					...state, 
					current: {
						...state.current,
						goalAmount: state.current ? state.current.goalAmount : 0,
						goalProgress: payload.product && state.current ? 
							Math.round((state.current.goalProgress + payload.product.cost) * 100)/100 : NaN,
					}
				}
		default:
			return state;
	}
};

export default goal;