import css from "./Courses.module.css";
import { useEffect, useState } from "react";
import getCardsCourses from "../data/getCardsCourses";
import CardListCourse from "../components/cardListCourse/CardListCourse";
import { Courses } from "../interfaces/courses.interface";
import ReactPaginate from "react-paginate";

const Characters = ({ loading }: any) => {
    const [courses, setCourses] = useState<Courses[]>([]);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const fetchCourses = await getCardsCourses();
                console.log(fetchCourses);
                setCourses(fetchCourses.courses);
            } catch {
                console.log("first");
            }
        };
        getCourses();
    }, []);
    console.log(courses);
    console.log(loading);

    // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + 10;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = courses.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(courses.length / 10);

    // Invoke when user click to request another page.
    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * 10) % courses.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <div>
            <h1 className={css.title}>Learn more</h1>
            <CardListCourse courses={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="prev"
                containerClassName={css.wrapPagination}
                pageClassName={css.wrapTitle}
                previousClassName={css.wrapTitle}
                nextClassName={css.wrapTitle}
                activeClassName={css.wrapActive}
                // renderOnZeroPageCount={null}
            />
        </div>
    );
};

export default Characters;
