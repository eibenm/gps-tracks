// react
import * as React from 'react';

// material-ui
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import FileUpload from 'material-ui-icons/FileUpload';
import Typography from 'material-ui/Typography';

import { GPXFormData } from '../types/index';

interface Props {
  saveData: (data: GPXFormData) => void;
}

interface GPXFormErrors {
  nameError: string;
  fileError: string;
}

type State = GPXFormData & GPXFormErrors;

class TrackForm extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.onInputNameChange = this.onInputNameChange.bind(this);
    this.onInputFileChange = this.onInputFileChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.state = {
      name: null,
      file: null,
      nameError: '',
      fileError: ''
    };
  }

  public validate(): boolean {
    this.setState({ nameError: (!this.state.name ? 'Required' : '') });
    this.setState({ fileError: (!this.state.file ? 'Required' : '') });
    return this.state.name !== null &&
      this.state.name !== '' &&
      this.state.file !== null;
  }

  public handleOnSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const data: GPXFormData = {
      name: this.state.name,
      file: this.state.file
    };

    if (this.validate()) {
      this.props.saveData(data);
    }
  }

  public onInputNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      name: event.target.value
    });
  }

  public onInputFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      file: event.target.files![0]
    });
  }

  public render(): JSX.Element {

    const { nameError, fileError } = this.state;

    return(
      <div className="gpx-form-wrapper">
        <Typography variant="title" className="gpx-form-title" noWrap={true}>
          Upload GPX Track
        </Typography>
        
        <form name="GPXForm" onSubmit={this.handleOnSubmit}>
          <div>
            <TextField
              name="track"
              label={nameError ? nameError : 'Track'}
              error={nameError ? true : false}
              placeholder="Track"
              margin="normal"
              onChange={this.onInputNameChange}
            />
          </div>
          <div>
            <Typography
              variant="body1"
              color="error"
              style={{display: fileError ? 'block' : 'none'}}
            >
              Required
            </Typography>
            <input
              name="file"
              accept=".gpx"
              id="raised-button-file"
              type="file"
              style={{display: 'none'}}
              onChange={this.onInputFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="raised" component="span" >
                Upload GPX
                <FileUpload />
              </Button>
            </label>
          </div>
          <div>
            <Button variant="raised" color="primary" type="submit">Submit</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default TrackForm;
