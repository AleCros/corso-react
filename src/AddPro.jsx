import { useState } from "react"
import Navbar from "./navbar";

function AddPro(){

    const [proForm,setProForm] = useState({
        nomePro:"",
        linea:"",
        cliente:"",
        dataAperturaPro:"",
        rifPro:"",
        dataPro:"",
        desc:""
    });

    const [proErrors, setProErrors] = useState({
        nomePro:"",
        linea:"",
        cliente:"",
        dataAperturaPro:"",
        rifPro:"",
        dataPro:""
    })

    const handleOnChange = (e) =>{
        const {name,value} = e.target;
        setProForm({
            ...proForm,
            [name]: value
        });
    };

    const handleOnClick = async(e)=>{
        e.preventDefault();
        let errors={};
        let datoMancante = 'inserire dato mancante';

        if(!proForm.nomePro.trim()){errors.nomePro = datoMancante};
        if(!proForm.linea.trim()){errors.linea = datoMancante};
        if(!proForm.cliente.trim()){errors.cliente = datoMancante};
        if(!proForm.dataAperturaPro){errors.dataAperturaPro = datoMancante};
        if(!proForm.rifPro.trim()){errors.rifPro = datoMancante};
        if(!proForm.dataPro){errors.dataPro = datoMancante};              
        
        setProErrors(errors);

        if (Object.keys(errors).length ===0) {
            let result
            try {
                  result = await fetch('http://localhost:3000/progetti/',{
                  method:'POST',
                  body:JSON.stringify({
                    nomePro : proForm.nomePro,
                    descPro : proForm.desc,
                    dataApPro: proForm.dataAperturaPro,
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
                        <input type="date" name = "dataAperturaPro" value={proForm.dataAperturaPro} onChange={handleOnChange}></input>
                        <label htmlFor="dataAperturaPro">Data apertura Progetto</label>
                    </div>
                </div>                    
                <div className="row">
                    <div className="input-group">
                        <input type="text" name = "rifPro" value={proForm.rifPro} onChange={handleOnChange} placeholder={proErrors.rifPro || ''}></input>
                        <label htmlFor="rifPro">Riferimento Progetto</label>
                    </div>
                    <div className="input-group">
                        <input type="date" name = "dataPro" value={proForm.dataPro} onChange={handleOnChange}></input>
                        <label htmlFor="dataPro">Data Progetto</label>
                    </div>
                </div>
                <div className="input-group">
                    <textarea name ="desc" rows="8" value={proForm.desc} onChange={handleOnChange}></textarea>
                    <label htmlFor="desc">Descrizione</label>
                </div>
                <button type="submit" className="btn-add" onClick={handleOnClick}>SUBMIT</button>
            </fieldset>            
            </form>
        </div>
        </>
        
    )
}

export default AddPro