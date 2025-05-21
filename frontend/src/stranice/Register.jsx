import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './css/Register.module.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateEmail(email)) {
      setError('Unesite ispravan email');
      return;
    }

    if (password.length < 6) {
      setError('Lozinka mora imati barem 6 znakova');
      return;
    }

    if (password !== confirmPassword) {
      setError('Lozinke se ne podudaraju');
      return;
    }

    try {
      await axios.post('http://localhost:5000/server/korisnik/register', { email, password });
      setSuccess('Registracija uspješna! Preusmjeravanje na login...');
      setTimeout(() => navigate('/login'), 1800);
    } catch (err) {
      setError(err.response?.data?.message || 'Registracija nije uspjela');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerBox}>
        <form className={styles.form} onSubmit={handleRegister}>
          <h2 className={styles.title}>Registracija</h2>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          <input
            className={styles.input}
            name="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            name="password"
            placeholder="Lozinka"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            className={styles.input}
            name="confirmPassword"
            placeholder="Ponovi lozinku"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <button className={styles.button} type="submit">Registruj se</button>
        </form>
        <div className={styles.loginLink}>
          <span>Već imate račun? </span>
          <Link to="/login">Prijavite se</Link>
        </div>
      </div>
    </div>
  );
}
