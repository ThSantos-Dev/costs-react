// Import - Styles
import styles from '../project/ProjectCard.module.css'

// Import - ICONS
import {BsFillTrashFill} from 'react-icons/bs'

function ServiceCard ({id, name, cost, description, handleRemove}) {

    function remove (event) {
        event.preventDefault()
        handleRemove(id, cost)
    }

    return  (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p><span>Custo total:</span> R${cost}</p>
            <p>{description}</p>

            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    Excluir
                </button>
            </div>
        </div>

    )
}

export default ServiceCard