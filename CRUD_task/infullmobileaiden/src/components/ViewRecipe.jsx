import React from "react";

const ViewRecipe = props => {
  return (
    <>
      <h1>{props.activeRecipe.recipeName}</h1>
      <ul>
        {props.activeRecipe.ingredients.map((el, i) => (<li key={i}>{el}</li>))}
      </ul>
      <button className="btn btnUpdate" onClick={() =>  props.handleTab("editRecipe", props.activeRecipe.id)}>Edit &nbsp; <i className="far fa-edit"></i></button>
    </>
  );
};

export default ViewRecipe;
