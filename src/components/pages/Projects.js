// Import - Hooks
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Import - styles
import styles from "./Projects.module.css";

// Import - Components
import Message from "../layout/Message";
import LinkButton from "./../layout/LinkButton";
import Container from "./../layout/Container";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState('');

  const location = useLocation();
  let message = "";

  if (location.state) {
    message = location.state.message;
  }

  // Requisição para pegar todos os projetos
  useEffect(() => {
    // Opções da requisição
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Utilizado para simular o processo de loader
    setTimeout(() => {
      // Requisição para pegar todos os projetos
      fetch("http://localhost:5000/projects/", options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setProjects(data.reverse());
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, []);

  /**
   * Função para remover um projeto
   * @param {String} id ID do projeto a ser removido
   * @return {VoidFunction}
   */
  function removeProject(id) {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`http://localhost:5000/projects/${id}`, options)
      .then((response) => response.json())
      .then((data) => {
        setProjects(
          // Percorre os projetos  e elimina o projeto que tem o id - diretamente no fronte para evitar ter de fazer uma nova requisão
          projects.filter((project) => project.id !== id)
        );

        // Mensagem
        setProjectMessage('Projeto removido com sucesso!')
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>

      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}

      <Container customClass="start">
        {/* Verificando se há projetos a serem exibidos */}
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}

        {/* Verificando o status do loader */}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados.</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
