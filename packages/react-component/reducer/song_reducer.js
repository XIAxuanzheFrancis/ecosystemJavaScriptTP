// import { Switch, Route } from "react-router-dom";

// Ce fichier permet de mettre en place le routing react
// de vos différents composant react

function reducer(state, action) {
    if (action.action == "ADD") {
        return [...state, action.value]
    } else if (action.action == "INIT") {
        return action.value
    }
    console.log(state)
    console.log(action)
    return state
}

function init(values) {
    return {action: "INIT", value: values}
}

function add(value) {
    return {action: "ADD", value: value}
}

export default reducer

export { add, init }