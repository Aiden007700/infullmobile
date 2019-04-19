import React, { Component } from "react";

class AddRecipe extends Component {
  state = {
    recipeName: '',
    ingredients: []
  };

  handleAddRecipeName = e => {
    this.setState({recipeName: e.target.value}) 
  }

  handleAddIngredient = (e) => {
    if (e.key !== 'Enter') return
    this.setState({ingredients: [...this.state.ingredients, e.target.value]})
    e.target.value = ''
  }

  hanleRemoveIngredient = (item) => {
    this.setState({ingredients: this.state.ingredients.filter(el => el !== item)})
}

  handleSubmit = () => {
      const { recipeName, ingredients } = this.state;
      if(recipeName === '') return
      const id = new Date().getTime() // Idealy we wuld generate a proper ID, however since this is just a demo we will use a timestamp as an id
      this.props.handleAddRecipe(recipeName, ingredients, id)
      this.setState({recipeName: '', ingredients: []})
  }

  render() {
    const { recipeName, ingredients } = this.state;
    return (
      <>
        <h1>AddRecipe:  <span className="headerSpan">{recipeName}</span></h1>
        <input onChange={this.handleAddRecipeName} value={recipeName} type="text" placeholder="Recipe Name" />
        <input onKeyDown={this.handleAddIngredient} type="text" placeholder="Add Ingredient, Hit Enter to Add" />
        <ul>
            {ingredients.map((el, i) => <li key={i}>{el} <span onClick={() => this.hanleRemoveIngredient(el)} className="delItem">&#10060;</span></li> )}
        </ul>
        <button className="btn btnUpdate" onClick={this.handleSubmit}>Add Recipe</button>
      </>
    );
  }
}

export default AddRecipe;
