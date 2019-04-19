import React, { Component } from 'react'

class EditRecipe extends Component {
    state = {
      recipeName: '',
      ingredients: [],
      id: null
    };

    componentDidMount() {
        const {recipeName, ingredients, id} = this.props.activeRecipe;
        this.setState({recipeName, ingredients, id})
    }
  
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
  
    handleUpdate = () => {
        const { recipeName, ingredients, id } = this.state;
        //TODO add validation
        this.props.handleUpdateRecipe(recipeName, ingredients, id)
    }
  
    render() {
      const { recipeName, ingredients, id } = this.state;
      return (
        <>
          <h1>Edit:  <span className="headerSpan">{recipeName}</span></h1>
          <input onChange={this.handleAddRecipeName} value={recipeName} type="text" placeholder="Recipe Name" />
          <input onKeyDown={this.handleAddIngredient} type="text" placeholder="Add Ingredient, Hit Enter to Add" />
          <ul>
              {ingredients.map((el, i) => <li key={i}>{el} <span onClick={() => this.hanleRemoveIngredient(el)} className="delItem">&#10060;</span></li>)}
          </ul>
          <button className='btn btnUpdate' onClick={this.handleUpdate}>Update Recipe</button>
          <button className='btn btnDelete' onClick={() => this.props.handleDeleteRecipe(id)}>Delete Recipe</button>
        </>
      );
    }
  }
  
  export default EditRecipe;