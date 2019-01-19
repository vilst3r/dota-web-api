const handleResponse = (response) => {
    if (response.ok) {
        return response.json()
    }
    else {
        throw response.json()
    }
}

const query = (parameters) => {
	let query = "?";
	for (let property in parameters) {
	    if (parameters.hasOwnProperty(property) && parameters[property] != undefined) {
	    	query += (property + "=" + parameters[property] + "&") 
	    }
	}
	
	// remove the extra parameter symbol
	query = query.substring (0, query.length - 1)
	return query
}

module.exports = {
    handleResponse: handleResponse,
    query: query
}