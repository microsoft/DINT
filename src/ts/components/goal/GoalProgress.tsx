import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import { IAppState } from '../../background/store';
import { Goal } from '../../background/store/reducers/Goal';
import { countProductTowardsGoal } from '../../background/store/actions/goalActions';
import { BoldDisplay, Display, Button } from '../styles/sharedElements';
import { devMode } from '../../background/AppConfig';
import { changeView } from '../../background/store/actions/viewsActions';
import { green } from '../styles/themes';
import '../../../assets/circular-progress-bar-styles.css';
import { EnvDescs } from './mock/MockEnvDescs';
import { Raindrop, Cloud } from '../../../assets/SVGIcons';

interface IGoalProps {
    goal: Goal,
    dispatch: Dispatch,
    inNotif?: boolean
}

class GoalProgress extends React.Component<IGoalProps> {
    constructor(props: IGoalProps) {
        super(props);

        this.devSave = this.devSave.bind(this);
        this.progressCircle = this.progressCircle.bind(this);
    }

    devSave () {
        console.log('hi');
        if(this.props.goal.goalAmount <= this.props.goal.goalProgress + 10) {
            this.props.dispatch(countProductTowardsGoal({name: 'mug', cost: 10,}))
            this.props.dispatch(changeView("SETGOAL"));
        } else {
            this.props.dispatch(countProductTowardsGoal({name: 'mug', cost: 10,}))
        }
        
    }

    progressCircle () {
        const progressPercent = (this.props.goal.goalProgress / this.props.goal.goalAmount) * 100;
        return (<CircularProgressbar
            value={progressPercent}
            text={`$${this.props.goal.goalProgress}`}
            styles={{
                path: {
                    stroke: green,
                },
                text: {
                    fill: green,
                },
                background: {
                    fill: green,
                }
            }}
        />);
    }


    render() {
        const envCards = EnvDescs.map(envDesc => (
            <CardContainer>
                <IconOutline>
                    <IconContainer>
                        {envDesc.impactType === 'H2O' ? Raindrop : Cloud}
                    </IconContainer>
                </IconOutline>
                <EnvDescription>
                    <EnvType>{envDesc.impactType} level</EnvType>
                    <EnvAmount>{envDesc.amount}</EnvAmount>
                    {envDesc.description}
                </EnvDescription>
            </CardContainer>
        ));
        return (
            <GoalContainer>
                <CatContainer className={this.props.inNotif ? "inNotif" : ""}>
                    <BoldDisplay>
                        My savings
                    </BoldDisplay>
                    <ProgressBarContainer>
                       { this.progressCircle() }
                    </ProgressBarContainer>
                    <Display>
                        Current goal: { (this.props.goal.description != undefined) ? this.props.goal.description : "Untitled"}
                    </Display>
                    <Display>
                        Goal amount: ${ this.props.goal.goalAmount }
                    </Display>
                    
                {
                    devMode && <Button onClick={this.devSave}>Reset Goal</Button>
                }
                </CatContainer>
               { (!this.props.inNotif) &&
                <CatContainer>
                    <BoldDisplay>
                        My Environmental Impact
                    </BoldDisplay>
                    {envCards}
               </CatContainer>
               }
            </GoalContainer>
        );
    }
}

const mapStateToProps = (state: IAppState) => {
    return {
        goal: state.goal.current ? state.goal.current : {goalAmount: -1, goalProgress: 0},
    };
};

export default connect(mapStateToProps)(GoalProgress);

const ProgressBarContainer = styled('div')`
    display: flex;
    padding: 50px;
`;

const GoalContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    min-width: 100px;
    background-color: ${p => p.theme.backgroundColor};
`;

const CatContainer = styled('div')`
    margin: 10px;
`;

const CardContainer = styled('div')`
    display: flex;
    padding: 10px 0px;
`;

const IconOutline = styled('div')`
    background: ${green};
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const IconContainer = styled('div')`
    padding: 0px 10px;
`;

const EnvType = styled('span')`
    padding-bottom: 3px;
    font-weight: bold;
    color: black;
`;

const EnvAmount = styled('span')`
    font-size: 14px;
    color: black;
`;

const EnvDescription = styled('div')`
    display: flex;
    padding: 0px 10px;
    flex-direction: column;
    font-size: 11px;
    color: gray;
`;
