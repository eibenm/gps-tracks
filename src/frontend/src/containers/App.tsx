import App from '../components/App';
import { AppActions, newGpx, getGpx } from '../actions/';
import { AppState, GPXFormData, NewGpxCallback } from '../types/index';
import { connect, Dispatch } from 'react-redux';

const mapStateToProps = (state: AppState) => {
  return {
    gpx: state.gpx
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => {
  return {
    newGpx: (data: GPXFormData,  callback: NewGpxCallback) => dispatch(newGpx(data, callback)),
    getGpx: () => dispatch(getGpx()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);