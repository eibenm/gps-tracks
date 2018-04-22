import * as React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText
} from 'reactstrap';

import { GPXFormData } from '@src/types';
import '@src/components/NewTrackForm.css';

interface Props {
  saveData: (data: GPXFormData) => void;
}

interface GPXFormErrors {
  nameError: string;
  fileError: string;
}

interface NewTrackFormState {
  fileName: string;
}

type State = GPXFormData & GPXFormErrors & NewTrackFormState;

class NewTrackForm extends React.Component<Props, State> {

  public fileName: string = '';

  constructor(props: Props) {
    super(props);
    this.onInputNameChange = this.onInputNameChange.bind(this);
    this.onInputFileChange = this.onInputFileChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.state = {
      name: null,
      file: null,
      nameError: '',
      fileError: '',
      fileName: ''
    };
  }

  public validate(): boolean {
    this.setState({
      nameError: (!this.state.name ? 'Required' : ''),
      fileError: (!this.state.file ? 'Required' : '')
    });
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
    const file = event.target.files![0];
    this.setState({
      file: file,
      fileName: file.name
    });
  }

  public render(): JSX.Element {

    const { nameError, fileError, fileName } = this.state;

    const nameInvalid = nameError ? true : false;
    const fileInvalid = fileError ? true : false;

    return(
      <Form name="GPXForm" onSubmit={this.handleOnSubmit}>

        <FormGroup>
          <Input
            name="track"
            type="text"
            invalid={nameInvalid}
            placeholder="New Track Name"
            onChange={this.onInputNameChange}
          />
          <FormFeedback>Name required</FormFeedback>
        </FormGroup>

        <FormGroup>
          <div className="custom-file">
            <Input
              name="file"
              type="file"
              accept=".gpx"
              className="custom-file-input"
              id="validatedCustomFile"
              invalid={fileInvalid}
              onChange={this.onInputFileChange}
            />
            <Label className="custom-file-label">{fileName ? fileName : 'Choose file...'}</Label>
            <FormText>File type must be gpx</FormText>
            <FormFeedback>File required</FormFeedback>
          </div>
        </FormGroup>

        <Button>Submit</Button>

      </Form>
    );
  }
}

export default NewTrackForm;
