import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const NotFoundPage = () => {
  const routerError = useRouteError();
  return (
    <div className="not-found-container" style={styles.container}>
      <h1 style={styles.header}>Oops!</h1>
      <p style={styles.text}>We can't seem to find the page you're looking for.</p>
      <h2 style={styles.errorCode}>Error code: {routerError?.status} - {routerError?.statusText}</h2>
      <Link to="/" style={styles.homeLink}>Go back home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    color: 'var(--neutral-dark)'
  },
  header: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'var(--primary-color)'
  },
  text: {
    fontSize: '1.2rem',
    margin: '20px 0'
  },
  errorCode: {
    fontSize: '1.5rem',
    marginBottom: '20px'
  },
  homeLink: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: 'var(--accent-color)',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: '500'
  }
};

export default NotFoundPage;
