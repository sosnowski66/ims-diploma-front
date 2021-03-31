import { Grid, withStyles, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { TextInput } from "../../components";
import { connect } from "react-redux";
import {usersActions} from "../../_actions";


const styles = {
    form: {
        marginTop: "20px"
    },
    formField: {
        minWidth: "250px",
        marginBottom: "15px"
    },
    formContainer: {
        marginTop: "100px"
    }
};

const LoginView = ({ classes, dispatch }) => {

    const { control, handleSubmit, error } = useForm();

    const onSubmit = data => {
        console.log(data)
        const { username, password } = data;
        if (username && password) {
            dispatch(usersActions.login(username, password));
        }

    }

    return (
        <>
            <div className={ classes.formContainer }>
                <h2>Logowanie</h2>

                <form onSubmit={ handleSubmit(onSubmit) }>
                    <Grid
                        className={ classes.form }
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={ { minHeight: "30vh" } }
                    >
                        <TextInput
                            name="username"
                            control={ control }
                            label="Nazwa użytkownika"
                            classes={ classes.formField }
                        />
                        <TextInput
                            name="password"
                            control={ control }
                            label="Hasło"
                            classes={ classes.formField }
                        />

                        <Button
                            type={ "submit" }
                            variant="contained"
                            color="primary">
                            Zaloguj
                        </Button>
                    </Grid>
                </form>
            </div>
        </>
    )

};

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(withStyles(styles)(LoginView));