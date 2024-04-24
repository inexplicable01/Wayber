import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const form = useRef(null);

    const sendEmail = (e) => {
      e.preventDefault();
  
      if (!form.current) {
        alert('Form is not ready yet.');
        return;
      }
  
      const serviceID = 'service_yooz5kd';
      const templateID = 'template_k36il6g';
      const userID = 'O-I600incn6Qt0DJC';
      const pdfLink = 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf';
  
      // Add the pdf_link to the form as a hidden input
      const hiddenPdfLinkInput = document.createElement('input');
      hiddenPdfLinkInput.type = 'hidden';
      hiddenPdfLinkInput.name = 'pdf_link'; // Must match the name in your EmailJS template
      hiddenPdfLinkInput.value = pdfLink;
      form.current.appendChild(hiddenPdfLinkInput);
  
      emailjs.sendForm(serviceID, templateID, form.current, userID)
        .then((result) => {
          console.log(result.text);
          alert('Email sent successfully!');
        }, (error) => {
          console.error(error.text);
          alert('Failed to send email.');
        })
        .finally(() => {
          hiddenPdfLinkInput.remove();
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
        <input type="submit" value="Send Email" />
      </div>
    </form>
  );
};

export default ContactForm;
