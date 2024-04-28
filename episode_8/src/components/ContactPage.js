import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container" style={styles.container}>
      <h1 style={styles.header}>Contact Us</h1>
      <p style={styles.text}>Have questions or feedback? We'd love to hear from you.</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          style={styles.input}
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          style={styles.textarea}
          required
        />
        <button type="submit" style={styles.button}>Send Message</button>
      </form>

      <div style={styles.additionalContact}>
        <p>Or reach us at:</p>
        <p><strong>Phone:</strong> +123 456 7890</p>
        <p><strong>Email:</strong> contact@dineatz.in</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center'
  },
  header: {
    fontSize: '2.5rem',
    color: 'var(--primary-color)'
  },
  text: {
    fontSize: '1.2rem',
    margin: '20px 0'
  },
  form: {
    maxWidth: '500px',
    margin: '0 auto'
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid var(--light-gray)'
  },
  textarea: {
    width: '100%',
    height: '150px',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid var(--light-gray)',
    resize: 'vertical'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: 'var(--accent-color)',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '1rem'
  },
  additionalContact: {
    margin: '20px 0'
  }
};

export default ContactPage;
