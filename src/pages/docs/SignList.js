import React, { useEffect, useState } from "react";
import { getFirebaseBackend } from "../../helpers/firebase_helper";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Text, Spinner } from "gestalt";
import "gestalt/dist/gestalt.css";
import { setDocToSign } from "../../store/firebaseStore/actions";
import { useNavigate } from "react-router-dom";

const SignList = () => {
  const [docs, setDocs] = useState([]);
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({
    user: state.Profile.user,
  }));
  useEffect(() => {
    async function getDocs() {
      const docsToSign = await searchForDocumentToSign("email@example.com");
      setDocs(docsToSign);
      setShow(false);
    }

    setTimeout(getDocs, 1000);
  }, [user?.email]);
  const { searchForDocumentToSign } = getFirebaseBackend();
  console.log(searchForDocumentToSign("email@example.com"), user?.email);

  return (
    <div className="page-content">
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
                  {docs.map((doc) => (
                    <Table.Row key={doc.docRef}>
                      <Table.Cell>
                        <Text>{doc.email}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>
                          {doc.requestedTime
                            ? new Date(
                                doc.requestedTime.seconds * 1000
                              ).toDateString()
                            : ""}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          onClick={(event) => {
                            const { docRef, docId } = doc;
                            dispatch(setDocToSign({ docRef, docId }));
                            navigate(`/sign_document`);
                          }}
                          text="Sign"
                          color="blue"
                          inline
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            ) : (
              "You do not have any documents to sign"
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignList;
