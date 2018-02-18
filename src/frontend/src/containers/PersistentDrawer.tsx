import PersistentDrawer from '../components/PersistentDrawer';
import { AppActions, getTest, newGpx } from '../actions/';
import { AppState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import { GPXFormData } from '../components/Form';

const mapStateToProps = (state: AppState) => {
  return {
    test: state.test,
    gpx: state.gpx
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => {
  return {
    getTest: () => dispatch(getTest()),
    newGpx: (data: GPXFormData) => dispatch(newGpx(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersistentDrawer);
