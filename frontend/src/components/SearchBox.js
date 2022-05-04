import React, { useState } from 'react';
import styles from '../style/Navbar.module.css'

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form  onSubmit={submitHandler}>
      <div className= {styles.search}>
        <input
          type="text"
          placeholder='Buscar productos'
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)} className={styles.input}
        ></input>
        <button className = {styles.btnSearch} type="submit">
         Buscar
        </button>
      </div>
    </form>
  );
}
