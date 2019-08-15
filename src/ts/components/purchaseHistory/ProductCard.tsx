import * as React from 'react';
import styled from 'styled-components';
import { green } from '../styles/themes';
import { Product } from '../../background/store/reducers';

export const ProductCard:React.FC<{
    product: Product
}> =  ({
    product
}) => {
    return (
        <React.Fragment>
            <ProductCardContainer>
                <ProductInfoContainer>
                    {false && <ProductImage src={product.imgSrc} />}
                    <ProductDetailsContainer>
                        <ProductName>{product.name}</ProductName>
                        <ProductDetail>
                            <ProductDetailLabel>From:</ProductDetailLabel>
                            <ProductSource>{product.site}</ProductSource>
                        </ProductDetail>
                        <ProductDetail>
                            <ProductDetailLabel>Price:</ProductDetailLabel>
                            <ProductPrice>${product.cost}</ProductPrice>
                        </ProductDetail>
                    </ProductDetailsContainer>
                </ProductInfoContainer>
            </ProductCardContainer>
            <hr />
        </React.Fragment>
    )
};

const ProductCardContainer = styled('div')`
    padding: 10px 0px;
    display: block;
`;

const ProductInfoContainer = styled('div')`
    display: inline-flex;
`;

const ProductDetailsContainer = styled('div')`
    margin: 10px;
    display: flex;
    flex-direction: column;
`;

const ProductDetail = styled('div')`
    display: inline-block;
    padding-top: 6px;
`;

const ProductDetailLabel = styled('span')`
    font-size: 12px;
    font-weight: bold;
    padding-right: 4px;
`;

const ProductSource = styled('span')`
    font-size: 12px;
    font-weight: 600;
    color: darkgray;
`;

const ProductPrice = styled('span')`
    font-size: 12px;
    font-weight: bold;
    color: orange;
`;

const ProductName = styled('div')`
    font-size: 12px;
    font-weight: bold;
    color: ${green};
`;

const ProductImage = styled('img')`
    width: 128px;
`;