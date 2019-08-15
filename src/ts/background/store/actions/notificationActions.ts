import { Action } from 'redux';
import { NotificationType } from '../reducers/notification';
import { Product } from '../reducers/product';
//import { store } from '../..';
//import { addToPurchaseHistory } from './productActions';
//import { countProductTowardsGoal } from './goalActions';

export type NotificationActionTypes = 'NEWNOTIF' | 'BUY' | 'DONTBUY' | 'TESTNOTIF' ;
export interface NotificationPayload {
    notificationType?: NotificationType,
    productCurrent?: Product,
	productMatched?: Product
};

export type NotificationActions = Action<NotificationActionTypes, NotificationPayload>

export function newNotif(payload: NotificationPayload) {
    return ({
        type: 'NEWNOTIF',
        payload: payload
    })
}

export function buy(payload: NotificationPayload) {
    //if (payload.product) store.dispatch(addToPurchaseHistory(payload.product))
    return ({
        type: 'BUY',
        payload: payload
    })
}

export function dontBuy(payload: NotificationPayload) {
    //if (payload.product) store.dispatch(countProductTowardsGoal(payload.product))
    return ({
        type: 'DONTBUY',
        payload: payload
    })
}

export function testNotif(){
    return ({
        type: 'TESTNOTIF'
    })
}
