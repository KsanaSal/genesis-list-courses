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
                setCourses(fetchCourses.courses);
            } catch {
                console.log("first");
            }
        };
        getCourses();
    }, []);
    console.log(loading);

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + 10;
    const currentItems = courses.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(courses.length / 10);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * 10) % courses.length;

        setItemOffset(newOffset);
    };

    return (
        <div>
            <h1 className={css.title}>Learn more</h1>
            {courses.length > 0 && (
                <>
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
                    />
                </>
            )}
        </div>
    );
};

export default Characters;
