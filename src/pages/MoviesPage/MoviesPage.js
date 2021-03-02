import React, { Component, useState, useEffect } from 'react';
import { getMovieByName } from '../../Utils/Apis';
import { Link, useParams, useHistory, useLocation } from 'react-router-dom';
import styles from './MoviesPage.module.css';
import defaultImage from '../../Pictures/кино.jpg';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const params = useParams();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      getMovieByName(query).then(data => setMovies([...data.results]));
    }
  }, []);

  const HandleInput = event => {
    setQuery(event.target.value);
  };

  const HandleSubmit = event => {
    event.preventDefault();
    if (query.length === 0) {
      setMovies([]);
      history.push({
        pathname: location.pathname,
      });
    } else {
      getMovieByName(query).then(data => setMovies([...data.results]));

      history.push({
        pathname: location.pathname,
        search: `query=${query}`,
      });
    }
  };

  return (
    <>
      <form onSubmit={HandleSubmit}>
        <input onChange={HandleInput} type="text" />
        <button type="submit">Search</button>
      </form>
      <div className={styles.LinksList}>
        <ul className={styles.list}>
          {movies.map(({ id, original_title, name, poster_path }) => {
            return (
              <li key={id} className={styles.listItem}>
                <Link
                  to={{
                    pathname: `/movies/${id}`,
                    state: { from: location },
                  }}
                  key={id}
                >
                  {poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                      alt={original_title}
                    />
                  ) : (
                    <img height="200" src={defaultImage} alt={original_title} />
                  )}
                  <br />
                  {original_title}
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default MoviesPage;

// class MoviesPage extends Component {
//   state = { query: '', movies: [] };

// componentDidMount() {
//   const query = new URLSearchParams(this.props.location.search).get('query');
//   if (query) {
//     getMovieByName(query).then(data =>
//       this.setState({ movies: [...data.results] }),
//     );
//   }
// }
//   HandleInput = event => {
//     this.setState({ query: event.target.value });
//   };

//   HandleSubmit = event => {
//     event.preventDefault();
//     if (this.state.query.length === 0) {
//       this.setState({ movies: [] });
//       this.props.history.push({
//         pathname: this.props.location.pathname,
//       });
//     } else {
//       getMovieByName(this.state.query).then(data =>
//         this.setState({ movies: [...data.results] }),
//       );

//       this.props.history.push({
//         pathname: this.props.location.pathname,
//         search: `query=${this.state.query}`,
//       });
//     }
//   };
//   render() {
//     return (
//       <>
//         <form onSubmit={this.HandleSubmit}>
//           <input onChange={this.HandleInput} type="text" />
//           <button type="submit">Search</button>
//         </form>
//         <div className={styles.LinksList}>
//           <ul className={styles.list}>
//             {this.state.movies.map(
//               ({ id, original_title, name, poster_path }) => {
//                 return (
//                   <li key={id} className={styles.listItem}>
//                     <Link
//                       to={{
//                         pathname: `/movies/${id}`,
//                         state: { from: this.props.location },
//                       }}
//                       key={id}
//                     >
//                       {poster_path ? (
//                         <img
//                           src={`https://image.tmdb.org/t/p/w300${poster_path}`}
//                           alt={original_title}
//                         />
//                       ) : (
//                         <img
//                           height="200"
//                           src={defaultImage}
//                           alt={original_title}
//                         />
//                       )}
//                       <br />
//                       {original_title}
//                       {name}
//                     </Link>
//                   </li>
//                 );
//               },
//             )}
//           </ul>
//         </div>
//       </>
//     );
//   }
// }
