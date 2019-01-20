const handleResponse = (response) => {
    if (response.ok) {
        return response.json()
    }
    else {
        throw response.json()
    }
}

const query = (parameters) => (
	Object.keys(parameters).map(key => 
		parameters[key] ?
			key + '=' + parameters[key]
		:
			null
	).join('&')
)

module.exports = {
    handleResponse: handleResponse,
    query: query
}