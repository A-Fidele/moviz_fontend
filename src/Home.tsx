import styles from "./styles/Home.module.css"
import { useState, useEffect } from "react";
import { Popover, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import type { MovieType } from "./type/movie";
import Movie from "./Movies";
import logo from "./assets/logo.png"
import logoLetter from "./assets/logoletter.png"


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
            });
    }, []);


    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.logocontainer}>
                    <img src={logo} alt="Logo" />
                    <img className={styles.logo} src={logoLetter} alt="Letter logo" />
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
            <div className={styles.moviesContainer}>
                {moviesData.map((data, i) => {
                    const isLiked = likedMovies.some((movie) => movie === data.title);
                    let overview = data.overview;
                    if (overview.length > 250) {
                        overview = overview.substr(0, 250);
                        overview += " ...";
                    }
                    return (
                        <Movie
                            key={i}
                            updateLikedMovies={updateLikedMovies}
                            isLiked={isLiked}
                            title={data.title}
                            overview={overview}
                            poster={"https://image.tmdb.org/t/p/w500" + data.poster_path}
                            voteAverage={data.vote_average}
                            voteCount={data.vote_count}
                        />
                    );
                })}
            </div>
        </div>
    )
}
