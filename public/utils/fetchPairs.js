const fetchPairs = async function (payload) {
    const res = await fetch("/specificPairsWithRandom/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    const result = await res.json();
    return result
}

export default fetchPairs