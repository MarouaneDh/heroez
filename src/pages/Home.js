import React, { useState, useEffect } from "react";
import OneHero from "../components/OneHero";
import Loader from "../components/Loader";

const ITEMS_PER_PAGE = 10;
const MAX_VISIBLE_PAGES = 5;
const LOCAL_STORAGE_KEY = "currentPage";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const totalHeroes = 733;
    const totalPages = Math.ceil(totalHeroes / ITEMS_PER_PAGE);

    useEffect(() => {
        const savedPage = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedPage) {
            const parsedPage = parseInt(savedPage);
            if (parsedPage >= 1 && parsedPage <= totalPages) {
                setCurrentPage(parsedPage);
            }
        }
    }, [totalPages]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        localStorage.setItem(LOCAL_STORAGE_KEY, newPage);
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

        for (let i = startIndex + 1; i <= endIndex; i++) {
            heroes.push(<OneHero id={i} key={i} />);
        }

        return heroes;
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2500);
    }, [])

    return (
        <div>
            <div className="heroes-list">
                {loading ? <Loader /> : displayHeroes()}
            </div>
            <div className="pagination">
                {renderPaginationButtons()}
            </div>
        </div>
    );
};

export default Home;
