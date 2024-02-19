import React, {useEffect, useState, useRef} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Row,
    FormFeedback,
    Alert,
} from "reactstrap";
import {useSelector, useDispatch} from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import {
    fetchApiDataRequest,
    getUsersAddressRequest,
} from "../../store/clientProfile/actions";

import {useNavigate} from "react-router-dom";

const CreateContractForm = ({onSubmit}) => {
    const webViewerInstance = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [clientProfiles, setClientProfiles] = useState([]);
    const [pdfInstance, setPdfInstance] = useState(null);
    const [documentLoaded, setDocumentLoaded] = useState(false);
    const [displayPDF, setDisplayPDF] = useState(false);

    const [address, setAddress] = useState();





    // Function to toggle modal visibility


    const formData = useSelector((state) => state.clientProfileReducer);
    const formik = useFormik({
        initialValues: {
            address: "",
            buyer: "Tester Doe",
            seller: "Seller1 d",
            price: "200000",
            offerExpirationDate: "2024-02-28",
            closingDate: "2024-03-05",
            titleInsuranceCompany: "Big Title",
            closingAgent: "John Doe",
        },

        validationSchema: Yup.object({
            address: Yup.string().required("Please select an address"),
            buyer: Yup.string().required("Please select a buyer"),
            seller: Yup.string().required("Please select a seller"),
            price: Yup.number().required("Please enter a price"),
            offerExpirationDate: Yup.date().required("Please select a start date"),
            closingDate: Yup.date().required("Please select an end date"),
            titleInsuranceCompany: Yup.string().required(
                "Please enter the title insurance company"
            ),
            closingAgent: Yup.string().required("Please select a closing agent"),
        }),

        onSubmit: async (values) => {
            console.log('submitting',values);
            const buyerFullName = values.buyer;
            const sellerFullName = values.seller;

            const buyerProfile = clientProfiles.find(
                (profile) =>
                    profile.firstName + " " + profile.lastName === buyerFullName
            );
            const sellerProfile = clientProfiles.find(
                (profile) =>
                    profile.firstName + " " + profile.lastName === sellerFullName
            );

            // Extracting address and contact details for both buyer and seller
            const buyerAddress = buyerProfile ? buyerProfile.currentAddress : "";
            const sellerAddress = sellerProfile ? sellerProfile.currentAddress : "";

            const buyerPhoneNo = buyerProfile ? buyerProfile.phone : "";
            const sellerPhoneNo = sellerProfile ? sellerProfile.phone : "";

            const buyerEmail = buyerProfile ? buyerProfile.email : "";
            const sellerEmail = sellerProfile ? sellerProfile.email : "";

            const buyerCityStateZip = buyerProfile
                ? `${buyerProfile.city} ${buyerProfile.state} ${buyerProfile.zip}`
                : "";
            const sellerCityStateZip = sellerProfile
                ? `${sellerProfile.city} ${sellerProfile.state} ${sellerProfile.zip}`
                : "";
        // console.log('pdfInstance',pdfInstance)
        //     console.log('documentLoaded',documentLoaded)
            // if (pdfInstance && documentLoaded) {
                const userDetails = {
                    address: values.address,
                    buyer: values.buyer,
                    seller: values.seller,
                    price: values.price,
                    offerExpirationDate: values.offerExpirationDate,
                    closingDate: values.closingDate,
                    titleInsuranceCompany: values.titleInsuranceCompany,
                    closingAgent: values.closingAgent,
                    // zpidDeatils: zpidDeatils,
                    buyerAddress: buyerAddress,
                    sellerAddress: sellerAddress,
                    buyerCityStateZip: buyerCityStateZip,
                    sellerCityStateZip: sellerCityStateZip,
                    sellerPhoneNo: sellerPhoneNo,
                    buyerPhoneNo: buyerPhoneNo,
                    sellerEmail: sellerEmail,
                    buyerEmail: buyerEmail,
                };
                // modifyPdf(pdfInstance, userDetails);
                // dispatch(fetchApiDataRequest())
                navigate(`/ContractView`)
            }
        // },
    });



    // useEffect(() => {
    //     dispatch(fetchApiDataRequest());
    // }, [dispatch]);

    useEffect(() => {
        dispatch(fetchApiDataRequest());
    }, [dispatch]);

    // useEffect(() => {
    //     if (formData?.userZPID?.success) {
    //         setZpidDetails(formData.userZPID?.details);
    //         // console.log(formData.userZPID?.details?.resoFacts?.appliances,"suc cess");
    //     }
    // }, [formData?.userZPID, formData?.userZPID?.success]);

    useEffect(() => {
        if (formData.api?.success) setAddress(formData.api.data);
    }, [formData.api.data, formData.api.success]);

    useEffect(() => {
        const db = firebase.firestore();
        const myCollection = db.collection("ClientProfile");

        myCollection
            .get()
            .then((querySnapshot) => {
                const profiles = [];
                querySnapshot.forEach((doc) => {
                    profiles.push({id: doc.id, ...doc.data()});
                });
                //console.log("profiles", profiles);
                setClientProfiles(profiles);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, []);











    const handleAddressChange = (e) => {
        const zpid = e.target.value;
        dispatch(getUsersAddressRequest(zpid));
    };


    return (
        <React.Fragment>
            <Form
                onSubmit={formik.handleSubmit}
                className="fontFamily_Roboto_sans_serif"
            >
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="offerExpirationDate">Offer Expiration Date</Label>
                            <Input
                                id="offerExpirationDate"
                                name="offerExpirationDate"
                                type="date"
                                onChange={formik.handleChange}
                                value={formik.values.offerExpirationDate}
                                invalid={
                                    formik.touched.offerExpirationDate &&
                                    !!formik.errors.offerExpirationDate
                                }
                                className="p13"
                            />
                            {formik.touched.offerExpirationDate &&
                                formik.errors.offerExpirationDate && (
                                    <FormFeedback>
                                        {formik.errors.offerExpirationDate}
                                    </FormFeedback>
                                )}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.price}
                                invalid={formik.touched.price && !!formik.errors.price}
                            />
                            {formik.touched.price && formik.errors.price && (
                                <FormFeedback>{formik.errors.price}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input
                                type="select"
                                name="address"
                                id="address"
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    handleAddressChange(e);
                                }}
                                value={formik.values.address}
                                invalid={formik.touched.address && !!formik.errors.address}
                                className="p13"
                            >
                                <option value="">Select Address</option>
                                {address?.slice(0, 10)?.map((property) => (
                                    <option key={property.zpid} value={property.zpid}>
                                        <div>
                                            {`${property.streetAddress}, ${property.city}, ${property.state} ${property.zipcode}`}
                                        </div>
                                    </option>
                                ))}
                            </Input>
                            {formik.touched.address && formik.errors.address ? (
                                <FormFeedback type="invalid">
                                    {formik.errors.address}
                                </FormFeedback>
                            ) : null}
                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="buyer">Buyer</Label>
                            <Input
                                type="select"
                                name="buyer"
                                id="buyer"
                                onChange={formik.handleChange}
                                value={formik.values.buyer}
                                invalid={formik.touched.buyer && !!formik.errors.buyer}
                                className="p13"
                            >
                                <option value="">Select Buyer</option>
                                {clientProfiles.map((profile, i) => {
                                    if (profile.role === "Buyer") {
                                        return (
                                            <option
                                                key={i}
                                                value={profile.firstName + " " + profile.lastName}
                                            >
                                                {profile.firstName + " " + profile.lastName}
                                            </option>
                                        );
                                    }
                                    return null;
                                })}
                            </Input>
                            {formik.touched.buyer && formik.errors.buyer && (
                                <FormFeedback>{formik.errors.buyer}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="seller">Seller</Label>
                            <Input
                                type="select"
                                name="seller"
                                id="seller"
                                onChange={formik.handleChange}
                                value={formik.values.seller}
                                invalid={formik.touched.seller && !!formik.errors.seller}
                                className="p13"
                            >
                                <option value="">Select Seller</option>
                                {clientProfiles.map((profile, i) => {
                                    if (profile.role === "Seller") {
                                        return (
                                            <option
                                                key={i}
                                                value={profile.firstName + " " + profile.lastName}
                                            >
                                                {profile.firstName + " " + profile.lastName}
                                            </option>
                                        );
                                    }
                                    return null;
                                })}
                            </Input>
                            {formik.touched.seller && formik.errors.seller && (
                                <FormFeedback>{formik.errors.seller}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>

                </Row>
                {/*<Row>*/}
                {/*    <Col md={6}>*/}
                {/*        <FormGroup>*/}
                {/*            <Label for="buyerAgent">Buyer Agent</Label>*/}
                {/*            <Input*/}
                {/*                type="select"*/}
                {/*                name="buyerAgent"*/}
                {/*                id="buyerAgent"*/}
                {/*                onChange={formik.handleChange}*/}
                {/*                value={formik.values.buyerAgent}*/}
                {/*                invalid={*/}
                {/*                    formik.touched.buyerAgent && !!formik.errors.buyerAgent*/}
                {/*                }*/}
                {/*                className="p13"*/}
                {/*            >*/}
                {/*                <option value="">Select Buyer Agent</option>*/}
                {/*                {clientProfiles.map((profile, index) => {*/}
                {/*                    if (profile.role === "Buyer Agent") {*/}
                {/*                        return (*/}
                {/*                            <option*/}
                {/*                                key={index}*/}
                {/*                                value={profile.firstName + " " + profile.lastName}*/}
                {/*                            >*/}
                {/*                                {profile.firstName + " " + profile.lastName}*/}
                {/*                            </option>*/}
                {/*                        );*/}
                {/*                    }*/}
                {/*                    return null;*/}
                {/*                })}*/}
                {/*            </Input>*/}
                {/*            {formik.touched.buyerAgent && formik.errors.buyerAgent && (*/}
                {/*                <FormFeedback type="invalid">*/}
                {/*                    {formik.errors.buyerAgent}*/}
                {/*                </FormFeedback>*/}
                {/*            )}*/}
                {/*        </FormGroup>*/}
                {/*    </Col>*/}
                {/*    <Col md={6}>*/}
                {/*        <FormGroup>*/}
                {/*            <Label for="sellerAgent">Seller Agent</Label>*/}
                {/*            <Input*/}
                {/*                type="select"*/}
                {/*                name="sellerAgent"*/}
                {/*                id="sellerAgent"*/}
                {/*                onChange={formik.handleChange}*/}
                {/*                value={formik.values.sellerAgent}*/}
                {/*                invalid={*/}
                {/*                    formik.touched.sellerAgent && !!formik.errors.sellerAgent*/}
                {/*                }*/}
                {/*                className="p13"*/}
                {/*            >*/}
                {/*                <option value="">Select Selling Agent</option>*/}
                {/*                                                <option*/}
                {/*                    key="1"*/}
                {/*                    value="Great Title"*/}
                {/*                >*/}
                {/*                    Great Title*/}
                {/*                </option>*/}
                {/*                <option*/}
                {/*                    key="2"*/}
                {/*                    value="American Title"*/}
                {/*                >*/}
                {/*                    American Title*/}
                {/*                </option>*/}
                {/*                <option*/}
                {/*                    key="3"*/}
                {/*                    value="Bruce's Title"*/}
                {/*                >*/}
                {/*                    Bruce's Title*/}
                {/*                </option>*/}
                {/*                /!*{clientProfiles.map((profile, index) => {*!/*/}
                {/*                /!*    if (profile.role === "Seller Agent") {*!/*/}
                {/*                /!*        return (*!/*/}
                {/*                /!*            <option*!/*/}
                {/*                /!*                key={index}*!/*/}
                {/*                /!*                value={profile.firstName + " " + profile.lastName}*!/*/}
                {/*                /!*            >*!/*/}
                {/*                /!*                {profile.firstName + " " + profile.lastName}*!/*/}
                {/*                /!*            </option>*!/*/}
                {/*                /!*        );*!/*/}
                {/*                /!*    }*!/*/}
                {/*                /!*    return null;*!/*/}
                {/*                /!*})}*!/*/}
                {/*            </Input>*/}
                {/*            {formik.touched.sellerAgent && formik.errors.sellerAgent && (*/}
                {/*                <FormFeedback type="invalid">*/}
                {/*                    {formik.errors.sellerAgent}*/}
                {/*                </FormFeedback>*/}
                {/*            )}*/}
                {/*        </FormGroup>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="titleInsuranceCompany">Title Insurance Company</Label>
                            <Input
                                type="select"
                                name="titleInsuranceCompany"
                                id="titleInsuranceCompany"
                                onChange={formik.handleChange}
                                value={formik.values.titleInsuranceCompany}
                                invalid={
                                    formik.touched.titleInsuranceCompany && !!formik.errors.titleInsuranceCompany
                                }
                                className="p13"
                            >
                                <option value="">Select Title Company</option>
                                <option
                                    key="1"
                                    value="Great Title"
                                >
                                    Great Title
                                </option>
                                <option
                                    key="2"
                                    value="American Title"
                                >
                                    American Title
                                </option>
                                <option
                                    key="3"
                                    value="Bruce's Title"
                                >
                                    Bruce's Title
                                </option>
                            </Input>
                            {formik.touched.titleInsuranceCompany && formik.errors.titleInsuranceCompany && (
                                <FormFeedback type="invalid">
                                    {formik.errors.titleInsuranceCompany}
                                </FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="closingAgent">Closing Agent</Label>
                            <Input
                                type="select"
                                name="closingAgent"
                                id="closingAgent"
                                onChange={formik.handleChange}
                                value={formik.values.closingAgent}
                                invalid={
                                    formik.touched.closingAgent && !!formik.errors.closingAgent
                                }
                                className="p13"
                            >
                                <option value="">Select Closing Agent</option>
                                {clientProfiles.map((profile, index) => {
                                    if (profile.role === "Closing Agent") {
                                        return (
                                            <option
                                                key={index}
                                                value={profile.firstName + " " + profile.lastName}
                                            >
                                                {profile.firstName + " " + profile.lastName}
                                            </option>
                                        );
                                    }
                                    return null;
                                })}
                            </Input>
                            {formik.touched.closingAgent && formik.errors.closingAgent && (
                                <FormFeedback type="invalid">
                                    {formik.errors.closingAgent}
                                </FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>

                    <Col md={6}>
                        <FormGroup>
                            <Label for="closingDate">Closing Date</Label>
                            <Input
                                id="closingDate"
                                name="closingDate"
                                type="date"
                                onChange={formik.handleChange}
                                value={formik.values.closingDate}
                                invalid={
                                    formik.touched.closingDate && !!formik.errors.closingDate
                                }
                                className="p13"
                            />
                            {formik.touched.closingDate && formik.errors.closingDate && (
                                <FormFeedback>{formik.errors.closingDate}</FormFeedback>
                            )}
                        </FormGroup>
                    </Col>
                </Row>


                <Button id="modifyPdfButton" type="submit" color="success">
                    Generate PDF
                </Button>
                <div
                    className={displayPDF ? "display_block" : "display_none"}
                    id="your-webviewer-container-id"
                    style={{height: "100dvh"}}
                ></div>

            </Form>
        </React.Fragment>
    );
};

export default CreateContractForm;
