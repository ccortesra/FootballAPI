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

        CreateTable(ArrayStandings,id)       

    }))
}

function toggle(section) {
    section.classList.toggle('open');
}

function shutdown() {
    const OpenHeaders = document.querySelector('.open')

    if (OpenHeaders != null) {
        toggle(OpenHeaders);
    }
}


getData();


// Headers of sections animation 

// Closing opens headers first




const StandingsHeader = document.querySelector('.standings-header')
const StrikersHeader = document.querySelector('.strikers-header')
const FixturesHeader = document.querySelector('.fixtures-header')


StandingsHeader.addEventListener('click', () => {
    shutdown();
    toggle(StandingsHeader);
})

StrikersHeader.addEventListener('click', () => {
    shutdown();
    toggle(StrikersHeader);
})

FixturesHeader.addEventListener('click', () => {
    shutdown();
    toggle(FixturesHeader);
})

