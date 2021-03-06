import './App.scss';
import { StylesProvider, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import LoginView from "./views/LoginView/LoginView";
import OrdersView from "./views/OrdersView/OrdersView"
import ProductsView from "./views/ProductsView/ProductsView";
import CustomersView from "./views/CustomersView/CustomersView";
import AdminPanelView from "./views/AdminPanelView/AdminPanelView";
import OrderDetailsView from "./views/OrderDetailsView/OrderDetailsView";
import CustomerDetailsView from "./views/CustomerDetailsView/CustomerDetailsView";

import Navbar from "./components/Navbar/Navbar";
import TestView from "./components/TestView/TestView"
import { connect } from "react-redux";
import {
    Route,
    Switch,
    BrowserRouter as Router
} from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { NOTIFICATION_TYPE } from "./_constants";
import { notificationActions } from "./_actions";
import { Redirect } from "react-router";




function App({ token, isNotificationOpen, notificationMsg, notificationType, closeNotification}) {

    const theme = createMuiTheme({
        palette: {
            type: "light"
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <StylesProvider injectFirst>
                { !token ? <LoginView/> :
                    <>
                        <Router>
                            <Navbar/>
                            <Switch>
                                <Route exact path="/">{token ? <Redirect to="/orders"/> : <LoginView/>}</Route>
                                <Route exact path="/orders"  component={OrdersView}/>
                                <Route path="/orders/:id"  component={OrderDetailsView}/>
                                <Route exact path="/products" component={ProductsView}/>
                                {/*<Route path="/products/:id" render={NewCustomerModal}/>*/}
                                <Route exact path="/customers" component={CustomersView}/>
                                <Route path="/customers/:id" component={CustomerDetailsView}/>
                                <Route path="/admin_panel" component={AdminPanelView}/>
                                <Route path="/test" component={TestView}/>
                            </Switch>
                        </Router>
                        <Snackbar
                            open={isNotificationOpen}
                            anchorOrigin={{horizontal: "left", vertical: "bottom"}}
                            autoHideDuration={notificationType === NOTIFICATION_TYPE.SUCCESS && 6000}
                            onClose={closeNotification}
                        >
                            <Alert
                                style={{maxWidth: "20vw"}}
                                severity={notificationType === NOTIFICATION_TYPE.SUCCESS ? "success" : "error"}
                                onClose={closeNotification}
                            >
                                {notificationMsg}
                            </Alert>
                        </Snackbar>
                    </>

                }
            </StylesProvider>
        </ThemeProvider>
    );
}

function mapStateToProps(state) {
    const { token, roles, username } = state.authentication;
    const {isNotificationOpen, notificationMsg, notificationType} = state.notification;

    return {
        token, roles, username, isNotificationOpen, notificationMsg, notificationType
    }
}

const mapDispatchToProps = dispatch => ({
    closeNotification: () => dispatch(notificationActions.close())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
