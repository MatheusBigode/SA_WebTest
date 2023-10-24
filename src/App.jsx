import { useState, useEffect} from 'react'
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [novoUsuario, setNovoUsuario] = useState({
  cpf: '',
  nome: '',
  email: '',
  senha: '',
  matricula: '',
  sobrenome: '',
  cod: '',
  disciplina: '',
  turma: '',
  usuarioTipo: ''
  });


  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8090/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  };
  
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8090/usuarios', novoUsuario);
      fetchUsuarios();
      setNovoUsuario({
        cpf: '',
        nome: '',
        email: '',
        senha: '',
        matricula: '',
        sobrenome: '',
        disciplina: '',
        turma: '',
        usuarioTipo: ''
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/usuarios/${id}`);
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const handleUpdate = async (id, usuarioAtualizado) => {
    try {
      await axios.put(`http://localhost:8090/usuarios/${id}`, usuarioAtualizado);
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  return (
    <div>
    <h1>Gerenciamento de Usuários</h1>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={novoUsuario.nome}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={novoUsuario.email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="senha"
        placeholder="Senha"
        value={novoUsuario.senha}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="matricula"
        placeholder="Matrícula"
        value={novoUsuario.matricula}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="sobrenome"
        placeholder="Sobrenome"
        value={novoUsuario.sobrenome}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="cpf"
        placeholder="CPF"
        value={novoUsuario.cpf}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="disciplina"
        placeholder="Disciplina"
        value={novoUsuario.disciplina}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="turma"
        placeholder="Turma"
        value={novoUsuario.turma}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="usuarioTipo"
        placeholder="Tipo de usuário"
        value={novoUsuario.usuarioTipo}
        onChange={handleInputChange}
      />
      <button type="submit">Cadastrar</button>
    </form>

    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario.id}>
          {usuario.nome} - {usuario.sobrenome} {usuario.email} ({usuario.cod})
          
          <button onClick={() => handleDelete(usuario.id)}>Excluir</button>
          
          <button
            onClick={() =>
              handleUpdate(usuario.id, {
                ...usuario,
                senha: 'Senha atualizada',
              })
            }
          >
            Atualizar
          </button>
        </li>
      ))}
    </ul>
  </div>

  )
}

export default App
