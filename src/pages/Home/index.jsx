import { useEffect, useState, useRef } from 'react';
import './app.css';
import Trash from '../../assets/trash-can.png';
import api from '../../services/api'

export default function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

   async function getUsers() {
      const usersFromApi = await api.get('/usuarios')

      setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/usuarios',  {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    })
    getUsers()

    
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)

    getUsers()
  }



  useEffect(() => {
    getUsers()
    
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>

        <input name="name" type='text' required placeholder='diga seu nome' ref={inputName}/>
        <input name="age" type='number' required placeholder='Informe a sua idade' ref={inputAge}/>
        <input name="email" type='email'required placeholder='Informe o email' ref={inputEmail}/>
        
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map( (user) => (

          <div key={user.id} className='card' >
          
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>

          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} width={30} height={30}/>
          </button>
        </div>

      ) )}

      <div>
        
      </div>

    </div>
  )
}

