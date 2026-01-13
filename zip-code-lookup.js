// Zip Code to City/State Mapping using API
// Uses zippopotam.us API (free, no API key required)

// Lookup city and state for a given zip code using API
async function lookupZipCode(zipCode) {
    const zip = zipCode.trim();
    
    try {
        // Use zippopotam.us API - free, no API key needed
        const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
        
        if (!response.ok) {
            throw new Error('Zip code not found');
        }
        
        const data = await response.json();
        
        if (data.places && data.places.length > 0) {
            const place = data.places[0];
            return {
                city: place['place name'],
                state: data.state,
                stateAbbreviation: place['state abbreviation'],
                found: true
            };
        }
        
        return {
            city: null,
            state: null,
            found: false
        };
    } catch (error) {
        console.error('Error looking up zip code:', error);
        return {
            city: null,
            state: null,
            found: false
        };
    }
}

// Get formatted location string (City, State)
async function getLocationString(zipCode) {
    const result = await lookupZipCode(zipCode);
    if (result.found) {
        return `${result.city}, ${result.stateAbbreviation}`;
    }
    // Fallback to just showing the zip code if not found
    return `zip code ${zipCode}`;
}
