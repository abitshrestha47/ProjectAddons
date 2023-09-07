const initialState={
    projects: [],
};

const rootReducer=(state=initialState,action)=>{
    console.log(action);
    switch(action.type){
        case 'ADDED':
            {
                const newProjects=[...state.projects,action.payload];
                console.log('New State:', { ...state, projects: newProjects });
                return {...state,projects:newProjects}; 
            }
        default:
            return state;
    }
}

export default rootReducer;