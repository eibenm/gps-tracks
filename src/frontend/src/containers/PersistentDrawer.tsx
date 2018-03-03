import PersistentDrawer from '../components/PersistentDrawer';
import { AppActions, newGpx } from '../actions/';
import { AppState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import { GPXFormData } from '../components/Form';

const mapStateToProps = (state: AppState) => {
  return {
    gpx: state.gpx
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => {
  return {
    newGpx: (data: GPXFormData) => dispatch(newGpx(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersistentDrawer);
