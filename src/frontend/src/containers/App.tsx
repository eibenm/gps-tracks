import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import App from '@src/components/App';
import { AppState, AppActions } from '@src/store';
import { newGpx, getGpx } from '@src/store/gpx/actions';
import { GpxFormData, NewGpxCallback } from '@src/store/gpx/types';

const mapStateToProps = (state: AppState) => {
  return {
    gpx: state.gpx
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => {
  return {
    newGpx: (data: GpxFormData,  callback: NewGpxCallback) => dispatch(newGpx(data, callback)),
    getGpx: () => dispatch(getGpx()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
