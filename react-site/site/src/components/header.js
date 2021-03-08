import React from 'react';
function Header({ setCourseBoolHelper, totalAvg }) {
    return (
        <div className="header-container">
            <button
                class="header-add-course"
                id="header-add-course"
                onClick={setCourseBoolHelper}
            >

                {totalAvg}
            </button>

        </div>
    )

}

export default Header;