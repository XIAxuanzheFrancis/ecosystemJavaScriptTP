// import { Switch, Route } from "react-router-dom";

// Ce fichier permet de mettre en place le routing react
// de vos différents composant react
import SongList from './songlist'
import { Link } from 'react-router-dom'
import Search from './search';
import './styles.css';

export default function(props) {
    // const [state, setState] = useState([{id : 1} , {id : 2}])
    // console.log(state)
 
    return (
            <>
                {/* <div>{SUBJECT} - {props.a}</div>
                <button onClick={()=>{
                    console.log("click")
                    setState([...state, {id : 3}])
                }}>Click</button> */}
                <div className='container'>                
                <Search/>
                </div>
                <div className='content'>
                <SongList/>
                <Link to="/addSong">Ajouter une chanson</Link><br/>
                <Link to="/deleteSong">Supprimer une chanson</Link><br/>
                </div>
                <Link to="/updateSong">Update une chanson</Link>
            </>

    )
};