import { Action } from 'redux';
import { popUpViewType } from '../reducers/views';

export type ViewsActionTypes = 'CHANGEVIEW';

export type ViewActions = Action<ViewsActionTypes, popUpViewType>

export function changeView(view: popUpViewType) {
    return ({
        type: 'CHANGEVIEW',
        payload: view
    })
}