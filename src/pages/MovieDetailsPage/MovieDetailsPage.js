import React, { Component, lazy, useState, useEffect, match } from 'react';
import {
  useHistory,
  useParams,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Movie from '../../components/Movie/Movie';
import { getMovieById } from '../../Utils/Apis';
import routes from '../../routes';

const AdditionalInfo = lazy(() =>
  import('../../components/AdditionalInfo/AdditionalInfo'),
);
const Reviews = lazy(() => import('../../components/Reviews/Reviews'));
const Cast = lazy(() => import('../../components/Cast/Cast'));

const MovieDetailsPage = props => {
  const [poster, setPoster] = useState('');
  const [genres, setGenres] = useState([]);

  const [poster_path, setPoster_path] = useState('');
  const [path, setPath] = useState('');
  const [id, setId] = useState(0);
  const [original_title, setOriginal_title] = useState('');
  const [vote_average, setVote_average] = useState(0);
  const [overview, setOverview] = useState('');

  const match = useRouteMatch();
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    getMovieById(params.movieId).then(
      data => (
        setGenres(data.genres),
        setPoster(data.poster),
        setPoster_path(data.poster_path),
        setId(data.id),
        setOriginal_title(data.title),
        setVote_average(data.vote_average),
        setOverview(data.overview)
      ),
    );
    if (location.state !== undefined) {
      const { pathname, search } = location.state.from;
      setPath(pathname + search);
    }
  }, []);
  const HandleGoBack = () => {
    if (path !== undefined) {
      history.push(path);
    } else {
      history.push(routes.home);
    }
  };

  return (
    <>
      <button type="button" onClick={HandleGoBack}>
        Go back
      </button>
      <Movie
        original_title={original_title}
        vote_average={vote_average}
        overview={overview}
        genres={genres}
        poster_path={poster_path}
      />
      <AdditionalInfo path={match.url} id={id} />
      <Switch>
        <Route
          path={`${match.path}/cast`}
          render={props => {
            return <Cast {...props} id={id} />;
          }}
        />
        <Route
          path={`${match.path}/reviews`}
          render={props => {
            return <Reviews {...props} />;
          }}
        />
      </Switch>
    </>
  );
};

MovieDetailsPage.propTypes = {
  movieId: PropTypes.number,
  url: PropTypes.string,
  path: PropTypes.string,
};

export default MovieDetailsPage;

// const AdditionalInfo = lazy(() =>
//   import('../../components/AdditionalInfo/AdditionalInfo'),
// );
// const Reviews = lazy(() => import('../../components/Reviews/Reviews'));
// const Cast = lazy(() => import('../../components/Cast/Cast'));

// class MovieDetailsPage extends Component {
//   state = { poster: '', genres: [], poster_path: '', id: 0, path: '' };

//   componentDidMount() {
//     const { movieId } = this.props.match.params;
//     getMovieById(movieId).then(data => this.setState({ ...data }));

//     if (this.props.location.state !== undefined) {
//       const { pathname, search } = this.props.location.state.from;
//       this.setState({ path: pathname + search });
//     }
//   }

//   HandleGoBack = () => {
//     const {
//       history: { push },
//     } = this.props;
//     if (this.state.path !== undefined) {
//       push(this.state.path);
//     } else {
//       push(routes.home);
//     }
//   };
//   render() {
//     const { url, path } = this.props.match;
//     return (
//       <>
//         <button type="button" onClick={this.HandleGoBack}>
//           Go back
//         </button>
//         <Movie {...this.state} />
//         <AdditionalInfo path={url} id={this.state.id} />
//         <Switch>
//           <Route
//             path={`${path}/cast`}
//             render={props => {
//               return <Cast {...props} id={this.state.id} />;
//             }}
//           />
//           <Route
//             path={`${this.props.match.path}/reviews`}
//             render={props => {
//               return <Reviews {...props} />;
//             }}
//           />
//         </Switch>
//       </>
//     );
//   }
// }
// MovieDetailsPage.propTypes = {
//   movieId: PropTypes.number,
//   url: PropTypes.string,
//   path: PropTypes.string,
// };
