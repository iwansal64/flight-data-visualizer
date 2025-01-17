const api_endpoint = "https://flight-radar1.p.rapidapi.com";

export async function get_airlines() {
    const response: {
        version: Number,
        rows: {
            Name: String,
            Code: String,
            ICAO: String;
        }[];
    } = await (await fetch(api_endpoint + "/airlines/list", {
        "headers": {
            "x-rapidapi-host": "flight-radar1.p.rapidapi.com",
            "x-rapidapi-key": "1ec5662aefmsh6c923e169f963afp1d1981jsn240570fb1912"
        }
    })).json();

    return response["rows"];
}

export async function get_airports() {
    const response: {
        version: Number,
        rows: {
            id: Number,
            name: String,
            iata: String,
            icao: String,
            city: String,
            lat: Number,
            lon: Number,
            country: String,
            alt: Number,
            size: Number,
            timezone: {
                name: String,
                offset: Number,
                offsetHours: String,
                abbr: String,
                abbrName: String,
                isDst: false;
            },
            countryId: Number;
        };
    } = await (await fetch(api_endpoint + "/airports/list", {
        headers: {
            "x-rapidapi-host": "flight-radar1.p.rapidapi.com",
            "x-rapidapi-key": "1ec5662aefmsh6c923e169f963afp1d1981jsn240570fb1912"
        }
    })).json();

    return response["rows"];
}