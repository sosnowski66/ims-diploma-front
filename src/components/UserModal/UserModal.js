import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";

import DialogHeader from "../DialogHeader/DialogHeader";
import { useFormik } from "formik";
import {
    Checkbox,
    Dialog,
    DialogContent,
    Grid,
    InputAdornment,
    ListItemText,
    MenuItem,
    TextField
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/AlternateEmail";
import PhoneIcon from "@material-ui/icons/Phone";

import styles from "./UserModal.module.scss";
import DialogFooter from "../DialogFooter/DialogFooter";
import { userService } from "../../_service";
import CustomSelect from "../CustomSelect/CustomSelect";
import { roleService } from "../../_service/role.service";
import Input from "../Input/Input";



const UserModal = ({isOpen, onClose, submitFn, id, deleteFn}) => {

    const [roles, setRoles] = useState([]);

    const registerSchema = Yup.object().shape({
        username: Yup.string().required("To pole jest wymagane"),
        password: Yup.string().min(8, "Podaj przynajmniej 8 znaków").max(24, "Podaj maksymalnie 24 znaki").required("To pole jest wymagane"),
        confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Hasła muszą być identyczne").required("To pole jest wymagane")

    });

    const loginSchema = Yup.object().shape({
        username: Yup.string().required("To pole jest wymagane"),
    }).when(((value, schema) => {
        if (value.password) {
            return schema.shape({
                password: Yup.string().min(8, "Podaj przynajmniej 8 znaków").max(24, "Podaj maksymalnie 24 znaki"),
                confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Hasła muszą być identyczne").required("To pole jest wymagane")
            })
        }
    }))

    const formik = useFormik({
        onSubmit: (values, {resetForm}) => {
            submitFn(values);
            resetForm();
        },
        enableReinitialize: true,
        initialValues: {},
        validationSchema: id ? loginSchema : registerSchema,
        validateOnChange: false,
    });

    const {values, errors} = formik;

    useEffect(() => {
        roleService.getAll()
            .then(res => {
                if (res.success) {
                    setRoles(res.resource);
                }
            })
    }, [])

    useEffect( () => {
        if (id) {
            userService.getById(id)
                .then(res => {
                    if (res.success) {
                        console.log("USER, ", res)
                        formik.setValues({...res.resource})
                    }
                });
        }
    }, [id])


    const handleRoleChoose = evt => {
        const {value: selectedRolesIds} = evt.target;

        const userRoles = roles.filter(role => selectedRolesIds.includes(role.id))

        formik.setFieldValue("roles", userRoles);
    }

    const handleModalClose = () => {
        formik.resetForm({});
        onClose();
    }

    const isError = name => errors[name];

    return (
        <Dialog
            open={isOpen}
            maxWidth="md"
            onClose={handleModalClose}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <DialogHeader closeFn={handleModalClose}>
                    {id ? "Edytuj użytkownika" : "Dodaj nowego użytkownika"}
                </DialogHeader>

                <DialogContent dividers>
                    <Grid container spacing={2} >
                        <Grid item xs={4}>
                            <Input
                                name="username"
                                label="Nazwa użytkownika *"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                InputLabelProps={{
                                    shrink: formik.values.username,
                                }}
                                error={isError("username")}
                                helperText={isError("username") && errors["username"]}
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <Input
                                name="password"
                                label={id ? "Hasło" : "Hasło *"}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                error={isError("password")}
                                helperText={isError("password") && errors["password"]}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Input
                                name="confirmPassword"
                                label={id ? "Potwierdź hasło" : "Potwierdź hasło *"}
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                                error={isError("confirmPassword")}
                                helperText={isError("confirmPassword") && errors["confirmPassword"]}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Input
                                name="firstName"
                                label="Imię"
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <Input
                                name="lastName"
                                label="Nazwisko"
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <Input
                                name="shortcut"
                                label="Skrót"
                                onChange={formik.handleChange}
                                value={formik.values.shortcut}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Input
                                name="email"
                                label="Email"
                                type="email"
                                InputProps={{
                                    startAdornment:
                                        <InputAdornment position="start">
                                            <EmailIcon className={styles.icon}/>
                                        </InputAdornment>
                                }}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <Input
                                name="phone"
                                label="Telefon"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                InputProps={{
                                    startAdornment:
                                        <InputAdornment position="start">
                                            <PhoneIcon className={styles.icon} />
                                        </InputAdornment>,
                                }}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <Input
                                name="job"
                                label="Stanowisko"
                                onChange={formik.handleChange}
                                value={formik.values.job}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <CustomSelect
                                label="Uprawnienia"
                                name="roles"
                                onChange={handleRoleChoose}
                                value={formik.values?.roles?.map(r => r.id) || []}
                                multiple
                                renderValue={selected => roles
                                    .filter(role => selected.includes(role.id))
                                    .map(role => role.name)
                                    .join(", ")}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                        <Checkbox checked={
                                            (formik.values.roles ?? [])
                                                .map(role => role.id)
                                                .includes(role.id)
                                        }/>
                                        <ListItemText primary={role.name} />
                                    </MenuItem>
                                ))}
                            </CustomSelect>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogFooter
                    cancelFn={handleModalClose}
                    submitText={id ? "Zapisz" : "Dodaj"}
                    deleteFn={id && (() => deleteFn(id))}
                />
            </form>
        </Dialog>
    )


}


UserModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    submitFn: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    deleteFn: PropTypes.func,
    id: PropTypes.number,
}

export default UserModal;


