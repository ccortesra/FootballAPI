function ColorSpecialZone(SpecialZone, item) {
    if (SpecialZone == 'UCL') {
        item.style.background = '#5C7AEA' 
    } else if(SpecialZone == 'UEL') {
        item.style.background = 'orange'
    } else {
        item.style.background = '#BD1616'
    }
}

function IsItSpecialZone(id,pos) {
    if (id == 39) {
        // Conditional for premier league european and relegation zones
        // Premier League , id: 39
        if ((pos == 18) || (pos == 19) || (pos == 20)){
            return 'REL'
        } else if ((pos == 1) || (pos == 2) || (pos == 3) || (pos == 4)){
            return 'UCL'
        } else if ((pos == 5)) {
            return 'UEL'
        } else {
            return ''
        }
    }
}


function CreateContainers(position,name,points, logo, pj, SpecialZone) {

    // Creating the divs for the table ----------------------------------------

    const pos_container = document.createElement('div')
    pos_container.className = 'table-item'

    const name_container = document.createElement('div')
    name_container.className = 'table-item'

    const points_container = document.createElement('div')
    points_container.className = 'table-item'

    const pj_container = document.createElement('div')
    pj_container.className = 'table-item'

    const special_zone = document.createElement('div')
    special_zone.className = 'table-item'

    // -----------------------------------------------------------------

    // Adding the text -------------------------------------------------
    const p1 = document.createTextNode(`${position}°`)
    const p2 = document.createTextNode(`${name}`)
    const p3 = document.createTextNode(`${points}pts.`)
    const games_played = document.createTextNode(`${pj}`)

    pos_container.appendChild(p1)
    name_container.appendChild(p2)
    points_container.appendChild(p3)
    pj_container.appendChild(games_played)
    
    // Adding the photos ------------------------------------------------

    const badge = document.createElement('img')
    badge.src = logo
    badge.className = 'team-badge'
    // ------------------------------------------------------------------

    // Special Zones ----------------------------------------------------
    if (Boolean(SpecialZone)) {
        ColorSpecialZone(SpecialZone,special_zone)
    } 
    // ------------------------------------------------------------------

    // Apending to the parentElement ------------------------------------ 
    const parentElement = document.querySelector('.position-table')

    parentElement.appendChild(pos_container)
    parentElement.appendChild(pj_container)
    parentElement.appendChild(name_container)
    parentElement.appendChild(badge)
    parentElement.appendChild(points_container)
    parentElement.appendChild(special_zone)
    // -------------------------------------------------------------------
}


function CreateTable(standings,id){
    n = standings.length
    
    for(let i = 0; i<n; i++){
        
        let NewTeam = standings[i]
        const rank = NewTeam.rank
        const name = NewTeam.team.name
        const points = NewTeam.points
        const logo = NewTeam.team.logo
        const pj = NewTeam.all.played

        const SpecialZone = IsItSpecialZone(id,rank)
        
        CreateContainers(rank,name,points,logo,pj, SpecialZone)
    }

}

function CreateTableStrikers(strikers) {
    n = strikers.length
    
    for(let i = 0; i<n; i++){
        
        const men = strikers[i].player
        const stats = strikers[i].statistics[0]
        const rank = i + 1
        const mp = stats.games.appearences
        const name = men.name
        const club = stats.team.logo
        const goals = stats.goals.total
        console.log(name + ' ' +goals)
        
        CreateContainersStrikers(rank,mp,name,club,goals)
    }
}

function CreateContainersStrikers(rank,mp,name,club,goals) {
    const pos_container = document.createElement('div')
    pos_container.className = 'table-item'

    const matches_container = document.createElement('div')
    matches_container.className = 'table-item'

    const name_container = document.createElement('div')
    name_container.className = 'table-item'


    const goal_container = document.createElement('div')
    goal_container.className = 'table-item'

    const p1 = document.createTextNode(`${rank}°`)
    const p2 = document.createTextNode(`${mp}`)
    const p3 = document.createTextNode(`${name}`)
    const p4 = document.createTextNode(`${goals}`)

    pos_container.appendChild(p1)
    matches_container.appendChild(p2)
    name_container.appendChild(p3)
    goal_container.appendChild(p4)

    // Adding the photos ------------------------------------------------

    const badge = document.createElement('img')
    badge.src = club
    badge.className = 'team-badge'
    // ------------------------------------------------------------------

    const parentElement = document.querySelector('.strikers-table')
    parentElement.appendChild(pos_container)
    parentElement.appendChild(matches_container)
    parentElement.appendChild(name_container)
    parentElement.appendChild(badge)
    parentElement.appendChild(goal_container)

}

// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// Fetching

function getStrikers() {
    fetch("https://v3.football.api-sports.io/players/topscorers?season=2021&league=39", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "	ba27db48899659da303f2ef7e650d2e5"
	}
    })
    .then(response => response.json().then(data => {
        console.log(data)
        const ResultObject = data['response']
        CreateTableStrikers(ResultObject)
    }))
    .catch(err => {
        console.log(err);
    });
    
}



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

        CreateTable(ArrayStandings,id)       

    }))
}
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// Animations
function toggle(section) {
    section.classList.toggle('open');
}

function shutdown() {
    const OpenHeaders = document.querySelectorAll('.open')
    const OpenArray = Array.from(OpenHeaders)

    if (OpenHeaders != []) {
        OpenArray.forEach(toggle)
    }

}


getData();
getStrikers();


// Headers of sections animation 

// Closing opens headers first




const StandingsHeader = document.querySelector('.standings-header')
const StandingsTable = document.querySelector('.position-table')


const StrikersHeader = document.querySelector('.strikers-header')
const StrikersTable = document.querySelector('.strikers-table')


const FixturesHeader = document.querySelector('.fixtures-header')
const FixturesTable = document.querySelector('.fixtures-table')



StandingsHeader.addEventListener('click', () => {
    shutdown();
    toggle(StandingsHeader);
    toggle(StandingsTable);
})

StrikersHeader.addEventListener('click', () => {
    shutdown();
    toggle(StrikersHeader);
    toggle(StrikersTable);
})

FixturesHeader.addEventListener('click', () => {
    shutdown();
    toggle(FixturesHeader);
})

