import React from 'react';
import {useRef, useEffect, useState} from 'react';
import WebViewer from '@pdftron/webviewer';

import { useProfile } from "../../Components/Hooks/UserHooks";
import {Col, Container, Row} from "reactstrap";
import { useDispatch } from 'react-redux';
import * as actions from  './../../store/quotes/actions';

const PDFViewerComponent = () => {
    const viewer = useRef(null);
    const [document, setDocument] = useState('21_ResidentialPSA.pdf')
    // const userUID = useSelector(state => state.Profile.uid);
    // const userUID='blah'
    const {userProfile} = useProfile()
    // console.log(userProfile)
    // const quotes = useSelector(state => state.quoteReducer.quotes);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('use effected')
        if (viewer.current && !viewer.current.instance) {
            WebViewer(
                {
                    path: '/webviewer/lib',
                    licenseKey: 'demo:1702961812846:7c8f70290300000000faec49c74ef715a105f1c24fb3356e71a3af3d6e',
                    initialDoc: `./NWMLS_Forms/${document}`,
                },
                viewer.current,
            ).then((instance) => {
                viewer.current.instance = instance;
            });
        } else if (viewer.current && viewer.current.instance) {
            viewer.current.instance.loadDocument(`./NWMLS_Forms/${document}`);
        }
    }, [document]); // Re-run effect when 'document' state changes

    const handleDocumentChange = (e) => {
        setDocument(e.target.value);
    }

        const [newQuote, setNewQuote] = useState('');


    // useEffect(() => {
    //     dispatch(actions.fetchQuotesRequest());
    // }, [dispatch]);

 const handleAddQuote = () => {
    if (newQuote && userProfile.uid) {
      dispatch(actions.addQuoteRequest(newQuote, userProfile.uid ));
      setNewQuote('');
    }
  };
// console.log('userUID', userUID)
    return (

        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="MyComponent">
                        <div>
                            <form onSubmit={handleAddQuote}>
                                <input
                                    type="text"
                                    value={newQuote}
                                    onChange={e => setNewQuote(e.target.value)}
                                />
                                <button type="submit">Add Quote</button>
                            </form>
                            {/*<ul>*/}
                            {/*    {quotes && quotes.map((quote, index) => (*/}
                            {/*        <li key={index}>{quote}</li>*/}
                            {/*    ))}*/}
                            {/*</ul>*/}
                        </div>
                        <div className="header">React sample</div>
                        <select onChange={handleDocumentChange} value={document}>
                            <option value="21_ResidentialPSA.pdf">Form 1</option>
                            <option value="22A_Financing.pdf">Form 2</option>
                            <option value="22AC_LoanLenderChange.pdf">Form 3</option>
                            <option value="22AD_IncreasedDownPayment.pdf">Form 4</option>
                        </select>
                        {/*<div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>*/}
                    </div>
                </Container>
            </div>
        </React.Fragment>

    );
}

export default PDFViewerComponent;

