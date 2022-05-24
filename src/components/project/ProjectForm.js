// Import - Hooks
import { useState, useEffect } from "react";

// Impot - Style
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import styles from "./ProjectForm.module.css";

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Faz a requisição apenas uma vez, evitando o problema de loop
  useEffect(() => {
    fetch("http://localhost:5000/categories", options)
      .then((resp) => resp.json())
      .then((data) => setCategories(data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Faz a requisição de acordo com método passado pela props
  const submit = (event) => {
    // Não deixa executar o page reload
    event.preventDefault();
    handleSubmit(project);
  };

  // Preenche um projeto - altera o valor da entidade, do project
  function handleChange(event) {
    setProject({ ...project, [event.target.name]: event.target.value });
    console.log(project);
  }

  function handleCategory(event) {
    setProject({
      ...project,
      category: {
        id: event.target.value,
        name: event.target.options[event.target.selectedIndex].text
      },
    });
    console.log(project);
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name ? project.name : ''}
      />

      <Input
        type="number"
        text="Orçamento do Projeto"
        name="budget"
        placeholder="insira o orçamento total"
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ''}
      />

      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ''}
      />

      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
