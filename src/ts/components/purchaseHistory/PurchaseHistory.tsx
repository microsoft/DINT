import * as React from 'react';
import styled from 'styled-components';
import { ProductCard } from './ProductCard';
import { connect } from 'react-redux';
import { Product } from '../../background/store/reducers';
import { Dispatch } from 'redux';
import { IAppState } from '../../background/store';

interface PurchaseHistoryProps {
    dispatch: Dispatch;
    purchaseHistory: Product[];
}

class  PurchaseHistory extends React.Component<PurchaseHistoryProps> {
    render() {
        let productCards = this.props.purchaseHistory.map(product => <ProductCard product={product} />)
    
        return (
            <PurchaseHistoryContainer>
                <HeaderText>Purchase History</HeaderText>
                {productCards}
            </PurchaseHistoryContainer>
        );
    }
}

const mapStateToProps = (state: IAppState) => {
    return {
        purchaseHistory: state.product.history,
    } ;
};

export default connect(mapStateToProps)(PurchaseHistory);
    
const HeaderText = styled('span')`
    font-size: 14px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.7);
`;

const PurchaseHistoryContainer = styled('div')`
    padding: 10px 0px;
    display: block;
`;