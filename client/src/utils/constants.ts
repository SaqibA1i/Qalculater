enum TOKEN {
    JWT_TOKEN = "jwt_token",
    ACCESS_TOKEN = "access_token"
}

enum DATA_TYPE {
    TERM = "Term",
    COURSE = "Course",
    ASSESSMENT = "Assessment"
}

enum ACTION_TYPE {
    EDIT = "Edit",
    CREATE = "Create",
    DELETE = "Delete"
}

enum LOCAL_STORAGE {
    DARK_MODE = "darkMode",
    COURSE = "currentCourse",
    TERM = "currentTerm",
    IS_TERM_HIDDEN = "termHidden",
}
export { TOKEN, LOCAL_STORAGE, ACTION_TYPE, DATA_TYPE }
