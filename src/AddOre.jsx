import Navbar from "./navbar";
import { useState } from "react";
import { useParams } from "react-router-dom";

function AddOre() {

    let {id} = useParams();

    const [oreForm, setOreForm] = useState({
        dataOra : '',
        ora: '',
        nota:''
    });

    const[oreErrors, setOreErrors] = useState({
        dataOra : '',
        ora: ''
    });

    const handleOnChange = (e) =>{
        const {name,value} = e.target;

         // Se il campo è "ora", assicurati che contenga solo numeri
         if (name === "ora" && !/^\d*$/.test(value)) {
            return; // Non fare nulla se il valore non è un numero
        }
        setOreForm({
            ...oreForm,
            [name]: value
        });
    };

    const aggiungiOra = async (e)=>{
        // TODO: sviluppare funzione per l'inserimento dell'ora
        e.preventDefault();
        let errors = {};
        let datoMancante = 'inserire dato mancante';

        if (!oreForm.ora.trim()) {
            errors.ora = datoMancante
        }
        if (!oreForm.dataOra) {
            errors.dataOra = datoMancante
        }        

        setOreErrors(errors);

        if(Object.keys(errors).length ===0){
            let result
            try {
                result = await fetch(`http://localhost:3000/oreAtt/`,{
                    method: "POST",
                    body :JSON.stringify({
                        dataOra:oreForm.dataOra,
                        ora:oreForm.ora,
                        nota:oreForm.nota,
                        _idAtt:id
                    }),
                    headers : {
                        'Content-Type':'application/json'
                    }
                });
            if(!result.ok){
                throw new Error('errore nel caricamento');       
            }
            result = await result.json();
            console.log(result);
            alert('caricato');      
            } catch (error) {
                console.error(error);        
            }
        }  
    };

    return(
        <>
        <Navbar></Navbar>
        <div >
            <form className="form-att">
                <fieldset>
                    <legend>Aggiungi ore</legend>
                    <div className="input-group">
                        <input type="text" name = "attivita" value={id} readOnly></input>
                        <label htmlFor="attivita">Attività</label>
                    </div>
                    <div className="row">
                        <div className="input-group">
                            <input 
                            type="number"
                            max={8}                             
                            name = "ora"                         
                            value={oreForm.ora} 
                            onChange={handleOnChange}
                            placeholder={oreErrors.ora || ''}
                            ></input>
                            <label htmlFor="ora">Ore</label>
                        </div>
                        <div className="input-group">
                            <input 
                            type="date" 
                            name = "dataOra"                         
                            value={oreForm.dataOra.split('T')[0]} 
                            onChange={handleOnChange}
                            placeholder={oreErrors.dataOra || ''}></input>
                            <label htmlFor="dataOra">Data</label>
                        </div>
                    </div>                    
                    <div className="input-group">
                        <textarea name ="nota" rows="5" value={oreForm.nota} onChange={handleOnChange}></textarea>
                        <label htmlFor="nota">Note</label>
                    </div>
                    <div className='div-table'style={{height:'1px'}}> 
                        <table>                            
                            <tbody>
                                {/* {listAtt.map((att,index)=>(                        
                                    <tr key={index}>
                                    <td><Link className='row-link' to={`/attivita/${att._id}`}></Link></td>
                                    <td>{att.tipoAtt}</td>
                                    <td>{att.nomeClie}</td>
                                    <td>{att.progetti.length > 0 ? att.progetti[0].nomePro : '' }</td>
                                    <td>{att.dataInAtt.split('T')[0]}</td>
                                    <td>8</td>
                                    </tr>
                                ))} */}
                            </tbody>                
                        </table>
                    </div>
                    <button className="btn-add" onClick={aggiungiOra}>AGGIUNGI ORA</button>
                </fieldset>            
            </form>
        </div>
        </>
    )
}

export default AddOre
