import Test from '../components/Test';
import { AppAction, getTest } from '../actions/';
import { AppState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

const mapStateToProps = (state: AppState) => {
  return {
    test: state.test
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => {
  return {
    getTest: () => dispatch(getTest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
