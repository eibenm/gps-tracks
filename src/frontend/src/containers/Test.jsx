import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTest } from '../actions/index';

class Test extends Component {

  componentDidMount() {
    this.props.getTest();
  }

  componentDidUpdate() {
    const { data } = this.props.test;
    if (data) {
      console.log(`recieved data: "${data}"`);
    }
  }

  render() {
    return(
      <div></div>
    );
  }
}

const mapStateToProps = state => {
  return {
    test: state.test
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getTest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);