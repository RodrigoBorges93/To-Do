import React, { useState, useEffect } from 'react';
import crypto from 'crypto';
import '../App.css';

function Todo() {
    let [lista, setLista] = useState(JSON.parse(localStorage.getItem('lista')) || []);
    const [todo, setTodo] = useState('');
    const [text, setText] = useState('');

    function cadastro(e){
        e.preventDefault();
        let newItem = [{id: crypto.randomBytes(4).toString('HEX'), tarefa: todo, data: new Date(), status: true, edit: false}];
        if (lista === []){
            setLista(...newItem);
        }
        else{
            setLista([...lista, ...newItem]); 
        }

        setTodo('')
    }

    useEffect(() => {
        localStorage.setItem('lista', JSON.stringify(lista))
    }, [lista])


  return (
    <>
    <div className='criar'>
        <form className='formulario' onSubmit={cadastro}type='submit'>
            <h1> todos </h1>
            <input value={todo} onChange={(e) => setTodo(e.target.value)} placeholder='Digite um to do'></input>
        </form>
    </div>
    <div>
    <div className='container'>
        {
            lista ?
            
            lista.map((item) => {

                function concluir(iden){
                    for (let i of lista){
                        if (i.id === iden){
                            i.status = !i.status
                            setLista([...lista]);
                        }
                    }
                }

                function deletar(iden){
                    for (let i of lista){
                        if (i.id === iden){
                            lista = lista.filter((item) => iden !== item.id)
                            setLista([...lista]); 
                        }
                    }
                }

                function changeEditStatus(iden){
                    for (let i of lista){
                        if (i.id === iden){
                            i.edit = true;
                            setText(i.tarefa);
                            setLista([...lista]);
                        }
                    }
                }

                function handleEdit(iden){
                    for (let i of lista){
                        if (i.id === iden){
                            i.edit = false;
                        }
                    }
                    setLista([...lista]);
                }

                return (
                    <>                      

                        <div className={item.status ? 'tarefa' : 'tarefa-concluida'}>
                            <div className='texto-tarefa'>
                            { item.edit ?
                            <form onSubmit={() => handleEdit(item.id)}>
                                <input value={text}onChange={(e) => {item.tarefa = e.target.value; setText(e.target.value)}}></input>
                            </form>
                                :
                                <p onDoubleClick={() => changeEditStatus(item.id)} className={ item.status ? null : 'concluido'} key={item.id}>{item.tarefa}</p>
                            }
                                </div>
                            <div className='botoes'>
                                <button onClick={() => concluir(item.id)}>{item.status ? 'Concluir' : 'Reabrir'}</button>
                                <button onClick={() => deletar(item.id)}>Deletar</button>
                            </div>
                        </div>
                
                    </>
                )
            } )
            
            :
            null
        }
        
    </div>

    </div>
    </>
  );
}

export default Todo;
