//THIS A BACKEND JOB DONE IN FRONT , BUT THIS IS HOW WE MANAGE TO WORK WITH DATA

const results = (countries, wage) =>{  
        
    let result = countries.map(obj => {
        let data = wage.find(item => item.Country === obj.country);
        return {...obj, ...data}
    });

    return result
    
}


export default results