import App from '../components/App';
import { AppActions, getGpx } from '../actions/';
import { AppState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

const mapStateToProps = (state: AppState) => {
  return {
    gpx: state.gpx
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => {
  return {
    getGpx: () => dispatch(getGpx())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
