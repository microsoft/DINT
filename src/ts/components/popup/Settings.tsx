import * as React from 'react';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { BoldDisplay } from '../styles/sharedElements';
import { connect } from 'react-redux';
import PurchaseHistory from '../purchaseHistory/PurchaseHistory';


interface ISettingsProps {
    dispatch: Dispatch;
}

class GoalProgress extends React.Component<ISettingsProps> {
    constructor(props: ISettingsProps) {
        super(props);

    }


    render() {
        return (
            <GoalContainer>
                <BoldDisplay>Settings </BoldDisplay>
                <PurchaseHistory />
            </GoalContainer>
        );
    }
}

const mapStateToProps = () => {
    return {
       
    } ;
};

export default connect(mapStateToProps)(GoalProgress);


const GoalContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    min-width: 100px;
    padding: 5px;
    margin: 5px;
    background-color: ${p => p.theme.backgroundColor};
`;
