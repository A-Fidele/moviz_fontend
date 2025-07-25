import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faVideo } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/Movie.module.css';

type MoviesType = {
    key: number,
    updateLikedMovies: (movie: string) => void,
    isLiked: boolean,
    title: string,
    overview: string,
    poster: string,
    voteAverage: number,
    voteCount: number,
}

function Movie({
    updateLikedMovies,
    isLiked,
    title,
    overview,
    poster,
    voteAverage,
    voteCount }: MoviesType) {
    const [watchCount, setWatchCount] = useState(0);
    const [personalNote, setPersonalNote] = useState(0);

    // Average evaluation
    const stars = [];
    for (let i = 0;i < 10;i++) {
        let style = {};
        if (i < voteAverage - 1) {
            style = { 'color': '#f1c40f' };
        }
        stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
    }

    // Watch movie
    const handleWatchMovie = () => {
        setWatchCount(watchCount + 1);
    };
    let videoIconStyle = { 'cursor': 'pointer' };
    if (watchCount > 0) {
        videoIconStyle = { 'color': '#e74c3c', 'cursor': 'pointer' };
    }

    // Like movie
    const handleLikeMovie = () => {
        updateLikedMovies(title);
    };
    let heartIconStyle = { 'cursor': 'pointer' };
    if (isLiked) {
        heartIconStyle = { 'color': '#e74c3c', 'cursor': 'pointer' };
    }

    // Personal note
    const personalStars = [];
    for (let i = 0;i < 10;i++) {
        let style = { 'cursor': 'pointer' };
        if (i < personalNote) {
            style = { 'color': '#2196f3', 'cursor': 'pointer' };
        }
        personalStars.push(<FontAwesomeIcon key={i} icon={faStar} onClick={() => setPersonalNote(i + 1)} style={style} className="note" />);
    }

    return (
        <div className={styles.card}>
            <img className={styles.image} src={poster} alt={title} />
            <div className={styles.textContainer}>
                <div>
                    <span className={styles.name}>{title}</span>
                    <p className={styles.description}>{overview}</p>
                </div>
                <div className={styles.iconContainer}>
                    <span className={styles.vote}>{stars} ({voteCount})</span>
                    <span>{personalStars} ({personalNote})</span>
                    <span><FontAwesomeIcon icon={faVideo} onClick={() => handleWatchMovie()} style={videoIconStyle} className="watch" /> ({watchCount})</span>
                    <span><FontAwesomeIcon icon={faHeart} onClick={() => handleLikeMovie()} style={heartIconStyle} className="like" /></span>
                </div>
            </div>
        </div>
    );
}

export default Movie;
