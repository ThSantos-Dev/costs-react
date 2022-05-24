// Import - Hooks
import {Link} from 'react-router-dom'
// Import - Styles
import styles from './ProjectCard.module.css'

// Import - ICONS
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function ProjectCard ({id, name, budget, category, handleRemove}) {

    const remove = (event) => {
        event.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>

            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>

            <div className={styles.project_card_actions}>
                <Link to={`/project/${id}`}>
                    <BsPencil/> Editar
                </Link>

                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default ProjectCard