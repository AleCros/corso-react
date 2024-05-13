import './table.css'
import { useState, useEffect } from 'react'
import Navbar from './navbar';
import { Link } from 'react-router-dom';

function ListPro(){

    const [listPro, getListPro] = useState([])

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async ()=>{
        try {
            const res = await fetch('http://localhost:3000/progetti/');
            const jsonData = await res.json();
            getListPro(jsonData);
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    }

    return(
        <>
            <Navbar></Navbar>
            <div className='div-table'>
            <fieldset>
            <legend>Alenco Progetti</legend>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Cliente</th>
                        <th>Riferimento</th>
                        <th>Data Apertura</th>
                        <th>Data Progetto</th>
                    </tr>
                </thead>
                <tbody>
                    {listPro.map((pro,index)=>(
                        <tr key={index}>
                            <td><Link className='row-link' to={`/progetti/${pro._id}`}></Link></td>
                            <td>{pro.nomePro}</td>
                            <td>{pro.cliente}</td>
                            <td>{pro.rifPro}</td>
                            <td>{pro.dataApPro}</td>
                            <td>{pro.dataPro}</td>
                        </tr>
                    ))}
                </tbody>                
            </table>
            </fieldset>  
            </div>
        </>
        
    )
}

export default ListPro

