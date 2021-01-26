import React from 'react';
import '../marks-styler.css';

function Header({ setCourseBoolHelper }) {
    return (
        <div className="header-container">
            <button
                class="header-add-course"
                id = "header-add-course"
                onClick={setCourseBoolHelper}
            >
                +
                </button>

        </div>
    )

}

export default Header;