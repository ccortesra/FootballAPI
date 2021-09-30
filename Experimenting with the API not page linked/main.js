// Fetching


function getData(){
    // Football API
    fetch("https://v3.football.api-sports.io/standings?league=39&season=2021", {
        "data-host": "v3.football.api-sports.io",
        "method": "GET",
        "timeout": 0,
        "data-season": 2021 ,
        "headers": {
        "x-rapidapi-key": "	ba27db48899659da303f2ef7e650d2e5",
        "x-rapidapi-host": "v3.football.api-sports.io"
    }
    })
    
    .then(response => response.json().then(data => {
        // get our data
        // logs to see everything
        console.log(data)

        const restultObject = data['response'][0];
        console.log(restultObject);
        console.log(restultObject.league);

        // Substract the object with infooo
        const league = restultObject.league;
        
        const country = league.country
        const flag = league.flag
        const id = league.id
        const logo = league.logo
        const name = league.name
        const season = league.season
        const ArrayStandings = league.standings


    }))
}

getData();