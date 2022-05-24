// Import - Styles
import styles from "./Select.module.css";

/**
 * Componente para criação de inputs
 * @param {String} options Tipo do input (text, number, email...)
 * @param {String} text Texto para a label
 * @param {String} name Para o name do input
 * @param {String} handleOnChange Manusear os dados da input
 * @param {String} value Para edição do valor
 * @returns {JSX.Element}
 */
function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ""}
      >
        <option value="" key="">
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
