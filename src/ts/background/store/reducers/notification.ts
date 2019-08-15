import { Reducer} from 'redux';
import { NotificationActions } from '../actions';
import { Product } from './product';

export type NotificationType = 'SIMILAR' | 'UNSUSTAINABLE' | 'GOALMET' | 'GOALPROGRESS' | 'NONE'

export interface INotification {
	notificationType: NotificationType,
	productCurrent?: Product,
	productMatched?: Product
}

const initialState: INotification = {
	notificationType: 'NONE',
};

const notification: Reducer<INotification, NotificationActions> = (state = initialState, action) => {
	if (!state) return initialState;
	const { payload } = action;
	switch (action.type) {
		case 'BUY':
			return initialState;

		case 'DONTBUY':
			return initialState;

		case 'NEWNOTIF':
			//alert("new notification " + JSON.stringify(payload));
			return {
				notificationType: payload && payload.notificationType ? payload.notificationType : 'NONE',
				productCurrent: payload ? payload.productCurrent : undefined,
				productMatched: payload ? payload.productMatched : undefined,
			}
		case 'TESTNOTIF':
			return {
				notificationType: 'SIMILAR',
				productCurrent: {
					name: 'Mug',
					cost: 10,
					datePurchased: new Date(2019, 7, 22),
					imgSrc: "https://thingsremembered.scene7.com/is/image/ThingsRemembered/000617859?$184x184$"
				}	
			}
		default:
			return state;
	}
};

export default notification;