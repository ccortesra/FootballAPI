


function CreateContainers(position,name,points) {

    // Creating the divs for the table

    const pos_container = document.createElement('div')
    pos_container.className = 'table-item'

    const name_container = document.createElement('div')
    name_container.className = 'table-item'

    const points_container = document.createElement('div')
    points_container.className = 'table-item'

    // Adding the text
    const p1 = document.createTextNode(`${position}°`)
    const p2 = document.createTextNode(`${name}`)
    const p3 = document.createTextNode(`${points}pts.`)

    pos_container.appendChild(p1)
    name_container.appendChild(p2)
    points_container.appendChild(p3)
    
    // Apending to the parentElement 
    const parentElement = document.querySelector('.position-table')

    parentElement.appendChild(pos_container)
    parentElement.appendChild(name_container)
    parentElement.appendChild(points_container)
}


function CreateTable(standings){
    n = standings.length
    
    for(let i = 0; i<n; i++){
        console.log(i)
        let NewTeam = standings[i]
        const rank = NewTeam.rank
        const name = NewTeam.team.name
        const points = NewTeam.points

        console.log(name)
        
        CreateContainers(rank,name,points)
    }

}


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
        // -------------------------------------------------
        const league = restultObject.league;
        const country = league.country
        const flag = league.flag
        const id = league.id
        const logo = league.logo
        const name = league.name
        const season = league.season
        const ArrayStandings = league.standings[0]
        // -------------------------------------------------
        console.log(ArrayStandings)

        CreateTable(ArrayStandings)
        

    }))
}

getData();