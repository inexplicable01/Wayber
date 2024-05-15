import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import WebViewer from "@pdftron/webviewer";
import { Box, Column, Heading, Button } from "gestalt";
import { getFirebaseBackend } from "../../helpers/firebase_helper";
import "gestalt/dist/gestalt.css";

const SignDocument = () => {
  const { firebaseStorage, updateDocumentToSign } = getFirebaseBackend();
  const storage = firebaseStorage();
  const [annotPosition, setAnnotPosition] = useState(0);
  const [annotationManager, setAnnotationManager] = useState(null);
  const { docRef, docId } = useSelector(
    (state) => state.firebaseReducer.docToSign || {}
  );
  const { user } = useSelector((state) => state.Profile || {});
  const email = user?.email;
  const viewer = useRef(null);

  console.log(docRef);
  useEffect(() => {
    WebViewer(
      {
        path: 'webviewer/lib',
        disabledElements: [
          'ribbons',
          'toggleNotesButton',
          'searchButton',
          'menuButton',
          'rubberStampToolGroupButton',
          'stampToolGroupButton',
          'fileAttachmentToolGroupButton',
          'calloutToolGroupButton',
          'undo',
          'redo',
          'eraserToolButton'
        ],
      },
      viewer.current,
    ).then(async instance => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;
      setAnnotationManager(annotationManager);

      // select only the insert group
      instance.UI.setToolbarGroup('toolbarGroup-Insert');

      // load document
      const storageRef = storage.ref();
      const URL = await storageRef.child(docRef).getDownloadURL();
      documentViewer.loadDocument(URL);

      const normalStyles = (widget) => {
        if (widget instanceof Annotations.TextWidgetAnnotation) {
          return {
            'background-color': '#a5c7ff',
            color: 'white',
          };
        } else if (widget instanceof Annotations.SignatureWidgetAnnotation) {
          return {
            border: '1px solid #a5c7ff',
          };
        }
      };

      annotationManager.addEventListener('annotationChanged', (annotations, action, { imported }) => {
        if (imported && action === 'add') {
          annotations.forEach(function(annot) {
            if (annot instanceof Annotations.WidgetAnnotation) {
              Annotations.WidgetAnnotation.getCustomStyles = normalStyles;
              if (!annot.fieldName.startsWith(email)) {
                annot.Hidden = true;
                annot.Listable = false;
              }
            }
          });
        }
      });
    });
  }, [docRef, email]);

  const completeSigning = async () => {
    const xfdf = await annotationManager.exportAnnotations({
      widgets: false,
      links: false,
    });
    console.log(docId, email, xfdf);
    //  await updateDocumentToSign(docId, email, xfdf);
  };

  return (
    <div className="page-content" style={{ height: "100vh" }}>
      <div className={"prepareDocument"}>
        <Box display="flex" direction="row" flex="grow">
          <Column span={2}>
            <Box padding={3}>
              <Heading size="md">Sign Document</Heading>
            </Box>
            <Box padding={3}>
              <Box padding={2}>
                <Button
                  onClick={completeSigning}
                  accessibilityLabel="complete signing"
                  text="Complete signing"
                  iconEnd="compose"
                />
              </Box>
            </Box>
          </Column>
          <Column span={10}>
            <div
              className="webviewer"
              style={{ height: "100vh" }}
              ref={viewer}
            ></div>
          </Column>
        </Box>
      </div>
    </div>
  );
};

export default SignDocument;
