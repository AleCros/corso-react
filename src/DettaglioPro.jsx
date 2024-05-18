import { useState,useEffect } from 'react';
import Navbar from './navbar';
import { useParams } from 'react-router-dom';

function DettaglioPro(){

    let {id} = useParams()    

    const fetchData = async ()=>{
        try {
            const res = await fetch(`http://localhost:3000/progetti/${id}`)
            const jsonData = await res.json();           
        if (jsonData) {
            setProForm(jsonData);
            console.log('Risposta del server:',jsonData);
        } else {
            console.error('Nessun dato trovato');
        }
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    }   

    const [proForm,setProForm] = useState({
        nomePro:'',
        linea:'',
        cliente:'',
        dataApPro:'',
        rifPro:'',
        dataPro:'',
        descPro:'',
    });

    const [proErrors, setProErrors] = useState({
        nomePro:'',
        linea:'',
        cliente:'',
        dataApPro:'',
        rifPro:'',
        dataPro:''
    })

    useEffect(()=>{       
        fetchData();      
    },[id]);

    const handleOnChange = (e) =>{
        const {name,value} = e.target;
        setProForm({
            ...proForm,
            [name]: value
        });
    };

    const updateProgetto = async(e)=>{
        e.preventDefault();
        let errors={};
        let datoMancante = 'inserire dato mancante';

        if(!proForm.nomePro.trim()){errors.nomePro = datoMancante};
        if(!proForm.linea.trim()){errors.linea = datoMancante};
        if(!proForm.cliente.trim()){errors.cliente = datoMancante};
        if(!proForm.dataApPro){errors.dataApPro = datoMancante};
        if(!proForm.rifPro.trim()){errors.rifPro = datoMancante};
        if(!proForm.dataPro){errors.dataPro = datoMancante};              
        
        setProErrors(errors);

        if (Object.keys(errors).length ===0) {
            let result
            try {
                  result = await fetch(`http://localhost:3000/progetti/${id}`,{
                  method:'PATCH',
                  body:JSON.stringify({
                    nomePro : proForm.nomePro,
                    descPro : proForm.descPro,
                    dataApPro: proForm.dataApPro,
                    rifPro: proForm.rifPro,
                    dataPro: proForm.dataPro,
                    cliente: proForm.cliente,
                    linea: proForm.linea
                  }),
                  headers:{
                    'Content-Type':'application/json'
                    }
                })
                if (!result.ok) {
                    throw new Error('Errore nel caricamento')
                }
                result = await result.json();
                console.log(result);
            } catch (error) {
                console.error(error);                
            }            
        }
    }
    const newAttivita = async (e)=>{
        // TODO: sviluppare funzione per creare attività da progetto
    }
    const closeProgetto = async (e)=>{
        // TODO: sviluppare funzione per chiudere progetto
    }

    return(
        <>
            <Navbar></Navbar>
            <div >
            <form className="form-att">
            <fieldset>
                <legend>Aggiungi Progetto</legend>
                <div className="row">
                    <div className="input-group">
                        <input 
                        type="text" 
                        name = "nomePro" 
                        value={proForm.nomePro} 
                        onChange={handleOnChange} 
                        placeholder={proErrors.nomePro || ''}></input>
                        <label htmlFor="nomePro"> Nome Progetto</label>
                    </div>
                    <div className="input-group">
                        <input 
                        type="text" 
                        name = "linea" 
                        value={proForm.linea} 
                        onChange={handleOnChange} 
                        placeholder={proErrors.linea || ''}></input>
                        <label htmlFor="linea">Linea</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-group">
                        <input type="text" name = "cliente" value={proForm.cliente} onChange={handleOnChange} placeholder={proErrors.cliente || ''}></input>
                        <label htmlFor="cliente">Cliente</label>
                    </div>
                    <div className="input-group">
                        <input type="date" name = "dataApPro" value={proForm.dataApPro.split('T')[0]} onChange={handleOnChange}></input>
                        <label htmlFor="dataApPro">Data apertura Progetto</label>
                    </div>
                </div>                    
                <div className="row">
                    <div className="input-group">
                        <input type="text" name = "rifPro" value={proForm.rifPro} onChange={handleOnChange} placeholder={proErrors.rifPro || ''}></input>
                        <label htmlFor="rifPro">Riferimento Progetto</label>
                    </div>
                    <div className="input-group">
                        <input type="date" name = "dataPro" value={proForm.dataPro.split('T')[0]} onChange={handleOnChange}></input>
                        <label htmlFor="dataPro">Data Progetto</label>
                    </div>
                </div>
                <div className="input-group">
                    <textarea name ="descPro" rows="8" value={proForm.descPro} onChange={handleOnChange}></textarea>
                    <label htmlFor="descPro">Descrizione</label>
                </div>                
                <div className="row">
                        <div className="btn-group">
                        <button type="submit" className="btn-add" onClick={updateProgetto}>MODIFICA PROGETTO</button>
                        </div>
                        <div className="btn-group">
                        <button type="submit" className="btn-add" onClick={newAttivita}>CREA ATTIVITA</button>
                        </div>
                        <div className="btn-group">
                        <button type="submit" className="btn-add" onClick={closeProgetto}>CHIUDI PROGETTO</button>
                        </div>
                </div>
            </fieldset>            
            </form>
        </div>
        </>
    )
}

export default DettaglioPro