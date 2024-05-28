import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Column, Heading, Button } from 'gestalt';
import WebViewer from '@pdftron/webviewer';
import 'gestalt/dist/gestalt.css';
import { getFirebaseBackend } from "../../helpers/firebase_helper";
const ViewDocument = () => {
    const { firebaseStorage, updateDocumentToSign } = getFirebaseBackend();
    const storage = firebaseStorage();

  const [instance, setInstance] = useState(null);

  const { docRef, docId } = useSelector(
    (state) => state.firebaseReducer.docToSign || {}
  );
  const { user } = useSelector((state) => state.Profile || {});

  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: 'webviewer/lib',
        disabledElements: [
          'ribbons',
          'toggleNotesButton',
          'contextMenuPopup',
        ],
      },
      viewer.current,
    ).then(async instance => {
      // select only the view group
      instance.UI.setToolbarGroup('toolbarGroup-View');

      setInstance(instance);

      // load document
      const storageRef = storage.ref();
      const URL = await storageRef.child(docRef).getDownloadURL();
      console.log(URL);
      instance.Core.documentViewer.loadDocument(URL);
    });
  }, [docRef]);

  const download = () => {
    instance.UI.downloadPdf(true);
  };

  const doneViewing = async () => {
    // navigate('/');
  }

  return (
    <div className="page-content">

    <div className={'prepareDocument'}>
      <Box display="flex" direction="row" flex="grow">
        <Column span={2}>
          <Box padding={3}>
            <Heading size="md">View Document</Heading>
          </Box>
          <Box padding={3}>
            <div>
              <div>
                <Box padding={2}>
                  <Button
                    onClick={download}
                    accessibilityLabel="download signed document"
                    text="Download"
                    iconEnd="download"
                  />
                </Box>
                <Box padding={2}>
                  <Button
                    onClick={doneViewing}
                    accessibilityLabel="complete signing"
                    text="Done viewing"
                    iconEnd="check"
                  />
                </Box>
              </div>
            </div>
          </Box>
        </Column>
        <Column span={10}>
          <div className="webviewer" ref={viewer}></div>
        </Column>
      </Box>
    </div>
    </div>
  );
};

export default ViewDocument;
