import "../styles/header.css"

const Header: React.FC = () => {
    return (
        <div className="header">
            <img className="logo" src="./pokecard.png" alt="" />
            <div className="psyduck">
                <img className="interrogacao" src="./interrogacao.png" alt="" />
                <img src="./psyduck.png" alt="" />
            </div>
            <img className="pokeball" src="./pokeball.png" alt="" />
        </div>
    )
}

export default Header