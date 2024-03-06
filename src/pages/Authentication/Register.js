import React, {useEffect} from "react";
import {Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback, Button} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import {useFormik} from "formik";

import FieldComp from './FieldComp';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// action
import {registerUser, apiError, resetRegisterFlag} from "../../store/actions";

//redux
import {useSelector, useDispatch} from "react-redux";

import {Link, useNavigate} from "react-router-dom";

//import images 
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../Template/AuthenticationInner/ParticlesAuth";
import withRouter from "../../Components/Common/withRouter";

const generateRandomValues = () => {
    const firstNames = ["John", "Jane", "Michael", "Sarah", "David", "Emily", "Chris", "Emma"];
    const lastNames = ["Smith", "Johnson", "Brown", "Jones", "Taylor", "Williams", "Miller", "Davis"];

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomEmail = `${randomFirstName}.${randomLastName}${Math.floor(Math.random() * 100)}@example.com`;
    const randomPhoneNumber = `555${Math.floor(1000000 + Math.random() * 9000000)}`;

    const propertyTypes = ['House', 'Apartment', 'Condo'];
    const roles = ['Buyer', 'Seller'];
    const pw = Math.random().toString(36).substring(2, 11);

    return {
        email: randomEmail,
        first_name: randomFirstName,
        last_name: randomLastName,
        age: Math.floor(Math.random() * 100) + 1,
        current_address: Math.random().toString(36).substring(2, 11),
        phone_number: randomPhoneNumber,
        property_type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
        budget: Math.floor(Math.random() * 1000000) + 1000,
        role: roles[Math.floor(Math.random() * roles.length)],
        password: pw,
        confirm_password: pw,
    };
};

