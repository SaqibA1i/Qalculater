import React from 'react';
import '../marks-styler.css';

function Header({ setCourseBoolHelper }) {
    return (
        <div className="header-container">
            <div class="header-brand">
                Qalculater
            </div>
            <button
                class="header-add-course"
                onClick={setCourseBoolHelper}
            >
                +
                </button>

        </div>
    )

}

export default Header;