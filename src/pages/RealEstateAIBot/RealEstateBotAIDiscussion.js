import React from 'react';
import {useRef, useEffect, useState} from 'react';
import WebViewer from '@pdftron/webviewer';

import {useProfile} from "../../Components/Hooks/UserHooks";
import {Col, Container, Row} from "reactstrap";
import {useSelector, useDispatch} from 'react-redux';
import {documentnames} from "../../config";
import axios from 'axios';

const RealEstateBotAIDiscussion = (props) => {
    const [document, setDocument] = useState(documentnames.FORM21)

    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const [pdftext, setPdftext] = useState('')

    const textToAnalyze = 'Your text to analyze goes here';

    const analyzeTextWithChatGPT = async () => {
        console.log('texttosend',props.pdftext)
        const data = JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a real estate expert. Knowledgable in real estate transactions. What do you think about the text below?"
                },
                {
                    "role": "user",
                    "content": props.pdftext
                }
            ],
            "temperature": 0.5,
            "max_tokens": 1000
        });

        const config = {
            method: 'post',
            url: 'https://api.openai.com/v1/chat/completions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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`
            },
            data: data
        };

        try {
            const response = await axios.request(config);
            return response.choices[0].message.content
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            throw error;
        }
    };

    const handleAnalyzeClick = async () => {
        setIsLoading(true);
        try {
            const analysisResult = await analyzeTextWithChatGPT(textToAnalyze);
            setAnalysis(analysisResult);
        } catch (error) {
            console.error('Error analyzing text:', error);
            setAnalysis('Error analyzing text.');
        } finally {
            setIsLoading(false);
        }
    };
    return (

        <React.Fragment>
            <div>
                <button onClick={handleAnalyzeClick} disabled={isLoading}>
                    {isLoading ? 'Analyzing...' : 'Analyze Text'}
                </button>
                <div>
                    <h3>Analysis Result:</h3>
                    <p>{analysis}</p>
                </div>
            </div>
        </React.Fragment>

    );
}

export default RealEstateBotAIDiscussion;

