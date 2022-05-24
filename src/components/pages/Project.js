// Bibliotecas
import {parse, v4 as uuid} from 'uuid'

// Import - Hooks
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Import - Styles
import styles from "./Project.module.css";

// Import - Components
import Loading from "./../layout/Loading";
import Container from './../layout/Container';
import ProjectForm from './../project/ProjectForm';
import Message from './../layout/Message';
import ServiceForm from "../service/ServiceForm";
import ServiceCard from './../service/ServiceCard';

function Project() {
  // Restando o id encaminhado pela URL
  const { id } = useParams();

  // Manipulação do projeto
  const [project, setProject] = useState([]); // Irá armazenar os dados do proejeto
  const [showProjectForm, setShowProjectForm] = useState(false); // Responsável por exibição da edição
  const [showServiceForm, setShowServiceForm] = useState(false); // Responsável por exibição da edição

//   Manipulação dos Serviçoes
  const [services, setServices] = useState([])
  
//   Mensagem
  const [message, setMessage] = useState()
  const [typeMessage, setTypeMessage] = useState()

//   Requisições
// Requisição para carregar o project pelo ID
  useEffect(() => {
    // Opções da requisição
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setProject(data)
            setServices(data.services)
        })
        .catch((err) => console.log(err));
    }, 300);
  }, [id]);

//  Funçao que realiza Requisição para alterar o Project
function editPost (project) {
    // Limpando o campo de mensagem do componente de Mensagem 
    setMessage('')

    // Validação para verificar se o orçamento é maior que os gastos
    if(project.budget < project.cost){
        setMessage('O orçamento não pode ser menor que o custo do projeto!')
        setTypeMessage('error')

        return false
    }

    // Requisição
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    }

    fetch(`http://localhost:5000/projects/${project.id}`, options)
        .then(response => response.json())
        .then(data => {
            setProject(data)
            setShowProjectForm(false)

            setMessage('Projeto atualizado!')
            setTypeMessage('success')
        })

}

// Serviços
function createService () {
    // Limpando o campo de mensagem do componente de Mensagem   
    setMessage('')
    
    // Validando se o custo do serço é maior que o orçamento
    // Resgatando o último serviço
    const lastService = project.services[project.services.length - 1]

    // Cria um id único para o serviço
    lastService.id = uuid()

    // Resgatando o custo do último serviço (ou seja, o serviço adicionado)
    const lastServiceCost = lastService.cost

    // Somando o valor do custo desse novo serviço com os já existêntes
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    // Validando se o custo dos serviços é maior que o orçamento
    if(newCost > parseFloat(project.budget)) {
        // Definindo uma mensagem de erro
        setMessage('Orçamento ultrapassado, verifique o valor do serviço')
        setTypeMessage('error')

        // Removendo o serviço do objeto project 
        // pop() - remove o último elemento de um array
        project.services.pop()

        return false
    }

    // Atualizando o total utilizado do projeto
    project.cost = newCost

    // Requisição para atualizar o projeto
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    }

    fetch(`http://localhost:5000/projects/${project.id}`, options)
        .then(response => response.json())
        .then((data) => {
            // Ocultando o formulário de serviços
            setShowServiceForm(false)

            // Exibindo mensagem para o usuário
            setMessage('Serviço adicionado com sucesso!')
            setTypeMessage('success')
        })
        .catch()
}

function removeService (id, cost) {
    // Serviços atualizados - FRONT-END
    // Faz um filtro onde todos os elementos que não tiverem esse id serão retornados para essa constante
    const servicesUpdated = project.services.filter(service => service.id !== id)

    // Guardando o valor do project armazenado no state
    const projectUpdated = project

    // Atualizando nessa varíavel os serviços
    projectUpdated.services = servicesUpdated

    // Reduzindo o custo do serviço do custo do projeto
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    // Requisição para atualizar o projeto - Removendo o serviço
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectUpdated)
    }

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, options)
        .then(response => response.json())
        .then(data => {
            // Atualizando os states do projeto
            setProject(projectUpdated)
            setServices(servicesUpdated)

            // Exibindo mensagem para o usuário
            setMessage('Serviço removido com sucesso!')
            setTypeMessage('success')
        })
    .catch(err => console.log(err));
}


//   Métodos
  function toggleProjectForm () {
      setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm () {
      setShowServiceForm(!showServiceForm)
  }

  return (
    <>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass="column">
                    {/* Validação para verificar se há alguma mensagem a ser exibida */}
                    {message && <Message type={typeMessage} msg={message}/>}

                    {/* Detalhes do projeto */}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>

                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span> R${project.cost}
                                </p>
                            </div>
                            ) : (
                            <div className={styles.project_info}>
                                <ProjectForm handleSubmit={editPost} btnText="Conculir edição" projectData={project}/>
                            </div>
                            )}
                    </div>
                    
                    {/* Serviços */}
                    <div className={styles.service_form_container}>
                        <h2>Adicione um serviço</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                        </button>

                        <div className={styles.project_info}>
                            {showServiceForm && (
                                <ServiceForm 
                                    handleSubmit={createService}
                                    btnText="Adicionar serviço"
                                    projectData={project}
                                />
                            )}
                        </div>
                    </div>

                    {/* Exibindo os serviços */}
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        {services.length > 0 && 
                            services.map((service) => (
                                <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />
                            ))
                        }

                        {services.length === 0 && <p>Não há serviços cadastrados</p> }
                    </Container>
                </Container>
            </div>
            ) : ( <Loading /> )
        }
    </>)
}

export default Project;
