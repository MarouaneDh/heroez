import React, { useState } from "react";
import OneHero from "../components/OneHero";

const ITEMS_PER_PAGE = 10;
const MAX_VISIBLE_PAGES = 5; // Maximum number of visible pagination buttons

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalHeroes = 733;
    const totalPages = Math.ceil(totalHeroes / ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPaginationButtons = () => {
        const pageButtons = [];

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || Math.abs(currentPage - i) <= Math.floor(MAX_VISIBLE_PAGES / 2)) {
                pageButtons.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={currentPage === i ? "active" : ""}
                    >
                        {i}
                    </button>
                );
            }
        }

        return pageButtons;
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalHeroes);

    const displayHeroes = () => {
        const heroes = [];

        for (let i = startIndex + 1; i < endIndex; i++) {
            heroes.push(<OneHero id={i} key={i} />);
        }

        return heroes;
    };

    return (
        <div>
            <div className="heroes-list">
                {displayHeroes()}
            </div>
            <div className="pagination">
                {renderPaginationButtons()}
            </div>
        </div>
    );
};

export default Home;
