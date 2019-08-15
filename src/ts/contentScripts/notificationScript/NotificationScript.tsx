import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled, { ThemeProvider } from 'styled-components';
import { IAppState } from '../../background/store';
import Notification from '../../components/notification/Notification';
import { themes, ThemeTypes } from '../../components/styles/themes';
import { INotification } from '../../background/store/reducers/notification';
import { newNotif} from '../../background/store/actions/notificationActions';
import { Extractor } from '../extraction/Extractor';
import { Product, Goal } from '../../background/store/reducers';
import { SimilarityChecker } from '../similarity/SimilarityChecker';


interface INotificationScript {
    theme: ThemeTypes,
    dispatch: Dispatch;
    notification: INotification;
    goal: Goal;
}

class NotificationScript extends React.Component<INotificationScript> {
    private extractor: Extractor;
    private similarityChecker: SimilarityChecker;

    constructor (props: INotificationScript) {
        super(props);
        this.extractor = new Extractor();
        this.addToCartCallback = this.addToCartCallback.bind(this);
        this.similarityChecker = new SimilarityChecker();
        this.extractorCartAction = this.extractorCartAction.bind(this);
    }

    componentWillMount (){
        this.extractor.setAddToCartCallback(this.addToCartCallback)      
    }

    addToCartCallback () {
        let extractorProduct = this.extractor.getProduct();
        //alert('add to cart callback');
        if (extractorProduct === null || extractorProduct === undefined) {
            //alert('not defined');
            debugger;
            return;
        } else {
            debugger;
            let name = extractorProduct.getName();
            let site = extractorProduct.getSite();
            let description = extractorProduct.getDescription();
            let imageSrc = extractorProduct.getImage();
            let product: Product = {
                name: name ? name : "",
                site: site ? site: "",
                category: extractorProduct.getCategory() || undefined,
                cost: extractorProduct.getPrice() as number,
                description: description ? description : "",
                imgSrc: imageSrc ? imageSrc : "",
            }

            debugger;
            if(this.similarityChecker.isSimilar(product) != undefined) {
                //alert('Similar product ' + JSON.stringify(product));
                debugger;
                var matchedProd: Product | undefined = this.similarityChecker.isSimilar(product);
                this.props.dispatch(newNotif({notificationType: 'SIMILAR', productCurrent: product, productMatched: matchedProd}))
            }
            else {
                alert("not doing similarity check");
            }
        }    
    }

    extractorCartAction () {
        this.extractor.addToCartAction();
    }

    render() {
        return (
            <ThemeProvider theme={themes[this.props.theme]}>
                <React.Fragment>
                    <Container >
                        {this.props.notification.notificationType != 'NONE' && 
                        <Notification addToCartAction={this.extractorCartAction}/> }
                    </Container>
                </React.Fragment>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state: IAppState) => {
    return {
        theme: state.settings.theme,
        notification: state.notification,
        goal: state.goal.current ? state.goal.current : {goalAmount : -1, goalProgress: 0}
    };
};

export default connect(mapStateToProps)(NotificationScript);

const Container = styled('div')`
    position: fixed;
    z-index: 50;
    bottom: 10px;
    right: 10px;
    background-color: ${p => p.theme.backgroundColor};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
