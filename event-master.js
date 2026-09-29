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

    // ---- Age categories -------------------------------------------------------
    // Every meet has its own cut-off date; an athlete's age on that date decides the group.
    // All date maths is done on plain YYYY-MM-DD text so time zones can never shift a birthday.
    categoryLimits: [["U-8", 8], ["U-10", 10], ["U-12", 12], ["U-14", 14], ["U-16", 16], ["U-18", 18], ["U-20", 20]],

    isIsoDate: function(v) {
        const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v || ""));
        if (!m) return false;
        const y = +m[1], mo = +m[2], d = +m[3];
        return mo >= 1 && mo <= 12 && d >= 1 && d <= new Date(Date.UTC(y, mo, 0)).getUTCDate();
    },

    // Completed years on refIso (birthday not yet reached = one year less). "" if either date is invalid.
    ageOn: function(dob, refIso) {
        if (!this.isIsoDate(dob) || !this.isIsoDate(refIso)) return null;
        let age = +refIso.slice(0, 4) - +dob.slice(0, 4);
        if (refIso.slice(5) < dob.slice(5)) age--;
        return age;
    },

    categoryForAge: function(age) {
        for (const [cat, limit] of this.categoryLimits) if (age < limit) return cat;
        return "Seniors";
    },

    // cutOffDate omitted = the season default (31 Dec).
    getAthleteCategory: function(dob, cutOffDate) {
        const age = this.ageOn(dob, cutOffDate || this.defaultCutOff);
        return age === null || age < 0 ? "" : this.categoryForAge(age);
    },

    // "U-18" + "Female" -> "U18 Girls"; "Seniors" + "Male" -> "Senior Men"
    categoryLabel: function(cat, gender) {
        const female = String(gender || "").toLowerCase().startsWith("f");
        if (cat === "Seniors") return female ? "Senior Women" : "Senior Men";
        return `${String(cat).replace("-", "")} ${female ? "Girls" : "Boys"}`;
    },

    addYears: function(iso, n) {
        const y = +iso.slice(0, 4) + n, md = iso.slice(5);
        if (md === "02-29" && new Date(Date.UTC(y, 2, 0)).getUTCDate() !== 29) return `${String(y).padStart(4, "0")}-02-28`;
        return `${String(y).padStart(4, "0")}-${md}`;
    },
    addDays: function(iso, n) {
        const d = new Date(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10) + n));
        return d.toISOString().slice(0, 10);
    },

    // The year a meet is held in (used for the 31 December rule).
    meetYear: function(meet) {
        if (!meet) return null;
        for (const v of [meet.endDate, meet.startDate]) if (this.isIsoDate(v)) return +v.slice(0, 4);
        const m = /(\d{4})\s*$/.exec(String(meet.date || ""));
        if (m) return +m[1];
        return /^\d{4}$/.test(String(meet.categoryYear || "")) ? +meet.categoryYear : null;
    },

    // meet.age_rule = { mode: "year_end" | "meet_end" | "fixed", date: "YYYY-MM-DD" }.
    // Returns the cut-off as YYYY-MM-DD, or null when it has not been set (or cannot be worked out).
    resolveCutoff: function(meet) {
        const rule = meet && meet.age_rule;
        if (!rule) return null;
        if (rule.mode === "year_end") { const y = this.meetYear(meet); return y ? `${y}-12-31` : null; }
        if (rule.mode === "meet_end") return this.isIsoDate(meet.endDate) ? meet.endDate : null;
        if (rule.mode === "fixed") return this.isIsoDate(rule.date) ? rule.date : null;
        return null;
    },

    // Birth-date range for each category on a given cut-off, e.g. U-18: born 28.10.2008 to 27.10.2010.
    dobRanges: function(refIso) {
        if (!this.isIsoDate(refIso)) return [];
        const out = [];
        let minAge = 0;
        for (const [cat, limit] of this.categoryLimits) {
            out.push({ category: cat, from: this.addDays(this.addYears(refIso, -limit), 1), to: this.addYears(refIso, -minAge) });
            minAge = limit;
        }
        out.push({ category: "Seniors", from: null, to: this.addYears(refIso, -minAge) });
        return out;
    },

    // Events an athlete of this category and gender may be entered in, flattened for a checklist.
    eventsFor: function(category, gender) {
        const bucket = this.mappings[category] && this.mappings[category][gender];
        if (!bucket) return [];
        const groups = [["Track", bucket.track], ["Hurdles", bucket.hurdles], ["Field", bucket.field], ["Cross Country", bucket.crossCountry], ["Combined", bucket.combined]];
        const list = [];
        groups.forEach(([label, events]) => (events || []).forEach(ev => list.push({ event: ev, group: label })));
        return list;
    }
};

if (typeof window !== "undefined") window.TAA_MASTER_DATA = TAA_MASTER_DATA;
