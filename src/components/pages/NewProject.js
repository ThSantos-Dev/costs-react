// Import - Hooks
import { useNavigate } from 'react-router-dom';

// Import - Styles
import styles from './NewProject.module.css';

// Import - Components
import ProjectForm from '../project/ProjectForm';

function NewProject () {

    // Permite redirecionar o usuário
    const navigate = useNavigate();

    // Função para criar um POST
    function createPost(project) {
        // Inicializando o custo e os servços
        project.cost = 0
        project.services = []

        // Opções da requisição
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }

        fetch("http://localhost:5000/projects", options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)

                // Redirect
                navigate('/projects', {state: {message: 'Projeto criado com sucesso!'}})
            })
        .catch((err) => console.log(err))

    }


    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu proejto para depois adicionar os serviços</p>

            <ProjectForm handleSubmit={createPost} btnText="Criar projeto"/>
        </div>
    );
}

export default NewProject