// const randomValues = generateRandomValues();
const isDevelopment = process.env.NODE_ENV === 'development';
const randomValues = isDevelopment ? generateRandomValues() : {};
const Register = () => {
    const history = useNavigate();
    const dispatch = useDispatch();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: isDevelopment ? randomValues.email : '',
            first_name: isDevelopment ? randomValues.first_name : '',
            last_name: isDevelopment ? randomValues.last_name : '',
            age: isDevelopment ? randomValues.age : '',
            current_address: isDevelopment ? randomValues.current_address : '',
            phone_number: isDevelopment ? randomValues.phone_number : '',
            property_type: isDevelopment ? randomValues.property_type : '',
            budget: isDevelopment ? randomValues.budget : '',
            role: isDevelopment ? randomValues.role : '',
            password: isDevelopment ? randomValues.password : '',
            confirm_password: isDevelopment ? randomValues.confirm_password : '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Please Enter Your Email"),
            first_name: Yup.string().required("Please Enter Your First Name"),
            last_name: Yup.string().required("Please Enter Your Last Name"),
            age: Yup.number().required("Please Enter Your Age").positive().integer(),
            current_address: Yup.string().required("Please Enter Your Address"),
            phone_number: Yup.string().required("Please Enter Your Phone Number").min(10, 'Phone number must be 10 digits').max(10, 'Phone number must be 10 digits'),
            property_type: Yup.string().required("Please Select a Property Type"),
            budget: Yup.number().required("Please Enter Your Budget").positive(),
            role: Yup.string().required("Please Select a Role"),
            password: Yup.string().required("Please Enter Your Password"),
            confirm_password: Yup.string()
                .required("Please Confirm Your Password")
                .test({
                    name: "passwords-match",
                    message: "Confirm Password Isn't Match",
                    test: function (value) {
                        return value === this.resolve(Yup.ref("password"));
                    },
                }),
        }),
        onSubmit: (values) => {
            dispatch(registerUser(values));
        }
    });

    const {error, registrationError, success} = useSelector(state => ({
        registrationError: state.Registration.registrationError,
        success: state.Registration.success,
        error: state.Registration.error
    }));


    useEffect(() => {
        dispatch(apiError(""));
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            setTimeout(() => history("/dashboard"), 3000);
        }

        setTimeout(() => {
            dispatch(resetRegisterFlag());
        }, 30000);

    }, [dispatch, success, error, history]);
    document.title = "SignUp | " + process.env.REACT_APP_APPNAME_TITLE;

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={logoLight} alt="" height="20"/>
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">

                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Create New Account</h5>
                                            <p className="text-muted">Get your free velzon account now</p>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                className="needs-validation" action="#">

                                                {success && success ? (
                                                    <>
                                                        {toast("Register User Successfully.  Signing In...", {
                                                            position: "top-right",
                                                            hideProgressBar: false,
                                                            className: 'bg-success text-white',
                                                            progress: undefined,
                                                            toastId: ""
                                                        })}
                                                        <ToastContainer autoClose={2000} limit={1}/>
                                                        <Alert color="success">
                                                            Register User Successfully.
                                                            Signing In
                                                        </Alert>
                                                    </>
                                                ) : null}

                                                {error && error ? (
                                                    <Alert color="danger">
                                                        <div>
                                                            {/* {registrationError} */}
                                                            Email has been Register Before, Please Use Another Email
                                                            Address...
                                                        </div>
                                                    </Alert>
                                                ) : null}

                                                <FieldComp
                                                    validation={validation}
                                                    inputProps={{
                                                        name: 'email',
                                                        type: 'email',
                                                        placeholder: 'Enter email address',
                                                    }}
                                                    label="Email"
                                                />

                                                <FieldComp
                                                    validation={validation}
                                                    inputProps={{
                                                        name: 'first_name',
                                                        type: 'text',
                                                        placeholder: 'Enter username',
                                                    }}
                                                    label="Username"
                                                />

                                                <FieldComp
                                                    validation={validation}
                                                    inputProps={{
                                                        name: 'last_name',
                                                        type: 'text',
                                                        placeholder: 'Enter Last Name',
                                                    }}
                                                    label="Last Name"
                                                />

                                                <FieldComp
                                                    validation={validation}
                                                    inputProps={{
                                                        name: 'age',
                                                        type: 'number',
                                                        placeholder: 'Enter Age',
                                                    }}
                                                    label="Age"
                                                />


                                                <FieldComp
                                                    validation={validation}
                                                    inputProps={{
                                                        name: 'current_address',
                                                        type: 'text',
                                                        placeholder: 'Enter Current Address',
                                                    }}
                                                    label="Current Address"
                                                />

                                                <FieldComp
                                                    validation={validation}
                                                    inputProps={{
                                                        name: 'phone_number',
                                                        type: 'text',
                                                        placeholder: 'Enter Phone Number',
                                                    }}
                                                    label="Phone Number"
                                                />

                                                <FieldComp
                                                    validation={validation}
                                                    inputProps={{
                                                        name: 'property_type',
                                                        type: 'select',
                                                    }}
                                                    label="Property Type"
                                                    options={
                                                        <>
                                                            <option value="">--Select Property Type--</option>
                                                            <option value="House">House</option>
                                                            <option value="Apartment">Apartment</option>
                                                            <option value="Condo">Condo</option>
                                                        </>
                                                    }
                                                />
                                                <FieldComp
                                                    validation={validation}
                                                    inputProps={{
                                                        name: 'budget',
                                                        type: 'number',
                                                        placeholder: 'Enter Budget',
                                                    }}
                                                    label="Budget"
                                                />

                                                <FieldComp
                                                    validation={validation}
                                                    inputProps={{
                                                        name: 'role',
                                                        type: 'select',
                                                    }}
                                                    label="Role"
                                                    options={
                                                        <>
                                                            <option value="">--Select Role--</option>
                                                            <option value="Buyer">Buyer</option>
                                                            <option value="Seller">Seller</option>
                                                        </>
                                                    }
                                                />

                                                <FieldComp
                                                    validation={validation}
                                                    inputProps={{
                                                        name: 'password',
                                                        type: 'password',
                                                        placeholder: 'Enter Password',
                                                    }}
                                                    label="Password"
                                                />

                                                <FieldComp
                                                    validation={validation}
                                                    inputProps={{
                                                        name: "confirm_password",
                                                        type: "password",
                                                        placeholder: "Confirm Password"
                                                    }}
                                                    label="Confirm Password"
                                                />

                                                <div className="mb-4">
                                                    <p className="mb-0 fs-12 text-muted fst-italic">By registering you
                                                        agree to the EstateFlow
                                                        <Link to="#"
                                                              className="text-primary text-decoration-underline fst-normal fw-medium">Terms
                                                            of Use</Link></p>
                                                </div>

                                                <div className="mt-4">
                                                    <button className="btn btn-success w-100" type="submit">Sign Up
                                                    </button>
                                                </div>

                                                {/*<div className="mt-4 text-center">*/}
                                                {/*    <div className="signin-other-title">*/}
                                                {/*        <h5 className="fs-13 mb-4 title text-muted">Create account*/}
                                                {/*            with</h5>*/}
                                                {/*    </div>*/}

                                                {/*    <div>*/}
                                                {/*        <button type="button"*/}
                                                {/*                className="btn btn-primary btn-icon waves-effect waves-light">*/}
                                                {/*            <i className="ri-facebook-fill fs-16"></i></button>*/}
                                                {/*        {" "}*/}
                                                {/*        <button type="button"*/}
                                                {/*                className="btn btn-danger btn-icon waves-effect waves-light">*/}
                                                {/*            <i className="ri-google-fill fs-16"></i></button>*/}
                                                {/*        {" "}*/}
                                                {/*        <button type="button"*/}
                                                {/*                className="btn btn-dark btn-icon waves-effect waves-light">*/}
                                                {/*            <i className="ri-github-fill fs-16"></i></button>*/}
                                                {/*        {" "}*/}
                                                {/*        <button type="button"*/}
                                                {/*                className="btn btn-info btn-icon waves-effect waves-light">*/}
                                                {/*            <i className="ri-twitter-fill fs-16"></i></button>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-4 text-center">
                                    <p className="mb-0">Already have an account ? <Link to="/login"
                                                                                        className="fw-semibold text-primary text-decoration-underline"> Signin </Link>
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Register);
