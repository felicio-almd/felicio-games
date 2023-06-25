import "./styles.css";

// Página de loader para mostrar um carregamente enquanto os dados da API não aparecem na página.

function Loader() {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
