import './table.css'
import Navbar from './navbar';
import { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'

function ListAtt() {

    const [listAtt, getListAtt]  =useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        fetchData();
    },[]);

    const goToApp = ()=>{
        navigate('/attivita/add');
    }

    const fetchData = async ()=>{
        try {
            const res = await fetch('http://localhost:3000/attivita/')
            const jsonData = await res.json();
            getListAtt(jsonData);
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    }
    return(
    <>
        <Navbar></Navbar>
        <div className='div-table'>
        <fieldset>
            <legend>Alenco Attività</legend>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Attività</th>
                        <th>Cliente</th>
                        <th>Progetto</th>
                        <th>Data</th>
                        <th>OreTot</th>
                    </tr>
                </thead>
                <tbody>
                    {listAtt.map((att,index)=>(                        
                        <tr key={index}>
                        <td><Link className='row-link' to={`/attivita/${att._id}`}></Link></td>
                        <td>{att.tipoAtt}</td>
                        <td>{att.nomeClie}</td>
                        <td>{att.progetti.length > 0 ? att.progetti[0].nomePro : '' }</td>
                        <td>{att.dataInAtt.split('T')[0]}</td>
                        <td>8</td>
                        </tr>
                    ))}
                </tbody>                
            </table>
            <button type='submit' className="btn-add" onClick={goToApp} >AGGIUNGI ATTIVITA'</button>
        </fieldset>  
    </div>
    </>      
    
    )
}

export default ListAtt