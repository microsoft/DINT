import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { IAppState } from '../../background/store';
import { IGoal } from '../../background/store/reducers/Goal';
import { BoldDisplay, Display, Controls, Button, ButtonGreen } from '../styles/sharedElements';
import { newGoal } from '../../background/store/actions/goalActions';
import { changeView } from '../../background/store/actions/viewsActions';
import { newNotif } from '../../background/store/actions';

interface IGoalProps {
    goal: IGoal,
    dispatch: Dispatch;
}

interface SetGoalState {
    goalValue: number,
    goalDescription: string,
}
class SetGoal extends React.Component<IGoalProps, SetGoalState> {
    constructor (props: IGoalProps) {
        super(props);

        this.state = {
            goalValue: 0,
            goalDescription: "",
        }

        this.onSetClick = this.onSetClick.bind(this);
        this.onGoalInput = this.onGoalInput.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onGoalDescriptionInput = this.onGoalDescriptionInput.bind(this);
    }

    onSetClick() {
        let value = this.state.goalValue;
        if (value <= 0) { alert("Please set a goal greater than $0"); return; }
        if (this.state.goalDescription === "") {
            this.props.dispatch(newGoal({goalAmount: value, goalProgress: 0 }));
        } else {
            this.props.dispatch(newGoal({goalAmount: value, goalProgress: 0, description: this.state.goalDescription}));
        }
        this.props.dispatch(changeView("GOALPROGRESS"));
        this.props.dispatch(newNotif({notificationType: 'NONE'}))
    }

    onGoalInput (e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            goalValue: e.currentTarget.valueAsNumber,
        })
    }

    onGoalDescriptionInput (e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            goalDescription: e.currentTarget.value,
        })
    }

    onCancelClick () {
        this.setState({
            goalValue: 0,
            goalDescription: ""
        })
    }

    render() {
        return (
            <GoalContainer>
                <BoldDisplay>New Goal</BoldDisplay>
                <Display>Create a new goal to begin building your savings</Display>
                <Display style={{textAlign: 'center'}}>$ <input type="number" id="goalInput" onChange={this.onGoalInput} value={this.state.goalValue} style={{width: 50}}></input></Display>
                <Display style={{textAlign: 'center'}}>Goal description: 
                </Display>
                <textarea id="goalDescription" onChange={this.onGoalDescriptionInput} value={this.state.goalDescription} style={{height: '3em', width: 275, fontFamily: 'inherit'}}/>
                <Controls>
                    <ButtonGreen onClick={this.onSetClick}>Set</ButtonGreen>
                    <Button onClick={this.onCancelClick}>Cancel</Button>
                </Controls>
            </GoalContainer>
        );
    }
}

const mapStateToProps = (state: IAppState) => {
    return {
        goal: state.goal,
    } ;
};

export default connect(mapStateToProps)(SetGoal);

const GoalContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    min-width: 100px;
    padding: 5px;
    background-color: ${p => p.theme.backgroundColor};
`;

