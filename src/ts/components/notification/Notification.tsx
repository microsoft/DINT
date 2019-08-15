import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { IAppState } from '../../background/store';
import { buy, newNotif } from '../../background/store/actions/notificationActions';
import { INotification } from '../../background/store/reducers/notification';
import { ProductDisplay } from '../product/ProductDisplay';
import { Display, Controls, Button, ButtonGreen, BoldDisplay } from '../styles/sharedElements';
import { countProductTowardsGoal } from '../../background/store/actions/goalActions';
import { addToPurchaseHistory } from '../../background/store/actions/productActions';
import { Equalizer } from '../../../assets/SVGIcons';
import { filterProduct } from '../../background/store/actions';
import { IFilter, Goal, Product } from '../../background/store/reducers';
import SetGoal from '../goal/SetGoal';
import GoalProgress from '../goal/GoalProgress';

interface INotificationProps {
    notification: INotification,
    filter: IFilter,
    dispatch: Dispatch,
    addToCartAction: () => void,
    goal: Goal,
}

class Notification extends React.Component<INotificationProps> {
    productCache: Product;
    constructor(props: INotificationProps) {
        super(props);

        this.buy = this.buy.bind(this);
        this.dontBuy = this.dontBuy.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
        this.addToSaveHistory = this.addToSaveHistory.bind(this);
        this.productCache = {name: "", cost: 0}
    }
    

    buy = () => {
        this.props.addToCartAction();
        this.props.dispatch(buy({}));
        if (this.props.notification.productCurrent) {
            this.props.dispatch(addToPurchaseHistory(this.props.notification.productCurrent));
        } 
        
        
    };

    closeNotification () {
        this.props.dispatch(newNotif({notificationType: 'NONE'}));
    }

    addToSaveHistory () {
        this.props.dispatch(countProductTowardsGoal(this.productCache));
    }

    dontBuy = () => {
        if (this.props.notification.productCurrent) {
            if (this.props.goal.goalAmount > this.props.goal.goalProgress + this.props.notification.productCurrent.cost) {
                this.productCache = this.props.notification.productCurrent
                this.props.dispatch(newNotif({notificationType: 'GOALPROGRESS'}))
                setTimeout(this.addToSaveHistory, 300);
                setTimeout(this.closeNotification, 4000);
            } else if(this.props.goal.goalAmount <= this.props.goal.goalProgress + this.props.notification.productCurrent.cost) {
                this.props.dispatch(newNotif({notificationType: "GOALMET"}))
                this.addToSaveHistory;
            } 
        }   
    };

    addToFilter = () => {
        if (this.props.notification.productCurrent) {
            this.props.dispatch(filterProduct(this.props.notification.productCurrent));
            this.props.dispatch(newNotif({notificationType: 'NONE'}));
        }
    };

    render() {
        return (
            <NotificationContainer> 
                {
                    (this.props.notification.notificationType === 'SIMILAR') && this.props.notification.productMatched && 
                    <div>
                         <Display>
                            You have recently purchased a similar item:
                        </Display>
                        <ProductDisplay product={this.props.notification.productMatched}/>
                    </div>          
                }
                {
                    (this.props.notification.notificationType === 'SIMILAR') && 
                    (<Controls>
                        <ButtonGreen onClick={this.dontBuy}>Save {this.props.notification.productCurrent && this.props.notification.productCurrent != null ? "$"+this.props.notification.productCurrent.cost : ""}</ButtonGreen>
                        <Button onClick={this.buy}>Spend {this.props.notification.productCurrent && this.props.notification.productCurrent != null ? "$"+this.props.notification.productCurrent.cost : ""}</Button>
                        <Button onClick={this.addToFilter} style={{padding: '10px 12px'}}>{Equalizer}</Button>
                    </Controls>)
                }
                {
                    (this.props.notification.notificationType === 'GOALMET') &&
                    (<div>
                        <BoldDisplay>Congratulations!</BoldDisplay>
                        <Display>You met your goal. Set a new goal.</Display>
                        <SetGoal/>
                    </div>)
                }
                {
                    (this.props.notification.notificationType === 'GOALPROGRESS') &&
                    <GoalProgress inNotif={true}/>
                }
                
            </NotificationContainer>
        );
    }
}

const mapStateToProps = (state: IAppState) => {
    return {
        notification: state.notification,
        filter: state.filter,
        goal: state.goal.current ? state.goal.current : {goalAmount : -1, goalProgress: 0}
    };
};

export default connect(mapStateToProps)(Notification);

const NotificationContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 100px;
    padding: 5px;
    margin: 5px;
    z-index: 20;
    background-color: ${p => p.theme.backgroundColor};
`;

