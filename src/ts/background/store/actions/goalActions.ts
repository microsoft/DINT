import { Action } from 'redux';
import { Goal } from '../reducers/goal';
import { Product } from '../reducers/product';

export type GoalActionTypes = 'NEWGOAL' | 'ADDTOHISTORY' | 'INCREMENTGOAL' | 'TESTGOAL';
export interface GoalPayload {
    goal?: Goal,
    product?: Product
}

export type GoalActions = Action<GoalActionTypes, GoalPayload>


export function newGoal(goal: Goal) {
    return ({
        type: 'NEWGOAL',
        payload: {
            goal
        }
    })
}

export function addToGoalHistory(goal: Goal) {
    return ({
        type: 'ADDTOHISTORY',
        payload: {
            goal
        }
    })
}

export function countProductTowardsGoal(product: Product) {
    //alert('count proudct action' + JSON.stringify(product));
    return ({
        type: 'INCREMENTGOAL',
        payload: {
            product
        }
    })
}

export function testGoal() {
    return ({
        type: 'TESTGOAL',
        payload: {}
    })
}

