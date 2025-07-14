import styles from "./styles/Home.module.css"
import { useState, useEffect } from "react";
import { Popover, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import type { MovieType } from "./type/movie";
export default function Home() {

    const [likedMovies, setLikedMovies] = useState<string[]>([]);
    const [moviesData, setMoviesData] = useState<MovieType[]>([]);

    // Liked movies (inverse data flow)
    const updateLikedMovies = (movieTitle: string) => {
        if (likedMovies.find((movie) => movie === movieTitle)) {
            setLikedMovies(likedMovies.filter((movie) => movie !== movieTitle));
        } else {
            setLikedMovies([...likedMovies, movieTitle]);
        }
    };

    const likedMoviesPopover = likedMovies.map((data, i) => {
        return (
            <div key={i} className={styles.likedMoviesContainer}>
                <span className="likedMovie">{data}</span>
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    onClick={() => updateLikedMovies(data)}
                    className={styles.crossIcon}
                />
            </div>
        );
    });

    const popoverContent = (
        <div className={styles.popoverContent}>{likedMoviesPopover}</div>
    );

    useEffect(() => {
        fetch("http://localhost:3000/movies")
            .then((response) => response.json())
            .then((data) => {
                setMoviesData(data.movies);
                console.log("moviedata:", moviesData);
            });
    }, []);


    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.logocontainer}>
                    <img src="logo.png" alt="Logo" />
                    <img className={styles.logo} src="logoletter.png" alt="Letter logo" />
                </div>
                <Popover
                    title="Liked movies"
                    content={popoverContent}
                    className={styles.popover}
                    trigger="click"
                >
                    <Button>♥ {likedMovies.length} movie(s)</Button>
                </Popover>
            </div>
            <div className={styles.title}>LAST RELEASES</div>

        </div>
    )
}
