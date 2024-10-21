export interface RaSmorgasboardOptions {
  [key: string]: string[]
}

export const RASmorgasboardOptions: RaSmorgasboardOptions = {
    physicalIntimacy: ["No touch", "Platonic touch", "Erotic touch", "Safer sex", "Shared fluids"],
    kink: ["BDSM", "Power exchange", "Roleplaying", "Taboo"],
    emotionalIntimacy: ["Venting", "Support", "Attend to love languages"],
    communicationFrequency: ["Most days", "A few times per week", "Most weeks", "1-2 times per month", "Most months"],
    communicationResponse: ["Always immediate", "Priority response", "Considerate response", "Asynchronous"],
    togetherFrequency: ["Most days", "A few times per week", "Most weeks", "1-2 times per month", "Most months"],
    togetherQuality: ["Adjacent", "Collaborative", "Focused on one another"],
    domestic: ["Chores and duties", "Cooking together", "Housemates", "Roommates"],
    relationshipPublicity: ["Secret", "Family", "Community", "Work", "Social media"],
    labels: ["Friends", "Lovers", "Partners", "Chosen family"],
    lifePartners: ["Long term goals", "Political alignment", "Embracing change", "Emergency contacts"],
    structure: ["Open & non-hierarchical", "Open & hierarchical", "Closed/exclusive"],
    caregiving: ["Plants", "Pets", "Children", "Adults needing care"],
    finances: ["Support", "Shared expenses", "Shared possessions", "Shared accounts", "Shared property", "Inheritor/beneficiary"],
    legal: ["Marriage", "Adoption", "Power of attorney", "Corporate/professional"]
  };

  export const insightsCategories = {
    sexual: [
        { physicalIntimacy: ["Erotic touch", "Safer sex", "Shared fluids"] },
        { kink: ["BDSM", "Power exchange", "Roleplaying", "Taboo"] }
    ],
    platonic: [
        { physicalIntimacy: ["No touch", "Platonic touch"] },
        { labels: ["Friends"] }
    ],
    romantic: [
        { emotionalIntimacy: ["Support", "Attend to love languages"] }
    ],
    frequent: [
        { communicationFrequency: ["Most days", "A few times per week", "Most weeks"] },
        { togetherFrequency: ["Most days", "A few times per week", "Most weeks"] }
    ],
    occasional: [
        { communicationFrequency: ["1-2 times per month", "Most months"] },
        { togetherFrequency: ["1-2 times per month", "Most months"] }
    ],
    committed: [
        { emotionalIntimacy: ["Venting", "Support", "Attend to love languages"] },
        { labels: ["Partners", "Chosen family"] },
        { relationshipPublicity: ["Family", "Community", "Work", "Social media"] },
        { lifePartners: ["Long term goals", "Embracing change", "Emergency contacts"] }
    ],
    casual: [
        { relationshipPublicity: ["Secret"] },
        { communicationFrequency: ["1-2 times per month", "Most months"] },
        { togetherFrequency: ["1-2 times per month", "Most months"] }
    ],
    hierarchical: [
        { domestic: ["Housemates", "Roommates"] },
        { structure: ["Open & hierarchical"] }
    ],
    nonHierarchical: [
        { structure: ["Open & non-hierarchical"] }
    ],
    monogamous: [
        { structure: ["Closed/exclusive"] }
    ],
    nonMonogamous: [
        { structure: ["Open & non-hierarchical", "Open & hierarchical"] }
    ]
};
