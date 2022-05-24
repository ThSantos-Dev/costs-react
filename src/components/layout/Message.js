// Import - Hooks
import { useState, useEffect } from "react";

// Import - Styles
import styles from "./Message.module.css";

function Message({ type, msg }) {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Validação para verificar se há uma mensagem para ser exibida
    if(!msg) {
        setVisible(false)
        return
    }

    // Caso haja, deixamos visivel e iniciamos o processo de timer
    setVisible(true)

    const timer = setTimeout(() => {
        setVisible(false)
    },  3000)

    // Acaba com o processo do timer
    return () => clearTimeout(timer)

  }, [msg])

  return (
    <>
      {visible && (
        <div className={`${styles.message} ${styles[type]}`}>
          <p>{msg}</p>
        </div>
      )}
    </>
  );
}

export default Message;
