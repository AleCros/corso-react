import { useState, useEffect } from 'react';
import Navbar from './navbar';
import { useParams,useNavigate } from 'react-router-dom';


function DettaglioAtt(){

    let {id} = useParams()

    useEffect(()=>{
        fetchData();
    },[id]);

    const fetchData = async ()=>{
        try {
            const res = await fetch(`http://localhost:3000/attivita/${id}`)
            const jsonData = await res.json();
            setAttForm(jsonData[0]);
            console.log(jsonData[0]);             
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    }   

    const [attForm,setAttForm] = useState({
        tipoAtt: '',
        linea: '',
        nomeClie:'',
        dataInAtt: '',
        noteAtt: '',
        progetti: '',
      });
    
    const [formErrors,setFormErrors] = useState({
         tipoAtt: '',
         linea: '',    
         dataInAtt: ''  
      });
      
    const navigate = useNavigate();
    
      const handleOnChange = (e)=>{
        const {name, value} = e.target;
        setAttForm({
          ...attForm,
          [name]: value
        });
      };  
      
      const updateAttivita = async (e)=>{
        e.preventDefault();
        let errors = {};
        let datoMancante = 'inserire dato mancante';
    
        if (!attForm.tipoAtt.trim()) {
          errors.tipoAtt = datoMancante
        }
        if (!attForm.linea.trim()) {
          errors.linea = datoMancante
        }
        if (!attForm.dataInAtt) {
          errors.dataInAtt = datoMancante
        }
    
        setFormErrors(errors);       
    
        if(Object.keys(errors).length ===0){
          let result
          try {
            result = await fetch(`http://localhost:3000/attivita/${id}`,{
            method: "PATCH",
            body :JSON.stringify({
            tipoAtt: attForm.tipoAtt,
            linea : attForm.linea,
            nomeClie: attForm.nomeClie,
            dataInAtt: attForm.dataInAtt,
            noteAtt : attForm.noteAtt        
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
          } catch (error) {
            console.error(error);            
          }
    
        } 
         
      }
      const addOre = async ()=>{        
        navigate(`/attivita/ore/${id}`);
      }
      const closeAtt = async (e)=>{
        // TODO: crare funzione per chiudere l'attività
      }


      return (
        <>
          <Navbar></Navbar>
          <div >
            <form className="form-att">
                <fieldset>
                    <legend>Aggiungi Attività</legend>
                    <div className="row">
                        <div className="input-group">
                            <input 
                            type="text" 
                            name = "tipoAtt"                         
                            value={attForm.tipoAtt} 
                            onChange={handleOnChange}
                            placeholder={formErrors.tipoAtt || ''}
                            ></input>
                            <label htmlFor="tipoAtt"> Tipo Attività</label>
                        </div>
                        <div className="input-group">
                            <input 
                            type="text" 
                            name = "linea"                         
                            value={attForm.linea} 
                            onChange={handleOnChange}
                            placeholder={formErrors.linea || ''}
                            ></input>
                            <label htmlFor="linea">Linea</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-group">
                            <input type="text" name = "nomeClie" value={attForm.nomeClie} onChange={handleOnChange}></input>
                            <label htmlFor="cliente">Cliente</label>
                        </div>
                        <div className="input-group">
                            <input 
                            type="date" 
                            name = "dataInAtt"                         
                            value={attForm.dataInAtt.split('T')[0]} 
                            onChange={handleOnChange}
                            placeholder={formErrors.dataInAtt || ''}></input>
                            <label htmlFor="dataInizio">Data Inizio Attività</label>
                        </div>
                    </div>                    
                    {/* <div className="input-group">
                        <input type="text" name = "progetto" value={attForm.progetto} onChange={handleOnChange}></input>
                        <label htmlFor="progetto">Progetto</label>
                    </div> */}
                    <div className="input-group">
                        <textarea name ="noteAtt" rows="8" value={attForm.noteAtt} onChange={handleOnChange}></textarea>
                        <label htmlFor="note">Note</label>
                    </div>                    
                    <div className="row">
                        <div className="btn-group">
                        <button className="btn-add" onClick={updateAttivita}>MODIFICA ATTIVITA'</button>
                        </div>
                        <div className="btn-group">
                        <button className="btn-add" onClick={addOre}>AGGIUNGI ORE</button>
                        </div>
                        <div className="btn-group">
                        <button className="btn-add" onClick={closeAtt}>CHIUDI ATTIVITA'</button>
                        </div>
                    </div>       
                </fieldset>            
            </form>
        </div>
        </>
        
      )
}

export default DettaglioAtt