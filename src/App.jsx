import { useState } from 'react';
import Navbar from './navbar';


function App() {

  const [attForm,setAttForm] = useState({
    tipoAtt: 'formazione',
    linea: 'simpledo',
    cliente:'MBDA',
    dataInizio: '',
    note: 'formazione per nuovo utente',
    progetto: '',
  });

   const [formErrors,setFormErrors] = useState({
     tipoAtt: '',
     linea: '',    
     dataInizio: ''    
    
   })

  const handleOnChange = (e)=>{
    const {name, value} = e.target;
    setAttForm({
      ...attForm,
      [name]: value
    });
  };  
  
  const handleOnSubmit = async (e)=>{
    e.preventDefault();
    let errors = {};

    if (!attForm.tipoAtt.trim()) {
      errors.tipoAtt = 'Tipo Attività Mancante'
    }
    if (!attForm.linea.trim()) {
      errors.linea = 'Linea Mancante'
    }
    if (!attForm.dataInizio) {
      errors.dataInizio = 'inserire la data di inizio attività'
    }

    setFormErrors(errors);

    if(Object.keys(errors).length ===0){
      let result
      try {
        result = await fetch('http://localhost:3000/attivita/',{
        method: "POST",
        body :JSON.stringify({
        tipoAtt: attForm.tipoAtt,
        linea : attForm.linea,
        nomeClie: attForm.cliente,
        dataInAtt: attForm.dataInizio,
        noteAtt : attForm.note        
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
                        placeholder={formErrors.tipoAtt || 'Aggiungi Attività'}></input>
                        <label htmlFor="tipoAtt"> Tipo Attività</label>
                    </div>
                    <div className="input-group">
                        <input 
                        type="text" 
                        name = "linea"                         
                        value={attForm.linea} 
                        onChange={handleOnChange}
                        placeholder={formErrors.linea || 'Aggiungi Linea'}></input>
                        <label htmlFor="linea">Linea</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-group">
                        <input type="text" name = "cliente" value={attForm.cliente} onChange={handleOnChange}></input>
                        <label htmlFor="cliente">Cliente</label>
                    </div>
                    <div className="input-group">
                        <input 
                        type="date" 
                        name = "dataInizio"                         
                        value={attForm.dataInizio} 
                        onChange={handleOnChange}
                        placeholder={formErrors.dataInizio || 'inserisci data di inizio'}></input>
                        <label htmlFor="dataInizio">Data Inizio Attività</label>
                    </div>
                </div>                    
                <div className="input-group">
                    <input type="text" name = "progetto" value={attForm.progetto} onChange={handleOnChange}></input>
                    <label htmlFor="progetto">Progetto</label>
                </div>
                <div className="input-group">
                    <textarea name ="note" rows="8" value={attForm.note} onChange={handleOnChange}></textarea>
                    <label htmlFor="note">Note</label>
                </div>
                <button type='submit' className="btn-add" onClick={handleOnSubmit}>SUBMIT</button>
            </fieldset>            
        </form>
    </div>
    </>
    
  )
}

export default App
