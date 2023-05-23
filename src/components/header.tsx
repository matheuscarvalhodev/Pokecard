import "../styles/header.css"

const Header: React.FC = () => {
    return (
        <div className="header">
            <img className="logo" src="./pokecard.png" alt="" />
            <img className="psyduck" src="./psyduck.png" alt="" />
        </div>
    )
}

export default Header