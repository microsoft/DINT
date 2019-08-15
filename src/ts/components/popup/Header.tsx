import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { IAppState } from '../../background/store';
import { ThemeTypes } from '../styles/themes';
import { Trophy, Settings, Equalizer } from '../../../assets/SVGIcons';
import { changeView } from '../../background/store/actions/viewsActions';

interface IHeader {
	theme: ThemeTypes;
	dispatch: Dispatch;
}

class Header extends React.Component<IHeader> {
	constructor(props: IHeader) {
		super(props);

		this.onGoalClick = this.onGoalClick.bind(this);
		this.onSettingsClick = this.onSettingsClick.bind(this);
		this.onFiltersClick = this.onFiltersClick.bind(this);
	}

	onGoalClick () {
		this.props.dispatch(changeView("GOALPROGRESS"));
	}

	onSettingsClick () {
		this.props.dispatch(changeView("SETTINGS"));
	}

	onFiltersClick () {
		this.props.dispatch(changeView("PRODUCTFILTERS"));
	}

	render() {
		return (
			<HeaderContainer>
				<Display>DINT</Display>
				<Buttons>
					<HeaderButton onClick={this.onGoalClick}>{Trophy}</HeaderButton>
					<HeaderButton onClick={this.onFiltersClick}>{Equalizer}</HeaderButton>
					<HeaderButton onClick={this.onSettingsClick}>{Settings}</HeaderButton>
				</Buttons>
			</HeaderContainer>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		theme: state.settings.theme
	};
};

export default connect(mapStateToProps)(Header);

const HeaderContainer = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    justify-items: space-between;
    align-items: start;  
	min-height: 40px;
	max-height: 40px;
    width: 300px;
    margin-bottom: 5px;
	background-color: ${p => p.theme.backgroundColor};
	border-bottom: solid rgb(200, 200, 200) 1px;
`;

const HeaderButton = styled('div')`
	margin: 0px 5px;
`;

const Buttons = styled('div')`
	display: flex;
	flex-direction: row;
`;

const Display = styled('div')`
    font-size: 16px;
    justify-self: left;
`;
