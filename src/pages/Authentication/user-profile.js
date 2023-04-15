import React, {useState, useEffect} from "react";
import {isEmpty} from "lodash";

import {
    Container,
    Row,
    Col,
    Card,
    Alert,
    CardBody,
    Button,
    Label,
    Input,
    FormFeedback,
    Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import {useFormik} from "formik";

//redux
import {useSelector, useDispatch} from "react-redux";

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import {editProfile, resetProfileFlag} from "../../store/actions";

const UserProfile = () => {
    const dispatch = useDispatch();

    const [email, setemail] = useState("admin@gmail.com");
    const [idx, setidx] = useState("1");
    const [userRole, setUserRole] = useState("buyer");
    const [userName, setUserName] = useState("Admin");

    const {user, success, error} = useSelector(state => ({
        user: state.Profile.user,
        success: state.Profile.success,
        error: state.Profile.error
    }));

    useEffect(() => {
        if (sessionStorage.getItem("authUser")) {
            const obj = JSON.parse(sessionStorage.getItem("authUser"));

            if (!isEmpty(user)) {
                console.log(obj)
                obj.data = user;
                sessionStorage.removeItem("authUser");
                sessionStorage.setItem("authUser", JSON.stringify(obj));
            }

            setUserName(obj.data.first_name);
            setemail(obj.data.email);
            setidx(obj.data._id || "1");

            setTimeout(() => {
                dispatch(resetProfileFlag());
            }, 3000);
        }
    }, [dispatch, user]);


    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            current_address: user.current_address,
            phone_number: user.phone_number,
            property_type: user.property_type,
            budget: user.budget,
            idx: idx || '',
               role: user.role || 'buyer',
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required("Please Enter Your First Name"),
            last_name: Yup.string().required("Please Enter Your Last Name"),
            age: Yup.number().required("Please Enter Your Age").min(18, "Age must be at least 18"),
            current_address: Yup.string().required("Please Enter Your Current Address"),
            phone_number: Yup.string().required("Please Enter Your Phone Number"),
            property_type: Yup.string().required("Please Select a Property Type"),
            budget: Yup.number().required("Please Enter Your Budget"),
            role: Yup.string().required("Please select a role")
        }),
        onSubmit: (values) => {
            dispatch(editProfile(values));
        }
    });

    document.title = "Profile | EstateFlow";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg="12">
                            {error && error ? <Alert color="danger">{error}</Alert> : null}
                            {success ? <Alert color="success">Username Updated To {userName}</Alert> : null}

                            <Card>
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="mx-3">
                                            <img
                                                src={avatar}
                                                alt=""
                                                className="avatar-md rounded-circle img-thumbnail"
                                            />
                                        </div>
                                        <div className="flex-grow-1 align-self-center">
                                            <div className="text-muted">
                                                <h5>{userName || "Admin"}</h5>
                                                <p className="mb-1">Email Id : {email}</p>
                                                <p className="mb-0">Id No : #{idx}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <h4 className="card-title mb-4">Change User Name</h4>

                    <Card>
                        <CardBody>
                            <Form
                                className="form-horizontal"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    validation.handleSubmit();
                                    return false;
                                }}
                            >
                                <div className="form-group  mb-3">
                                    <Label className="form-label">User Name</Label>
                                    <Input
                                        name="first_name"
                                        // value={name}
                                        className="form-control"
                                        placeholder="Enter User Name"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.first_name || ""}
                                        invalid={
                                            validation.touched.first_name && validation.errors.first_name ? true : false
                                        }
                                    />
                                    {validation.touched.first_name && validation.errors.first_name ? (
                                        <FormFeedback type="invalid">{validation.errors.first_name}</FormFeedback>
                                    ) : null}
                                </div>
                                {/* Last Name */}
                                <div className="form-group  mb-3">
                                    <Label className="form-label">Last Name</Label>
                                    <Input
                                        name="last_name"
                                        className="form-control"
                                        placeholder="Enter Last Name"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.last_name || ""}
                                        invalid={
                                            validation.touched.last_name && validation.errors.last_name ? true : false
                                        }
                                    />
                                    {validation.touched.last_name && validation.errors.last_name ? (
                                        <FormFeedback type="invalid">{validation.errors.last_name}</FormFeedback>
                                    ) : null}
                                </div>

                                {/* Age */}
                                <div className="form-group mb-3">
                                    <Label className="form-label">Age</Label>
                                    <Input
                                        name="age"
                                        className="form-control"
                                        placeholder="Enter Age"
                                        type="number"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.age || ""}
                                        invalid={
                                            validation.touched.age && validation.errors.age ? true : false
                                        }
                                    />
                                    {validation.touched.age && validation.errors.age ? (
                                        <FormFeedback type="invalid">{validation.errors.age}</FormFeedback>
                                    ) : null}
                                </div>

                                {/* Current Address */}
                                <div className="form-group mb-4">
                                    <Label className="form-label">Current Address</Label>
                                    <Input
                                        name="current_address"
                                        className="form-control"
                                        placeholder="Enter Current Address"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.current_address || ""}
                                        invalid={
                                            validation.touched.current_address && validation.errors.current_address ? true : false
                                        }
                                    />
                                    {validation.touched.current_address && validation.errors.current_address ? (
                                        <FormFeedback
                                            type="invalid">{validation.errors.current_address}</FormFeedback>
                                    ) : null}
                                </div>

                                {/* Phone Number */}
                                <div className="form-group  mb-4">
                                    <Label className="form-label">Phone Number</Label>
                                    <Input
                                        name="phone_number"
                                        className="form-control"
                                        placeholder="Enter Phone Number"
                                        type="tel"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.phone_number || ""}
                                        invalid={
                                            validation.touched.phone_number && validation.errors.phone_number ? true : false
                                        }
                                    />
                                    {validation.touched.phone_number && validation.errors.phone_number ? (
                                        <FormFeedback type="invalid">{validation.errors.phone_number}</FormFeedback>
                                    ) : null}
                                </div>

                                {/* Property Type */}
                                <div className="form-group  mb-4">
                                    <Label className="form-label">Property Type</Label>
                                    <Input
                                        name="property_type"
                                        className="form-control"
                                        placeholder="Select Property Type"
                                        type="select"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.property_type || ""}
                                        invalid={
                                            validation.touched.property_type && validation.errors.property_type ? true : false
                                        }
                                    >
                                        <option value="">Select Property Type</option>
                                        <option value="house">House</option>
                                        <option value="apartment">Apartment</option>
                                        <option value="condo">Condo</option>
                                        <option value="land">Land</option>
                                    </Input>
                                    {validation.touched.property_type && validation.errors.property_type ? (
                                        <FormFeedback
                                            type="invalid">{validation.errors.property_type}</FormFeedback>
                                    ) : null}
                                </div>

                                {/* Budget */}
                                <div className="form-group mb-4">
                                    <Label className="form-label">Budget</Label>
                                    <Input
                                        name="budget"
                                        className="form-control"
                                        placeholder="Enter Budget"
                                        type="number"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.budget || ""}
                                        invalid={
                                            validation.touched.budget && validation.errors.budget ? true : false
                                        }
                                    />
                                    {validation.touched.budget && validation.errors.budget ? (
                                        <FormFeedback type="invalid">{validation.errors.budget}</FormFeedback>
                                    ) : null}
                                </div>

                                <div className="form-group mb-3">
                                    <Label className="form-label">Role</Label>
                                    <Input
                                        type="select"
                                        name="role"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.role || "buyer"}
                                    >
                                        <option value="buyer">Buyer</option>
                                        <option value="seller">Seller</option>
                                    </Input>
                                </div>

                                <Input name="idx" value={idx} type="hidden"/>

                                <div className="text-center mt-4">
                                    <Button type="submit" color="danger">
                                        Update User Name
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
        ;
};

export default UserProfile;
