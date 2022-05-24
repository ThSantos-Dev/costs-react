// Import - Styles
import styles from "./Input.module.css";

/**
 * Componente para criação de inputs
 * @param {String} type Tipo do input (text, number, email...)
 * @param {String} text Texto para a label
 * @param {String} name Para o name do input
 * @param {String} placeholder Texto de ajuda
 * @param {String} handleOnChange Manusear os dados da input
 * @param {String} value Para edição do valor
 * @returns {JSX.Element}
 */
function Input({ type, text, name, placeholder, handleOnChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
      />
    </div>
  );
}

export default Input;
