import * as React from 'react';
import styled from 'styled-components';
import { Product } from '../../background/store/reducers/Product';

interface ProductDisplayProps {
    product: Product
}
export class ProductDisplay extends React.Component<ProductDisplayProps> {
    render() {
        return (
            <ProductContainer>
                <img src={this.props.product.imgSrc} width="60px" height="60px"/>
                <ProductInfo>
                    <ProductName>{this.props.product.name}</ProductName>
                    <ProductCost>${this.props.product.cost}</ProductCost>
                    <PurchaseDate>{this.props.product.datePurchased ? "Purchased on 7/22/2019" : ""}</PurchaseDate>
                </ProductInfo>
            </ProductContainer>
        );
    }
}

const ProductContainer = styled('div')`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    min-width: 100px;
    padding: 5px;
    margin: 5px;
    background-color: ${p => p.theme.backgroundColor};
`;

const ProductInfo = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    margin: 5px;
    max-width: 200px;
`;

const ProductName = styled('div')`
    font-size: 16px;
    justify-self: left;
`;

const ProductCost = styled('div')`
    font-size: 14px;
    justify-self: left;
`;

const PurchaseDate = styled('div')`
    font-size: 14px;
    justify-self: left;
    color: '#605E5C';
`;
