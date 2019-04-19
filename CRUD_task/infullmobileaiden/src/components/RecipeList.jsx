import React from 'react'

const RecipeList = props => {
    return (
        <div className="recipeListContainer">
            <h1>Recipe List</h1>
            {props.recipeList && <ul>
                {props.recipeList.map((el, i) => (
                <li className="mainList" onClick={() => props.handleTab("viewRecipe", el.id)} key={i} >
                    {el.recipeName} 
                </li> 
                ))}
            </ul>}
            <button onClick={() => props.handleTab("addRecipe")} className="btn btnList"> Add New Recipe </button>
        </div>
    )
} 

export default RecipeList