import { call, put, takeLatest , takeEvery} from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as actions from './actions';
// import firebase from "firebase/app";
// import "firebase/firestore";

import { getFirebaseBackend } from "../../helpers/firebase_helper";
function* fetchQuotesSaga() {
  try {
    const firebaseBackend = getFirebaseBackend();
    const quotes = yield call(firebaseBackend.fetchQuotes);
    yield put(actions.fetchQuotesSuccess(quotes));
  } catch (error) {
    // Handle error
  }
}

function* addQuoteSaga(action) {
  const { xfdfString, uid,formName} = action.payload;
  const now = new Date();
  const uploadDoc ={

                userUID: uid,
                extradict: {somethin: 'sdf', asdfs: 1},
                formName: formName,
                xfdfString:xfdfString,
                lastUpdated:now.getTime().toISOString(),
                testarray:[{somethin:'sdf',asdfs:1},{somethin:'sdf',asdfs:1},{somethin:'sdf',asdfs:1}]
            }
  try {
    const firebaseBackend = getFirebaseBackend();
    yield call(firebaseBackend.addQuote, uploadDoc);
    yield put(actions.fetchQuotesRequest());
  } catch (error) {
    console.log(error)

    // Handle error
  }
}


function* saveAnnotationSaga(action) {
    const now = new Date();
    try {
        const { uid, annotationData , formName} = action.payload;
        const docID = `${uid}-${formName}`;

        const firebaseBackend = getFirebaseBackend();
        const docSnapshot = yield call(firebaseBackend.checkDocExists, 'AnnotationsCollection', docID)

        if (docSnapshot.exists) {
            yield call(firebaseBackend.updateAnnotationDoc,  docID, {
                annotation: annotationData,
                lastUpdated: new Date().toISOString(),
            });

        } else {

            yield  call(firebaseBackend.setAnnotationDoc,  docID, {
                customerID: uid,
                annotation: annotationData,
                createdDate: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            });
        }

        yield put(actions.saveAnnotationSuccess());
    } catch (error) {
        console.log('TODO error??', error)
        yield put(actions.saveAnnotationFailure(error));
    }
}

function* fetchAnnotationsSaga(action) {
    try {
        const { formName, uid } = action.payload;
        const docID = `${uid}-${formName}`;
        const firebaseBackend = getFirebaseBackend();
        const docSnapshot = yield call(firebaseBackend.checkDocExists, 'AnnotationsCollection', docID)
        // Fetch annotations based on documentId and userProfile

        if (docSnapshot.exists) {
            console.log('Fetch updateAnnotationDoc')
            // updateAnnotationDoc
            const doc = yield call(firebaseBackend.fetchAnnotations,  docID);
            const xfdfString = doc.data().annotation

            yield put(actions.fetchAnnotationsSuccess(xfdfString));
        }
        // const response = yield call(fetch, `path/to/annotation/server/${documentId}/${userProfile.id}`);
        // const xfdfString = yield call([response, response.text]);

        // Import annotations here or dispatch another action to handle the import

    } catch (error) {
        yield put(actions.fetchAnnotationsFailure(error));
    }
}
export default function* watchQuotesSaga() {
    yield takeLatest(actionTypes.FETCH_QUOTES_REQUEST, fetchQuotesSaga);
    yield takeLatest(actionTypes.ADD_QUOTE_REQUEST, addQuoteSaga);
    yield takeLatest(actionTypes.SAVE_ANNOTATION_REQUEST, saveAnnotationSaga);
    yield takeEvery(actionTypes.FETCH_ANNOTATIONS_REQUEST, fetchAnnotationsSaga);
}
