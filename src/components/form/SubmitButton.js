// Import - Styles
import styles from "./SubmitButton.module.css";

/**
 * Componente para criação de inputs
 * @param {String} text Texto para o botão
 * @returns {JSX.Element}
 */
function SubmitButton({ text }) {
  return (
    <div className={styles.form_control}>
        <button className={styles.btn}>{text}</button>
    </div>
  );
}

export default SubmitButton;
