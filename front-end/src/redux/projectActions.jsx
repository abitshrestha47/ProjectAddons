export const addProject=(projectData)=>{
    console.log(projectData);
    return{
        type: 'ADDED',
        payload:projectData,
    }
};