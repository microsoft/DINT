import * as React from 'react';
import styled from 'styled-components';
import { ProductCard } from './ProductCard';
import { useSelector } from 'react-redux';
import { IAppState } from '../../background/store';

export const FilterView: React.FC<{}> = ({}) => {
    const filter = useSelector((state: IAppState) => state.filter);

    const productCards = React.useMemo(
        () => filter.filtered.map(product => <ProductCard product={product} />),
        [filter]
    );

    return (
        <FilterViewContainer>
            <HeaderText>My recurring purchases</HeaderText>
            {productCards}
        </FilterViewContainer>
    );
};

const HeaderText = styled('span')`
    font-size: 16px;
    font-weight: bold;
`;

const FilterViewContainer = styled('div')`
    padding: 10px 0px;
    display: block;
`;