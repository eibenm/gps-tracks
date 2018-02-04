import * as React from 'react';
import { AppAction } from '../actions/';

interface TestProps {
  test: { data: string };
  getTest: () => AppAction;
}

class Test extends React.Component<TestProps, {}> {

  constructor(props: TestProps) {
    super(props);
  }

  componentDidMount(): void {
    this.props.getTest();
  }

  componentDidUpdate(): void {
    const { data } = this.props.test;
    if (data) {
      window.console.log(`recieved data: "${data}"`);
    }
  }

  render(): JSX.Element {
    return(
      <div />
    );
  }
}

export default Test;
