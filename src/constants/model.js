const createTab = (id, title) => ({id, title})

export const TABS = {
    SEARCH: createTab(1, "Search Courses"),
    PLAN: createTab(2, "Selected Plan")
}

export const getTabFromID = (id) => {
    switch (id) {
        case 1:
            return TABS.SEARCH
        case 2:
            return TABS.PLAN
        default:
            return null;
    }
}

export const BACKEND_ADDRESS = "http://bannerplus.com:3001"

