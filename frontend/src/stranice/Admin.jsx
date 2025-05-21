import React, { useEffect, useState } from 'react';
import styles from './css/Admin.module.css';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';
import axios from 'axios';

const API_URL = 'http://localhost:5000/server';

const Admin = () => {
    // State za korisnike
    const [korisnici, setKorisnici] = useState([]);
    const [korisnikForm, setKorisnikForm] = useState({ email: '', password: '' });
    const [korisnikEditId, setKorisnikEditId] = useState(null);

    // State za proizvode
    const [proizvodi, setProizvodi] = useState([]);
    const [proizvodForm, setProizvodForm] = useState({ naziv: '', opis: '', cijena: '', slika: null });
    const [proizvodEditId, setProizvodEditId] = useState(null);

    // State za prikaz menija
    const [activeMenu, setActiveMenu] = useState('korisnici'); // korisnici | proizvodi | noviKorisnik | noviProizvod

    useEffect(() => {
        fetchKorisnici();
        fetchProizvodi();
    }, []);

    const fetchKorisnici = async () => {
        try {
            const res = await axios.get(`${API_URL}/korisnik`);
            setKorisnici(res.data);
        } catch (err) {
            setKorisnici([]);
            console.error(err);
        }
    };

    const fetchProizvodi = async () => {
        try {
            const res = await axios.get(`${API_URL}/proizvod`);
            setProizvodi(res.data);
        } catch (err) {
            setProizvodi([]);
            console.error(err);
        }
    };

    // --- KORISNICI ---
    const handleKorisnikChange = (e) => {
        setKorisnikForm({ ...korisnikForm, [e.target.name]: e.target.value });
    };

    const handleKorisnikSubmit = async (e) => {
        e.preventDefault();
        try {
            if (korisnikEditId) {
                await axios.put(`${API_URL}/korisnik/${korisnikEditId}`, korisnikForm);
            } else {
                await axios.post(`${API_URL}/korisnik`, korisnikForm);
            }
            setKorisnikForm({ email: '', password: '' });
            setKorisnikEditId(null);
            fetchKorisnici();
            setActiveMenu('korisnici');
        } catch (err) {
            console.error(err);
        }
    };

    const handleKorisnikEdit = (korisnik) => {
        setKorisnikForm({ email: korisnik.email, password: '' });
        setKorisnikEditId(korisnik.id || korisnik._id);
        setActiveMenu('noviKorisnik');
    };

    const handleKorisnikDelete = async (id) => {
        if (window.confirm('Obrisati korisnika?')) {
            await axios.delete(`${API_URL}/korisnik/${id}`);
            fetchKorisnici();
        }
    };

    // --- PROIZVODI ---
    const handleProizvodChange = (e) => {
        if (e.target.name === 'slika') {
            setProizvodForm({ ...proizvodForm, slika: e.target.files[0] });
        } else {
            setProizvodForm({ ...proizvodForm, [e.target.name]: e.target.value });
        }
    };

    const handleProizvodSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('naziv', proizvodForm.naziv);
        formData.append('opis', proizvodForm.opis);
        formData.append('cijena', proizvodForm.cijena);
        if (proizvodForm.slika) formData.append('slika', proizvodForm.slika);

        try {
            if (proizvodEditId) {
                await axios.put(`${API_URL}/proizvod/${proizvodEditId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post(`${API_URL}/proizvod`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            setProizvodForm({ naziv: '', opis: '', cijena: '', slika: null });
            setProizvodEditId(null);
            fetchProizvodi();
            setActiveMenu('proizvodi');
        } catch (err) {
            console.error(err);
        }
    };

    const handleProizvodEdit = (proizvod) => {
        setProizvodForm({ naziv: proizvod.naziv, opis: proizvod.opis, cijena: proizvod.cijena, slika: null });
        setProizvodEditId(proizvod.id);
        setActiveMenu('noviProizvod');
    };

    const handleProizvodDelete = async (id) => {
        if (window.confirm('Obrisati proizvod?')) {
            await axios.delete(`${API_URL}/proizvod/${id}`);
            fetchProizvodi();
        }
    };

    return (
        <>
            <Header />
            <div className={styles.adminLayout}>
                <aside className={styles.adminSidebar}>
                    <h2>Admin Opcije</h2>
                    <ul>
                        <li>
                            <button
                                className={activeMenu === 'korisnici' ? styles.active : ''}
                                onClick={() => setActiveMenu('korisnici')}
                            >
                                Pregled korisnika
                            </button>
                        </li>
                        <li>
                            <button
                                className={activeMenu === 'noviKorisnik' ? styles.active : ''}
                                onClick={() => {
                                    setKorisnikEditId(null);
                                    setKorisnikForm({ email: '', password: '' });
                                    setActiveMenu('noviKorisnik');
                                }}
                            >
                                Novi korisnik
                            </button>
                        </li>
                        <li>
                            <button
                                className={activeMenu === 'proizvodi' ? styles.active : ''}
                                onClick={() => setActiveMenu('proizvodi')}
                            >
                                Pregled proizvoda
                            </button>
                        </li>
                        <li>
                            <button
                                className={activeMenu === 'noviProizvod' ? styles.active : ''}
                                onClick={() => {
                                    setProizvodEditId(null);
                                    setProizvodForm({ naziv: '', opis: '', cijena: '', slika: null });
                                    setActiveMenu('noviProizvod');
                                }}
                            >
                                Novi proizvod
                            </button>
                        </li>
                    </ul>
                </aside>
                <main className={styles.adminMain}>
                    <h1 className={styles.adminTitle}>Admin Dashboard</h1>
                    {activeMenu === 'korisnici' && (
                        <div className={styles.adminSection}>
                            <h2>Korisnici</h2>
                            <table className={styles.adminTable}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Email</th>
                                        <th>Akcije</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {korisnici.map((korisnik) => (
                                        <tr key={korisnik.id || korisnik._id}>
                                            <td>{korisnik.id || korisnik._id}</td>
                                            <td>{korisnik.email}</td>
                                            <td>
                                                <button onClick={() => handleKorisnikEdit(korisnik)}>Edit</button>
                                                <button onClick={() => handleKorisnikDelete(korisnik.id || korisnik._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeMenu === 'noviKorisnik' && (
                        <div className={styles.adminSection}>
                            <h2>{korisnikEditId ? 'Uredi korisnika' : 'Novi korisnik'}</h2>
                            <form className={styles.adminForm} onSubmit={handleKorisnikSubmit}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={korisnikForm.email}
                                    onChange={handleKorisnikChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={korisnikForm.password}
                                    onChange={handleKorisnikChange}
                                    required={!korisnikEditId}
                                />
                                <button type="submit">{korisnikEditId ? 'Update' : 'Create'}</button>
                                <button type="button" onClick={() => {
                                    setKorisnikEditId(null);
                                    setKorisnikForm({ email: '', password: '' });
                                    setActiveMenu('korisnici');
                                }}>Cancel</button>
                            </form>
                        </div>
                    )}
                    {activeMenu === 'proizvodi' && (
                        <div className={styles.adminSection}>
                            <h2>Proizvodi</h2>
                            <table className={styles.adminTable}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Naziv</th>
                                        <th>Opis</th>
                                        <th>Cijena</th>
                                        <th>Slika</th>
                                        <th>Akcije</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proizvodi.map((proizvod) => (
                                        <tr key={proizvod.id}>
                                            <td>{proizvod.id}</td>
                                            <td>{proizvod.naziv}</td>
                                            <td>{proizvod.opis}</td>
                                            <td>{proizvod.cijena}</td>
                                            <td>
                                                {proizvod.slika && (
                                                    <img
                                                        src={proizvod.slika}
                                                        alt={proizvod.naziv}
                                                        style={{ width: 50, height: 50, objectFit: 'cover' }}
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                <button onClick={() => handleProizvodEdit(proizvod)}>Edit</button>
                                                <button onClick={() => handleProizvodDelete(proizvod.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeMenu === 'noviProizvod' && (
                        <div className={styles.adminSection}>
                            <h2>{proizvodEditId ? 'Uredi proizvod' : 'Novi proizvod'}</h2>
                            <form className={styles.adminForm} onSubmit={handleProizvodSubmit} encType="multipart/form-data">
                                <input
                                    type="text"
                                    name="naziv"
                                    placeholder="Naziv"
                                    value={proizvodForm.naziv}
                                    onChange={handleProizvodChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="opis"
                                    placeholder="Opis"
                                    value={proizvodForm.opis}
                                    onChange={handleProizvodChange}
                                    required
                                />
                                <input
                                    type="number"
                                    name="cijena"
                                    placeholder="Cijena"
                                    value={proizvodForm.cijena}
                                    onChange={handleProizvodChange}
                                    required
                                    min="0"
                                    step="0.01"
                                />
                                <input
                                    type="file"
                                    name="slika"
                                    accept="image/*"
                                    onChange={handleProizvodChange}
                                />
                                <button type="submit">{proizvodEditId ? 'Update' : 'Create'}</button>
                                <button type="button" onClick={() => {
                                    setProizvodEditId(null);
                                    setProizvodForm({ naziv: '', opis: '', cijena: '', slika: null });
                                    setActiveMenu('proizvodi');
                                }}>Cancel</button>
                            </form>
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Admin;