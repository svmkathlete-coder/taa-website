/**
 * TAA Technical Rulebook 2026-27
 * Purpose: Mapping events, weights, and heights per AFI Guidelines
 */

export const TAA_MASTER_DATA = {
    season: "2026-27",
    defaultCutOff: "2026-12-31",

    mappings: {
        "U-8": {
            "Male": { track: ["60m", "80m", "100m"], field: ["Ball Throw", "Long Jump (Standing)"], crossCountry: ["1km"] },
            "Female": { track: ["60m", "80m", "100m"], field: ["Ball Throw", "Long Jump (Standing)"], crossCountry: ["1km"] }
        },
        "U-10": {
            "Male": { track: ["60m", "80m", "100m"], field: ["Ball Throw", "Long Jump"], crossCountry: ["1km"] },
            "Female": { track: ["60m", "80m", "100m"], field: ["Ball Throw", "Long Jump"], crossCountry: ["1km"] }
        },
        "U-12": {
            "Male": { track: ["60m", "100m", "300m"], field: ["Long Jump", "High Jump", "Shot Put (2kg)"], crossCountry: ["2km"], combined: ["Triathlon (A)", "Triathlon (B)", "Triathlon (C)"] },
            "Female": { track: ["60m", "100m", "300m"], field: ["Long Jump", "High Jump", "Shot Put (2kg)"], crossCountry: ["2km"], combined: ["Triathlon (A)", "Triathlon (B)", "Triathlon (C)"] }
        },
        "U-14": {
            "Male": { track: ["60m", "100m", "600m"], field: ["Long Jump", "High Jump", "Shot Put (3kg)", "Ball Throw"], crossCountry: ["2km"], combined: ["Triathlon (A)", "Triathlon (B)", "Triathlon (C)"] },
            "Female": { track: ["60m", "100m", "600m"], field: ["Long Jump", "High Jump", "Shot Put (2kg)", "Ball Throw"], crossCountry: ["2km"], combined: ["Triathlon (A)", "Triathlon (B)", "Triathlon (C)"] }
        },
        "U-16": {
            "Male": { 
                track: ["100m", "300m", "800m", "2000m"], 
                hurdles: ["80m H (0.838m)"], 
                field: ["Long Jump", "High Jump", "Shot Put (4kg)", "Discus Throw (1.25kg)", "Javelin Throw (600g)"], 
                crossCountry: ["3km"] 
            },
            "Female": { 
                track: ["100m", "300m", "800m", "2000m"], 
                hurdles: ["80m H (0.762m)"], 
                field: ["Long Jump", "High Jump", "Shot Put (3kg)", "Discus Throw (1kg)", "Javelin Throw (400g)"], 
                crossCountry: ["3km"] 
            }
        },
        "U-18": {
            "Male": { 
                track: ["100m", "200m", "400m", "800m", "1500m", "3000m"], 
                hurdles: ["110m H (0.914m)", "400m H (0.838m)", "2000m SC"], 
                field: ["Long Jump", "High Jump", "Triple Jump", "Pole Vault", "Shot Put (5kg)", "Discus Throw (1.5kg)", "Javelin Throw (700g)", "Hammer Throw (5kg)"], 
                crossCountry: ["6km"] 
            },
            "Female": { 
                track: ["100m", "200m", "400m", "800m", "1500m", "3000m"], 
                hurdles: ["100m H (0.762m)", "400m H (0.762m)", "2000m SC"], 
                field: ["Long Jump", "High Jump", "Triple Jump", "Pole Vault", "Shot Put (3kg)", "Discus Throw (1kg)", "Javelin Throw (500g)", "Hammer Throw (3kg)"], 
                crossCountry: ["4km"] 
            }
        },
        "U-20": {
            "Male": { 
                track: ["100m", "200m", "400m", "800m", "1500m", "5000m", "10000m"], 
                hurdles: ["110m H (0.991m)", "400m H (0.914m)", "3000m SC"], 
                field: ["Long Jump", "High Jump", "Triple Jump", "Pole Vault", "Shot Put (6kg)", "Discus Throw (1.75kg)", "Javelin Throw (800g)", "Hammer Throw (6kg)"], 
                crossCountry: ["8km"] 
            },
            "Female": { 
                track: ["100m", "200m", "400m", "800m", "1500m", "3000m", "5000m"], 
                hurdles: ["100m H (0.838m)", "400m H (0.762m)", "3000m SC"], 
                field: ["Long Jump", "High Jump", "Triple Jump", "Pole Vault", "Shot Put (4kg)", "Discus Throw (1kg)", "Javelin Throw (600g)", "Hammer Throw (4kg)"], 
                crossCountry: ["6km"] 
            }
        },
        "Seniors": {
            "Male": { 
                track: ["100m", "200m", "400m", "800m", "1500m", "5000m", "10000m"], 
                hurdles: ["110m H (1.067m)", "400m H (0.914m)", "3000m SC"], 
                field: ["Long Jump", "High Jump", "Triple Jump", "Pole Vault", "Shot Put (7.26kg)", "Discus Throw (2kg)", "Javelin Throw (800g)", "Hammer Throw (7.26kg)"], 
                crossCountry: ["10km"] 
            },
            "Female": { 
                track: ["100m", "200m", "400m", "800m", "1500m", "5000m", "10000m"], 
                hurdles: ["100m H (0.838m)", "400m H (0.762m)", "3000m SC"], 
                field: ["Long Jump", "High Jump", "Triple Jump", "Pole Vault", "Shot Put (4kg)", "Discus Throw (1kg)", "Javelin Throw (600g)", "Hammer Throw (4kg)"], 
                crossCountry: ["10km"] 
            }
        }
    },

    getAthleteCategory: function(dob, cutOffDate) {
        const birth = new Date(dob);
        const refDate = new Date(cutOffDate || this.defaultCutOff);
        const age = refDate.getFullYear() - birth.getFullYear();

        if (age < 8) return "U-8";
        if (age < 10) return "U-10";
        if (age < 12) return "U-12";
        if (age < 14) return "U-14";
        if (age < 16) return "U-16";
        if (age < 18) return "U-18";
        if (age < 20) return "U-20";
        return "Seniors";
    }
};

window.TAA_MASTER_DATA = TAA_MASTER_DATA;