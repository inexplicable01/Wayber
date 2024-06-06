import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const form = useRef(null);
    const [pdfFile, setPdfFile] = useState(null);

    // const handleAttachment = (event) => {
    //   const file = event.target.files[0];
    //   if (file) {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       // Converts the file to a base64 string
    //       setPdfFile(reader.result);
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // };

    const handleAttachment = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPdfFile(reader.result);
            console.log("Base64 Encoded PDF:", reader.result);  // Debug: Log encoded PDF
          };
          reader.readAsDataURL(file);
        }
      };
      
      const sendEmail = (e) => {
        e.preventDefault();
      
        if (!form.current) {
          console.error('Form reference is null');
          alert('Form is not ready yet.');
          return;
        }
      
        console.log("Preparing to send email with attachment...");
      
        const serviceID = 'service_yooz5kd';
        const templateID = 'template_k36il6g';
        const userID = 'O-I600incn6Qt0DJC';
      
        const templateParams = {
          to_email: form.current.to_email.value,
          user_name: form.current.user_name.value,
          reply_to: form.current.user_email.value,
          message: form.current.message.value,
          attachment: pdfFile,
        };
      
        emailjs.send(serviceID, templateID, templateParams, userID)
          .then((result) => {
            console.log('Email Sent Successfully:', result.text);
            alert('Email sent successfully with PDF attachment!');
          }, (error) => {
            console.error('Failed to send email:', error.text);
            alert('Failed to send email with attachment. See console for details.');
          });
      };
      

  return (
    <form ref={form} onSubmit={sendEmail}>
      <div>
        <label>Recipient Email:</label>
        <input type="email" name="to_email" required />
      </div>
      <div>
        <label>Your Name:</label>
        <input type="text" name="user_name" required />
      </div>
      <div>
        <label>Your Email:</label>
        <input type="email" name="user_email" required />
      </div>
      <div>
        <label>Message:</label>
        <textarea name="message" required />
      </div>
      <div>
        <label>Attach PDF:</label>
        <input type="file" accept="application/pdf" onChange={handleAttachment} />
      </div>
      <div>
        <input type="submit" value="Send Email" />
      </div>
    </form>
  );
};

export default ContactForm;
