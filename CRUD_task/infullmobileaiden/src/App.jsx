import React, { Component } from "react";

import RecipeList from "./components/RecipeList";
import AddRecipe from "./components/AddRecipe";
import ViewRecipe from "./components/ViewRecipe";
import EditRecipe from "./components/EditRecipe";

import { setInLocal } from "./util/helpers"

class App extends Component {
  state = {
    activeTab: "addRecipe",
    activeRecipe: null,
    recipeList: []
  };

  get actualActiveRecipe() {
    const {recipeList, activeRecipe} = this.state;
    return recipeList.filter(el => el.id === activeRecipe)[0]
  }

  componentWillMount() {
    this.setState({ recipeList: JSON.parse(localStorage.getItem("recipeList")) });
  }

  handleAddRecipe = (recipeName, ingredients, id, updatedList = false) => {
    const { recipeList } = this.state
    let newRecipeList = null;
    if(updatedList) {
      newRecipeList = [...updatedList, { recipeName, ingredients, id }]
    } else {
      newRecipeList = (recipeList && recipeList.length > 0) ? [...recipeList, { recipeName, ingredients, id }] : [{ recipeName, ingredients, id }] ;
    }
    setInLocal( "recipeList", newRecipeList)
    this.setState({ recipeList: newRecipeList, activeTab: "viewRecipe", activeRecipe: id });
  };

  handleUpdateRecipe = (recipeName, ingredients, id) => {
    const updatedList = this.state.recipeList.filter(el => el.id !== id);
    this.handleAddRecipe(recipeName, ingredients, id, updatedList)
  };

  handleDeleteRecipe = id => {
    const newRecipeList = this.state.recipeList.filter(el => el.id !== id);
    setInLocal("recipeList", newRecipeList);
    this.setState({ activeTab: "addRecipe", activeRecipe: null, recipeList: newRecipeList });
  };

  handleTab = (activeTab, activeRecipe = null) => {
    this.setState({ activeTab, activeRecipe});
  };

  render() {
    const { activeTab, recipeList } = this.state;
    return (
      <div className="appContainer">
        <RecipeList recipeList={recipeList} handleTab={this.handleTab} />
        <div className="mainContainer">
          {activeTab === "addRecipe" && (<AddRecipe handleAddRecipe={this.handleAddRecipe} />)}
          {activeTab === "viewRecipe" && (<ViewRecipe handleTab={this.handleTab} activeRecipe={this.actualActiveRecipe}/>)}
          {activeTab === "editRecipe" && (<EditRecipe handleUpdateRecipe={this.handleUpdateRecipe} handleDeleteRecipe={this.handleDeleteRecipe} activeRecipe={this.actualActiveRecipe} />)}
        </div>
      </div>
    );
  }
}

export default App;
