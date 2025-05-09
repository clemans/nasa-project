const launches = new Map();

let latestFlightNumber = 0;

const launch = {
    flightNumber: '0',
    mission: 'Kepler Exploration Z',
    rocket: 'Explorer IS2',
    launchDate: new Date('December 27, 2030'),
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: false
}

launches.set(launch.flightNumber, launch);

export function getAllLaunches() {
    return Array.from(launches.values());
}

export function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            flightNumber: latestFlightNumber,
            customers: ['Zero to Mastery', 'NASA'],
            success: true,
            upcoming: true,
        })
    )
}