const API_URL =  'http://localhost:3001';

// Load planets and return as JSON
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

async function httpGetLaunches() {
  // Load launches, sort by flight number, and return as JSON.
  const response = await (await fetch(`${API_URL}/launches`)).json();
  return response.sort((a,b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  // Submit given launch data to launch system.
  try {
    return await fetch(`${API_URL}/launches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(launch),
    });
  } catch (err) {
    return {
      ok: false,
    }
  }
}

async function httpAbortLaunch(id) {
  // Delete launch with given ID.
  try {
    return await fetch (`${API_URL}/launches/${id}`, {
      method: 'DELETE',
    });
  } catch (err) {
    return {
      ok: false,
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};