import React,{useEffect, useState} from "react";
import { getFirebaseBackend } from "../../helpers/firebase_helper";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Text, Spinner } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { useNavigate } from "react-router-dom";

const SignedList = () => {
    const [docs, setDocs] = useState([]);
    const [show, setShow] = useState(true);
  const { user } = useSelector((state) => ({
    user: state.Profile.user,
  }));
  const dispatch = useDispatch();
 const navigate = useNavigate()
  const { searchForDocumentsSigned } = getFirebaseBackend();
  console.log(searchForDocumentsSigned("email@example.com"), user?.email);
  useEffect(() => {
    async function getDocs() {
      const docsToSign = await searchForDocumentsSigned(user?.email);
      setDocs(docsToSign);
      setShow(false);
    }

    setTimeout(getDocs, 1000);
  }, [user?.email]);
  return <div className="page-content">
 <div>
      {show ? (
        <Spinner show={show} accessibilityLabel="spinner" />
      ) : (
        <div>
          {docs.length > 0 ? (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Text weight="bold">From</Text>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Text weight="bold">When</Text>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {docs.map(doc => (
                  <Table.Row key={doc.docRef}>
                    <Table.Cell>
                      {doc.emails.map(email => (
                        <Text key={email}>{email}</Text>
                      ))}
                    </Table.Cell>
                    <Table.Cell>
                      <Text>{doc.signedTime ? new Date(doc.signedTime.seconds*1000).toDateString() : ''}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        onClick={event => {
                          const { docRef, docId } = doc;
                          // dispatch(setDocToView({ docRef, docId }));
                          navigate(`/view_document`);
                        }}
                        text="View"
                        color="blue"
                        inline
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            'You do not have any documents to review'
          )}
        </div>
      )}
    </div>
  </div>;
};

export default SignedList;
