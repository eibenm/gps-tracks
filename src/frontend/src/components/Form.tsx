import * as React from 'react';

// redux-form
import {
  reduxForm,
  Field,
  /*FormErrors,*/
  InjectedFormProps,
  FormSubmitHandler,
  BaseFieldProps,
  GenericForm,
  Form as FForm
} from 'redux-form';
import { WrappedFieldProps , GenericField } from 'redux-form';

// material-ui
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import FileUpload from 'material-ui-icons/FileUpload';

const styles: ReadonlyMap<string, React.CSSProperties> = new Map<string, React.CSSProperties>([
  ['container', {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: 8
  }],
  ['formTitle', {
    fontSize: '20px',
    fontWeight: 500
  }],
  ['button', {
    marginTop: 8,
    marginBottom: 8
  }],
  ['textField', {
    marginTop: 8,
    marginBottom: 8,
    marginRight: 8,
    width: 200
  }],
  ['displayNone', {
    display: 'none'
  }],
  ['fileUploadIcon', {
    marginLeft: 8
  }]
]);

interface FormData {
  name: string;
  asshat?: string;
}

interface FormProps {
  saveData: (data: FormData) => void;
}

// const validate = (values: Readonly<FormData>): FormErrors<FormData> => {

//   window.console.log('validate???');

//   const errors: FormErrors<FormData> = {};

//   if (values.name === undefined) {
//     errors.name = 'name needed';
//   }

//   return errors;
// };

// -----------------------------------------

interface MyFieldCustomProps {
  placeholder?: string;
  component: (field: MyFieldProps) => JSX.Element;
}

type MyFieldProps = MyFieldCustomProps & WrappedFieldProps;

const FieldCustom = Field as new () => GenericField<MyFieldCustomProps>;

type FieldProps = BaseFieldProps<MyFieldCustomProps> & MyFieldCustomProps;

const FieldCustomComp: React.StatelessComponent<FieldProps> = props => (
  <FieldCustom {...props} component={props.component} />
);

// -----------------------------------------

type InjectedProps = InjectedFormProps<FormData, FormProps>;

class Form extends React.Component<FormProps & InjectedProps, {}> {

  constructor(props: FormProps & InjectedProps) {
    super(props);
  }

  public handleSubmitCallback: FormSubmitHandler<FormData, {}> = (values): void => {
    this.props.saveData(values as FormData);
  }

  public renderInputField(field: MyFieldProps): JSX.Element {
    return(
      <div>
        <TextField
          label={field.placeholder}
          placeholder={field.placeholder}
          margin="normal"
          style={styles.get('textField')}
        />
      </div>
    );
  }

  public renderFileInputField(field: MyFieldProps): JSX.Element {
    return(
      <div>
        <input accept=".gpx" id="raised-button-file" type="file" style={styles.get('displayNone')} />
        <label htmlFor="raised-button-file">
          <Button variant="raised" component="span" style={styles.get('button')} >
            Upload GPX
            <FileUpload style={styles.get('fileUploadIcon')} />
          </Button>
        </label>
      </div>
    );
  }

  public render(): JSX.Element {

    window.console.log('props', this.props);

    const FormCustom = FForm as new () => GenericForm<FormData, {}>;

    return (
      <FormCustom
        style={styles.get('container')}
        onSubmit={this.props.handleSubmit(this.handleSubmitCallback)}
      >
        <p style={styles.get('formTitle')}>Upload Track</p>

        <Field name="wwww" component="input" />

        <FieldCustomComp name="name" component={this.renderInputField} placeholder="Track Name" />

        {/* <FieldCustom name="name" component={this.renderInputField} placeholder="Track Name" /> */}
        {/* <FieldCustom name="fileInput" component={this.renderFileInputField} /> */}

        <div>
          {/* <Button variant="raised" size="medium" color="primary">
            Submit
          </Button> */}
          <input type="submit" />
        </div>
      </FormCustom>
    );
  }
}

export default reduxForm<FormData, FormProps>({
  form: 'GPXUploadForm'
})(Form);
