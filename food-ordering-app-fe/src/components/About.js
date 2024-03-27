import React from 'react';

const About = () => {
  return (
    <div className="about-container" style={styles.container}>
      <h1 style={styles.header}>Discover the Joy of Eating with Dineatz</h1>
      <div style={styles.content}>
        <p style={styles.text}>
          Dineatz, founded in 2024, has swiftly become a household name for food delivery in your city. Our vision is to make dining effortless, whether it's a quick snack, a family meal, or a sweet treat to brighten your day.
        </p>
        <p style={styles.text}>
          We're not just about food delivery; we're about delivering happiness. Our platform is designed to offer an unparalleled selection of restaurants and cuisines, catering to every taste, mood, and occasion. From the hidden gems in your neighborhood to the city’s finest eateries, Dineatz brings the world of culinary delights right to your fingertips.
        </p>
        <p style={styles.text}>
          At the heart of Dineatz is a commitment to exceptional customer service. We understand the importance of your time and strive to deliver your orders promptly and in the best condition. Our easy-to-use app and website make ordering your favorite meals a breeze.
        </p>
        <p style={styles.text}>
          As we continue to grow, we are driven by our mission to transform the way you dine. We're dedicated to expanding our reach, enhancing our services, and ensuring that every meal ordered through Dineatz is a delightful experience.
        </p>
        <p style={styles.signature}>
          - The Dineatz Team
        </p>
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
  content: {
    textAlign: 'left',
    maxWidth: '600px',
    margin: '0 auto'
  },
  text: {
    fontSize: '1.2rem',
    color: 'var(--neutral-dark)',
    marginBottom: '20px'
  },
  signature: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'var(--neutral-dark)',
    marginTop: '40px'
  }
};

export default About;
